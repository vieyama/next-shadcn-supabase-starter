import { ChartAreaInteractive } from '@/features/dashboard/chart-area-interactive';
import { DataTable } from '@/features/dashboard/data-table';
import { SectionCards } from '@/features/dashboard/section-cards';
import { Metadata } from 'next';

import data from '@/dummy/data.json';
import AppBreadcrumb from '@/components/layouts/app-breadcrumb';

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn'
};

export default function Page() {
  const breadcrumb = [{ label: 'Home', url: '/dashboard' }];
  return (
    <>
      <AppBreadcrumb items={breadcrumb} />
      <div className='flex flex-1 flex-col'>
        <div className='@container/main flex flex-1 flex-col gap-2'>
          <div className='flex flex-col gap-4 py-4 md:gap-6 md:py-6'>
            <SectionCards />
            <div className='px-4 lg:px-6'>
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
