'use client'

import type { ComponentPropsWithoutRef } from 'react'
import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'

export type IllustrationName = 'one' | 'two' | 'three'

export type ExpandableFeature = {
  id: string
  label: string
  backgroundImage: string
  illustration: IllustrationName
}

export const expandableFeatures = [
  {
    id: 'capture',
    label: 'Capture',
    illustration: 'one',
    backgroundImage: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlBE1JQ6bM0rCoZtdKDAVO8yw7eSuvUb1LhYIJ',
  },
  {
    id: 'coordinate',
    label: 'Coordinate',
    illustration: 'two',
    backgroundImage: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTljn0lnIziS93GUAyT2Loud5qMEamYgj7C0BVN',
  },
  {
    id: 'release',
    label: 'Release',
    illustration: 'three',
    backgroundImage: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4cfuGJ0RlaETPbLcZQjyfg2StNvuB13w8rI',
  },
] as const satisfies readonly ExpandableFeature[]

export type ExpandableFeaturesProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  eyebrow?: string
  heading?: string
  description?: string
  items?: readonly ExpandableFeature[]
  defaultActiveId?: string
  autoPlay?: boolean
  interval?: number
}

export type FeatureIllustrationProps = {
  className?: string
}

export default function FeatureSectionTwo({
  eyebrow = 'Connected workflow',
  heading = 'Move work from idea to launch.',
  description = 'Keep planning, collaboration, and delivery connected in one focused workspace.',
  items = expandableFeatures,
  defaultActiveId,
  autoPlay = true,
  interval = 8000,
  className,
  ...props
}: ExpandableFeaturesProps) {
  const panelId = useId()
  const shouldReduceMotion = useReducedMotion()

  const [activeId, setActiveId] = useState(defaultActiveId ?? items[0]?.id ?? '')

  const activeIndex = Math.max(
    items.findIndex((item) => item.id === activeId),
    0,
  )

  const activeItem = items[activeIndex]

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion || items.length <= 1 || !activeItem) {
      return
    }

    const timeout = window.setTimeout(() => {
      const nextIndex = (activeIndex + 1) % items.length
      const nextItem = items[nextIndex]

      if (nextItem) {
        setActiveId(nextItem.id)
      }
    }, interval)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, activeItem, autoPlay, interval, items, shouldReduceMotion])

  if (!activeItem) {
    return null
  }

  const Illustration = illustrationMap[activeItem.illustration]

  return (
    <section className={cn('overflow-hidden py-20 md:py-28', className)} {...props}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="rounded-[2rem] border bg-muted/30 p-2 shadow-sm">
          <div className="grid overflow-hidden rounded-[1.5rem] bg-background lg:grid-cols-[0.86fr_1.14fr]">
            <div className="flex min-h-[28rem] flex-col p-6 sm:p-8 lg:min-h-[36rem] lg:p-12">
              <div className="max-w-lg">
                <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                  {heading}
                </h2>

                <p className="mt-5 max-w-md leading-7 text-balance text-muted-foreground">
                  {description}
                </p>
              </div>

              <div
                role="tablist"
                aria-label="Product capabilities"
                className="mt-12 grid gap-x-6 sm:grid-cols-3 lg:mt-auto lg:grid-cols-1 lg:gap-0"
              >
                {items.map((item, index) => {
                  const isActive = item.id === activeItem.id
                  const tabId = `${panelId}-${item.id}-tab`

                  return (
                    <button
                      key={item.id}
                      id={tabId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      aria-controls={`${panelId}-panel`}
                      tabIndex={isActive ? 0 : -1}
                      onClick={() => setActiveId(item.id)}
                      className={cn(
                        'group relative flex items-center gap-4 py-4 text-left',
                        'border-b border-border/60 transition-colors',
                        'last:border-b-0 sm:border-b-0 lg:border-b lg:last:border-b-0',
                        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:outline-none',
                        isActive
                          ? 'text-foreground focus-within:invisible'
                          : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      <span
                        className={cn(
                          'text-xs font-medium tabular-nums transition-colors',
                          isActive ? 'text-foreground/50' : 'text-muted-foreground/50',
                        )}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="text-sm font-medium">{item.label}</span>

                      <FeatureTimer
                        key={isActive ? `${item.id}-${interval}` : item.id}
                        active={isActive}
                        autoPlay={autoPlay}
                        duration={interval}
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            <div
              id={`${panelId}-panel`}
              role="tabpanel"
              aria-labelledby={`${panelId}-${activeItem.id}-tab`}
              className="relative min-h-[30rem] overflow-hidden rounded-[1.4rem] lg:min-h-[36rem]"
            >
              <AnimatePresence mode="sync" initial={false}>
                <motion.div
                  key={activeItem.id}
                  className="absolute inset-0"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 1.006,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: shouldReduceMotion ? 1 : 0.996,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${activeItem.backgroundImage}")`,
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.04),rgba(2,6,23,0.64))]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(2,6,23,0.14)_58%,rgba(2,6,23,0.4)_100%)]"
                  />

                  <div className="relative flex h-full min-h-[30rem] items-center justify-center px-4 py-12 sm:px-8 lg:min-h-[36rem]">
                    <Illustration />
                  </div>

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-4 rounded-2xl border border-white/10"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureTimer({
  active,
  autoPlay,
  duration,
}: {
  active: boolean
  autoPlay: boolean
  duration: number
}) {
  const radius = 8
  const circumference = 2 * Math.PI * radius

  return (
    <span aria-hidden="true" className="ml-auto grid size-5 shrink-0 place-items-center">
      <AnimatePresence initial={false}>
        {active && (
          <motion.span
            key="timer"
            className="grid size-5 place-items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
          >
            {autoPlay ? (
              <svg viewBox="0 0 24 24" className="size-5">
                <circle
                  cx="15"
                  cy="15"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-foreground/15"
                />

                <motion.circle
                  cx="15"
                  cy="15"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  initial={{
                    strokeDashoffset: circumference,
                  }}
                  animate={{
                    strokeDashoffset: 0,
                  }}
                  transition={{
                    duration: duration / 1000,
                    ease: 'linear',
                  }}
                  className="text-foreground"
                />
              </svg>
            ) : (
              <span className="size-2 rounded-full bg-foreground" />
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
const illustrationMap = {
  one: IllustrationOne,
  two: IllustrationTwo,
  three: IllustrationThree,
}

/**
 * Capture
 * Turns scattered input into structured work.
 */
export function IllustrationOne({ className }: FeatureIllustrationProps) {
  const items = ['Message', 'Note', 'File']

  return (
    <div aria-hidden="true" className={cn('w-[88%] max-w-md', className)}>
      <div className="rounded-2xl border bg-background/90 p-4 text-foreground shadow-2xl backdrop-blur-xl sm:p-5">
        <div className="flex items-center gap-2 border-b pb-4">
          <span className="size-2 rounded-full bg-foreground/20" />
          <span className="size-2 rounded-full bg-foreground/10" />
          <span className="ml-auto text-[10px] text-muted-foreground">Inbox</span>
        </div>

        <div className="mt-4 grid items-center gap-4 sm:grid-cols-[1fr_auto_1.15fr]">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3">
                <span className="grid size-7 place-items-center rounded-md bg-background text-[10px] font-medium shadow-sm">
                  {index + 1}
                </span>
                <span className="text-xs text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>

          <span className="hidden text-muted-foreground sm:block">→</span>

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-medium">New item</span>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[9px] text-primary">
                Ready
              </span>
            </div>
            <div className="mt-4 h-2 w-3/4 rounded-full bg-muted" />
            <div className="mt-2 h-2 w-1/2 rounded-full bg-muted" />
            <div className="mt-5 flex gap-2">
              <span className="h-6 w-14 rounded-md bg-muted" />
              <span className="h-6 w-10 rounded-md bg-muted/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Coordinate
 * Shows cross-functional work moving through a shared workflow.
 */
export function IllustrationTwo({ className }: FeatureIllustrationProps) {
  const stages = [
    { label: 'Plan', state: 'Done', complete: true },
    { label: 'Build', state: 'In progress', active: true },
    { label: 'Review', state: 'Next' },
  ]

  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-[88%] max-w-md rounded-2xl border bg-background/90 p-4 text-foreground shadow-2xl backdrop-blur-xl sm:p-5',
        className,
      )}
    >
      <div className="flex items-center border-b pb-4">
        <span className="text-xs font-medium">Shared workflow</span>
        <div className="ml-auto flex -space-x-1.5">
          {['A', 'B', 'C'].map((initial) => (
            <span
              key={initial}
              className="grid size-6 place-items-center rounded-full border-2 border-background bg-muted text-[8px] text-muted-foreground"
            >
              {initial}
            </span>
          ))}
        </div>
      </div>

      <div className="relative mt-4">
        <div className="absolute top-5 bottom-5 left-[17px] w-px bg-border" />

        <div className="space-y-2">
          {stages.map((stage, index) => (
            <div
              key={stage.label}
              className={cn(
                'relative flex items-center gap-3 rounded-xl border p-3',
                stage.active ? 'bg-primary/[0.06]' : 'bg-card',
              )}
            >
              <span
                className={cn(
                  'relative z-10 grid size-9 place-items-center rounded-full border text-[10px] font-medium',
                  stage.complete
                    ? 'bg-primary text-primary-foreground'
                    : stage.active
                      ? 'border-primary bg-background text-primary'
                      : 'bg-background text-muted-foreground',
                )}
              >
                {stage.complete ? '✓' : index + 1}
              </span>
              <span className="text-xs font-medium">{stage.label}</span>
              <span
                className={cn(
                  'ml-auto rounded-full px-2 py-1 text-[9px]',
                  stage.active ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground',
                )}
              >
                {stage.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Release
 * Shows the final path through checks and environments.
 */
export function IllustrationThree({ className }: FeatureIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'w-[88%] max-w-md rounded-2xl border bg-background/90 p-5 text-foreground shadow-2xl backdrop-blur-xl',
        className,
      )}
    >
      <div className="flex items-center border-b pb-4">
        <span className="text-xs font-medium">Release</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] text-primary">
          <span className="size-1.5 rounded-full bg-primary" />
          Live
        </span>
      </div>

      <div className="grid place-items-center py-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-primary text-xl text-primary-foreground shadow-sm">
          ✓
        </span>
        <p className="mt-4 text-sm font-medium">Published successfully</p>
        <p className="mt-1 text-[10px] text-muted-foreground">Your latest changes are live.</p>
      </div>

      <div className="flex items-center gap-3 rounded-xl border bg-muted/30 p-3">
        <div className="min-w-0 flex-1">
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>Progress</span>
            <span>100%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-full rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}
