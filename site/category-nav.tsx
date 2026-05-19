'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { blockCategories, DEFAULT_CATEGORY_ID, getCategoryHref } from '@/data'
import { cn } from '@/lib/utils'

export default function CategoryNav() {
  const pathname = usePathname()

  const activeCategoryId = (() => {
    if (pathname === '/blocks' || pathname === '/blocks/') return DEFAULT_CATEGORY_ID
    const match = pathname.match(/^\/blocks\/([^/]+)/)
    return match?.[1]
  })()

  return (
    <nav className="sticky top-0 z-100 bg-zinc-50 dark:border-white/10">
      <div className="relative flex h-10 min-w-0 items-center gap-1 overflow-x-auto px-4">
        {blockCategories.map((category) => {
          const isActive = category.id === activeCategoryId
          return (
            <Button
              key={category.id}
              asChild
              variant={isActive ? 'outline' : 'ghost'}
              size="sm"
              className={cn(
                'shrink-0 font-geist text-xs font-normal text-zinc-900/90 hover:text-foreground',
                isActive && 'pointer-events-auto font-geist text-xs text-foreground shadow-inner',
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

      <ProgressiveBlur
        className="pointer-events-none absolute top-0 left-0 h-full w-8"
        direction="left"
        blurIntensity={1}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute top-0 right-0 h-full w-8"
        direction="right"
        blurIntensity={1}
      />
    </nav>
  )
}
