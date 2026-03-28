import type { TodoFilter } from '../types';
import { TodoFilterDropdown } from './todo-filters-components/TodoFilterDropdown';
import { TodoItemCount } from './todo-filters-components/TodoItemCount';
import { ClearCompletedButton } from './todo-filters-components/ClearCompletedButton';

interface TodoFiltersProps {
  current: TodoFilter;
  activeCount: number;
  completedCount: number;
  onFilterChange: (filter: TodoFilter) => void;
  onClearCompleted: () => void;
}

export function TodoFilters({
  current,
  activeCount,
  completedCount,
  onFilterChange,
  onClearCompleted,
}: TodoFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-2 text-xs">
      <TodoFilterDropdown current={current} onChange={onFilterChange} />

      <div className="flex items-center gap-3">
        <TodoItemCount count={activeCount} />

        {completedCount > 0 && (
          <ClearCompletedButton
            completedCount={completedCount}
            onClearCompleted={onClearCompleted}
          />
        )}
      </div>
    </div>
  );
}
