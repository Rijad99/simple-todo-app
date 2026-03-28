import { motion } from 'framer-motion';
import type { Todo } from '../types';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { TodoDeleteButton } from './todo-item-components/TodoDeleteButton';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-600 group hover:border-orange-200 dark:hover:border-orange-500/40 transition"
    >
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <span
        className={`flex-1 text-sm transition ${
          todo.completed
            ? 'line-through text-gray-400 dark:text-gray-500'
            : 'text-gray-700 dark:text-gray-200'
        }`}
      >
        {todo.text}
      </span>
      <TodoDeleteButton todoText={todo.text} onDelete={() => onDelete(todo.id)} />
    </motion.li>
  );
}
