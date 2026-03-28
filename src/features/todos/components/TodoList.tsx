import { AnimatePresence } from 'framer-motion';
import type { Todo } from '../types';
import { TodoItem } from './TodoItem';
import { TodoEmptyState } from './todo-list-components/TodoEmptyState';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return <TodoEmptyState />;
  }

  return (
    <ul className="flex flex-col gap-2 max-h-[500px] overflow-y-auto pr-1 todo-list-scroll">
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggle} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
