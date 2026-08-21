'use client'

import * as React from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type SpringOptions,
} from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type MagneticButtonProps = React.ComponentProps<typeof Button> & {
  movement?: number
  wrapperClassName?: string
  springOptions?: SpringOptions
}

const defaultSpringOptions: SpringOptions = {
  stiffness: 180,
  damping: 10,
  mass: 0.5,
}

function MagneticButton({
  children,
  className,
  wrapperClassName,
  movement = 6,
  springOptions = defaultSpringOptions,
  disabled,
  onPointerMove,
  onPointerLeave,
  onPointerCancel,
  ...props
}: MagneticButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springOptions)
  const springY = useSpring(y, springOptions)

  function resetPosition() {
    x.set(0)
    y.set(0)
  }

  function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
    onPointerMove?.(event)

    if (
      event.defaultPrevented ||
      disabled ||
      prefersReducedMotion ||
      event.pointerType !== 'mouse'
    ) {
      return
    }

    const rect = event.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const pointerX = event.clientX - rect.left
    const pointerY = event.clientY - rect.top

    x.set(((pointerX - centerX) / centerX) * movement)
    y.set(((pointerY - centerY) / centerY) * movement)
  }

  function handlePointerLeave(event: React.PointerEvent<HTMLButtonElement>) {
    onPointerLeave?.(event)

    if (!event.defaultPrevented) resetPosition()
  }

  function handlePointerCancel(event: React.PointerEvent<HTMLButtonElement>) {
    onPointerCancel?.(event)

    if (!event.defaultPrevented) resetPosition()
  }

  return (
    <motion.span
      data-slot="magnetic-button-wrapper"
      style={{ x: springX, y: springY }}
      whileTap={disabled || prefersReducedMotion ? undefined : { scale: 0.98 }}
      className={cn(
        'inline-flex will-change-transform motion-reduce:transform-none',
        wrapperClassName,
      )}
    >
      <Button
        data-slot="magnetic-button"
        disabled={disabled}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onPointerCancel={handlePointerCancel}
        className={cn(
          'relative isolate overflow-hidden transition-shadow duration-300 ease-out hover:shadow-md motion-reduce:transition-none',
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.span>
  )
}

export { MagneticButton, type MagneticButtonProps }
