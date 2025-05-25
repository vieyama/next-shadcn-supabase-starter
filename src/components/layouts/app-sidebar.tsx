'use client';

import * as React from 'react';
import { Command, LayoutDashboard, Package, Store, Users2 } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { NavItem } from './nav-item';

const data = {
  dashboard: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard
    }
  ],
  product: [
    {
      title: 'Products',
      url: '/products',
      icon: Package,
      isActive: true,
      items: [
        {
          title: 'Categories',
          url: '/dashboard/categories'
        },
        {
          title: 'Supplier',
          url: '/dashboard/suppliers'
        }
      ]
    },
    {
      title: 'Stores',
      url: '/dashboard/stores',
      icon: Store
    }
  ],
  setting: [
    {
      title: 'Employee',
      url: '/dashboard/employee',
      icon: Users2
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className='top-[--header-height] !h-[calc(100svh-var(--header-height))]'
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>Acme Inc</span>
                  <span className='truncate text-xs'>Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavItem items={data.dashboard} menuName='Dashboard' />
        <NavItem items={data.product} menuName='Produk' />
        <NavItem items={data.setting} menuName='Setting' />
      </SidebarContent>
    </Sidebar>
  );
}
