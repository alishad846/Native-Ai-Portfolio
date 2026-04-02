import { tool } from 'ai';
import { z } from 'zod';

export const getProjects = tool({
  description: 'This tool shows a list of projects built by Shad Ali.',
  parameters: z.object({}),
  execute: async () => {
    return 'Here are my featured AI, analytics, and software engineering projects.';
  },
});
