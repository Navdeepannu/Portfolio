'use client'

import { Fragment, type ReactNode, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

const CHIP_COLOR_CLASSES = {
  blue: 'bg-blue-600 text-white shadow-blue-600/25',
  purple: 'bg-violet-600 text-white shadow-violet-600/25',
  green: 'bg-emerald-600 text-white shadow-emerald-600/25',
  pink: 'bg-pink-600 text-white shadow-pink-600/25',
  teal: 'bg-teal-600 text-white shadow-teal-600/25',
  orange: 'bg-orange-500 text-white shadow-orange-500/25',
  red: 'bg-red-600 text-white shadow-red-600/25',
  yellow: 'bg-yellow-400 text-zinc-950 shadow-yellow-400/25',
  zinc: 'bg-zinc-900 text-white shadow-zinc-900/20 dark:bg-zinc-100 dark:text-zinc-950',
} as const

const DEFAULT_SEGMENT_POSITIONS = [
  'left-[17%] top-[20%] -rotate-3',
  'left-[38%] top-[17%] rotate-0',
  'right-[30%] top-[20%] rotate-1',
  'right-[18%] top-[23%] rotate-6',
  'left-[21%] top-[57%] rotate-2',
  'left-[47%] top-[60%] -rotate-1',
  'right-[24%] top-[57%] -rotate-3',
]

export type SegmentSpotlightColor = keyof typeof CHIP_COLOR_CLASSES

export type SegmentSpotlightSegment = {
  id: string
  label: string
  color?: SegmentSpotlightColor
  className?: string
}

export type SegmentSpotlightFocus = {
  id: string
  label: string
  icon: LucideIcon
  segmentIds: string[]
  dividerAfter?: boolean
}

export type SegmentSpotlightProps = {
  segments: SegmentSpotlightSegment[]
  focuses: SegmentSpotlightFocus[]
  children?: ReactNode
  className?: string
  viewportClassName?: string
  toolbarClassName?: string
  showGrid?: boolean
}

export function SegmentSpotlight({
  segments,
  focuses,
  children,
  className,
  viewportClassName,
  toolbarClassName,
  showGrid = false,
}: SegmentSpotlightProps) {
  const reduceMotion = useReducedMotion()
  const [activeId, setActiveId] = useState<string | null>(null)

  const activeFocus = useMemo(() => {
    return focuses.find((focus) => focus.id === activeId) ?? null
  }, [activeId, focuses])

  const activeSegmentIds = useMemo(() => {
    return new Set(activeFocus?.segmentIds ?? [])
  }, [activeFocus])

  const hasActiveFocus = Boolean(activeFocus)

  return (
    <div className={cn('relative mx-auto w-full max-w-6xl', className)}>
      <div
        className={cn('relative min-h-135 overflow-hidden bg-background', viewportClassName)}
      >
        {showGrid ? (
          <div
            aria-hidden
            className={cn(
              'pointer-events-none absolute inset-0 z-0',
              'bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)]',
              'bg-[size:40px_40px] opacity-60',
              '[mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]',
            )}
          />
        ) : null}

        <div className="absolute inset-0 z-10">
          {segments.map((segment, index) => {
            const isActive = hasActiveFocus && activeSegmentIds.has(segment.id)

            const isMuted = hasActiveFocus && !activeSegmentIds.has(segment.id)

            return (
              <SegmentChip
                key={segment.id}
                segment={segment}
                index={index}
                isActive={isActive}
                isMuted={isMuted}
                reduceMotion={reduceMotion}
              />
            )
          })}
        </div>

        <div className="absolute inset-x-0 top-[42%] z-30 flex justify-center px-4">
          <SegmentToolbar
            focuses={focuses}
            activeId={activeId}
            toolbarClassName={toolbarClassName}
            reduceMotion={reduceMotion}
            onActivate={setActiveId}
            onReset={() => setActiveId(null)}
          />
        </div>

        {children ? (
          <div className="absolute inset-x-0 bottom-0 z-20 px-6 pt-24 pb-10">
            <div className="mx-auto max-w-3xl text-center">{children}</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function SegmentChip({
  segment,
  index,
  isActive,
  isMuted,
  reduceMotion,
}: {
  segment: SegmentSpotlightSegment
  index: number
  isActive: boolean
  isMuted: boolean
  reduceMotion: boolean | null
}) {
  const color = segment.color ?? 'zinc'
  const position =
    segment.className ?? DEFAULT_SEGMENT_POSITIONS[index % DEFAULT_SEGMENT_POSITIONS.length]

  return (
    <motion.div
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 12,
              scale: 0.96,
              filter: 'blur(6px)',
            }
      }
      animate={{
        opacity: isMuted ? 0.24 : 1,
        y: isActive ? -4 : 0,
        scale: isActive ? 1.06 : 1,
        filter: isMuted ? 'blur(5px)' : 'blur(0px)',
      }}
      transition={{
        duration: reduceMotion ? 0 : 0.38,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'absolute z-10 rounded-lg px-3 py-1.5 text-sm font-medium',
        'shadow-xl ring-1 ring-black/5 will-change-transform dark:ring-white/10',
        CHIP_COLOR_CLASSES[color],
        isActive && 'z-20',
        position,
      )}
    >
      {segment.label}
    </motion.div>
  )
}

function SegmentToolbar({
  focuses,
  activeId,
  toolbarClassName,
  reduceMotion,
  onActivate,
  onReset,
}: {
  focuses: SegmentSpotlightFocus[]
  activeId: string | null
  toolbarClassName?: string
  reduceMotion: boolean | null
  onActivate: (id: string) => void
  onReset: () => void
}) {
  return (
    <motion.div
      onMouseLeave={onReset}
      initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: reduceMotion ? 0 : 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'flex items-center gap-1 rounded-full bg-zinc-950/95 p-2 ring-1 ring-border',
        'shadow-2xl shadow-black/20 backdrop-blur-xl',
        toolbarClassName,
      )}
    >
      {focuses.map((focus) => {
        const Icon = focus.icon
        const isActive = activeId === focus.id

        return (
          <Fragment key={focus.id}>
            <motion.button
              type="button"
              aria-label={focus.label}
              aria-pressed={isActive}
              title={focus.label}
              onMouseEnter={() => onActivate(focus.id)}
              onFocus={() => onActivate(focus.id)}
              whileHover={reduceMotion ? undefined : { scale: 1.08 }}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              className={cn(
                'relative grid size-10 place-items-center rounded-full',
                'text-neutral-200 transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-border',
                isActive && 'text-white',
              )}
            >
              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.span
                    layoutId="segment-spotlight-active-icon"
                    className="absolute inset-1 rounded-full bg-white/15"
                    transition={{
                      duration: reduceMotion ? 0 : 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                ) : null}
              </AnimatePresence>

              <Icon className="relative z-10 size-5" aria-hidden />
            </motion.button>

            {focus.dividerAfter ? <span aria-hidden className="mx-1 h-6 w-px bg-white/15" /> : null}
          </Fragment>
        )
      })}
    </motion.div>
  )
}
