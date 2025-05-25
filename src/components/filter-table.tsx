import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';

interface TableFiltersProps {
  searchQuery: string;
  departmentFilter: string;
  statusFilter: string;
  onFilterChange: (filters: {
    search: string;
    department: string;
    status: string;
  }) => void;
}

export const TableFilters = ({
  searchQuery,
  departmentFilter,
  statusFilter,
  onFilterChange
}: TableFiltersProps) => {
  const departments = [
    'Engineering',
    'Product',
    'Design',
    'Marketing',
    'Sales',
    'Customer Success',
    'Human Resources',
    'Finance',
    'Operations',
    'Data & Analytics'
  ];

  const statuses = ['Active', 'Inactive'];

  const handleSearchChange = (value: string) => {
    onFilterChange({
      search: value,
      department: departmentFilter,
      status: statusFilter
    });
  };

  const handleDepartmentChange = (value: string) => {
    onFilterChange({
      search: searchQuery,
      department: value === 'all' ? '' : value,
      status: statusFilter
    });
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      search: searchQuery,
      department: departmentFilter,
      status: value === 'all' ? '' : value
    });
  };

  const clearFilters = () => {
    onFilterChange({
      search: '',
      department: '',
      status: ''
    });
  };

  const hasActiveFilters = searchQuery || departmentFilter || statusFilter;

  return (
    <div className='space-y-4'>
      <div className='flex flex-col items-center gap-4 lg:flex-row'>
        {/* Search Input */}
        <div className='relative flex w-full items-center'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
          <Input
            placeholder='Search employees by name, email, or role...'
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className='pl-10'
          />
        </div>

        {/* Department Filter */}
        <div className='w-full lg:w-auto'>
          <Select
            value={departmentFilter || 'all'}
            onValueChange={handleDepartmentChange}
          >
            <SelectTrigger className='w-full lg:w-auto'>
              <div className='flex items-center gap-2'>
                <Filter className='h-4 w-4 text-slate-400' />
                <SelectValue placeholder='Department' />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Filter */}
        <div className='w-full lg:w-auto'>
          <Select
            value={statusFilter || 'all'}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className='w-full border-slate-200 focus:border-blue-400 focus:ring-blue-400 lg:w-auto'>
              <SelectValue placeholder='Status' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Status</SelectItem>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <Button variant='outline' onClick={clearFilters}>
            <X className='h-4 w-4' />
            Clear
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className='flex flex-wrap gap-2'>
          {searchQuery && (
            <div className='inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700'>
              <Search className='h-3 w-3' />
              Search: "{searchQuery}"
              <button
                onClick={() => handleSearchChange('')}
                className='ml-1 rounded-full p-0.5 hover:bg-blue-100'
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          )}
          {departmentFilter && (
            <div className='inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm text-green-700'>
              <Filter className='h-3 w-3' />
              Department: {departmentFilter}
              <button
                onClick={() => handleDepartmentChange('all')}
                className='ml-1 rounded-full p-0.5 hover:bg-green-100'
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          )}
          {statusFilter && (
            <div className='inline-flex items-center gap-1 rounded-full bg-purple-50 px-3 py-1 text-sm text-purple-700'>
              Status: {statusFilter}
              <button
                onClick={() => handleStatusChange('all')}
                className='ml-1 rounded-full p-0.5 hover:bg-purple-100'
              >
                <X className='h-3 w-3' />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
