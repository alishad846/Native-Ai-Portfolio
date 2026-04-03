"use client";
import { Card, Carousel } from "@/components/projects/apple-cards-carousel";
import { data } from "@/components/projects/Data";
import { projectsData } from "@/data/profile";
import { useEffect, useMemo, useState } from "react";

const COUNTDOWN_START = 5;

export default function AllProjects() {
  const [countdown, setCountdown] = useState(COUNTDOWN_START);
  const [showProjects, setShowProjects] = useState(false);

  useEffect(() => {
    if (showProjects) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setShowProjects(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showProjects]);

  const cards = useMemo(
    () =>
      data.map((card, index) => (
        <Card key={card.title} card={card} index={index} layout={true} />
      )),
    []
  );

  const countdownMessage = useMemo(() => {
    if (countdown <= 1) {
      return "Letting the projects warm up...";
    }
    return `Preparing the showcase (${countdown}s)`;
  }, [countdown]);

  return (
    <div className="w-full h-full pt-8">
      <div className="mx-auto w-full max-w-7xl space-y-8">
        <div className="space-y-3">
          <h2 className="text-xl md:text-3xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
            My Projects
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            I build AI products across analytics, automation, and predictive modeling.
            Explore the shortlist below and then dive into each project card for media,
            technical highlights, and links.
          </p>
        </div>

        {!showProjects ? (
          <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-neutral-300 px-6 py-12 text-center shadow-lg shadow-neutral-200/40 dark:border-neutral-700 dark:text-neutral-200">
            <p className="text-sm uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
              Loading Experience
            </p>
            <p className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
              {countdownMessage}
            </p>
            <div className="h-2 w-full max-w-md overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-fuchsia-500 transition-all duration-1000 ease-out"
                style={{
                  width: `${((COUNTDOWN_START - countdown) / COUNTDOWN_START) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <>
            <Carousel items={cards} />
            <div className="mt-8 space-y-4 rounded-3xl border border-neutral-200 bg-white/80 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/60">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-400">
                Project summary
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                My recent work spans ML-powered analytics, NLP automations, predictive modeling, and dashboard tooling—highlighted by DataInsights.ai, Resume Data Extraction, Customer Churn Prediction, and Deep Youtube Analysis. Each project combines backend automation, thoughtful analytics, and scalable architecture to make data-driven ideas feel production-ready.
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">
                Right now I’m refining DataInsights.ai with tighter LLM workflows and backend integration while exploring ways to make NLP automation and insights tooling more accessible to small teams. If any of these areas resonate, I’m always open to collaboration.
              </p>
              <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.35em] text-neutral-500 dark:text-neutral-300">
                {projectsData.map((project) => (
                  <span
                    key={`${project.title}-chip`}
                    className="rounded-full border border-neutral-200 px-3 py-1 dark:border-neutral-600"
                  >
                    {project.title}
                  </span>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
