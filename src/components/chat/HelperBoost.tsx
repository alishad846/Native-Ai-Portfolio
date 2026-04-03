import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import {
  BriefcaseBusiness,
  BriefcaseIcon,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  CircleEllipsis,
  CodeIcon,
  GraduationCapIcon,
  Laugh,
  Layers,
  MailIcon,
  PartyPopper,
  Sparkles,
  UserRoundSearch,
  UserSearch,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';

interface HelperBoostProps {
  submitQuery?: (query: string) => void;
  setInput?: (value: string) => void;
}

const questions = {
  Me: 'Who are you? I want to know more about you.',
  Projects: 'What are your projects? What are you working on right now?',
  Skills: 'What are your skills? Give me a list of your soft and hard skills.',
  Fun: "What the craziest thing you've ever done? (mb?) What are your hobbies? ",
  Contact:
    'How can I reach you? What kind of project would make you say "yes" immediately?',
};

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Fun', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
];

// Helper drawer data
const specialQuestions = [
  'Bike you said?? Show me!',
  'Who are you?',
  'Can I see your resume?',
  'What projects are you most proud of?',
  'What are your skills?',
  'How can I reach you?',
  "What's the craziest thing you've ever done?",
];

const questionsByCategory = [
  {
    id: 'me',
    name: 'Me',
    icon: UserSearch,
    questions: [
      'Who are you?',
      'What are your passions?',
      'How did you get started in tech?',
      'Where do you see yourself in 5 years?',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: BriefcaseIcon,
    questions: [
      'Can I see your resume?',
      'What makes you a valuable team member?',
      'Where are you working now?',
      'Why should I hire you?',
      "What's your educational background?",
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: CodeIcon,
    questions: ['What projects are you most proud of?'],
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: GraduationCapIcon,
    questions: [
      'What are your skills?',
    ],
  },
  {
    id: 'fun',
    name: 'Fun',
    icon: PartyPopper,
    questions: [
      'Bike you said?? Show me!',
      "What's the craziest thing you've ever done?",
      'Mac or PC?',
      'what sports do you like?',
      'What are you certain about that 90% get wrong?',
    ],
  },
  {
    id: 'contact',
    name: 'Contact & Future',
    icon: MailIcon,
    questions: [
      'How can I reach you?',
      "What kind of project would make you say 'yes' immediately?",
      'Where are you located?',
    ],
  },
];

// Animated Chevron component
const AnimatedChevron = () => {
  return (
    <motion.div
      animate={{
        y: [0, -4, 0], // Subtle up and down motion
      }}
      transition={{
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      className="text-primary mb-1.5"
    >
      <ChevronUp size={16} />
    </motion.div>
  );
};

const COUNTDOWN_START = 3;
const FUN_POINTS = [
  'Build fun projects that mix creative thinking with new tech stacks.',
  'Prototype AI-native experiences and launch fresh project ideas.',
  'Learn new backend libraries and tackle UI challenges.',
  'Swim, sing, and listen to music to relax between sprints.',
];

export default function HelperBoost({
  submitQuery,
  setInput,
}: HelperBoostProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [countdownLabel, setCountdownLabel] = useState('');
  const [funPreview, setFunPreview] = useState<string[]>([]);
  const countdownTimer = useRef<
    ReturnType<typeof window.setTimeout> | ReturnType<typeof setTimeout> | null
  >(null);

  useEffect(() => {
    return () => {
      if (countdownTimer.current) {
        clearTimeout(countdownTimer.current);
      }
    };
  }, []);

  const startCountdown = (
    questionText: string,
    onComplete: () => void
  ) => {
    if (countdown > 0) return;
    setCountdownLabel(questionText);
    setCountdown(COUNTDOWN_START);
    if (!questionText.toLowerCase().includes('craziest')) {
      setFunPreview([]);
    }

    if (countdownTimer.current) {
      clearTimeout(countdownTimer.current);
      countdownTimer.current = null;
    }

    const tick = (value: number) => {
      if (value <= 0) {
        if (countdownTimer.current) {
          clearTimeout(countdownTimer.current);
          countdownTimer.current = null;
        }
        setCountdown(0);
        setCountdownLabel('');
        onComplete();
        return;
      }

      countdownTimer.current = window.setTimeout(() => {
        setCountdown(value);
        tick(value - 1);
      }, 1000);
    };

    tick(COUNTDOWN_START - 1);
  };

  const handleQuestionClick = (questionKey: string) => {
    const questionText = questions[questionKey as keyof typeof questions];
    if (!submitQuery) return;
    startCountdown(questionText, () => {
      if (questionKey === 'Fun') {
        setFunPreview(FUN_POINTS);
      } else {
        setFunPreview([]);
      }
      submitQuery(questionText);
    });
  };

  const handleDrawerQuestionClick = (question: string) => {
    if (!submitQuery) return;
    startCountdown(question, () => {
      if (question.toLowerCase().includes('craziest')) {
        setFunPreview(FUN_POINTS);
      }
      submitQuery(question);
      setOpen(false);
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const countdownProgress =
    countdown > 0 ? ((COUNTDOWN_START - countdown) / COUNTDOWN_START) * 100 : 0;

  return (
    <>
      <Drawer.Root open={open} onOpenChange={setOpen}>
        <div className="w-full">
          {/* Toggle Button */}
          <div
            className={
              isVisible
                ? 'mb-2 flex justify-center'
                : 'mb-0 flex justify-center'
            }
          >
            <button
              onClick={toggleVisibility}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-500 dark:text-gray-400 transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            >
              {isVisible ? (
                <>
                  <ChevronDown size={14} />
                  Hide quick questions
                </>
              ) : (
                <>
                  <ChevronUp size={14} />
                  Show quick questions
                </>
              )}
            </button>
          </div>

          {/* HelperBoost Content */}
          {countdown > 0 && (
            <div className="mb-4 rounded-2xl border border-dashed border-neutral-200 bg-white/80 px-4 py-3 text-center text-sm text-neutral-800 shadow-sm dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-50">
              <p className="font-semibold text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-300">
                Loading...
              </p>
              <p className="text-base font-semibold">
                Preparing answers ({countdown}s)
              </p>
              <div className="mt-2 h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-fuchsia-500 transition-all"
                  style={{ width: `${countdownProgress}%` }}
                />
              </div>
            </div>
          )}
          {funPreview.length > 0 && countdown === 0 && (
            <div className="mb-4 rounded-2xl border border-neutral-200 bg-gradient-to-r from-purple-50 to-white px-4 py-3 text-sm text-neutral-900 shadow-sm dark:border-neutral-700 dark:bg-purple-900/70 dark:text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-neutral-500 dark:text-neutral-300">
                Fun highlight
              </p>
              <ul className="mt-2 space-y-1 text-base list-inside text-neutral-900 dark:text-neutral-100 break-words">
                {funPreview.map((point) => (
                  <li key={point} className="text-left">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {isVisible && (
            <div className="w-full">
              <div
                className="flex w-full flex-wrap gap-1 md:gap-3"
                style={{ justifyContent: 'safe center' }}
              >
                {questionConfig.map(({ key, color, icon: Icon }) => (
                <Button
                  key={key}
                  onClick={() => handleQuestionClick(key)}
                  variant="outline"
                  className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 h-auto min-w-[100px] flex-shrink-0 cursor-pointer rounded-xl bg-white/80 dark:bg-gray-800/80 px-4 py-3 shadow-none backdrop-blur-sm transition-none active:scale-95"
                >
                  <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                    <Icon size={18} strokeWidth={2} color={color} />
                    <span className="text-sm font-medium">{key}</span>
                  </div>
                </Button>
                ))}

                {/* Need Inspiration Button */}
                <TooltipProvider>
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                      <Drawer.Trigger className="group relative flex flex-shrink-0 items-center justify-center">
                      <motion.div
                        className="hover:bg-gray-100 dark:hover:bg-gray-700 flex h-auto cursor-pointer items-center space-x-1 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 px-4 py-3 text-sm backdrop-blur-sm transition-all duration-200"
                        whileHover={{ scale: 1 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3 text-gray-900 dark:text-gray-100">
                          <CircleEllipsis
                            className="h-[20px] w-[18px] text-primary dark:text-primary-light" // or use suitable text colors here
                            strokeWidth={2}
                          />
                          {/* <span className="text-sm font-medium">More</span> */}
                        </div>
                      </motion.div>
                      </Drawer.Trigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <AnimatedChevron />
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Content */}
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 z-100 bg-black/60 backdrop-blur-xs" />

          <Drawer.Content className="fixed right-0 bottom-0 left-0 z-100 mt-24 flex h-[80%] flex-col rounded-t-[10px] bg-background outline-none lg:h-[60%]">
            <div className="flex-1 overflow-y-auto rounded-t-[10px] bg-card p-4">
              <div className="mx-auto max-w-md space-y-4">
                <div
                  aria-hidden
                  className="mx-auto mb-8 h-1.5 w-12 flex-shrink-0 rounded-full bg-muted"
                />
                <div className="mx-auto w-full max-w-md">
                  <div className="space-y-8 pb-16">
                    {questionsByCategory.map((category) => (
                      <CategorySection
                        key={category.id}
                        name={category.name}
                        Icon={category.icon}
                        questions={category.questions}
                        onQuestionClick={handleDrawerQuestionClick}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

// Component for each category section
interface CategorySectionProps {
  name: string;
  Icon: React.ElementType;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

function CategorySection({
  name,
  Icon,
  questions,
  onQuestionClick,
}: CategorySectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2.5 px-1">
        <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        {/* <Drawer.Title className="text-[22px] font-medium text-gray-900"> */}
        <Drawer.Title className="text-[22px] font-medium text-gray-900 dark:text-gray-100">
          {name}
        </Drawer.Title>
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        {questions.map((question, index) => (
          <QuestionItem
            key={index}
            question={question}
            onClick={() => onQuestionClick(question)}
            isSpecial={specialQuestions.includes(question)}
          />
        ))}
      </div>
    </div>
  );
}

// Component for each question item with animated chevron
interface QuestionItemProps {
  question: string;
  onClick: () => void;
  isSpecial: boolean;
}

function QuestionItem({ question, onClick, isSpecial }: QuestionItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={cn(
        'flex w-full items-center justify-between rounded-[10px]',
        'text-md px-6 py-4 text-left font-normal',
        'transition-colors duration-300',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        isSpecial
          ? 'bg-black text-white hover:bg-gray-800 dark:hover:bg-gray-700' // lighter on hover for dark bg
          : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 hover:bg-gray-200'
      )}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-center">
        {isSpecial && <Sparkles className="mr-2 h-4 w-4 text-white" />}
        <span className={isSpecial ? 'font-medium text-white' : ''}>
          {question}
        </span>
      </div>
      <motion.div
        animate={{ x: isHovered ? 4 : 0 }}
        transition={{
          type: 'spring',
          stiffness: 400,
          damping: 25,
        }}
      >
        <ChevronRight
          className={cn(
            'h-5 w-5 shrink-0',
            isSpecial ? 'text-white' : 'text-primary'
          )}
        />
      </motion.div>
    </motion.button>
  );
}
