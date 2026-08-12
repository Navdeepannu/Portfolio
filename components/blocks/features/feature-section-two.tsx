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
  interval = 5000,
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
                          ? 'text-foreground'
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

                      <span
                        aria-hidden="true"
                        className={cn(
                          'ml-auto size-2.5 rounded-full border-2 transition-all duration-300',
                          isActive ? 'border-foreground' : 'border-muted',
                        )}
                      ></span>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem.id}
                  className="absolute inset-0"
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          scale: 1.015,
                        }
                  }
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: shouldReduceMotion ? 1 : 0.99,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${activeItem.backgroundImage})`,
                    }}
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.08),rgba(2,6,23,0.66))]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,transparent_0%,rgba(2,6,23,0.18)_58%,rgba(2,6,23,0.42)_100%)]"
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

const illustrationMap = {
  one: IllustrationOne,
  two: IllustrationTwo,
  three: IllustrationThree,
}

export function IllustrationOne({ className }: FeatureIllustrationProps) {
  const tasks = [
    { label: 'Product brief', completed: true },
    { label: 'Homepage direction', completed: true },
    { label: 'Launch checklist', completed: false },
  ]

  return (
    <div aria-hidden="true" className={cn('w-[88%] max-w-120', className)}>
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-white/25" />
            <span className="size-2 rounded-full bg-white/15" />
          </div>

          <span className="text-xs text-white/45">Workspace</span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-xs text-white/45">Current project</p>
              <h3 className="mt-1 font-medium">Product launch</h3>
            </div>

            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
              On track
            </span>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-xs text-white/45">
              <span>Progress</span>
              <span>68%</span>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[68%] rounded-full bg-white" />
            </div>
          </div>

          <div className="mt-6 space-y-2">
            {tasks.map((task) => (
              <div
                key={task.label}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-3.5 py-3"
              >
                <span
                  className={cn(
                    'grid size-5 place-items-center rounded-full border text-[10px]',
                    task.completed
                      ? 'border-white bg-white text-neutral-950'
                      : 'border-white/20 text-transparent',
                  )}
                >
                  ✓
                </span>

                <span className={cn('text-sm', task.completed ? 'text-white/55' : 'text-white/90')}>
                  {task.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Illustration Two
 * A lightweight collaboration/network canvas.
 */
export function IllustrationTwo({ className }: FeatureIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative aspect-[1.25/1] w-[92%] max-w-[540px] overflow-hidden rounded-2xl',
        'border border-white/15 bg-neutral-950/80 text-white shadow-2xl backdrop-blur-xl',
        className,
      )}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />

      <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 px-5 py-4">
        <span className="text-xs text-white/55">Live workspace</span>

        <span className="flex items-center gap-2 text-xs text-white/55">
          <span className="size-1.5 rounded-full bg-emerald-400" />4 online
        </span>
      </div>

      <svg
        viewBox="0 0 500 330"
        className="absolute inset-0 h-full w-full text-white/20"
        fill="none"
      >
        <path d="M250 165L115 105" stroke="currentColor" />
        <path d="M250 165L390 98" stroke="currentColor" />
        <path d="M250 165L115 250" stroke="currentColor" />
        <path d="M250 165L393 250" stroke="currentColor" />
      </svg>

      <div className="absolute top-1/2 left-1/2 z-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/15 bg-white/10 p-4 text-center shadow-xl backdrop-blur-md">
        <span className="mx-auto grid size-8 place-items-center rounded-lg bg-white text-xs font-semibold text-neutral-950">
          NS
        </span>
        <p className="mt-3 text-sm font-medium">Design system</p>
        <p className="mt-1 text-[11px] text-white/45">12 active updates</p>
      </div>

      <MemberNode initials="MK" label="Research" className="top-[23%] left-[10%]" />

      <MemberNode initials="AL" label="Product" className="top-[21%] right-[9%]" />

      <MemberNode initials="SR" label="Design" className="bottom-[13%] left-[10%]" />

      <MemberNode initials="JN" label="Engineering" className="right-[7%] bottom-[13%]" />
    </div>
  )
}

/**
 * Illustration Three
 * A restrained deployment/release interface.
 */
export function IllustrationThree({ className }: FeatureIllustrationProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('relative aspect-[1.15/1] w-[90%] max-w-[520px]', className)}
    >
      <div className="absolute inset-x-0 top-[18%] bottom-0 overflow-hidden rounded-2xl border border-white/15 bg-neutral-950/85 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-white/10 px-5 py-4">
          <span className="size-2 rounded-full bg-white/25" />
          <span className="size-2 rounded-full bg-white/15" />
          <span className="ml-2 text-xs text-white/40">deployment.log</span>
        </div>

        <div className="space-y-3 p-5 font-mono text-xs">
          <LogLine prefix="01" text="Building production bundle" />
          <LogLine prefix="02" text="Running validation checks" />
          <LogLine prefix="03" text="Publishing edge functions" />
          <LogLine prefix="04" text="Deployment completed" active />
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[72%] rounded-2xl border border-white/15 bg-neutral-900/95 p-5 text-white shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs text-white/45">Release</p>
            <p className="mt-1 text-sm font-medium">Version 2.4.0</p>
          </div>

          <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">
            Ready
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {['Preview', 'Staging', 'Production'].map((environment, index) => (
            <div
              key={environment}
              className="rounded-lg border border-white/10 bg-white/[0.035] px-2 py-2.5 text-center"
            >
              <span
                className={cn(
                  'mx-auto block size-1.5 rounded-full',
                  index === 2 ? 'bg-emerald-400' : 'bg-white/35',
                )}
              />
              <span className="mt-2 block text-[9px] text-white/45 sm:text-[10px]">
                {environment}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MemberNode({
  initials,
  label,
  className,
}: {
  initials: string
  label: string
  className?: string
}) {
  return (
    <div className={cn('absolute z-10 text-center', className)}>
      <span className="mx-auto grid size-9 place-items-center rounded-full border border-white/15 bg-neutral-900 text-[11px] font-medium shadow-lg">
        {initials}
      </span>
      <span className="mt-1.5 block text-[10px] text-white/45">{label}</span>
    </div>
  )
}

function LogLine({
  prefix,
  text,
  active = false,
}: {
  prefix: string
  text: string
  active?: boolean
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/20">{prefix}</span>

      <span className={active ? 'text-emerald-300' : 'text-white/45'}>
        {active ? '✓' : '>'} {text}
      </span>
    </div>
  )
}
