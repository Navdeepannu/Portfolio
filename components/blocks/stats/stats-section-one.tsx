'use client'

import type { ComponentProps } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'motion/react'

import { cn } from '@/lib/utils'

export type BusinessMetric = {
  value: number
  label: string
  detail?: string
  prefix?: string
  suffix?: string
  decimals?: number
}

export type AnimatedStatValueProps = {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  duration?: number
  className?: string
}

export type StatsSectionOneProps = ComponentProps<'section'> & {
  eyebrow?: string
  heading?: string
  description?: string
  metrics?: readonly BusinessMetric[]
}

const defaultMetrics: readonly BusinessMetric[] = [
  {
    value: 38,
    suffix: '%',
    label: 'Faster delivery',
    detail: 'Within the first 90 days',
  },
  {
    value: 18,
    suffix: ' hrs',
    label: 'Saved every week',
    detail: 'Per operations team',
  },
  {
    value: 3.2,
    suffix: '×',
    decimals: 1,
    label: 'Return on spend',
    detail: 'Measured over 12 months',
  },
  {
    value: 99.9,
    suffix: '%',
    decimals: 1,
    label: 'Platform uptime',
    detail: 'Across all workspaces',
  },
]

export function AnimatedStatValue({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  duration = 1.1,
  className,
}: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()
  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  })

  const animatedValue = useMotionValue(shouldReduceMotion ? value : 0)

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }),
    [decimals],
  )

  const formattedValue = useTransform(
    animatedValue,
    (latest) => `${prefix}${formatter.format(latest)}${suffix}`,
  )

  const finalValue = `${prefix}${formatter.format(value)}${suffix}`

  useEffect(() => {
    if (!isInView) return

    if (shouldReduceMotion) {
      animatedValue.set(value)
      return
    }

    const controls = animate(animatedValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => controls.stop()
  }, [animatedValue, duration, isInView, shouldReduceMotion, value])

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      <motion.span aria-hidden>{formattedValue}</motion.span>
      <span className="sr-only">{finalValue}</span>
    </span>
  )
}

export function StatsSectionOne({
  className,
  eyebrow = 'Measured impact',
  heading = 'Outcomes you can measure',
  description = 'Clear performance metrics that demonstrate the operational and business impact of your product.',
  metrics = defaultMetrics,
  ...props
}: StatsSectionOneProps) {
  return (
    <section
      data-slot="stats-section-one"
      className={cn('bg-background py-20 text-foreground sm:py-28', className)}
      {...props}
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>

            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          </div>

          <p className="max-w-xl text-base leading-7 text-pretty text-muted-foreground sm:text-lg lg:justify-self-end">
            {description}
          </p>
        </div>

        <dl className="mt-12 grid overflow-hidden rounded-2xl border sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <div
              key={`${metric.value}-${metric.label}`}
              className={cn(
                'min-w-0 p-6 sm:p-8',
                index > 0 && 'border-t sm:border-t-0',
                index % 2 !== 0 && 'sm:border-l',
                index >= 2 && 'sm:border-t',
                index > 0 && 'lg:border-t-0 lg:border-l',
              )}
            >
              <dd className="text-3xl font-semibold tracking-tight sm:text-4xl">
                <AnimatedStatValue
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  decimals={metric.decimals}
                />
              </dd>

              <dt className="mt-3 font-medium">{metric.label}</dt>

              {metric.detail ? (
                <p className="mt-4 border-t pt-4 text-sm leading-6 text-muted-foreground">
                  {metric.detail}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

export default StatsSectionOne
