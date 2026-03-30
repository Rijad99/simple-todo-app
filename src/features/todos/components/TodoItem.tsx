import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { KeyboardEvent } from 'react';
import type { Todo } from '../types';
import { Checkbox } from '@/shared/components/ui/Checkbox';
import { TodoDeleteButton } from './todo-item-components/TodoDeleteButton';
import { TodoSaveButton } from './todo-item-components/TodoSaveButton';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const itemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!isEditing) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(e.target as Node)) {
        setEditText(todo.text);
        setIsEditing(false);
      }
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [isEditing, todo.text]);

  const handleEdit = () => {
    setEditText(todo.text);
    setIsEditing(true);
  };

  const handleSave = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== todo.text) {
      onEdit(todo.id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') handleCancel();
  };

  return (
    <motion.li
      ref={itemRef}
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border group transition ${
        isEditing
          ? 'bg-white dark:bg-gray-700/50 border-orange-300 dark:border-orange-500/60 shadow-sm'
          : 'bg-white dark:bg-gray-700/50 border-gray-100 dark:border-gray-600 hover:border-orange-200 dark:hover:border-orange-500/40 hover:shadow-sm'
      }`}
    >
      <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)} />

      {isEditing ? (
        <input
          autoFocus
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 text-sm text-gray-700 dark:text-gray-200 bg-transparent animate-text-pulse"
        />
      ) : (
        <span
          onClick={handleEdit}
          className={`flex-1 text-sm cursor-text transition ${
            todo.completed
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-700 dark:text-gray-200'
          }`}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <>
          <TodoSaveButton show={isEditing} onClick={handleSave} />
          <button
            onClick={handleCancel}
            className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition text-xl leading-none flex-shrink-0"
          >
            &times;
          </button>
        </>
      ) : (
        <TodoDeleteButton todoText={todo.text} onDelete={() => onDelete(todo.id)} />
      )}
    </motion.li>
  );
}
