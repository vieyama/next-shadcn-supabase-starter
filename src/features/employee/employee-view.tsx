'use client';

import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Employee, generateDummyData } from '@/dummy/employee';
import { useSearchParams, useRouter } from 'next/navigation';
import { TableFilters } from '@/components/filter-table';
import { TablePagination } from '@/components/pagination-table';
import { EmployeeDataTable } from './employee-data-table';

const EmployeeView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data] = useState<Employee[]>(generateDummyData(150));

  // Get current state from URL params
  const currentPage = parseInt(searchParams.get('page') || '1');
  const itemsPerPage = parseInt(searchParams.get('limit') || '10');
  const sortBy = searchParams.get('sortBy') || 'name';
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'asc';
  const searchQuery = searchParams.get('search') || '';
  const departmentFilter = searchParams.get('department') || '';
  const statusFilter = searchParams.get('status') || '';

  // Update URL params
  const updateParams = (updates: Record<string, string | number>) => {
    const current = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        current.delete(key);
      } else {
        current.set(key, value.toString());
      }
    });

    router.push(`?${current.toString()}`, { scroll: false });
  };

  const filteredAndSortedData = useMemo(() => {
    const filtered = data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment =
        !departmentFilter || item.department === departmentFilter;
      const matchesStatus = !statusFilter || item.status === statusFilter;

      return matchesSearch && matchesDepartment && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof Employee];
      let bValue = b[sortBy as keyof Employee];

      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchQuery, departmentFilter, statusFilter, sortBy, sortOrder]);

  // Paginated data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      updateParams({ page: 1 });
    }
  }, [filteredAndSortedData.length, itemsPerPage]);

  const handleSort = (column: string) => {
    const newSortOrder =
      sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    updateParams({ sortBy: column, sortOrder: newSortOrder, page: 1 });
  };

  const handleFilter = (filters: {
    search: string;
    department: string;
    status: string;
  }) => {
    updateParams({ ...filters, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateParams({ page });
  };

  const handleItemsPerPageChange = (limit: number) => {
    updateParams({ limit, page: 1 });
  };

  return (
    <div className='min-h-screen p-4'>
      <div className='container mx-auto max-w-7xl'>
        {/* Main Table Card */}
        <Card className='border-0 bg-white/80 shadow-xl backdrop-blur'>
          <CardHeader className='border-b border-slate-200/60'>
            <CardTitle className='text-xl font-semibold text-slate-800'>
              Employee Data
            </CardTitle>
            <CardDescription className='text-slate-600'>
              Search, filter, and sort through employee records
            </CardDescription>
          </CardHeader>
          <CardContent className='p-0'>
            {/* Filters */}
            <div className='border-b border-slate-200/60 p-6'>
              <TableFilters
                searchQuery={searchQuery}
                departmentFilter={departmentFilter}
                statusFilter={statusFilter}
                onFilterChange={handleFilter}
              />
            </div>

            {/* Data Table */}
            <div className='overflow-hidden'>
              <EmployeeDataTable
                data={paginatedData}
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSort={handleSort}
              />
            </div>

            {/* Pagination */}
            <div className='border-t border-slate-200/60 p-6'>
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={filteredAndSortedData.length}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeView;
