'use client'

import type { ComponentPropsWithoutRef } from 'react'
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

export type AnimatedNumberProps = Omit<ComponentPropsWithoutRef<'span'>, 'children'> & {
  value: number
  from?: number
  prefix?: string
  suffix?: string
  decimalPlaces?: number
  duration?: number
  delay?: number
  locale?: string
}

export function AnimatedNumber({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  decimalPlaces = 0,
  duration = 1,
  delay = 0,
  locale = 'en-US',
  className,
  ...props
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const isInView = useInView(ref, {
    once: true,
    amount: 0.6,
  })

  const animatedValue = useMotionValue(from)

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: decimalPlaces,
      }),
    [decimalPlaces, locale],
  )

  const formattedValue = useTransform(animatedValue, (currentValue) => {
    return `${prefix}${formatter.format(currentValue)}${suffix}`
  })

  const accessibleValue = `${prefix}${formatter.format(value)}${suffix}`

  useEffect(() => {
    if (shouldReduceMotion) {
      animatedValue.set(value)
      return
    }

    if (!isInView) return

    const controls = animate(animatedValue, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    })

    return () => controls.stop()
  }, [animatedValue, delay, duration, isInView, shouldReduceMotion, value])

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)} {...props}>
      <motion.span aria-hidden="true">{formattedValue}</motion.span>
      <span className="sr-only">{accessibleValue}</span>
    </span>
  )
}

export default AnimatedNumber
