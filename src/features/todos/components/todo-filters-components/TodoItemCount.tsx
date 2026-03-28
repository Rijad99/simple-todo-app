interface TodoItemCountProps {
  count: number;
}

export function TodoItemCount({ count }: TodoItemCountProps) {
  return (
    <span className="text-gray-400 dark:text-gray-500">
      {count} item{count !== 1 ? 's' : ''} left
    </span>
  );
}
