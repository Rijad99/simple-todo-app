import { motion, AnimatePresence } from 'framer-motion';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <label className="cursor-pointer flex-shrink-0 inline-flex items-center">
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
      <motion.div
        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
          checked
            ? 'bg-gradient-to-br from-orange-500 to-amber-400 border-orange-500'
            : 'bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 hover:border-orange-400 dark:hover:border-orange-400'
        }`}
        animate={checked ? { scale: [1, 0.82, 1] } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <AnimatePresence>
          {checked && (
            <motion.svg
              viewBox="0 0 10 8"
              className="w-3 h-3"
              fill="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <motion.path
                d="M1 4L3.5 6.5L9 1"
                stroke="white"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                exit={{ pathLength: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.div>
    </label>
  );
}
