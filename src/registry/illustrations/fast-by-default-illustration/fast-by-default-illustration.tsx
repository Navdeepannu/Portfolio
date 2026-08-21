'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'

const SPEED_LINE_COUNT = 13

const speedLines = Array.from({ length: SPEED_LINE_COUNT }, (_, index) => {
  const center = (SPEED_LINE_COUNT - 1) / 2
  const distanceFromCenter = Math.abs(index - center) / center

  return {
    y: 34 + index * 7.7,
    start: 47 + distanceFromCenter * 16 + Math.sin(index * 1.25) * 7,
    end: 254 - distanceFromCenter * 23 + Math.cos(index * 0.85) * 7,
    thickness: 1.15 + (1 - distanceFromCenter) * 0.45,
    opacity: 0.4 + (1 - distanceFromCenter) * 0.55,
    direction: index <= center ? 1 : -1,
    travel: 8 + (1 - distanceFromCenter) * 9,
  }
})

function createSpeedLinePath({
  start,
  end,
  y,
  thickness,
}: {
  start: number
  end: number
  y: number
  thickness: number
}) {
  const taperLength = 12
  const roundedEnd = 4

  return [
    `M ${start} ${y}`,
    `L ${start + taperLength} ${y - thickness}`,
    `L ${end - roundedEnd} ${y - thickness}`,
    `Q ${end} ${y - thickness} ${end} ${y}`,
    `Q ${end} ${y + thickness} ${end - roundedEnd} ${y + thickness}`,
    `L ${start + taperLength} ${y + thickness}`,
    'Z',
  ].join(' ')
}

export function FastByDefaultIllustration() {
  const reduceMotion = useReducedMotion() ?? false
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      aria-hidden="true"
      className="relative h-45 w-full overflow-hidden md:h-60"
      onPointerEnter={() => {
        if (!reduceMotion) setIsHovered(true)
      }}
      onPointerLeave={() => {
        if (!reduceMotion) setIsHovered(false)
      }}
    >
      <svg
        className="absolute inset-0 size-full overflow-visible text-foreground"
        viewBox="0 0 300 160"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <clipPath id="speed-lines-clip">
            <rect x="34" y="20" width="232" height="120" rx="8" />
          </clipPath>
        </defs>
        <g clipPath="url(#speed-lines-clip)">
          {speedLines.map((line, index) => {
            const path = createSpeedLinePath(line)
            const travel = line.travel * line.direction

            return (
              <motion.path
                key={index}
                d={path}
                fill="currentColor"
                initial={false}
                animate={
                  isHovered && !reduceMotion
                    ? {
                        x: [0, travel, travel * 0.25, travel * -0.65, 0],
                        opacity: [
                          line.opacity,
                          Math.min(line.opacity + 0.25, 1),
                          line.opacity,
                          Math.max(line.opacity - 0.14, 0.25),
                          line.opacity,
                        ],
                      }
                    : {
                        x: 0,
                        opacity: line.opacity,
                      }
                }
                transition={
                  isHovered && !reduceMotion
                    ? {
                        duration: 0.9 + index * 0.025,
                        delay: index * 0.025,
                        ease: 'easeInOut',
                        repeat: Infinity,
                      }
                    : {
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }
                }
              />
            )
          })}
        </g>
      </svg>

      <div className="pointer-events-none absolute inset-y-[18%] left-0 w-16 bg-linear-to-r to-transparent" />
      <div className="pointer-events-none absolute inset-y-[18%] right-0 w-16 bg-linear-to-l to-transparent" />
    </div>
  )
}

export default FastByDefaultIllustration
