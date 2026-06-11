'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, type Variants } from 'motion/react'

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

export type JourneyItem = {
  title: string
  subtitle: string
  detail: string
  variant?: 'default' | 'checkpoint'
}

export const journeyItems: JourneyItem[] = [
  {
    title: 'Learn',
    subtitle: 'UI foundations',
    detail: 'Spacing, layout, typography, and interaction basics.',
  },
  {
    title: 'Build',
    subtitle: 'Real interfaces',
    detail: 'Turning ideas into usable screens and components.',
  },
  {
    title: 'Ship',
    subtitle: 'Deployed products',
    detail: 'Deploying, fixing, improving, and learning from usage.',
  },
  {
    title: 'Systemize',
    subtitle: 'Reusable components',
    detail: 'Creating components, tokens, and consistent UI logic.',
  },
  {
    title: 'Scale',
    subtitle: 'Blocks & tools',
    detail: 'Building UI blocks and developer-friendly systems.',
    variant: 'checkpoint',
  },
]

/* -------------------------------------------------------------------------- */
/* Illustrations                                                              */
/* -------------------------------------------------------------------------- */

function JourneyIllustration({
  index,
  active,
  className,
}: {
  index: number
  active?: boolean
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion() ?? false

  const shift = active && !prefersReducedMotion ? { x: 2, y: -2 } : { x: 0, y: 0 }

  return (
    <div
      className={cn(
        'relative flex h-14 w-full items-center justify-center overflow-hidden rounded-lg bg-muted/40 ring-1 ring-foreground/5',
        className,
      )}
    >
      <motion.div
        animate={shift}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="relative"
      >
        {index === 0 && (
          <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden>
            <rect x="4" y="4" width="36" height="3" rx="1.5" className="fill-foreground/15" />
            <rect x="4" y="12" width="24" height="3" rx="1.5" className="fill-foreground/25" />
            <rect x="4" y="20" width="30" height="3" rx="1.5" className="fill-emerald-500/40" />
          </svg>
        )}
        {index === 1 && (
          <svg width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden>
            <rect x="4" y="4" width="14" height="10" rx="2" className="fill-foreground/20" />
            <rect x="22" y="4" width="14" height="10" rx="2" className="fill-foreground/12" />
            <rect x="4" y="18" width="32" height="10" rx="2" className="fill-emerald-500/35" />
          </svg>
        )}
        {index === 2 && (
          <svg width="36" height="32" viewBox="0 0 36 32" fill="none" aria-hidden>
            <circle cx="18" cy="22" r="4" className="fill-emerald-500/50" />
            <path
              d="M18 18V8M18 8L14 12M18 8L22 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-foreground/35"
            />
          </svg>
        )}
        {index === 3 && (
          <svg width="44" height="28" viewBox="0 0 44 28" fill="none" aria-hidden>
            <circle cx="8" cy="14" r="3" className="fill-foreground/25" />
            <circle cx="22" cy="14" r="3" className="fill-emerald-500/45" />
            <circle cx="36" cy="14" r="3" className="fill-foreground/25" />
            <path
              d="M11 14H19M25 14H33"
              stroke="currentColor"
              strokeWidth="1"
              className="text-foreground/20"
            />
          </svg>
        )}
        {index === 4 && (
          <svg width="44" height="32" viewBox="0 0 44 32" fill="none" aria-hidden>
            <rect x="6" y="8" width="10" height="10" rx="2" className="fill-foreground/15" />
            <rect x="18" y="6" width="10" height="10" rx="2" className="fill-emerald-500/40" />
            <rect x="30" y="10" width="10" height="10" rx="2" className="fill-foreground/15" />
            <motion.circle
              cx="34"
              cy="6"
              r="2"
              className="fill-emerald-400/70"
              animate={prefersReducedMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        )}
      </motion.div>

      {!prefersReducedMotion && (
        <>
          <motion.span
            aria-hidden
            className="absolute top-2 right-2 size-1 rounded-full bg-emerald-500/40"
            animate={{ y: [0, -3, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.2 }}
          />
          <motion.span
            aria-hidden
            className="absolute bottom-2 left-2 size-0.5 rounded-full bg-foreground/25"
            animate={{ x: [0, 2, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3.2, repeat: Infinity, delay: index * 0.15 }}
          />
        </>
      )}
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Path                                                                       */
/* -------------------------------------------------------------------------- */

function JourneyPath({
  inView,
  orientation,
  className,
}: {
  inView: boolean
  orientation: 'horizontal' | 'vertical'
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion() ?? false

  if (orientation === 'horizontal') {
    return (
      <svg
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-6 top-15 hidden h-8 md:block',
          className,
        )}
        viewBox="0 0 800 32"
        preserveAspectRatio="none"
      >
        <path
          d="M0 16 C120 16, 120 8, 200 8 S280 24, 360 24 S440 8, 520 8 S600 24, 680 24 S760 16, 800 16"
          className="stroke-border/70"
          fill="none"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <motion.path
          d="M0 16 C120 16, 120 8, 200 8 S280 24, 360 24 S440 8, 520 8 S600 24, 680 24 S760 16, 800 16"
          className="stroke-emerald-500/50"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{
            pathLength: prefersReducedMotion ? 1 : 0,
            opacity: prefersReducedMotion ? 1 : 0.4,
          }}
          animate={{ pathLength: inView ? 1 : 0, opacity: inView ? 1 : 0.4 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 1.1,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
        />
      </svg>
    )
  }

  return (
    <div
      aria-hidden
      className={cn('absolute top-6 bottom-6 left-[1.65rem] w-px md:hidden', className)}
    >
      <div className="absolute inset-0 bg-border/60" />
      <motion.div
        className="absolute inset-x-0 top-0 bg-linear-to-b from-emerald-500/50 via-emerald-500/25 to-emerald-500/10"
        initial={{ height: prefersReducedMotion ? '100%' : '0%' }}
        animate={{ height: inView ? '100%' : '0%' }}
        transition={{
          duration: prefersReducedMotion ? 0 : 1,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.1,
        }}
      />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Node                                                                       */
/* -------------------------------------------------------------------------- */

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

function JourneyNode({
  item,
  index,
  active,
  onHover,
  onLeave,
  className,
}: {
  item: JourneyItem
  index: number
  active?: boolean
  onHover?: () => void
  onLeave?: () => void
  className?: string
}) {
  const prefersReducedMotion = useReducedMotion() ?? false
  const isCheckpoint = item.variant === 'checkpoint'

  return (
    <motion.li
      variants={nodeVariants}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      tabIndex={0}
      className={cn(
        'group relative list-none outline-none',
        isCheckpoint ? 'md:col-span-1 md:min-w-38' : 'md:min-w-0',
        className,
      )}
    >
      <div
        className={cn(
          'relative rounded-xl p-px transition-shadow duration-300',
          isCheckpoint && 'md:-mt-1',
        )}
      >
        <div
          className={cn(
            'pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100',
            isCheckpoint
              ? 'bg-linear-to-br from-emerald-500/30 via-emerald-400/10 to-transparent'
              : 'bg-linear-to-br from-emerald-500/20 via-transparent to-transparent',
            active && 'opacity-100',
          )}
        />

        <article
          className={cn(
            'relative overflow-hidden rounded-[11px] border bg-card/90 backdrop-blur-sm transition-[border-color,box-shadow] duration-300',
            isCheckpoint
              ? 'border-emerald-500/35 px-4 py-4 shadow-[0_0_0_1px_rgba(16,185,129,0.06)] md:py-5'
              : 'border-border/60 px-3 py-3',
            active && 'border-emerald-500/40 shadow-sm',
            'group-hover:border-border group-focus-visible:border-border',
            isCheckpoint && 'group-hover:border-emerald-500/50',
          )}
        >
          {isCheckpoint ? (
            <Badge
              variant="outline"
              className="mb-2 border-emerald-500/30 bg-emerald-500/5 font-mono text-[9px] tracking-widest text-emerald-700 uppercase dark:text-emerald-300"
            >
              Now
            </Badge>
          ) : null}

          <JourneyIllustration index={index} active={active} />

          <h3
            className={cn(
              'mt-2.5 font-medium text-foreground',
              isCheckpoint ? 'text-sm' : 'text-xs',
            )}
          >
            {item.title}
          </h3>
          <p className="mt-0.5 text-[10px] text-muted-foreground">{item.subtitle}</p>

          <motion.p
            initial={false}
            animate={{
              opacity: active ? 1 : 0,
              height: active ? 'auto' : 0,
              marginTop: active ? 8 : 0,
            }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden text-[10px] leading-relaxed text-foreground/70"
          >
            {item.detail}
          </motion.p>

          {isCheckpoint && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -top-px -right-px size-8 rounded-bl-full bg-emerald-500/10"
              animate={prefersReducedMotion ? undefined : { opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          )}
        </article>
      </div>

      <span
        aria-hidden
        className={cn(
          'absolute z-10 hidden size-2.5 -translate-x-1/2 rounded-full border bg-card transition-colors duration-300 md:block',
          isCheckpoint
            ? '-top-1 left-1/2 border-emerald-500/50'
            : '-top-1 left-1/2 border-border/80',
          active && 'border-emerald-500 bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.35)]',
        )}
      />
    </motion.li>
  )
}

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function BuildJourneySection({
  items = journeyItems,
  className,
}: {
  items?: JourneyItem[]
  className?: string
}) {
  const { mode } = usePortfolioMode()
  const { buildJourney } = getPortfolioContent(mode)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.35 })
  const prefersReducedMotion = useReducedMotion() ?? false

  return (
    <section
      ref={sectionRef}
      id="build-journey"
      className={cn(
        'relative overflow-x-clip py-14 font-schibsted selection:bg-emerald-200/60 max-md:py-12 md:py-16',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(120,120,120,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(120,120,120,0.04)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)] bg-size-[24px_24px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 size-112 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-8 md:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 md:mb-8">
          <div>
            <span className="mb-2 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
              {buildJourney.eyebrow}
            </span>
            <h2 className="font-times-heading text-lg font-normal tracking-tight text-foreground md:text-xl">
              {buildJourney.title}
            </h2>
          </div>
          <p className="max-w-xs text-[11px] leading-relaxed text-muted-foreground md:text-right">
            {buildJourney.description}
          </p>
        </div>

        <div className="relative rounded-xl border border-border/60 bg-card/40 p-4 ring-1 ring-foreground/5 backdrop-blur-sm md:p-6">
          <JourneyPath inView={inView} orientation="horizontal" />
          <JourneyPath inView={inView} orientation="vertical" />

          <motion.ol
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: prefersReducedMotion ? 0 : 0.08,
                  delayChildren: prefersReducedMotion ? 0 : 0.12,
                },
              },
            }}
            className={cn(
              'relative grid gap-3',
              'max-md:gap-4 max-md:pl-10',
              'md:grid-cols-5 md:items-start md:gap-2 lg:gap-3',
            )}
          >
            {items.map((item, index) => (
              <JourneyNode
                key={item.title}
                item={item}
                index={index}
                active={activeIndex === index}
                onHover={() => setActiveIndex(index)}
                onLeave={() => setActiveIndex(null)}
              />
            ))}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

/** @deprecated Use `BuildJourneySection` */
export const ExperienceSection = BuildJourneySection
