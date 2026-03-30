import { AnimatePresence, motion } from 'framer-motion';

interface TodoSaveButtonProps {
  show: boolean;
  onClick: () => void;
}

export function TodoSaveButton({ show, onClick }: TodoSaveButtonProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={onClick}
          aria-label="Save task"
          className="cursor-pointer text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 transition flex-shrink-0"
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          <motion.svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ opacity: [1, 0.45, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M20 6L9 17l-5-5" />
          </motion.svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
