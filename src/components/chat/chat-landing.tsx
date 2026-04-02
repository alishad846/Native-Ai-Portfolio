'use client';

import { profile } from '@/data/profile';
import { motion, type Variants } from 'framer-motion';
import { Award, Code, Mail, MessageSquare } from 'lucide-react';
import React from 'react';

interface ChatLandingProps {
  submitQuery: (query: string) => void;
}

const ChatLanding: React.FC<ChatLandingProps> = ({ submitQuery }) => {
  const suggestedQuestions = [
    { icon: <MessageSquare className="h-4 w-4" />, text: 'Who are you?' },
    { icon: <Code className="h-4 w-4" />, text: 'What projects have you worked on?' },
    { icon: <Award className="h-4 w-4" />, text: 'What are your skills?' },
    { icon: <Mail className="h-4 w-4" />, text: 'How can I contact you?' },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="flex w-full flex-col items-center px-4 py-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="mb-8 text-center" variants={itemVariants}>
        <h2 className="mb-3 text-2xl font-semibold">
          I&apos;m {profile.firstName}&apos;s digital twin
        </h2>
        <p className="text-muted-foreground mx-auto max-w-md">
          Ask about my projects, skills, resume, or how I build AI-enabled
          software products.
        </p>
      </motion.div>

      <motion.div className="w-full max-w-md space-y-3" variants={containerVariants}>
        {suggestedQuestions.map((question) => (
          <motion.button
            key={question.text}
            className="bg-accent hover:bg-accent/80 flex w-full items-center rounded-lg px-4 py-3 transition-colors"
            onClick={() => submitQuery(question.text)}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="bg-background mr-3 rounded-full p-2">
              {question.icon}
            </span>
            <span className="text-left">{question.text}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ChatLanding;
