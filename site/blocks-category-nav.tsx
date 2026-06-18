'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

import { blockCategories, DEFAULT_CATEGORY_ID, getCategoryHref } from '@/data'
import { cn } from '@/lib/utils'

export default function BlocksCategoryNav() {
  const pathname = usePathname()

  const activeCategoryId = (() => {
    if (pathname === '/blocks' || pathname === '/blocks/') {
      return DEFAULT_CATEGORY_ID
    }

    const match = pathname.match(/^\/blocks\/([^/]+)/)
    const segment = match?.[1]

    if (!segment) return DEFAULT_CATEGORY_ID

    const isCategory = blockCategories.some(
      (category) => category.id === segment && category.id !== DEFAULT_CATEGORY_ID,
    )

    return isCategory ? segment : DEFAULT_CATEGORY_ID
  })()

  return (
    <nav className="bg-background">
      <div
        className={cn(
          'scrollbar-gutter-stable relative scrollbar-thin flex h-10 min-w-0 items-center gap-1',
          'overflow-x-auto scroll-smooth',
          'scrollbar-thumb-muted-foreground/40',
          'px-2 md:px-4 lg:px-6',
        )}
      >
        {blockCategories.map((category) => {
          const isActive = category.id === activeCategoryId

          return (
            <Link
              key={category.id}
              href={getCategoryHref(category.id)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative flex h-full shrink-0 items-center px-3',
                'font-inter text-sm',
                'text-muted-foreground transition-colors duration-200',
                'hover:text-foreground',
                isActive && 'text-foreground',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="block-category-active-pill"
                  className="absolute inset-x-0 bottom-0 h-px rounded-full bg-muted-foreground"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              <span className="relative z-10">{category.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
