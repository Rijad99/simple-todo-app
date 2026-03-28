import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '@/shared/hooks/useTypingEffect';

const MESSAGES = [
  'Make it happen.',
  'Own your day.',
  'One step at a time.',
  'Focus & get it done.',
  'Today is the day.',
  'Small wins matter.',
  "Let's get to work.",
  "You've got this.",
  'Make today count.',
  'Progress over perfection.',
];

function pickRandom(): string {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

function MoonIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export function Header({ theme, toggleTheme }: HeaderProps) {
  const [message] = useState(pickRandom);
  const { displayed, isDone } = useTypingEffect(message, 55);

  useEffect(() => {
    document.title = message;
  }, [message]);

  return (
    <motion.header
      className="relative text-center mb-6 sm:mb-8 min-h-12 sm:min-h-14"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <button
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        className="absolute right-0 top-1 cursor-pointer text-gray-400 hover:text-orange-400 dark:text-gray-500 dark:hover:text-orange-400 transition"
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
      <h1 className="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-orange-500 to-amber-400 bg-clip-text text-transparent tracking-wide">
        {displayed}
        {!isDone && (
          <span className="inline-block w-0.5 h-7 bg-orange-400 ml-0.5 -mb-1 animate-blink" />
        )}
      </h1>
    </motion.header>
  );
}
