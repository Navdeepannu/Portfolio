'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
  type Transition,
} from 'motion/react'

import { cn } from '@/lib/utils'

const springConfig: Transition = {
  type: 'spring',
  stiffness: 420,
  damping: 34,
  mass: 0.7,
}

const INACTIVE_POINTER_POSITION = Number.POSITIVE_INFINITY

export type ProximityNavItem = {
  title: string
  href: string
}

export type ProximityNavProps = {
  items: readonly ProximityNavItem[]
  activeHref?: string
  defaultActiveHref?: string
  preventNavigation?: boolean
  onActiveHrefChange?: (href: string) => void
  label?: string
  className?: string
}

export function ProximityNav({
  items,
  activeHref,
  defaultActiveHref,
  preventNavigation = false,
  onActiveHrefChange,
  label = 'Navigation',
  className,
}: ProximityNavProps) {
  const pathname = usePathname()
  const mouseY = useMotionValue(INACTIVE_POINTER_POSITION)

  const [internalActiveHref, setInternalActiveHref] = React.useState(
    defaultActiveHref ?? items[0]?.href ?? '',
  )

  const currentHref = activeHref ?? (preventNavigation ? internalActiveHref : pathname)

  function handleItemClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (preventNavigation) {
      event.preventDefault()
      setInternalActiveHref(href)
    }

    onActiveHrefChange?.(href)
  }

  return (
    <motion.nav
      aria-label={label}
      onPointerMove={(event) => mouseY.set(event.clientY)}
      onPointerLeave={() => mouseY.set(INACTIVE_POINTER_POSITION)}
      className={cn(
        'sticky top-20 h-fit w-64 shrink-0 rounded-2xl',
        'bg-background/80 p-3 shadow-md ring-1 ring-foreground/6.5',
        className,
      )}
    >
      <ul>
        {items.map((item, index) => (
          <ProximityNavItem
            key={item.href}
            item={item}
            isActive={normalizeHref(item.href) === normalizeHref(currentHref)}
            showTrailingLine={index < items.length - 1}
            mouseY={mouseY}
            preventNavigation={preventNavigation}
            onClick={handleItemClick}
          />
        ))}
      </ul>
    </motion.nav>
  )
}

function ProximityNavItem({
  item,
  isActive,
  showTrailingLine,
  mouseY,
  preventNavigation,
  onClick,
}: {
  item: ProximityNavItem
  isActive: boolean
  showTrailingLine: boolean
  mouseY: MotionValue<number>
  preventNavigation: boolean
  onClick: (event: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const [isInteracting, setIsInteracting] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const isHighlighted = isActive || isInteracting

  return (
    <li className="relative">
      {/* Primary line aligned with the navigation label. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-0 flex -translate-y-1/2 items-center"
      >
        <ProximityBar mouseY={mouseY} isActive={isActive} idleOpacity={0.35} peakOpacity={0.85} />
      </span>

      <Link
        href={item.href}
        prefetch={preventNavigation ? false : undefined}
        aria-current={isActive ? 'page' : undefined}
        onClick={(event) => onClick(event, item.href)}
        onPointerEnter={() => setIsInteracting(true)}
        onPointerLeave={() => setIsInteracting(false)}
        onFocus={() => setIsInteracting(true)}
        onBlur={() => setIsInteracting(false)}
        className={cn(
          'flex min-w-0 items-center py-1 pl-14 text-sm',
          'rounded-sm text-muted-foreground outline-none',
          'transition-colors duration-200',
          'hover:text-foreground focus-visible:text-foreground',
          'focus-visible:ring-2 focus-visible:ring-ring/50',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          isActive && 'font-medium text-foreground',
        )}
      >
        <motion.span
          initial={false}
          animate={{ x: shouldReduceMotion ? 0 : isHighlighted ? 4 : 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : springConfig}
          className="min-w-0 truncate whitespace-nowrap"
        >
          {item.title}
        </motion.span>
      </Link>

      {/* Smaller line between the current and next item. */}
      {showTrailingLine && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-0 flex items-center"
        >
          <ProximityBar mouseY={mouseY} idleOpacity={0.2} peakOpacity={0.65} />
        </span>
      )}
    </li>
  )
}

function ProximityBar({
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
  const ref = React.useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const proximity = useTransform(mouseY, (pointerY) => {
    const bounds = ref.current?.getBoundingClientRect()

    if (!bounds) return 0

    const centerY = bounds.top + bounds.height / 2
    const distance = Math.abs(pointerY - centerY)

    // Change 70 to adjust the pointer activation distance.
    return Math.max(0, 1 - Math.min(distance, 70) / 70)
  })

  // Resting width: 22px. Maximum animated width: 42px.
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
        width: isActive ? 42 : shouldReduceMotion ? 22 : width,
        opacity: isActive ? 1 : shouldReduceMotion ? idleOpacity : opacity,
      }}
      className="block h-px rounded-full bg-foreground"
    />
  )
}

function normalizeHref(href: string) {
  const pathname = href.split(/[?#]/)[0]
  return pathname.replace(/\/$/, '') || '/'
}
