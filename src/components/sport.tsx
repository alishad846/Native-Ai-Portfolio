'use client';

import React from 'react';

const Sports = () => {
  return (
    <div className="mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-foreground text-3xl font-semibold md:text-4xl">
          Beyond Tech
        </h2>
        <p className="text-muted-foreground mt-2 text-lg">
          Curiosity, learning, and building with consistency
        </p>
      </div>

      <div className="text-muted-foreground space-y-6 text-base">
        <p>
          Outside engineering, I like keeping a balanced routine and staying
          curious about how things work, whether that is through learning,
          exploring new tools, or understanding real-world systems.
        </p>
        <p>
          I enjoy environments where I can combine discipline with creativity.
          That same mindset shows up in how I approach debugging, product
          thinking, and solving open-ended technical problems.
        </p>
        <p>
          Most of all, I like building useful things, improving fast, and
          turning ideas into something practical and measurable.
        </p>
      </div>
    </div>
  );
};

export default Sports;
