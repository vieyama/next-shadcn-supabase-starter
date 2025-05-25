import { Metadata } from 'next';

import AppBreadcrumb from '@/components/layouts/app-breadcrumb';
import EmployeeView from '@/features/employee/employee-view';

export const metadata: Metadata = {
  title: 'Employee | Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function Page() {
  const breadcrumb = [
    { label: 'Home', url: '/dashboard' },
    { label: 'Employee' }
  ];
  return (
    <>
      <AppBreadcrumb items={breadcrumb} />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 md:gap-6'>
            <EmployeeView />
          </div>
        </div>
      </div>
    </>
  );
}
