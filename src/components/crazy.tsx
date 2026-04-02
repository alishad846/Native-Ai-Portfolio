'use client';

import React from 'react';
import { Bot } from 'lucide-react';

const Crazy = () => {
  return (
    <div className="mx-auto w-full text-center">
      <div className="mb-4">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          AI-First Portfolio Thinking
        </h2>
      </div>
      <div className="bg-accent flex items-center justify-center rounded-xl p-6">
        <Bot className="text-primary h-20 w-20" />
      </div>
      <p className="text-muted-foreground mt-4">
        One of the most fun things I&apos;ve built is an AI-native portfolio that
        answers questions about my work like a live product demo instead of a
        static resume page.
      </p>
    </div>
  );
};

export default Crazy;
