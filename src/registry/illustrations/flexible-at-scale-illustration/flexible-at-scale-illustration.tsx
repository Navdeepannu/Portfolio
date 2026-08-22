'use client'

import type { PointerEvent } from 'react'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const FLEXIBLE_LINE_COUNT = 17

const flexibleLines = Array.from({ length: FLEXIBLE_LINE_COUNT }, (_, index) => {
  const progress = index / (FLEXIBLE_LINE_COUNT - 1)

  // outer lines away from the illustration edges.
  return 0.04 + progress * 0.92
})

type FlexibleLineProps = {
  position: number
  pointerX: MotionValue<number>
  interaction: MotionValue<number>
  reduceMotion: boolean
}

function FlexibleLine({ position, pointerX, interaction, reduceMotion }: FlexibleLineProps) {
  const influence = useTransform(() => {
    if (reduceMotion) return 0

    const distance = pointerX.get() - position
    const influenceRadius = 0.17

    return Math.exp(-Math.pow(distance / influenceRadius, 2))
  })

  const left = useTransform(() => {
    if (reduceMotion) {
      return `${position * 100}%`
    }

    const pointer = pointerX.get()
    const amount = interaction.get()
    const distance = pointer - position
    const strength = influence.get()

    const flexiblePosition = position + distance * strength * amount * 0.88

    return `${clamp(flexiblePosition, 0.02, 0.98) * 100}%`
  })

  const opacity = useTransform(() => {
    if (reduceMotion) return 0.24

    const amount = interaction.get()
    const strength = influence.get()

    return 0.2 + amount * (0.08 + strength * 0.72)
  })

  const scaleY = useTransform(() => {
    if (reduceMotion) return 1

    return 1 + interaction.get() * influence.get() * 0.16
  })

  const scaleX = useTransform(() => {
    if (reduceMotion) return 1

    return 1 + interaction.get() * influence.get() * 0.65
  })

  return (
    <motion.span
      className="absolute inset-y-[16%] w-px origin-center bg-foreground"
      style={{
        left,
        x: '-50%',
        opacity,
        scaleX,
        scaleY,
      }}
    />
  )
}

export function FlexibleAtScaleIllustration() {
  const reduceMotion = useReducedMotion() ?? false

  const rawPointerX = useMotionValue(0.5)
  const rawInteraction = useMotionValue(0)

  const pointerX = useSpring(rawPointerX, {
    stiffness: 280,
    damping: 30,
    mass: 0.35,
  })

  const interaction = useSpring(rawInteraction, {
    stiffness: 220,
    damping: 24,
    mass: 0.4,
  })

  const updatePointerPosition = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return

    const bounds = event.currentTarget.getBoundingClientRect()
    const localX = event.clientX - bounds.left
    const normalizedX = localX / bounds.width

    rawPointerX.set(clamp(normalizedX, 0.03, 0.97))
  }

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion) return

    updatePointerPosition(event)
    rawInteraction.set(1)
  }

  const handlePointerLeave = () => {
    if (reduceMotion) return

    rawInteraction.set(0)
  }

  return (
    <div
      aria-hidden="true"
      className="relative h-45 w-full overflow-hidden md:h-60"
      onPointerEnter={handlePointerEnter}
      onPointerMove={updatePointerPosition}
      onPointerLeave={handlePointerLeave}
    >
      {flexibleLines.map((position, index) => (
        <FlexibleLine
          key={index}
          position={position}
          pointerX={pointerX}
          interaction={interaction}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  )
}

export default FlexibleAtScaleIllustration
