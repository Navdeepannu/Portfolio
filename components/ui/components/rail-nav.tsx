'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'

export type RailNavItems = {
  label: string
  href: `#${string}`
}

type RailNavProps = {
  items: RailNavItems[]
  className?: string
}

export function RailNav({ items, className = '' }: RailNavProps) {
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<RailNavItems['href']>(items[0]?.href ?? '#intro')
  const [hoveredHref, setHoveredHref] = useState<RailNavItems['href'] | null>(null)

  useEffect(() => {
    const sections = items
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting)

        if (!visibleEntry) return

        const matchingItem = items.find((item) => item.href === `#${visibleEntry.target.id}`)

        if (matchingItem) {
          setActiveHref(matchingItem.href)
        }
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [items])

  return (
    <aside
      className={['hidden xl:block', className].join(' ')}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false)
        setHoveredHref(null)
      }}
    >
      <nav
        aria-label="On this page"
        className="relative flex min-h-28 min-w-32 items-start justify-end"
      >
        {/* Collapsed lines */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: open ? 0 : 1,
            x: open ? -8 : 0,
            filter: open ? 'blur(6px)' : 'blur(0px)',
          }}
          transition={{
            duration: 0.35,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute top-1 right-0 flex flex-col items-end gap-[5px]"
        >
          {items.map((item) => {
            const isActive = activeHref === item.href

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
                className={[
                  'block h-px rounded-full',
                  isActive ? 'bg-neutral-950 dark:bg-white' : 'bg-neutral-400 dark:bg-neutral-600',
                ].join(' ')}
              />
            )
          })}
        </motion.div>

        {/* Expanded text */}
        <motion.div
          initial={false}
          animate={{
            pointerEvents: open ? 'auto' : 'none',
          }}
          className="flex flex-col items-end gap-2"
        >
          {items.map((item, index) => {
            const isActive = activeHref === item.href
            const isHovered = hoveredHref === item.href

            return (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => setActiveHref(item.href)}
                onMouseEnter={() => setHoveredHref(item.href)}
                onMouseLeave={() => setHoveredHref(null)}
                initial={false}
                animate={{
                  opacity: open ? 1 : 0,
                  x: open ? 0 : 8,
                  filter: open ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={{
                  duration: 0.35,
                  delay: open ? index * 0.045 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={[
                  'text-right text-sm leading-5 font-medium tracking-tight transition-colors duration-200',
                  isActive
                    ? 'text-neutral-950 dark:text-white'
                    : isHovered
                      ? 'text-neutral-800 dark:text-neutral-200'
                      : 'text-neutral-500 dark:text-neutral-500',
                ].join(' ')}
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
