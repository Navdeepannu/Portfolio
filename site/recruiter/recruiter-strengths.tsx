'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  Boxes,
  ChevronLeft,
  ChevronRight,
  Cloud,
  Code2,
  Database,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import Image from 'next/image'

import { cn } from '@/lib/utils'
import { recruiterStrengths, type Strength } from '@/site/recruiter/recruiter-content'

const capabilityIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  'design-systems': Layers,
  backend: Boxes,
  database: Database,
  deployment: Cloud,
}

export function RecruiterStrengths() {
  const reduceMotion = useReducedMotion()
  const { capabilities } = recruiterStrengths

  const [activeId, setActiveId] = useState(capabilities[0].id)

  const active = capabilities.find((c) => c.id === activeId) ?? capabilities[0]

  return (
    <section
      id="technical-strengths"
      className="relative overflow-x-clip py-16 font-schibsted selection:bg-emerald-200/60 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {recruiterStrengths.eyebrow}
        </span>

        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {recruiterStrengths.title}
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{recruiterStrengths.description}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y mask-x-from-75% dark:border-neutral-800" />

        <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x mask-y-from-90% sm:inset-x-6 lg:inset-x-8 dark:border-neutral-800" />

          <div className="relative grid gap-3 bg-muted/50 p-2 md:grid-cols-[0.8fr_1.2fr] dark:bg-neutral-800/30">
            <Tabs capabilities={capabilities} activeId={activeId} setActiveId={setActiveId} />

            <FadeInContent active={active} reduceMotion={Boolean(reduceMotion)} />
          </div>
        </div>
      </div>
    </section>
  )
}

function Tabs({
  capabilities,
  activeId,
  setActiveId,
}: {
  capabilities: Strength[]
  activeId: string
  setActiveId: (id: string) => void
}) {
  const activeTabRef = useRef<HTMLButtonElement | null>(null)
  const tablistRef = useRef<HTMLDivElement | null>(null)
  const hasMountedRef = useRef(false)

  const activeIndex = capabilities.findIndex((capability) => capability.id === activeId)

  const safeActiveIndex = activeIndex === -1 ? 0 : activeIndex

  const goToPrevious = () => {
    const previousIndex = safeActiveIndex === 0 ? capabilities.length - 1 : safeActiveIndex - 1

    setActiveId(capabilities[previousIndex].id)
  }

  const goToNext = () => {
    const nextIndex = safeActiveIndex === capabilities.length - 1 ? 0 : safeActiveIndex + 1

    setActiveId(capabilities[nextIndex].id)
  }

  useEffect(() => {
    // Skip the initial mount. This section lives well below the fold in
    // recruiter mode, so running on mount would scroll the freshly-switched
    // page down to it.
    if (!hasMountedRef.current) {
      hasMountedRef.current = true
      return
    }

    const container = tablistRef.current
    const tab = activeTabRef.current

    if (!container || !tab) return

    // Center the active tab horizontally *within its own scroll container*.
    // `scrollIntoView` bubbles up the scroll chain and would scroll the
    // whole document vertically, which is what caused the page jump.
    const containerRect = container.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    const delta = tabRect.left + tabRect.width / 2 - (containerRect.left + containerRect.width / 2)

    container.scrollTo({ left: container.scrollLeft + delta, behavior: 'smooth' })
  }, [activeId])

  return (
    <div className="min-w-0 md:flex md:min-h-128 md:flex-col md:justify-between">
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Technical strengths"
        className={cn(
          '-mx-1 flex min-w-0 snap-x snap-mandatory gap-1.5 overflow-x-auto px-1 pb-1',
          '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0',
        )}
      >
        {capabilities.map((capability) => {
          const isActive = capability.id === activeId
          const Icon = capabilityIcons[capability.id] ?? Code2

          return (
            <button
              key={capability.id}
              ref={isActive ? activeTabRef : null}
              id={`strength-tab-${capability.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`strength-panel-${capability.id}`}
              onClick={() => setActiveId(capability.id)}
              className={cn(
                'relative isolate mt-2 shrink-0 snap-always px-3 py-2.5 text-left text-sm whitespace-nowrap transition-colors duration-300 md:mt-0',
                'focus-visible:ring-1 focus-visible:ring-foreground/20 focus-visible:outline-none',
                'md:w-full md:px-4 md:py-3 md:whitespace-normal',
                isActive ? 'text-foreground' : 'text-foreground/45 hover:text-foreground/75',
              )}
            >
              {isActive ? (
                <motion.span
                  layoutId="active-strength-tab"
                  className="absolute inset-0 z-0 rounded-lg bg-background shadow-sm ring-1 ring-border md:rounded-xl"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 36,
                    mass: 0.8,
                  }}
                />
              ) : null}

              <span className="relative z-10 flex items-center gap-2 md:justify-between md:gap-4">
                <span className="flex items-center gap-2">
                  <Icon className="size-3.5 opacity-70" aria-hidden />
                  <span className="font-medium">{capability.label}</span>
                </span>

                <span
                  className={cn(
                    'hidden size-1.5 rounded-full transition-opacity duration-300 md:block',
                    isActive ? 'bg-foreground opacity-70' : 'bg-foreground/30 opacity-0',
                  )}
                />
              </span>

              <span className="relative z-10 mt-1 hidden min-h-5 md:block">
                <span
                  className={cn(
                    'block text-xs leading-5 transition-opacity duration-300',
                    isActive ? 'opacity-60' : 'opacity-0',
                  )}
                >
                  {capability.level}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      <div className="hidden items-center gap-2 px-2 pb-2 md:flex">
        <button
          type="button"
          onClick={goToPrevious}
          aria-label="Previous capability"
          className="flex size-10 items-center justify-center rounded-full border bg-background text-foreground/70 shadow-sm transition-all hover:-translate-x-0.5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-950"
        >
          <ChevronLeft className="size-4" />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next capability"
          className="flex size-10 items-center justify-center rounded-full border bg-background text-foreground/70 shadow-sm transition-all hover:translate-x-0.5 hover:text-foreground focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none dark:border-neutral-800 dark:bg-neutral-950"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  )
}

function FadeInContent({ active, reduceMotion }: { active: Strength; reduceMotion: boolean }) {
  return (
    <div
      id={`strength-panel-${active.id}`}
      role="tabpanel"
      aria-labelledby={`strength-tab-${active.id}`}
      className="relative min-h-152 overflow-hidden rounded-3xl border bg-muted sm:min-h-136 md:min-h-128 dark:border-neutral-800 dark:bg-neutral-900"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950" />

          <Image
            src={active.image}
            alt=""
            fill
            priority={active.id === 'frontend'}
            sizes="(max-width: 768px) calc(100vw - 3rem), 720px"
            className="object-cover"
          />

          <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/10 to-transparent" />

          <div
            className={cn(
              'absolute inset-x-3 bottom-3 max-h-[calc(100%-1.5rem)] overflow-y-auto rounded-2xl border border-white/60 bg-white/88 p-4 shadow-sm backdrop-blur-md',
              '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              'sm:inset-x-4 sm:bottom-4 sm:p-5',
              'md:inset-x-6 md:bottom-6 md:max-h-none md:overflow-visible md:p-6',
              'dark:border-white/10 dark:bg-neutral-950/80',
            )}
          >
            <p className="mb-2 text-xs font-medium text-foreground/55 md:mb-3">{active.level}</p>

            <h3 className="font-times-heading text-2xl font-normal tracking-tight text-foreground md:text-3xl">
              {active.label}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">{active.summary}</p>

            <div className="mt-4 flex flex-wrap gap-1.5 md:mt-5 md:gap-2">
              {active.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground/60 md:px-3 dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-4 border-t pt-4 md:mt-5 dark:border-neutral-800">
              <p className="text-xs font-medium tracking-[0.16em] text-foreground/40 uppercase">
                Proof
              </p>

              <p className="mt-2 text-sm leading-6 text-foreground/65">{active.proof}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
