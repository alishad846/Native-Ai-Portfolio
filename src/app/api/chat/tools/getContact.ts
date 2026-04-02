import { tool } from 'ai';
import { z } from 'zod';

export const getContact = tool({
  description: 'This tool shows my contact information.',
  parameters: z.object({}),
  execute: async () => {
    return "Here is my contact information above. Feel free to reach out for internships, collaborations, or software and AI opportunities.";
  },
});
