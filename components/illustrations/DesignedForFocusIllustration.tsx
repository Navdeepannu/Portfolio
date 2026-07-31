'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const FOCUS_DURATION = 3.6

const FOCUS_TIMES = [0, 0.12, 0.34, 0.48, 0.68, 0.8, 0.89, 0.94, 1]

const focusCircles = [
  {
    id: 'outer',
    initialX: -44,
    initialOpacity: 0.48,
    focusScale: 1.42,
    focusOpacity: 0.62,
  },
  {
    id: 'middle',
    initialX: 0,
    initialOpacity: 0.38,
    focusScale: 0.9,
    focusOpacity: 0,
  },
  {
    id: 'inner',
    initialX: 44,
    initialOpacity: 0.48,
    focusScale: 0.56,
    focusOpacity: 1,
  },
] as const

export function DesignedForFocusIllustration() {
  const reduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = useState(false)

  const shouldAnimate = isHovered && !reduceMotion

  return (
    <div
      aria-hidden="true"
      className="relative h-45 w-full overflow-hidden md:h-60"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={
          shouldAnimate
            ? {
                opacity: [1, 1, 1, 1, 1, 1, 0, 0, 1],
                filter: [
                  'blur(0px)',
                  'blur(0px)',
                  'blur(0px)',
                  'blur(0px)',
                  'blur(0px)',
                  'blur(0px)',
                  'blur(8px)',
                  'blur(8px)',
                  'blur(0px)',
                ],
                scale: [1, 1, 1, 1, 1, 1, 0.94, 0.94, 1],
              }
            : {
                opacity: 1,
                filter: 'blur(0px)',
                scale: 1,
              }
        }
        transition={
          shouldAnimate
            ? {
                duration: FOCUS_DURATION,
                times: FOCUS_TIMES,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.08,
              }
            : {
                duration: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }
        }
      >
        {focusCircles.map((circle) => (
          <motion.span
            key={circle.id}
            className="absolute size-22 rounded-full border border-foreground/60"
            initial={false}
            animate={
              shouldAnimate
                ? {
                    x: [
                      circle.initialX,
                      circle.initialX,
                      0,
                      0,
                      0,
                      0,
                      0,
                      circle.initialX,
                      circle.initialX,
                    ],
                    scale: [1, 1, 1, 1, circle.focusScale, circle.focusScale, 0.9, 1, 1],
                    opacity: [
                      circle.initialOpacity,
                      circle.initialOpacity,
                      0.82,
                      1,
                      circle.focusOpacity,
                      circle.focusOpacity,
                      0,
                      circle.initialOpacity,
                      circle.initialOpacity,
                    ],
                  }
                : {
                    x: circle.initialX,
                    scale: 1,
                    opacity: circle.initialOpacity,
                  }
            }
            transition={
              shouldAnimate
                ? {
                    duration: FOCUS_DURATION,
                    times: FOCUS_TIMES,
                    ease: [0.22, 1, 0.36, 1],
                    repeat: Infinity,
                    repeatDelay: 0.08,
                  }
                : {
                    duration: 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          />
        ))}
      </motion.div>
    </div>
  )
}

export default DesignedForFocusIllustration
