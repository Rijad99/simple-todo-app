import { useState } from 'react';
import { Dialog } from '@/shared/components/ui/Dialog';

interface TodoDeleteButtonProps {
  todoText: string;
  onDelete: () => void;
}

export function TodoDeleteButton({ todoText, onDelete }: TodoDeleteButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        aria-label={`Delete "${todoText}"`}
        className="cursor-pointer text-gray-300 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 transition text-xl leading-none sm:opacity-0 sm:group-hover:opacity-100"
      >
        &times;
      </button>

      <Dialog
        isOpen={showDialog}
        title="Delete task?"
        description={`"${todoText}" will be permanently removed.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          onDelete();
          setShowDialog(false);
        }}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
}
