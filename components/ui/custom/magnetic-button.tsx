'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ButtonRef = React.ComponentRef<typeof Button>
type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>

type MagneticButtonProps = Omit<ButtonProps, 'asChild'> & {
  /**
   * Controls how far the button moves toward the cursor.
   */
  movement?: number
}

const springConfig = {
  stiffness: 180,
  damping: 10,
  mass: 0.5,
}

const MagneticButton = React.forwardRef<ButtonRef, MagneticButtonProps>(
  (
    { children, className, movement = 6, disabled, onPointerMove, onPointerLeave, ...props },
    ref,
  ) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const spotlightX = useMotionValue('50%')
    const spotlightY = useMotionValue('50%')

    const springX = useSpring(x, springConfig)
    const springY = useSpring(y, springConfig)

    function handlePointerMove(event: React.PointerEvent<HTMLButtonElement>) {
      onPointerMove?.(event)

      if (disabled) return

      /**
       * No magnetic movement on touch devices.
       */
      if (event.pointerType !== 'mouse') return

      const rect = event.currentTarget.getBoundingClientRect()

      const pointerX = event.clientX - rect.left
      const pointerY = event.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const moveX = ((pointerX - centerX) / centerX) * movement
      const moveY = ((pointerY - centerY) / centerY) * movement

      x.set(moveX)
      y.set(moveY)

      spotlightX.set(`${pointerX}px`)
      spotlightY.set(`${pointerY}px`)
    }

    function handlePointerLeave(event: React.PointerEvent<HTMLButtonElement>) {
      onPointerLeave?.(event)

      x.set(0)
      y.set(0)

      spotlightX.set('50%')
      spotlightY.set('50%')
    }

    return (
      <motion.span
        style={{ x: springX, y: springY }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        className="inline-flex will-change-transform motion-reduce:transform-none"
      >
        <Button
          ref={ref}
          disabled={disabled}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className={cn(
            'group relative isolate overflow-hidden',
            'transition-shadow duration-300 ease-out',
            'hover:shadow-md',
            'motion-reduce:transition-none',
            className,
          )}
          {...props}
        >
          <span className="relative z-10 inline-flex items-center">{children}</span>
        </Button>
      </motion.span>
    )
  },
)

MagneticButton.displayName = 'MagneticButton'

export { MagneticButton }
