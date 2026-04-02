import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of the kind of internship I'm looking for, plus contact info and how to reach me.",
  parameters: z.object({}),
  execute: async () => {
    return `Here's what I'm looking for:

- Availability: Open to internship opportunities
- Location: Jaipur, Rajasthan, India, with flexibility for strong opportunities
- Focus: Software engineering, AI/ML, NLP, backend systems, analytics, and LLM-enabled products
- Stack: Python, SQL, REST APIs, Machine Learning, NLP, TensorFlow, scikit-learn, Streamlit, PostgreSQL, GitHub, Azure DevOps
- What I bring: Hands-on experience across ML pipelines, backend-oriented problem solving, KPI reporting, workflow optimization, and building practical user-facing systems

Contact me via:
- Email: alishad846@gmail.com
- LinkedIn: https://www.linkedin.com/in/shad-ali-099a82145
- GitHub: https://github.com/alishad846`;
  },
});
