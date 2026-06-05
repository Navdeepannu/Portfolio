'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { blockCategories, DEFAULT_CATEGORY_ID, getCategoryHref } from '@/data'
import { cn } from '@/lib/utils'

export default function BlocksCategoryNav() {
  const pathname = usePathname()

  const activeCategoryId = (() => {
    if (pathname === '/blocks' || pathname === '/blocks/') return DEFAULT_CATEGORY_ID
    const match = pathname.match(/^\/blocks\/([^/]+)/)
    return match?.[1]
  })()

  return (
    <nav className="bg-muted/60 dark:border-white/10">
      <div className="scrollbar-gutter-stable relative scrollbar-thin flex h-10 min-w-0 items-center gap-1 overflow-x-auto scroll-smooth mask-x-from-98% px-4 scrollbar-thumb-muted-foreground/50">
        {blockCategories.map((category) => {
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
                href={getCategoryHref(category.id)}
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
