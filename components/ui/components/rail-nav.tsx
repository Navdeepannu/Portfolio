'use client'

import * as React from 'react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

export type RailNavItem = {
  label: React.ReactNode
  href: string
  /** Optional selector to observe when it differs from href. */
  target?: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

/** @deprecated Use RailNavItem instead. */
export type RailNavItems = RailNavItem

export type RailNavProps = Omit<React.ComponentProps<'aside'>, 'defaultValue'> & {
  items: readonly RailNavItem[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  expanded?: boolean
  defaultExpanded?: boolean
  onExpandedChange?: (expanded: boolean) => void
  trackActive?: boolean
  observerOptions?: IntersectionObserverInit
  label?: string
}

export function RailNav({
  items,
  value: valueProp,
  defaultValue,
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = false,
  onExpandedChange,
  trackActive = true,
  observerOptions,
  label = 'On this page',
  className,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  ...props
}: RailNavProps) {
  const [activeValue = '', setActiveValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? items[0]?.href ?? '',
    onChange: onValueChange,
  })
  const [expanded = false, setExpanded] = useControllableState({
    prop: expandedProp,
    defaultProp: defaultExpanded,
    onChange: onExpandedChange,
  })
  const [hoveredValue, setHoveredValue] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!trackActive || typeof IntersectionObserver === 'undefined') return

    const observedItems = items.flatMap((item) => {
      const selector = item.target ?? (item.href.startsWith('#') ? item.href : null)

      if (!selector) return []

      try {
        const element = document.querySelector(selector)
        return element ? [{ element, value: item.href }] : []
      } catch {
        return []
      }
    })

    if (!observedItems.length) return

    const valueByElement = new Map(observedItems.map((item) => [item.element, item.value]))
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) - Math.abs(second.boundingClientRect.top),
          )[0]
        const nextValue = visibleEntry ? valueByElement.get(visibleEntry.target) : undefined

        if (nextValue) setActiveValue(nextValue)
      },
      observerOptions ?? {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    observedItems.forEach(({ element }) => observer.observe(element))

    return () => observer.disconnect()
  }, [items, observerOptions, setActiveValue, trackActive])

  function handleMouseEnter(event: React.MouseEvent<HTMLElement>) {
    onMouseEnter?.(event)
    if (!event.defaultPrevented) setExpanded(true)
  }

  function handleMouseLeave(event: React.MouseEvent<HTMLElement>) {
    onMouseLeave?.(event)

    if (!event.defaultPrevented) {
      setExpanded(false)
      setHoveredValue(null)
    }
  }

  function handleFocusCapture(event: React.FocusEvent<HTMLElement>) {
    onFocusCapture?.(event)
    if (!event.defaultPrevented) setExpanded(true)
  }

  function handleBlurCapture(event: React.FocusEvent<HTMLElement>) {
    onBlurCapture?.(event)

    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) {
      setExpanded(false)
      setHoveredValue(null)
    }
  }

  return (
    <aside
      data-slot="rail-nav"
      data-state={expanded ? 'expanded' : 'collapsed'}
      className={cn('hidden xl:block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocusCapture={handleFocusCapture}
      onBlurCapture={handleBlurCapture}
      {...props}
    >
      <nav aria-label={label} className="relative flex min-h-28 min-w-32 items-start justify-end">
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: expanded ? 0 : 1,
            x: expanded ? -8 : 0,
            filter: expanded ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-1 right-0 flex flex-col items-end gap-[5px]"
        >
          {items.map((item) => {
            const isActive = activeValue === item.href

            return (
              <motion.span
                key={item.href}
                initial={false}
                animate={{
                  width: isActive ? 18 : 14,
                  opacity: isActive ? 1 : 0.45,
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  'block h-px rounded-full',
                  isActive ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-400 dark:bg-neutral-600',
                )}
              />
            )
          })}
        </motion.div>

        <motion.div
          initial={false}
          animate={{
            pointerEvents: expanded ? 'auto' : 'none',
          }}
          className="flex flex-col items-end gap-2"
        >
          {items.map((item, index) => {
            const isActive = activeValue === item.href
            const isHovered = hoveredValue === item.href

            return (
              <motion.a
                key={item.href}
                href={item.href}
                initial={false}
                animate={{
                  opacity: expanded ? 1 : 0,
                  x: expanded ? 0 : 8,
                  filter: expanded ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{
                  duration: 0.35,
                  delay: expanded ? index * 0.045 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                aria-current={isActive ? 'location' : undefined}
                onClick={(event) => {
                  item.onClick?.(event)
                  if (!event.defaultPrevented) setActiveValue(item.href)
                }}
                onMouseEnter={() => setHoveredValue(item.href)}
                onMouseLeave={() => setHoveredValue(null)}
                className={cn(
                  'text-right text-sm leading-5 font-medium tracking-tight transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive
                    ? 'text-neutral-950 dark:text-white'
                    : isHovered
                      ? 'text-neutral-800 dark:text-neutral-200'
                      : 'text-neutral-500 dark:text-neutral-500',
                  item.className,
                )}
              >
                {item.label}
              </motion.a>
            )
          })}
        </motion.div>
      </nav>
    </aside>
  )
}
