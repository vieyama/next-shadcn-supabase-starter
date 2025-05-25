import { Button } from '@/components/ui/button';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

export interface Column<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
  emptyMessage?: string;
  emptyDescription?: string;
}

export const DataTable = <T,>({
  data,
  columns,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = 'No data found',
  emptyDescription = 'Try adjusting your search criteria'
}: DataTableProps<T>) => {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return <ArrowUpDown className='h-4 w-4' />;
    return sortOrder === 'asc' ? (
      <ArrowUp className='h-4 w-4' />
    ) : (
      <ArrowDown className='h-4 w-4' />
    );
  };

  if (data.length === 0) {
    return (
      <div className='py-12 text-center'>
        <div className='mb-2 text-lg text-slate-400'>{emptyMessage}</div>
        <div className='text-slate-500'>{emptyDescription}</div>
      </div>
    );
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full'>
        <thead>
          <tr className='border-b border-slate-200'>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className='p-4 text-left font-semibold text-slate-700'
              >
                {column.sortable !== false ? (
                  <Button
                    variant='ghost'
                    onClick={() => onSort(String(column.key))}
                    className='h-auto p-0 font-semibold hover:bg-transparent'
                  >
                    {column.label} {getSortIcon(String(column.key))}
                  </Button>
                ) : (
                  <span>{column.label}</span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className='border-b border-slate-100 transition-colors duration-200 hover:bg-slate-50/50'
            >
              {columns.map((column) => (
                <td key={String(column.key)} className='p-4'>
                  {column.render
                    ? column.render(item[column.key], item)
                    : String(item[column.key] || '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
