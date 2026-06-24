'use client'

import { useRef, type PointerEvent } from 'react'
import Image from 'next/image'
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'

const cards = [
  {
    id: 1,
    src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh6PM8M0RlaETPbLcZQjyfg2StNvuB13w8rID',
    title: 'product 1',
  },
  {
    id: 2,
    src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlNnsZGqeJIMXrF35vasVbLAD0jBGhUEyeltu8',
    title: 'product 2',
  },
  {
    id: 3,
    src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlViWYjKWua1nwvRWLo6bCcepS4YzPXjuFMh7T',
    title: 'product 3',
  },
  {
    id: 4,
    src: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlHE1tDPtqHjv3VPCtBSMksEJOn7pmfxyc9IoU',
    title: 'product 4',
  },
]

const positions = [
  { x: -220, y: 12, rotate: -5, z: 10, depth: 0.8 },
  { x: -75, y: -20, rotate: -2, z: 30, depth: 1.05 },
  { x: 75, y: 8, rotate: 5, z: 40, depth: 1.2 },
  { x: 225, y: -16, rotate: 2, z: 20, depth: 0.9 },
]

const STAGE_WIDTH = 760
const STAGE_HEIGHT = 340
const INFLUENCE_RADIUS = 500

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getInfluence(
  mouseX: number,
  mouseY: number,
  cardX: number,
  cardY: number,
  active: number,
) {
  if (active === 0) return 0

  const dx = mouseX - cardX
  const dy = mouseY - cardY
  const distance = Math.sqrt(dx * dx + dy * dy)

  const linear = clamp(1 - distance / INFLUENCE_RADIUS, 0, 1)

  // Squared falloff makes the closest image react a lot more
  // and far images barely move.
  return linear * linear
}

export function MagneticCards() {
  const prefersReducedMotion = useReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const active = useMotionValue(0)

  const velocityX = useVelocity(mouseX)
  const velocityY = useVelocity(mouseY)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return

    const stage = stageRef.current
    if (!stage) return

    const rect = stage.getBoundingClientRect()

    const scaleX = rect.width / STAGE_WIDTH
    const scaleY = rect.height / STAGE_HEIGHT

    const x = (event.clientX - rect.left - rect.width / 2) / scaleX
    const y = (event.clientY - rect.top - rect.height / 2) / scaleY

    mouseX.set(x)
    mouseY.set(y)
    active.set(1)
  }

  function handlePointerLeave() {
    active.set(0)
  }

  return (
    <section className="relative min-h-svh w-full overflow-hidden bg-background">
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          ref={stageRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.18,
                staggerChildren: 0.1,
              },
            },
          }}
          className="relative h-[340px] w-[760px] scale-[0.48] sm:scale-[0.65] md:scale-[0.85] lg:scale-100"
        >
          {cards.map((card, index) => (
            <MagneticCard
              key={card.id}
              card={card}
              position={positions[index]}
              mouseX={mouseX}
              mouseY={mouseY}
              velocityX={velocityX}
              velocityY={velocityY}
              active={active}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

type MagneticCardProps = {
  card: (typeof cards)[number]
  position: (typeof positions)[number]
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  velocityX: MotionValue<number>
  velocityY: MotionValue<number>
  active: MotionValue<number>
  index: number
}

function MagneticCard({
  card,
  position,
  mouseX,
  mouseY,
  velocityX,
  velocityY,
  active,
  index,
}: MagneticCardProps) {
  const rawX = useTransform(() => {
    const influence = getInfluence(mouseX.get(), mouseY.get(), position.x, position.y, active.get())

    return clamp(velocityX.get() * 0.055 * influence * position.depth, -120, 120)
  })

  const rawY = useTransform(() => {
    const influence = getInfluence(mouseX.get(), mouseY.get(), position.x, position.y, active.get())

    return clamp(velocityY.get() * 0.055 * influence * position.depth, -90, 90)
  })

  const rawRotate = useTransform(() => {
    const influence = getInfluence(mouseX.get(), mouseY.get(), position.x, position.y, active.get())

    const extraRotate = clamp(velocityX.get() * 0.004 * influence * position.depth, -10, 10)

    return position.rotate + extraRotate
  })

  const rawScale = useTransform(() => {
    const influence = getInfluence(mouseX.get(), mouseY.get(), position.x, position.y, active.get())

    return 1 + influence * 0.045
  })

  const x = useSpring(rawX, {
    stiffness: 200,
    damping: 10,
    mass: 0.75,
  })

  const y = useSpring(rawY, {
    stiffness: 200,
    damping: 10,
    mass: 0.75,
  })

  const rotate = useSpring(rawRotate, {
    stiffness: 200,
    damping: 10,
    mass: 0.8,
  })

  const scale = useSpring(rawScale, {
    stiffness: 140,
    damping: 18,
    mass: 0.8,
  })

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{
        marginLeft: position.x,
        marginTop: position.y,
        zIndex: position.z,
      }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <motion.div
          variants={{
            hidden: {
              opacity: 0,
              scale: 0,
              filter: 'blur(10px)',
              x: -80,
            },
            visible: {
              opacity: 1,
              filter: 'blur(0px)',

              scale: 1,
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 180,
                damping: 10,
                mass: 1,
              },
            },
          }}
        >
          <motion.div
            style={{ x, y, rotate, scale }}
            className="relative size-56 overflow-hidden rounded-2xl bg-muted shadow-2xl will-change-transform"
          >
            <Image
              src={card.src}
              alt={card.title}
              fill
              sizes="224px"
              priority={index < 2}
              draggable={false}
              className="object-cover select-none"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
