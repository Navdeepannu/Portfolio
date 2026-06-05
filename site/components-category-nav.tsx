'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  componentCategories,
  DEFAULT_COMPONENT_CATEGORY_ID,
  getComponentCategoryHref,
} from '@/data'
import { cn } from '@/lib/utils'

export default function ComponentsCategoryNav() {
  const pathname = usePathname()

  const activeCategoryId = (() => {
    if (pathname === '/components' || pathname === '/components/') {
      return DEFAULT_COMPONENT_CATEGORY_ID
    }
    const match = pathname.match(/^\/components\/([^/]+)/)
    const segment = match?.[1]
    if (!segment) return DEFAULT_COMPONENT_CATEGORY_ID

    const isCategory = componentCategories.some(
      (category) => category.id === segment && category.id !== DEFAULT_COMPONENT_CATEGORY_ID,
    )
    return isCategory ? segment : DEFAULT_COMPONENT_CATEGORY_ID
  })()

  return (
    <nav className="bg-muted/60 dark:border-white/10">
      <div className="scrollbar-gutter-stable relative scrollbar-thin flex h-10 min-w-0 items-center gap-1 overflow-x-auto scroll-smooth mask-x-from-98% px-4 scrollbar-thumb-muted-foreground/50">
        {componentCategories.map((category) => {
          const isActive = category.id === activeCategoryId
          return (
            <Button
              key={category.id}
              asChild
              variant={isActive ? 'outline' : 'ghost'}
              size="sm"
              className={cn(
                'dark:hover-text-white shrink-0 font-geist text-xs font-normal text-zinc-900/90 hover:text-foreground dark:text-muted-foreground dark:hover:bg-muted',
                isActive &&
                  'pointer-events-auto font-geist text-xs text-foreground shadow-inner dark:text-white',
              )}
            >
              <Link
                href={getComponentCategoryHref(category.id)}
                aria-current={isActive ? 'page' : undefined}
              >
                {category.name}
              </Link>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
