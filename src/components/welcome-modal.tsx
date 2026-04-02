'use client';

import { profile } from '@/data/profile';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface WelcomeModalProps {
  trigger?: React.ReactNode;
}

export default function WelcomeModal({ trigger }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  const defaultTrigger = (
    <Button
      variant="ghost"
      className="h-auto w-auto cursor-pointer rounded-2xl bg-white/30 p-3 shadow-lg backdrop-blur-lg hover:bg-white/60 focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() => setIsOpen(true)}
    >
      <Image src="/landing-memojisss.png" width={100} height={100} alt="Logo" className="w-6 md:w-8" />
      <span className="sr-only">About {profile.firstName}</span>
    </Button>
  );

  const handleContactMe = () => {
    setIsOpen(false);
    window.location.href = '/chat?query=How%20can%20I%20contact%20you%3F';
  };

  return (
    <>
      {trigger ? <div onClick={() => setIsOpen(true)}>{trigger}</div> : defaultTrigger}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-background z-52 max-h-[85vh] overflow-auto rounded-2xl border-none p-4 py-6 shadow-xl sm:max-w-[85vw] md:max-w-[80vw] lg:max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex h-full flex-col"
          >
            <DialogHeader className="relative flex flex-row items-start justify-between px-8 pb-6 pt-8">
              <div>
                <DialogTitle className="flex items-center gap-2 text-4xl font-bold tracking-tight">
                  Welcome to {profile.fullName}&apos;s AI Portfolio
                </DialogTitle>
                <DialogDescription className="mt-2 text-base" />
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="sticky top-0 right-0 cursor-pointer rounded-full bg-black p-2 text-white hover:bg-black/90 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
              </Button>
            </DialogHeader>

            <div className="space-y-6 overflow-y-auto px-2 py-4 md:px-8">
              <section className="bg-accent w-full space-y-8 rounded-2xl p-8">
                <div className="space-y-3">
                  <h3 className="text-primary flex items-center gap-2 text-xl font-semibold">
                    What is this?
                  </h3>
                  <p className="text-accent-foreground text-base leading-relaxed">
                    This is my AI-native portfolio experience. Whether you&apos;re a
                    recruiter, collaborator, or just curious, you can ask direct
                    questions about my background, projects, skills, and resume.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-primary flex items-center gap-2 text-xl font-semibold">
                    Why this format?
                  </h3>
                  <p className="text-accent-foreground text-base leading-relaxed">
                    A normal portfolio shows the same static content to everyone.
                    This one is built to answer what you actually want to know
                    about my work in AI, software engineering, analytics, and
                    product thinking.
                  </p>
                </div>
              </section>
            </div>

            <div className="flex flex-col items-center px-8 pb-0 pt-4 md:pb-8">
              <Button
                onClick={() => setIsOpen(false)}
                className="h-auto rounded-full px-4 py-3"
                size="sm"
              >
                Start Chatting
              </Button>
              <div className="mt-6 flex flex-wrap gap-1 text-center text-sm">
                <p className="text-muted-foreground">
                  Feedback and collaboration opportunities are always welcome.
                </p>
                <div
                  className="flex cursor-pointer items-center text-blue-500 hover:underline"
                  onClick={handleContactMe}
                >
                  Contact me.
                </div>
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
    </>
  );
}
