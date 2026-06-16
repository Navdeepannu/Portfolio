'use client'

import Link from 'next/link'

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

import { getComponentHref } from '@/data/component-helpers'
import { cn } from '@/lib/utils'

export type ComponentSidebarItem = {
  slug: string
  title: string
}

export default function ComponentDocSidebar({
  items,
  activeSlug,
}: {
  items: ComponentSidebarItem[]
  activeSlug: string
}) {
  return (
    <Sidebar
      aria-label="Components"
      variant="floating"
      side="left"
      className={cn(
        'sticky top-20 h-fit w-60 max-w-60 shrink-0',
        'rounded-xl p-1.5 shadow-sm ring-1 ring-foreground/5.5 selection:bg-emerald-200/60',
      )}
    >
      <SidebarContent className="p-0">
        <SidebarGroupContent>
          <SidebarMenu className="gap-0">
            {items.map((item) => {
              const isActive = item.slug === activeSlug

              return (
                <SidebarMenuItem key={item.slug}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={cn(
                      'group/link w-full justify-start rounded-lg px-2.5',
                      'overflow-hidden',

                      // Force shadcn sidebar button background to stay transparent
                      'bg-transparent!',
                      'hover:bg-transparent!',
                      'focus-visible:bg-transparent!',
                      'active!bg-transparent!',
                      'data-[active=true]:bg-transparent!',

                      // Remove focus visuals from the button itself
                      'shadow-none',
                      'focus-visible:ring-0',
                      'focus-visible:ring-offset-0',

                      // Text state only
                      'text-muted-foreground',
                      'hover:text-foreground',
                      'data-[active=true]:text-emerald-600',

                      // Fast color response
                      'transition-colors duration-100 ease-out',
                    )}
                  >
                    <Link
                      href={getComponentHref(item.slug)}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'flex h-full w-full items-center overflow-hidden',

                        // Keep the actual link clean too
                        'bg-transparent!',
                        'hover:bg-transparent!',
                        'focus-visible:bg-transparent!',
                        'active:bg-transparent!',
                        'outline-none',
                      )}
                    >
                      {/* Left rail */}
                      <span className="mr-4 flex w-6 shrink-0 flex-col items-start gap-1">
                        {/* Main animated line */}
                        <span
                          aria-hidden="true"
                          className={cn(
                            'h-px w-3 rounded-full bg-muted-foreground/50',

                            // Smoother line animation
                            'transition-all',
                            'duration-250',
                            'ease-[cubic-bezier(0.22,1,0.36,1)]',

                            // Hover state
                            'group-hover/link:w-6',
                            'group-hover/link:bg-foreground',

                            // Active state
                            'group-data-[active=true]/link:w-6',
                            'group-data-[active=true]/link:bg-foreground',
                          )}
                        />

                        {/* Inactive rail lines */}
                        <span
                          aria-hidden="true"
                          className="h-px w-3 rounded-full bg-muted-foreground/50"
                        />

                        <span
                          aria-hidden="true"
                          className="h-px w-3 rounded-full bg-muted-foreground/50"
                        />
                      </span>

                      {/* Title */}
                      <span
                        className={cn(
                          'min-w-0 truncate text-sm whitespace-nowrap',

                          // Smoother text slide
                          'transition-all',
                          'duration-200',
                          'ease-[cubic-bezier(0.22,1,0.36,1)]',
                          'will-change-transform',

                          // Hover state
                          'group-hover/link:translate-x-1',
                          'group-hover/link:text-foreground',

                          // Active state
                          'group-data-[active=true]/link:translate-x-1',
                          'group-data-[active=true]/link:text-foreground',
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  )
}
