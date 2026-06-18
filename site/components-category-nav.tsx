'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'

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
    <nav className="bg-background">
      <div className="scrollbar-gutter-stable relative scrollbar-thin flex h-10 min-w-0 items-center gap-1 overflow-x-auto scroll-smooth border-t border-border px-2 scrollbar-thumb-muted-foreground/40 md:px-4 lg:px-6">
        {componentCategories.map((category) => {
          const isActive = category.id === activeCategoryId

          return (
            <Link
              key={category.id}
              href={getComponentCategoryHref(category.id)}
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
                  layoutId="component-category-active-pill"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-[1.5px] rounded-full bg-muted-foreground',
                  )}
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
