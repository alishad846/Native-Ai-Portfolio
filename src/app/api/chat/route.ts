import { mistral } from '@ai-sdk/mistral';
import { streamText } from 'ai';
import { SYSTEM_PROMPT } from './prompt';
import { getContact } from './tools/getContact';
import { getCrazy } from './tools/getCrazy';
import { getInternship } from './tools/getInternship';
import { getPresentation } from './tools/getPresentation';
import { getProjects } from './tools/getProjects';
import { getResume } from './tools/getResume';
import { getSkills } from './tools/getSkills';
import { getSports } from './tools/getSports';
import { getWeather } from './tools/getWeather';

export const maxDuration = 30;

const MISTRAL_HEALTHCHECK_URL = 'https://api.mistral.ai/v1/models';

function maskKey(key: string | undefined) {
  if (!key) return 'MISSING';
  if (key.length <= 8) return '********';
  return `${key.slice(0, 4)}...${key.slice(-4)}`;
}

// ❌ Pas besoin de l'export ici, Next.js n'aime pas ça
function errorHandler(error: unknown) {
  if (error == null) {
    return 'Unknown error';
  }
  if (typeof error === 'string') {
    return error;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return JSON.stringify(error);
}

async function verifyMistralReachability() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const currentKey = process.env.MISTRAL_API_KEY;

  console.log(`[CHAT-API] Verifying Mistral health check with masked key: ${maskKey(currentKey)}`);

  try {
    const response = await fetch(MISTRAL_HEALTHCHECK_URL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${currentKey}`,
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => 'No error body available');
      console.error(`[CHAT-API] Mistral health check failed. Status: ${response.status}, Body: ${errorBody}`);
      throw new Error(`Mistral API health check failed with status ${response.status}: ${errorBody}`);
    }
    
    console.log('[CHAT-API] Mistral health check successful (200 OK)');
  } catch (error) {
    const message = errorHandler(error);
    console.error(`[CHAT-API] Health check error: ${message}`);
    throw new Error(
      `Chat provider is currently unreachable. Please check your internet connection or Mistral API access. Masked key: ${maskKey(currentKey)}. Error: ${message}`
    );
  } finally {
    clearTimeout(timeout);
  }
}

function sanitizeMessages(messages: any[]) {
  return messages.map((message) => {
    if (message.role === 'assistant') {
      const hasToolCalls =
        Array.isArray(message.tool_calls) && message.tool_calls.length > 0;
      if (hasToolCalls) {
        const { content, ...rest } = message;
        return rest;
      }
    }

    return message;
  });
}

export async function POST(req: Request) {
  try {
    if (!process.env.MISTRAL_API_KEY) {
      const missingKey = 'MISTRAL_API_KEY is missing. Set it in .env.local or your deployment environment.';
      console.error('[CHAT-API] ' + missingKey);
      return new Response(missingKey, { status: 500 });
    }

    const { messages } = await req.json();
    console.log('[CHAT-API] Incoming messages:', messages);

    messages.unshift(SYSTEM_PROMPT);

    await verifyMistralReachability();

    const cleanedMessages = sanitizeMessages(messages);

    const tools = {
      getProjects,
      getPresentation,
      getResume,
      getContact,
      getSkills,
      getSports,
      getCrazy,
      getInternship,
      getWeather,
    };

    const result = streamText({
      model: mistral('mistral-large-latest'),
      messages: cleanedMessages,
      toolCallStreaming: false,
      tools,
      maxSteps: 2,
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (err) {
    console.error('Global error:', err);
    const errorMessage = errorHandler(err);
    return new Response(errorMessage, { status: 500 });
  }
}
