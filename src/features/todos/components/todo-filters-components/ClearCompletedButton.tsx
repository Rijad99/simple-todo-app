import { useState } from 'react';
import { Dialog } from '@/shared/components/ui/Dialog';

interface ClearCompletedButtonProps {
  completedCount: number;
  onClearCompleted: () => void;
}

export function ClearCompletedButton({
  completedCount,
  onClearCompleted,
}: ClearCompletedButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowDialog(true)}
        className="cursor-pointer text-gray-400 dark:text-gray-500 hover:text-red-400 dark:hover:text-red-400 transition"
      >
        Clear completed
      </button>

      <Dialog
        isOpen={showDialog}
        title="Clear completed tasks?"
        description={`${completedCount} completed task${completedCount !== 1 ? 's' : ''} will be permanently removed.`}
        confirmLabel="Clear"
        cancelLabel="Cancel"
        onConfirm={() => {
          onClearCompleted();
          setShowDialog(false);
        }}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
}
