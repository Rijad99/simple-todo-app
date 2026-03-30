import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '@/shared/hooks/useLocalStorage';
import type { Todo, TodoFilter } from '../types';

const STORAGE_KEY = 'todos';

export function useTodos(filter: TodoFilter) {
  const [todos, setTodos] = useLocalStorage<Todo[]>(STORAGE_KEY, []);

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setTodos((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          text: trimmed,
          completed: false,
          createdAt: Date.now(),
        },
      ]);
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id: string) => {
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
      );
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id: string) => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    },
    [setTodos],
  );

  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const editTodo = useCallback(
    (id: string, newText: string) => {
      const trimmed = newText.trim();
      if (!trimmed) return;
      setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, text: trimmed } : todo)));
    },
    [setTodos],
  );

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter((t) => !t.completed);
      case 'completed':
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);
  const completedCount = useMemo(() => todos.filter((t) => t.completed).length, [todos]);

  return {
    todos: filteredTodos,
    activeCount,
    completedCount,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
  };
}
