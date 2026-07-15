'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion, type Variants } from 'motion/react'

import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Motion — subtle reveal-on-scroll, shared across the portfolio sections.    */
/* Mirrors the spring feel already used in the landing layout group.          */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1] as const

export function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}) {
  const reduceMotion = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y, filter: 'blur(6px)' }}
      whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.55, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  )
}

/** Stagger container + item variants for grids and lists. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.04 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
}

/* -------------------------------------------------------------------------- */
/* Section shell — same rhythm, spacing, and eyebrow treatment as the rest    */
/* of the site so portfolio sections read as one continuous page.             */
/* -------------------------------------------------------------------------- */

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn('block font-mono text-xs text-emerald-600 dark:text-emerald-400/80', className)}
    >
      {children}
    </span>
  )
}

export function PortfolioSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  containerClassName,
  headerAside,
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  description?: ReactNode
  children?: ReactNode
  className?: string
  containerClassName?: string
  headerAside?: ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24',
        className,
      )}
    >
      <div className={cn('mx-auto max-w-6xl px-8', containerClassName)}>
        {(eyebrow || title || description) && (
          <Reveal>
            {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
            <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
              <div className="max-w-md text-left text-balance">
                {title ? (
                  <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
                    {title}
                  </h2>
                ) : null}
              </div>
              <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
                {description ? <p>{description}</p> : null}
                {headerAside}
              </div>
            </div>
          </Reveal>
        )}
        {children ? <div className={cn(eyebrow || title ? 'mt-12' : '')}>{children}</div> : null}
      </div>
    </section>
  )
}

/** Shared card surface — matches the rounded-xl / border / ring tokens used site-wide. */
export const cardSurface = 'rounded-xl border border-border/70 bg-card ring-1 ring-foreground/5'
