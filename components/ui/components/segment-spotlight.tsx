'use client'

import { useEffect, useRef, useState, type RefObject } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import type { LucideIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type SegmentSpotlightSegment = {
  id: string
  text: string
}

export type SegmentSpotlightFocus = {
  id: string
  label: string
  icon: LucideIcon
  segmentIds: string[]
}

export type SegmentSpotlightProps = {
  segments: SegmentSpotlightSegment[]
  focuses: SegmentSpotlightFocus[]
  className?: string
  headingClassName?: string
}

type SegmentVisualState = {
  active: boolean
  blurred: boolean
}

/* -------------------------------------------------------------------------- */
/* SegmentSpotlight                                                           */
/* -------------------------------------------------------------------------- */

export function SegmentSpotlight({
  segments,
  focuses,
  className,
  headingClassName,
}: SegmentSpotlightProps) {
  const [highlight, setHighlight] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const segmentRefs = useRef<Record<string, HTMLSpanElement | null>>({})

  const activeFocus = focuses.find((focus) => focus.id === highlight) ?? null

  const getSegmentStates = (): Record<string, SegmentVisualState> => {
    const base: Record<string, SegmentVisualState> = {}
    for (const segment of segments) {
      base[segment.id] = { active: false, blurred: false }
    }

    if (!activeFocus) return base

    for (const segment of segments) {
      const isActive = activeFocus.segmentIds.includes(segment.id)
      base[segment.id] = {
        active: isActive,
        blurred: !isActive,
      }
    }

    return base
  }

  const segmentStates = getSegmentStates()
  const [boxPosition, setBoxPosition] = useState({ x: 0, width: 0 })

  useEffect(() => {
    if (!containerRef.current || !highlight || !activeFocus) return

    const containerRect = containerRef.current.getBoundingClientRect()
    let startX = Infinity
    let endX = 0

    for (const segmentId of activeFocus.segmentIds) {
      const node = segmentRefs.current[segmentId]
      if (!node) continue

      const rect = node.getBoundingClientRect()
      const relativeX = rect.left - containerRect.left
      startX = Math.min(startX, relativeX)
      endX = Math.max(endX, relativeX + rect.width)
    }

    if (startX !== Infinity) {
      setBoxPosition({
        x: startX,
        width: endX - startX,
      })
    }
  }, [highlight, activeFocus, segments])

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-4',
        className,
      )}
    >
      <div className="relative flex min-h-20 flex-col items-center">
        <div
          ref={containerRef}
          className={cn(
            'relative flex items-center justify-center',
            headingClassName,
          )}
        >
          {segments.map((segment) => {
            const state = segmentStates[segment.id] ?? { active: false, blurred: false }

            return (
              <TextSegment
                key={segment.id}
                isActive={state.active}
                isBlurred={state.blurred}
                segmentRef={(node) => {
                  segmentRefs.current[segment.id] = node
                }}
              >
                {segment.text}
              </TextSegment>
            )
          })}

          <AnimatedDashedBox
            width={boxPosition.width}
            x={boxPosition.x}
            visible={highlight !== null}
            label={activeFocus?.label}
          />
        </div>
      </div>

      <div className="flex items-center">
        {focuses.map(({ id, icon: Icon }) => (
          <motion.button
            key={id}
            type="button"
            onMouseEnter={() => setHighlight(id)}
            onMouseLeave={() => setHighlight(null)}
            className="relative rounded-lg p-2 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="size-5 transition-colors duration-150" aria-hidden />
            <AnimatePresence>
              {highlight === id ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 -z-10 rounded-lg bg-foreground/5"
                  aria-hidden
                />
              ) : null}
            </AnimatePresence>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* TextSegment — matches app/demo/page.tsx                                    */
/* -------------------------------------------------------------------------- */

interface TextSegmentProps {
  children: React.ReactNode
  isActive: boolean
  isBlurred: boolean
  segmentRef: (node: HTMLSpanElement | null) => void
}

function TextSegment({ children, isActive, isBlurred, segmentRef }: TextSegmentProps) {
  return (
    <motion.span
      ref={segmentRef}
      className={cn(
        'text-3xl font-medium tracking-tight md:text-4xl',
        isActive ? 'text-foreground' : 'text-muted-foreground',
      )}
      animate={{
        filter: isBlurred ? 'blur(4px)' : 'blur(0px)',
        opacity: isActive ? 1 : 0.6,
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.span>
  )
}

/* -------------------------------------------------------------------------- */
/* AnimatedDashedBox — matches app/demo/page.tsx                              */
/* -------------------------------------------------------------------------- */

function AnimatedDashedBox({
  width,
  x,
  visible,
  label,
}: {
  width: number
  x: number
  visible?: boolean
  label?: string
}) {
  const paddingX = 6
  const boxWidth = Math.max(width + paddingX * 2, 40)
  const boxHeight = 16
  const path = `
     M 0 0
     L 0 ${boxHeight}
     L ${boxWidth} ${boxHeight}
     L ${boxWidth} 0
  `

  return (
    <motion.div
      transition={{ duration: 0.3, ease: 'easeOut' }}
      animate={{ opacity: visible ? 1 : 0, x: x - paddingX }}
      className="pointer-events-none absolute top-full left-0 mt-4 flex flex-col items-start"
      layoutId="animated-dashed-box"
    >
      <motion.svg
        width={boxWidth}
        height={boxHeight}
        viewBox={`0 0 ${boxWidth} ${boxHeight}`}
        fill="none"
        className="overflow-visible"
      >
        <motion.path
          d={path}
          stroke="var(--color-muted-foreground)"
          strokeWidth={1}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          strokeDasharray="4 4"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, -16] }}
          transition={{ duration: 2, ease: 'linear', repeat: Infinity }}
        />
      </motion.svg>
      <div className="relative mt-1 h-6 min-w-16 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {label ? (
            <motion.span
              key={label}
              initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              exit={{ opacity: 0, y: 0, filter: 'blur(4px)' }}
              className="text-sm text-muted-foreground"
            >
              {label}
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
