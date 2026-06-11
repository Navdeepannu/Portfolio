'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Boxes, Cloud, Code2, Database, Layers, Link, type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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
      className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {recruiterStrengths.eyebrow}
        </span>

        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading text-2xl font-normal tracking-tight text-neutral-900 md:text-3xl dark:text-neutral-200">
              {recruiterStrengths.title}
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-2 text-sm leading-6 font-medium text-foreground/70 lg:pt-6">
            <p>{recruiterStrengths.description}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y mask-x-from-75% dark:border-neutral-800" />

        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x mask-y-from-90% dark:border-neutral-800" />

          <div className="overflow-hidden">
            <div className="-mx-8 px-8">
              <div className="grid gap-3 bg-muted/50 p-2 ring-1 ring-black/5 md:grid-cols-[0.8fr_1.2fr] dark:bg-neutral-800/30 dark:ring-white/10">
                <Tabs capabilities={capabilities} activeId={activeId} setActiveId={setActiveId} />

                <FadeInContent active={active} reduceMotion={Boolean(reduceMotion)} />
              </div>
            </div>
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

  return (
    <div className="flex min-h-128 flex-col justify-between p-2">
      <div className="flex flex-col gap-1.5">
        {capabilities.map((capability) => {
          const isActive = capability.id === activeId

          return (
            <button
              key={capability.id}
              type="button"
              onClick={() => setActiveId(capability.id)}
              className={cn(
                'relative isolate rounded-xl px-4 py-3 text-left text-sm transition-colors duration-300',
                'focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:outline-none',
                isActive ? 'text-foreground' : 'text-foreground/40 hover:text-foreground/70',
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="active-strength-tab"
                  className="absolute inset-0 z-0 rounded-xl bg-background shadow-sm ring-1 ring-border"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 36,
                    mass: 0.8,
                  }}
                />
              )}

              <span className="relative z-10 flex items-center justify-between gap-4">
                <span className="font-medium">{capability.label}</span>

                <span
                  className={cn(
                    'size-1.5 rounded-full transition-opacity duration-300',
                    isActive ? 'bg-foreground opacity-70' : 'bg-foreground/30 opacity-0',
                  )}
                />
              </span>

              <span className="relative z-10 mt-1 block min-h-5">
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

      <div className="flex items-center gap-2 px-2 pb-2">
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
    <div className="relative min-h-128 overflow-hidden rounded-3xl border bg-muted dark:border-neutral-800 dark:bg-neutral-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.01 }}
          animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          {/* fallback while image loads */}
          <div className="absolute inset-0 bg-linear-to-br from-neutral-100 via-neutral-200 to-neutral-300 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-950" />

          <Image
            src={active.image}
            alt=""
            fill
            priority={active.id === 'frontend'}
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />

          {/* overlays */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
          <div className="absolute inset-0 bg-linear-to-t from-black/45 via-black/10 to-transparent" />

          {/* content card */}
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/85 p-5 shadow-sm backdrop-blur-md md:inset-x-6 md:bottom-6 md:p-6 dark:border-white/10 dark:bg-neutral-950/80">
            <p className="mb-3 text-xs font-medium text-foreground/55">{active.level}</p>

            <h3 className="font-times-heading text-2xl font-normal tracking-tight text-foreground md:text-3xl">
              {active.label}
            </h3>

            <p className="mt-3 max-w-xl text-sm leading-6 text-foreground/70">{active.summary}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {active.technologies.map((technology) => (
                <span
                  key={technology}
                  className="rounded-full border bg-background/70 px-3 py-1 text-xs font-medium text-foreground/60 dark:border-neutral-800 dark:bg-neutral-900/70"
                >
                  {technology}
                </span>
              ))}
            </div>

            <div className="mt-5 border-t pt-4 dark:border-neutral-800">
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
