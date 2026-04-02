import Image from 'next/image';
import { ChevronRight, Link, PlayCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { projectsData } from '@/data/profile';

type ProjectMedia =
  | {
      type: 'image';
      src: string;
      alt: string;
    }
  | {
      type: 'video';
      src: string;
      poster?: string;
      title: string;
    };

type ProjectDetails = {
  title: string;
  previewSrc: string;
  overview: string;
  highlights: string[];
  links: { name: string; url: string }[];
  media: ProjectMedia[];
};

const PROJECT_DETAILS: ProjectDetails[] = [
  {
    title: 'DataInsights.ai',
    previewSrc: '/projects/datainsights-preview.png',
    overview:
      'An LLM-driven analytics workspace designed to help non-technical users ask business questions in plain language and get structured, actionable insights back.',
    highlights: [
      'Translated natural-language prompts into data-focused workflows and usable outputs.',
      'Focused on practical insight delivery instead of raw model output alone.',
      'Built for decision support, reporting clarity, and analyst productivity.',
    ],
    links: [
      { name: 'GitHub Repository', url: 'https://github.com/alishad846/DataInsights.ai' },
    ],
    media: [
      {
        type: 'video',
        src: '/projects/videos/datainsights-ai.mp4',
        poster: '/projects/datainsights-preview.png',
        title: 'DataInsights.ai walkthrough',
      },
    ],
  },
  {
    title: 'Resume Data Extraction',
    previewSrc: '/projects/resume-extraction-preview.png',
    overview:
      'A resume parsing workflow that extracts structured candidate information using NLP so recruiters and teams can review profiles faster and more consistently.',
    highlights: [
      'Automated extraction of key candidate fields from unstructured resumes.',
      'Reduced manual screening effort by converting documents into structured data.',
      'Built around NLP techniques that are useful in real hiring workflows.',
    ],
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/alishad846/Resume-Data-Extraction',
      },
    ],
    media: [
      {
        type: 'video',
        src: '/projects/videos/resume-data-extraction.mp4',
        poster: '/projects/resume-extraction-preview.png',
        title: 'Resume Data Extraction walkthrough',
      },
    ],
  },
  {
    title: 'Customer Churn Prediction',
    previewSrc: '/projects/customer-churn-preview.png',
    overview:
      'An end-to-end churn modeling project built around preprocessing, feature engineering, model validation, and business interpretation for retention-focused decisions.',
    highlights: [
      'Covered the full ML workflow from preparation to evaluation.',
      'Focused on business-facing analysis rather than model accuracy in isolation.',
      'Structured outputs around retention use cases and customer risk patterns.',
    ],
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/alishad846/Advanced_telco_churn',
      },
    ],
    media: [
      {
        type: 'video',
        src: '/projects/videos/customer-churn.mp4',
        poster: '/projects/customer-churn-preview.png',
        title: 'Customer Churn Prediction walkthrough',
      },
    ],
  },
  {
    title: 'Deep Youtube Analysis',
    previewSrc: '/projects/youtube-data-insight.png',
    overview:
      'A YouTube analytics dashboard that combines API-based metrics, sentiment-aware analysis, and recommendation-oriented insights for channel evaluation.',
    highlights: [
      'Connected data retrieval and insight generation in a single dashboard flow.',
      'Added sentiment-aware analysis to go beyond surface-level engagement numbers.',
      'Helped turn creator data into clearer content and growth decisions.',
    ],
    links: [
      {
        name: 'GitHub Repository',
        url: 'https://github.com/alishad846/Deep_Youtube_Analysis',
      },
    ],
    media: [
      {
        type: 'video',
        src: '/projects/videos/deep-youtube-analysis.mp4',
        poster: '/projects/youtube-data-insight.png',
        title: 'Deep Youtube Analysis walkthrough',
      },
    ],
  },
];

type ProjectCardData = {
  category: string;
  title: string;
  description: string;
  techStack: string[];
  date: string;
};

interface ProjectProps {
  project: ProjectCardData;
}

const ProjectContent = ({ project }: ProjectProps) => {
  const projectDetails =
    PROJECT_DETAILS.find((item) => item.title === project.title) ?? {
      title: project.title,
      previewSrc: '/projects/shad-placeholder.webp',
      overview: project.description,
      highlights: [],
      links: projectLinks(project.title),
      media: [],
    };

  return (
    <div className="space-y-10">
      <div className="rounded-3xl bg-[#F5F5F7] p-8 dark:bg-[#1D1D1F]">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400">
            <span>{project.date}</span>
          </div>

          <div className="space-y-3">
            <p className="text-secondary-foreground font-sans text-base leading-relaxed md:text-lg">
              {project.description}
            </p>
            <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-300 md:text-base">
              {projectDetails.overview}
            </p>
          </div>

          {projectDetails.highlights.length > 0 && (
            <div className="pt-2">
              <h3 className="mb-3 text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Highlights
              </h3>
              <div className="grid gap-3 md:grid-cols-3">
                {projectDetails.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-black/5 bg-white px-4 py-4 text-sm leading-6 text-neutral-700 shadow-sm dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2">
            <h3 className="mb-3 text-sm uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-neutral-200 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {projectDetails.links.length > 0 && (
        <div className="mb-2">
          <div className="mb-4 flex items-center gap-2 px-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Links
            </h3>
            <Link className="text-muted-foreground w-4" />
          </div>
          <Separator className="my-4" />
          <div className="space-y-3">
            {projectDetails.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-xl bg-[#F5F5F7] p-4 transition-colors hover:bg-[#E5E5E7] dark:bg-neutral-800 dark:hover:bg-neutral-700"
              >
                <span className="font-light capitalize">{link.name}</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            ))}
          </div>
        </div>
      )}

      {projectDetails.media.length > 0 && (
        <div className="space-y-4">
          <div className="mb-2 flex items-center gap-2 px-2">
            <h3 className="text-sm tracking-wide text-neutral-500 dark:text-neutral-400">
              Preview
            </h3>
            <PlayCircle className="text-muted-foreground h-4 w-4" />
          </div>
          <div className="grid gap-4">
            {projectDetails.media.map((item) =>
              item.type === 'image' ? (
                <div
                  key={item.src}
                  className="relative aspect-video overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  key={item.src}
                  className="overflow-hidden rounded-2xl bg-neutral-950 ring-1 ring-black/5 dark:ring-white/10"
                >
                  <video
                    className="aspect-video w-full object-cover"
                    controls
                    preload="metadata"
                    poster={item.poster}
                  >
                    <source src={item.src} type="video/mp4" />
                  </video>
                  <div className="border-t border-white/10 px-4 py-3 text-sm text-neutral-200">
                    {item.title}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const projectLinks = (title: string) =>
  projectsData.find((project) => project.title === title)?.links ?? [];

export const data = projectsData.map((project) => {
  const details = PROJECT_DETAILS.find((item) => item.title === project.title);

  return {
    category: project.category,
    title: project.title,
    src: details?.previewSrc ?? '/projects/shad-placeholder.webp',
    content: <ProjectContent project={project} />,
  };
});
