import { tool } from 'ai';
import { z } from 'zod';
import { profile, projectsData } from '@/data/profile';
export const getPresentation = tool({
  description:
    'Returns an up-to-date personal introduction for Shad Ali, covering background, focus areas, and accessible links.',
  parameters: z.object({}),
  execute: async () => {
    const projects = projectsData
      .slice(0, 4)
      .map((project) => project.title)
      .join(', ');

    const summary = `I help turn data, AI, and automation into reliable products—currently experimenting with scalable pipelines, NLP automation, and analytics experiences that become useful tools for real users. If you want to partner on practical AI/ML or backend work, reach out at ${profile.email} or connect on LinkedIn (${profile.linkedin}).`;
  
    return {
      presentation: summary,
    };
  },
});
