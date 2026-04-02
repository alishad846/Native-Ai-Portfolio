import { tool } from 'ai';
import { z } from 'zod';

export const getCrazy = tool({
  description:
    "This tool tells a fun or unusual thing I've built. Use it when the user asks for the craziest or most unusual thing.",
  parameters: z.object({}),
  execute: async () => {
    return 'One of the most unusual things I have built is an AI-native portfolio experience that can explain my work like a live product instead of a static page.';
  },
});
