'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'

import { getComponentHref } from '@/data/component-helpers'
import { cn } from '@/lib/utils'

const springConfig = {
  type: 'spring' as const,
  stiffness: 420,
  damping: 34,
  mass: 0.7,
}

export type ComponentSidebarItem = {
  slug: string
  title: string
}

type ComponentDocSidebarProps = {
  items: ComponentSidebarItem[]
  activeSlug: string
  className?: string
}

export default function ComponentDocSidebar({
  items,
  activeSlug,
  className,
}: ComponentDocSidebarProps) {
  const mouseY = useMotionValue(Number.POSITIVE_INFINITY)

  return (
    <motion.nav
      aria-label="Components"
      onPointerMove={(event) => mouseY.set(event.clientY)}
      onPointerLeave={() => mouseY.set(Number.POSITIVE_INFINITY)}
      className={cn(
        'borde-border sticky top-20 h-fit w-64 shrink-0 border border-border/70 bg-background/80 p-3 shadow-sm backdrop-blur rounded-2xl',
        className,
      )}
    >
      <ul className="m-0 flex list-none flex-col p-0">
        {items.map((item, index) => (
          <SidebarItem
            key={item.slug}
            item={item}
            isActive={item.slug === activeSlug}
            showTrailingLine={index < items.length - 1}
            mouseY={mouseY}
          />
        ))}
      </ul>
    </motion.nav>
  )
}

function SidebarItem({
  item,
  isActive,
  showTrailingLine,
  mouseY,
}: {
  item: ComponentSidebarItem
  isActive: boolean
  showTrailingLine: boolean
  mouseY: MotionValue<number>
}) {
  const [isInteracting, setIsInteracting] = useState(false)
  const isHighlighted = isActive || isInteracting

  return (
    <li className="relative">
      <Link
        href={getComponentHref(item.slug)}
        aria-current={isActive ? 'page' : undefined}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
        onFocus={() => setIsInteracting(true)}
        onBlur={() => setIsInteracting(false)}
        className={cn(
          'group flex w-full min-w-0 items-center rounded-sm py-1 text-sm outline-none',
          'text-muted-foreground transition-colors duration-200',
          'hover:text-foreground focus-visible:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2',
          isActive && 'font-medium text-foreground',
        )}
      >
        <span aria-hidden="true" className="flex w-12 shrink-0 items-center">
          <SidebarBar mouseY={mouseY} isActive={isActive} idleOpacity={0.28} />
        </span>
        <motion.span
          initial={false}
          animate={{ x: isHighlighted ? 4 : 0 }}
          transition={springConfig}
          className="min-w-0 truncate whitespace-nowrap"
        >
          {item.title}
        </motion.span>
      </Link>

      {showTrailingLine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 flex items-center"
        >
          <SidebarBar mouseY={mouseY} idleOpacity={0.2} peakOpacity={0.65} />
        </span>
      )}
    </li>
  )
}

function SidebarBar({
  mouseY,
  isActive = false,
  idleOpacity,
  peakOpacity = 1,
}: {
  mouseY: MotionValue<number>
  isActive?: boolean
  idleOpacity: number
  peakOpacity?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)

  const proximity = useTransform(mouseY, (value) => {
    const bounds = ref.current?.getBoundingClientRect()

    if (!bounds) return 0

    const distance = Math.abs(value - bounds.top - bounds.height / 2)

    return Math.max(0, 1 - Math.min(distance, 70) / 70)
  })

  const targetWidth = useTransform(proximity, (value) => 22 + 20 * value ** 2)
  const targetOpacity = useTransform(
    proximity,
    (value) => idleOpacity + (peakOpacity - idleOpacity) * value,
  )

  const width = useSpring(targetWidth, springConfig)
  const opacity = useSpring(targetOpacity, springConfig)

  return (
    <motion.span
      ref={ref}
      style={{
        width: isActive ? 42 : width,
        opacity: isActive ? 1 : opacity,
      }}
      className="block h-px rounded-full bg-foreground"
    />
  )
}
