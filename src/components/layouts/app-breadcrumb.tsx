import React from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';

type AppBreadcrumbProps = { items: { label: string; url?: string }[] };

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({ items }) => {
  return (
    <div className='bg-primary-foreground sticky top-16 z-50 w-full px-4 py-4 lg:px-6'>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {item.url ? (
                  <BreadcrumbLink>
                    <Link href={item.url}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbItem>
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                )}
              </BreadcrumbItem>
              {index !== items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default AppBreadcrumb;
