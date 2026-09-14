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
    const { videoUrl, folder = "generated-videos", publicId, tags = [] } = await req.json();

    if (!videoUrl) {
      return Response.json({ error: "Video URL is required" }, { status: 400 });
    }

    // Video von externer URL zu Cloudinary hochladen
    const uploadResult = await cloudinary.uploader.upload_large(
      videoUrl,
      {
        resource_type: "video",
        folder: folder,
        public_id: publicId || `video-${Date.now()}`,
        chunk_size: 6000000, // 6MB chunks für große Videos
        eager: [
          { width: 1920, height: 1080, crop: "scale", quality: "auto" },
          { width: 1280, height: 720, crop: "scale", quality: "auto" },
          { width: 854, height: 480, crop: "scale", quality: "auto" }
        ],
        eager_async: true,
        tags: ["uploaded", "cms", ...tags]
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
        size: uploadResult.bytes,
        folder: uploadResult.folder
      },
      metadata: {
        originalUrl: videoUrl,
        uploadedAt: new Date().toISOString(),
        tags: uploadResult.tags
      }
    });

  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    
    return Response.json(
      { 
        error: "Failed to upload video to Cloudinary",
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
    message: "Cloudinary Video Upload API is running",
    status: "ready",
    features: {
      upload: "External video URLs to Cloudinary",
      optimization: "Multiple resolutions generated",
      formats: ["MP4", "WebM"],
      maxSize: "500MB per video",
      chunkUpload: "6MB chunks for large files"
    },
    configuration: {
      cloudinaryConfigured: !!(
        process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_API_KEY && 
        process.env.CLOUDINARY_API_SECRET
      )
    }
  });
}
