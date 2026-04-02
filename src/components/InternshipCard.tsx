'use client';

import { profile } from '@/data/profile';
import { motion } from 'framer-motion';
import { CalendarDays, Code2, Globe } from 'lucide-react';

const InternshipCard = () => {
  const openMail = () => {
    window.open(`mailto:${profile.email}`, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-accent mx-auto mt-8 w-full max-w-4xl rounded-3xl px-6 py-8 font-sans sm:px-10 md:px-16 md:py-12"
    >
      <div className="mb-6 flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-muted h-16 w-16 overflow-hidden rounded-full shadow-md">
            <img
              src="/landing-memojisss.png"
              alt={`${profile.fullName}'s avatar`}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="text-foreground text-2xl font-semibold">
              {profile.fullName}
            </h2>
            <p className="text-muted-foreground text-sm">Open to internships</p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 sm:mt-0">
          <span className="flex items-center gap-1 rounded-full border border-green-500 px-3 py-0.5 text-sm font-medium text-green-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-start gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-blue-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Duration</p>
            <p className="text-muted-foreground text-sm">
              Open to immediate internship and trainee opportunities
            </p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Globe className="mt-1 h-5 w-5 text-green-500" />
          <div>
            <p className="text-foreground text-sm font-medium">Location</p>
            <p className="text-muted-foreground text-sm">{profile.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 sm:col-span-2">
          <Code2 className="mt-1 h-5 w-5 text-purple-500" />
          <div className="w-full">
            <p className="text-foreground text-sm font-medium">Tech stack</p>
            <div className="text-muted-foreground grid grid-cols-1 gap-y-1 text-sm sm:grid-cols-2">
              <ul className="list-disc pl-4">
                <li>Python, SQL, C++, Java</li>
                <li>REST APIs, Backend Development</li>
                <li>Machine Learning, NLP, LLMs</li>
                <li>TensorFlow, scikit-learn, SpaCy</li>
              </ul>
              <ul className="list-disc pl-4">
                <li>Streamlit, OpenCV, Pandas, NumPy</li>
                <li>MySQL, PostgreSQL, MongoDB</li>
                <li>Git, GitHub, Azure DevOps, Linux</li>
                <li>Analytics, testing, workflow optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <p className="text-foreground mb-2 text-lg font-semibold">
          What I bring
        </p>
        <p className="text-foreground text-sm">
          Hands-on experience across ML pipelines, NLP automation, backend logic,
          KPI reporting, and AI-enabled product workflows. I enjoy shipping
          practical systems that solve real business problems.
        </p>
      </div>

      <div className="mt-8">
        <p className="text-foreground mb-2 text-lg font-semibold">Goal</p>
        <p className="text-foreground text-sm">
          Join a strong engineering team where I can grow quickly, contribute to
          AI and software products, and work on systems that create measurable
          value for users and businesses.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        <button
          onClick={openMail}
          className="cursor-pointer rounded-full bg-black px-6 py-3 font-semibold text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          Contact me
        </button>
      </div>
    </motion.div>
  );
};

export default InternshipCard;
