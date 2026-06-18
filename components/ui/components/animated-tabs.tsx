'use client'

import * as React from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { cn } from '@/lib/utils'


export type AnimatedTabItem = {
  value: string
  label: string
  content: React.ReactNode
}

type AnimatedTabsProps = {
  items: AnimatedTabItem[]
  defaultValue?: string
  className?: string
  listClassName?: string
  triggerClassName?: string
  contentClassName?: string
}

export function AnimatedTabs({
  items,
  defaultValue,
  className,
  listClassName,
  triggerClassName,
  contentClassName,
}: AnimatedTabsProps) {
  const layoutId = React.useId()

  const defaultIndex = Math.max(
    0,
    items.findIndex((item) => item.value === defaultValue),
  )

  const [activeIndex, setActiveIndex] = React.useState(defaultIndex)
  const [direction, setDirection] = React.useState(0)

  const activeItem = items[activeIndex]

  function handleTabChange(nextIndex: number) {
    if (nextIndex === activeIndex) return

    setDirection(nextIndex > activeIndex ? 1 : -1)
    setActiveIndex(nextIndex)
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      handleTabChange((index + 1) % items.length)
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      handleTabChange((index - 1 + items.length) % items.length)
    }
  }

  if (!items.length) return null

  return (
    <LayoutGroup id={layoutId}>
      <div
        className={cn(
          'mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-border bg-background p-2',
          className,
        )}
      >
        <div className="overflow-x-auto">
          <div
            role="tablist"
            aria-label="Animated tabs"
            className={cn('grid min-w-max gap-1 rounded-2xl bg-muted p-1', listClassName)}
            style={{
              gridTemplateColumns: `repeat(${items.length}, minmax(120px, 1fr))`,
            }}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={item.value}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${layoutId}-${item.value}`}
                  id={`tab-${layoutId}-${item.value}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleTabChange(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                  className={cn(
                    'relative rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors',
                    'focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none',
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                    triggerClassName,
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-tab-pill"
                      className="absolute inset-0 rounded-xl bg-background shadow-sm"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className={cn('min-h-80 overflow-hidden px-4 py-5 sm:px-6 sm:py-6', contentClassName)}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeItem.value}
              custom={direction}
              role="tabpanel"
              id={`panel-${layoutId}-${activeItem.value}`}
              aria-labelledby={`tab-${layoutId}-${activeItem.value}`}
              variants={{
                enter: (direction: number) => ({
                  opacity: 0,
                  x: direction > 0 ? 32 : -32,
                  filter: 'blur(4px)',
                }),
                center: {
                  opacity: 1,
                  x: 0,
                  filter: 'blur(0px)',
                },
                exit: (direction: number) => ({
                  opacity: 0,
                  x: direction > 0 ? -32 : 32,
                  filter: 'blur(4px)',
                }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.22,
                ease: 'easeOut',
              }}
            >
              {activeItem.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  )
}
