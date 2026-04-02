import { tool } from 'ai';
import { z } from 'zod';

export const getSkills = tool({
  description: 'This tool shows a list of my skills.',
  parameters: z.object({}),
  execute: async () => {
    return 'You can see my skills above, including backend engineering, AI/ML, NLP, LLM workflows, data tooling, databases, and delivery tools.';
  },
});
