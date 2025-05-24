import { ChartAreaInteractive } from '@/features/dashboard/chart-area-interactive'
import { DataTable } from '@/features/dashboard/data-table'
import { SectionCards } from '@/features/dashboard/section-cards'
import { Metadata } from 'next' 

import data from "@/dummy/data.json"

export const metadata: Metadata = {
  title: 'Next Shadcn Dashboard Starter',
  description: 'Basic dashboard with Next.js and Shadcn',
}

export default function Page() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>
          <DataTable data={data} />
        </div>
      </div>
    </div>
  )
}
