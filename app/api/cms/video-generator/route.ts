import { NextRequest } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { requireAdminApi } from '../../../lib/adminGate';

// Cloudinary Konfiguration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  const denied = requireAdminApi(req);
  if (denied) return denied;

  try {
    const { prompt, duration = 8, quality = "720p", folder = "generated-videos", title } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.COMETAPI_KEY?.trim();
    if (!apiKey) {
      return Response.json({ error: "COMETAPI_KEY not configured" }, { status: 500 });
    }

    // Video mit Comet/Sora generieren
    const modelName = `sora-1:1-${quality}-${duration}s`;
    
    const cometResponse = await fetch("https://api.comet.com/sora/v1/videos", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [{ role: "user", content: prompt }],
        max_tokens: 2048,
      }),
    });

    if (!cometResponse.ok) {
      const errorData = await cometResponse.text();
      return Response.json({ error: "Failed to generate video", details: errorData }, { status: cometResponse.status });
    }

    const cometData = await cometResponse.json();
    const videoUrl = cometData.choices?.[0]?.message?.content;

    if (!videoUrl) {
      return Response.json({ error: "No video URL returned from Comet API" }, { status: 500 });
    }

    // Video von Comet URL zu Cloudinary hochladen
    const uploadResult = await cloudinary.uploader.upload_large(
      videoUrl,
      {
        resource_type: "video",
        folder: folder,
        public_id: title ? `${title}-${Date.now()}` : `generated-video-${Date.now()}`,
        chunk_size: 6000000, // 6MB chunks
        eager: [
          { width: 1920, height: 1080, crop: "scale", quality: "auto" },
          { width: 1280, height: 720, crop: "scale", quality: "auto" },
          { width: 854, height: 480, crop: "scale", quality: "auto" }
        ],
        eager_async: true,
        tags: ["generated", "sora", "ai-video", quality, `${duration}s`]
      }
    ) as any;

    return Response.json({
      success: true,
      cloudinary: {
        publicId: uploadResult.public_id,
        url: uploadResult.secure_url,
        duration: uploadResult.duration,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.bytes
      },
      comet: {
        originalUrl: videoUrl,
        prompt: prompt,
        duration: duration,
        quality: quality,
        model: modelName
      },
      metadata: {
        title: title || `Generated Video ${Date.now()}`,
        folder: folder,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error("CMS Video Generation Error:", error);
    
    return Response.json(
      { 
        error: "Failed to process video generation and upload",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const denied = requireAdminApi(req);
  if (denied) return denied;

  return Response.json({
    message: "CMS Video Generator API is running",
    status: "ready",
    features: {
      generation: "Sora AI via Comet API",
      storage: "Cloudinary CDN",
      formats: ["MP4"],
      qualities: ["480p", "720p", "1080p"],
      durations: "1-10 seconds",
      autoOptimization: "Multiple resolutions generated"
    },
    configuration: {
      cometApiConfigured: !!process.env.COMETAPI_KEY,
      cloudinaryConfigured: !!(
        process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_API_KEY && 
        process.env.CLOUDINARY_API_SECRET
      )
    }
  });
}
