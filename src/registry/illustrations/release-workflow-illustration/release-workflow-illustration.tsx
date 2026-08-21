'use client'

import { useEffect, useId, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, ChevronDown, GitCommit, Rocket } from 'lucide-react'

import { cn } from '@/lib/utils'

export type ContentSectionThreeRelease = {
  name: string
  version: string
  status: string
  time: string
  environment?: string
  commit?: string
  note?: string
}

export type ContentSectionThreeWorkflow = {
  label?: string
  releases?: readonly ContentSectionThreeRelease[]
}

export type ReleaseWorkflowIllustrationProps = {
  workflow?: ContentSectionThreeWorkflow
  autoPlay?: boolean
  interval?: number
}

export const defaultReleaseWorkflow: ContentSectionThreeWorkflow = {
  label: 'Releases',
  releases: [
    {
      name: 'Platform',
      version: '2.4.0',
      status: 'Released',
      time: '2h ago',
      environment: 'Production',
      commit: '7f3c2a1',
    },
    {
      name: 'Dashboard',
      version: '1.18.0',
      status: 'Ready',
      time: 'Today',
      environment: 'Staging',
      commit: '8b61d4e',
    },
    {
      name: 'Mobile',
      version: '1.9.0',
      status: 'In review',
      time: 'Yesterday',
      environment: 'TestFlight',
      commit: 'c129ef4',
    },
  ],
}

export function ReleaseWorkflowIllustration({
  workflow = defaultReleaseWorkflow,
  autoPlay = true,
  interval = 4000,
}: ReleaseWorkflowIllustrationProps) {
  const instanceId = useId()
  const shouldReduceMotion = useReducedMotion()

  const releases = workflow.releases ?? defaultReleaseWorkflow.releases ?? []

  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isPointerInside, setIsPointerInside] = useState(false)
  const [hasFocusWithin, setHasFocusWithin] = useState(false)

  const activeIndex = Math.min(selectedIndex, Math.max(releases.length - 1, 0))

  const activeRelease = releases[activeIndex]
  const isPaused = isPointerInside || hasFocusWithin

  useEffect(() => {
    if (!autoPlay || shouldReduceMotion || isPaused || releases.length <= 1) {
      return
    }

    const timeout = window.setTimeout(() => {
      setSelectedIndex((currentIndex) => {
        return (currentIndex + 1) % releases.length
      })
    }, interval)

    return () => window.clearTimeout(timeout)
  }, [activeIndex, autoPlay, interval, isPaused, releases.length, shouldReduceMotion])

  return (
    <div
      id="release-workflow"
      aria-label="Interactive release tracking preview"
      className="relative h-110 w-full overflow-hidden"
      onPointerEnter={() => setIsPointerInside(true)}
      onPointerLeave={() => setIsPointerInside(false)}
      onFocusCapture={() => setHasFocusWithin(true)}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null

        if (!event.currentTarget.contains(nextTarget)) {
          setHasFocusWithin(false)
        }
      }}
    >
      <div
        className="absolute inset-x-[-7%] inset-y-0"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to right, black 0%, black 80%, transparent 100%)',
        }}
      >
        <div
          className="h-full"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
            maskImage: 'linear-gradient(to bottom, black 0%, black 82%, transparent 100%)',
          }}
        >
          <div className="relative mx-auto mt-8 w-[90%] max-w-md">
            <div className="rounded-lg border bg-background/95 shadow-md backdrop-blur-xl">
              <div className="flex items-center justify-between border-b px-4 py-3.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-7 items-center justify-center rounded-lg border bg-muted/40">
                    <Rocket aria-hidden="true" className="size-3.5 text-muted-foreground" />
                  </span>

                  <span className="text-sm font-medium">
                    {workflow.label ?? defaultReleaseWorkflow.label}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  All products
                  <ChevronDown aria-hidden="true" className="size-3" />
                </span>
              </div>

              <div>
                {releases.map((release, index) => {
                  const isActive = index === activeIndex

                  return (
                    <button
                      key={`${release.name}-${release.version}`}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        'group relative grid w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 border-b px-4 py-3 text-left',
                        'transition-colors duration-200 last:border-b-0',
                        'focus-visible:z-10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring',
                        isActive ? 'bg-muted/40' : 'hover:bg-muted/20',
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId={`${instanceId}-active-release`}
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-[0.5px] bg-muted-foreground"
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.25,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                      ) : null}

                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn('size-1.5 shrink-0', getStatusColor(release.status))}
                        />

                        <div className="min-w-0">
                          <p
                            className={cn(
                              'truncate text-xs font-medium transition-colors',
                              isActive
                                ? 'text-foreground'
                                : 'text-foreground/75 group-hover:text-foreground',
                            )}
                          >
                            {release.name}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                            {release.version}
                          </p>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'rounded-full border px-2 py-1 text-[10px] transition-colors',
                          isActive
                            ? 'border-foreground/25 text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        {release.status}
                      </span>

                      <span className="w-14 text-right text-[10px] text-muted-foreground">
                        {release.time}
                      </span>
                    </button>
                  )
                })}
                <AnimatePresence mode="wait">
                  {activeRelease ? (
                    <motion.div
                      key={`${activeRelease.name}-${activeRelease.version}`}
                      initial={
                        shouldReduceMotion
                          ? false
                          : {
                              opacity: 0,
                              y: 3,
                              filter: 'blur(5px)',
                            }
                      }
                      animate={{
                        opacity: 1,
                        y: 0,
                        filter: 'blur(0px)',
                      }}
                      exit={{
                        opacity: 0,
                        y: shouldReduceMotion ? 0 : -3,
                      }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.28,
                        ease: 'easeInOut',
                      }}
                      className="relative z-10 my-2 w-[calc(100%-1.25rem)] p-4 backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-5">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {activeRelease.name} {activeRelease.version}
                          </p>

                          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
                            <GitCommit aria-hidden="true" className="size-3" />

                            <span className="font-mono">{activeRelease.commit ?? 'Unlinked'}</span>

                            <span aria-hidden="true">·</span>

                            <span>{activeRelease.environment ?? 'Production'}</span>

                            <span aria-hidden="true">·</span>

                            <span>{activeRelease.time}</span>
                          </div>
                        </div>

                        <span className="flex shrink-0 items-center gap-1 rounded-full border border-emerald-400 px-1 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
                          <Check aria-hidden="true" className="size-3" />
                          Verified
                        </span>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: string) {
  const normalizedStatus = status.toLowerCase()

  if (normalizedStatus.includes('released') || normalizedStatus.includes('live')) {
    return 'bg-emerald-500'
  }

  if (normalizedStatus.includes('ready') || normalizedStatus.includes('scheduled')) {
    return 'bg-amber-500'
  }

  if (normalizedStatus.includes('review') || normalizedStatus.includes('testing')) {
    return 'bg-sky-500'
  }

  return 'bg-muted-foreground'
}

export default ReleaseWorkflowIllustration
