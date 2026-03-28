import { Dropdown } from '@/shared/components/ui/Dropdown';
import type { TodoFilter } from '../../types';

const FILTER_OPTIONS: { value: TodoFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
];

const FilterIcon = (
  <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L13 10.414V15a1 1 0 01-.553.894l-4 2A1 1 0 017 17v-6.586L3.293 6.707A1 1 0 013 6V3z"
      clipRule="evenodd"
    />
  </svg>
);

interface TodoFilterDropdownProps {
  current: TodoFilter;
  onChange: (filter: TodoFilter) => void;
}

export function TodoFilterDropdown({ current, onChange }: TodoFilterDropdownProps) {
  return (
    <Dropdown options={FILTER_OPTIONS} value={current} onChange={onChange} icon={FilterIcon} />
  );
}
