'use client'

import { motion } from 'motion/react'

import type { ComponentCategory, ComponentCategoryId } from '@/data/component-types'
import { cn } from '@/lib/utils'
import { FilterIcon } from 'lucide-react'

export default function ComponentsCategoryNav({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: {
  categories: ComponentCategory[]
  selectedCategoryId: ComponentCategoryId
  onCategoryChange: (categoryId: ComponentCategoryId) => void
}) {
  return (
    <nav className="bg-background">
      <div className="scrollbar-gutter-stable relative scrollbar-thin flex h-10 min-w-0 items-center gap-1 overflow-x-auto scroll-smooth px-2 scrollbar-thumb-muted-foreground/40 md:px-4 lg:px-6">
        <span className="font-inter mr-3 flex items-center gap-2 border-r border-border pr-3 text-sm text-foreground">
          <FilterIcon className="size-4 text-foreground" />
          Filters
        </span>
        {categories.map((category) => {
          const isActive = category.id === selectedCategoryId

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              aria-pressed={isActive}
              aria-current={isActive ? 'true' : undefined}
              className={cn(
                'group relative mr-3 flex h-full shrink-0 cursor-pointer items-center px-1',
                'font-inter text-sm',
                'text-muted-foreground transition-colors duration-200',
                'hover:text-foreground',
                isActive && 'text-foreground',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="component-category-active-pill"
                  className={cn('absolute inset-x-0 bottom-0 h-[1.5px] bg-muted-foreground')}
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 34,
                  }}
                />
              )}

              <span className="relative z-10">{category.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
