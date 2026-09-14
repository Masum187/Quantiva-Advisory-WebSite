import { NextRequest } from 'next/server';
import { requireAdminApi } from '../../lib/adminGate';

export async function POST(req: NextRequest) {
  const denied = requireAdminApi(req);
  if (denied) return denied;

  try {
    const { prompt, duration = 5, quality = "480p" } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.COMETAPI_KEY?.trim();
    if (!apiKey) {
      return Response.json({ error: "COMETAPI_KEY not configured" }, { status: 500 });
    }

    // Validate duration (Sora supports 1-10 seconds)
    if (duration < 1 || duration > 10) {
      return Response.json({ 
        error: "Duration must be between 1 and 10 seconds" 
      }, { status: 400 });
    }

    // Validate quality
    const supportedQualities = ["480p", "720p", "1080p"];
    if (!supportedQualities.includes(quality)) {
      return Response.json({ 
        error: `Unsupported quality. Supported: ${supportedQualities.join(', ')}` 
      }, { status: 400 });
    }

    // Construct model name based on quality and duration
    const modelName = `sora-1:1-${quality}-${duration}s`;

    // Make request to Comet API
    const response = await fetch("https://api.comet.com/sora/v1/videos", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 2048,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Comet API Error:", errorData);
      
      if (response.status === 401) {
        return Response.json(
          { error: "Invalid API key. Please check your COMETAPI_KEY configuration." },
          { status: 401 }
        );
      }
      
      if (response.status === 429) {
        return Response.json(
          { error: "Rate limit exceeded. Please try again later." },
          { status: 429 }
        );
      }

      return Response.json(
        { error: "Failed to generate video", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    const videoUrl = data.choices?.[0]?.message?.content;

    if (!videoUrl) {
      return Response.json(
        { error: "No video URL returned from API" },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      videoUrl: videoUrl,
      prompt: prompt,
      duration: duration,
      quality: quality,
      model: modelName
    });

  } catch (error: any) {
    console.error("Video Generation Error:", error);
    
    return Response.json(
      { 
        error: "Failed to process video generation request",
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
    message: "Video Generation API is running",
    status: "ready",
    supportedFeatures: {
      durations: "1-10 seconds",
      qualities: ["480p", "720p", "1080p"],
      models: [
        "sora-1:1-480p-1s",
        "sora-1:1-480p-5s", 
        "sora-1:1-480p-10s",
        "sora-1:1-720p-1s",
        "sora-1:1-720p-5s",
        "sora-1:1-720p-10s",
        "sora-1:1-1080p-1s",
        "sora-1:1-1080p-5s",
        "sora-1:1-1080p-10s"
      ]
    },
    apiKeyConfigured: !!process.env.COMETAPI_KEY
  });
}


