import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Employee } from '@/dummy/employee';
import { Column, DataTable } from '@/components/data-table';

interface EmployeeDataTableProps {
  data: Employee[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (column: string) => void;
}

export const EmployeeDataTable = ({
  data,
  sortBy,
  sortOrder,
  onSort
}: EmployeeDataTableProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string | number) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
      'bg-orange-500',
      'bg-cyan-500'
    ];
    const index = name
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const columns: Column<Employee>[] = [
    {
      key: 'name',
      label: 'Employee',
      render: (value, employee) => (
        <div className='flex items-center space-x-3'>
          <Avatar className='h-10 w-10'>
            <AvatarFallback
              className={`${getAvatarColor(employee.name)} font-semibold text-white`}
            >
              {employee.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className='font-medium text-slate-900'>{employee.name}</div>
            <div className='text-sm text-slate-500'>{employee.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      render: (value) => (
        <div className='font-medium text-slate-900'>{value}</div>
      )
    },
    {
      key: 'department',
      label: 'Department',
      render: (value) => (
        <Badge
          variant='secondary'
          className='bg-blue-50 text-blue-700 hover:bg-blue-100'
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <Badge
          variant={value === 'Active' ? 'default' : 'secondary'}
          className={
            value === 'Active'
              ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
              : 'border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100'
          }
        >
          {value}
        </Badge>
      )
    },
    {
      key: 'salary',
      label: 'Salary',
      render: (value) => (
        <div className='font-medium text-slate-900'>
          {formatCurrency(typeof value === 'number' ? value : Number(value))}
        </div>
      )
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      render: (value) => (
        <div className='text-slate-600'>{formatDate(value)}</div>
      )
    }
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      sortBy={sortBy}
      sortOrder={sortOrder}
      onSort={onSort}
      emptyMessage='No employees found'
      emptyDescription='Try adjusting your search criteria'
    />
  );
};
