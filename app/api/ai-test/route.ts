import { createXai } from "@ai-sdk/xai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { requireAdminApi } from "../../lib/adminGate";

export async function POST(req: Request) {
  const denied = requireAdminApi(req);
  if (denied) return denied;

  try {
    const { prompt, provider, model } = await req.json();

    if (!prompt) {
      return Response.json({ error: "Prompt is required" }, { status: 400 });
    }

    // Validate provider
    const supportedProviders = ['xai', 'openai', 'claude'];
    const selectedProvider = provider || 'xai';
    
    if (!supportedProviders.includes(selectedProvider)) {
      return Response.json({ 
        error: `Unsupported provider. Supported: ${supportedProviders.join(', ')}` 
      }, { status: 400 });
    }

    let aiModel;
    let apiKey;
    let modelName;

    switch (selectedProvider) {
      case 'xai':
        apiKey = process.env.XAI_API_KEY?.trim();
        if (!apiKey) {
          return Response.json({ error: "XAI_API_KEY not configured" }, { status: 500 });
        }
        const xai = createXai({ apiKey });
        modelName = model || "grok-2-1212";
        aiModel = xai(modelName);
        break;

      case 'openai':
        apiKey = process.env.OPENAI_API_KEY?.trim();
        if (!apiKey) {
          return Response.json({ error: "OPENAI_API_KEY not configured" }, { status: 500 });
        }
        const openai = createOpenAI({ apiKey });
        modelName = model || "gpt-4o";
        aiModel = openai(modelName);
        break;

      case 'claude':
        apiKey = process.env.ANTHROPIC_API_KEY?.trim();
        if (!apiKey) {
          return Response.json({ error: "ANTHROPIC_API_KEY not configured" }, { status: 500 });
        }
        const anthropic = createAnthropic({ apiKey });
        modelName = model || "claude-3-5-sonnet-20241022";
        aiModel = anthropic(modelName);
        break;

      default:
        return Response.json({ error: "Invalid provider" }, { status: 400 });
    }

    const result = streamText({
      model: aiModel,
      prompt: prompt,
    });

    return result.toTextStreamResponse();
  } catch (error: any) {
    console.error("AI API Error:", error);
    
    // Handle specific API errors
    if (error.message?.includes("Incorrect API key") || error.message?.includes("Invalid API key")) {
      return Response.json(
        { error: "Invalid API key. Please check your API key configuration." },
        { status: 401 }
      );
    }

    if (error.message?.includes("rate limit") || error.message?.includes("quota")) {
      return Response.json(
        { error: "Rate limit exceeded or quota exceeded." },
        { status: 429 }
      );
    }
    
    return Response.json(
      { 
        error: "Failed to process AI request",
        details: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const denied = requireAdminApi(req);
  if (denied) return denied;

  return Response.json({
    message: "AI SDK Test API is running",
    status: "ready",
    supportedProviders: {
      xai: {
        available: !!process.env.XAI_API_KEY,
        defaultModel: "grok-2-1212",
        availableModels: ["grok-2-1212", "grok-2-1213"]
      },
      openai: {
        available: !!process.env.OPENAI_API_KEY,
        defaultModel: "gpt-4o",
        availableModels: ["gpt-4o", "gpt-4o-mini", "gpt-3.5-turbo"]
      },
      claude: {
        available: !!process.env.ANTHROPIC_API_KEY,
        defaultModel: "claude-3-5-sonnet-20241022",
        availableModels: ["claude-3-5-sonnet-20241022", "claude-3-haiku-20240307", "claude-3-opus-20240229"]
      }
    }
  });
}