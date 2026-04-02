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

    const summary = [
      `I’m ${profile.fullName}, an AI/ML engineer-in-training from Jaipur. My current focus is on backend systems, NLP automation, analytics, and runtime workflows that make models feel practical for teams that need precise business answers.`,
      `I study computer science at Poornima Institute of Engineering and Technology and spend most of my time shipping ML pipelines, backend automation, LLM orchestration, and analytics experiences that turn data into actionable signals.`,
      `Recent work includes ${projects}, and I’m always aiming for scalable architecture, thoughtful testing, and clean code so those projects stay maintainable after the first prototype.`,
      `If you want to collaborate, reach out at ${profile.email} or connect on LinkedIn (${profile.linkedin}).`,
    ].join('\n\n');

    return {
      presentation: summary,
    };
  },
});
