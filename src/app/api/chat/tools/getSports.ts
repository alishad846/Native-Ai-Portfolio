import { tool } from 'ai';
import { z } from 'zod';

export const getSports = tool({
  description:
    'This tool shares a few personal interests or hobbies when the user asks about life outside work.',
  parameters: z.object({}),
  execute: async () => {
    return 'Here is a quick look at my interests and what I enjoy outside direct project work.';
  },
});
