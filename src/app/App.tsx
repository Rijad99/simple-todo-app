import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/shared/components/layout/Header';
import { TodoForm, TodoList, TodoFilters, useTodos } from '@/features/todos';
import type { TodoFilter } from '@/features/todos';
import { useTheme } from '@/shared/hooks/useTheme';

export default function App() {
  const [filter, setFilter] = useState<TodoFilter>('all');
  const { theme, toggleTheme } = useTheme();
  const {
    todos,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  } = useTodos(filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8 px-4 sm:py-16">
      <div className="w-full max-w-md mx-auto">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-orange-100 dark:border-gray-700 p-4 sm:p-6 flex flex-col gap-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
        >
          <TodoForm onAdd={addTodo} />
          {(activeCount > 0 || completedCount > 0) && (
            <TodoFilters
              current={filter}
              activeCount={activeCount}
              completedCount={completedCount}
              onFilterChange={setFilter}
              onClearCompleted={clearCompleted}
            />
          )}
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
        </motion.div>
      </div>
    </div>
  );
}
