'use client';

import { profile } from '@/data/profile';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import React from 'react';

export function Resume() {
  const resumeDetails = {
    title: `${profile.firstName}'s Resume`,
    description: profile.headline,
    fileType: 'PDF',
    lastUpdated: 'March 2026',
    fileSize: '0.3 MB',
    downloadUrl: profile.resumeUrl,
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = resumeDetails.downloadUrl;
    link.download = resumeDetails.downloadUrl.split('/').pop() || 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mx-auto w-full py-8 font-sans">
      <motion.div
        onClick={handleDownload}
        className="group bg-accent relative cursor-pointer overflow-hidden rounded-xl p-0 transition-all duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.0, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scale: 1.01 }}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-foreground text-lg font-medium">
                {resumeDetails.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {resumeDetails.description}
              </p>
              <div className="text-muted-foreground mt-1 flex text-xs">
                <span>{resumeDetails.fileType}</span>
                <span className="mx-2">•</span>
                <span>Updated {resumeDetails.lastUpdated}</span>
                <span className="mx-2">•</span>
                <span>{resumeDetails.fileSize}</span>
              </div>
            </div>

            <motion.div
              className="group-hover:bg-black/80 flex h-10 w-10 items-center justify-center rounded-full bg-black text-primary-foreground"
              initial={{ scale: 1 }}
            >
              <Download className="h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Resume;
