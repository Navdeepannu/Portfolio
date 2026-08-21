'use client'

import type { AnimatePresenceProps, HTMLMotionProps } from 'motion/react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

export function IconSwap(props: React.PropsWithChildren<AnimatePresenceProps>) {
  return <AnimatePresence mode="popLayout" initial={false} {...props} />
}

type MotionElement = typeof motion.div | typeof motion.span

export function IconSwapItem({
  as: Component = motion.div,
  ...props
}: HTMLMotionProps<'div'> & {
  as?: MotionElement
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Component
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: 'blur(2px)' }
      }
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: 'blur(2px)' }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : 0.16,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    />
  )
}
