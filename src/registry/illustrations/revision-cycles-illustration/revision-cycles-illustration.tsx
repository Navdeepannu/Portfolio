'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

import { cn } from '@/lib/utils'

const revisionDots = Array.from({ length: 48 }, (_, index) => index)

export function RevisionCyclesIllustration() {
  const [cycleHighlight, setCycleHighlight] = useState<'removed' | 'remaining' | null>(null)

  return (
    <article className="group relative flex min-h-136 flex-col overflow-hidden rounded-lg border-b lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-b-0">
      <div className="relative flex items-center justify-between border-b bg-background/70 px-6 py-4">
        <div>
          <p className="text-xs font-medium">Revision rounds</p>

          <p className="mt-1 text-[11px] text-muted-foreground">
            Before and after connected publishing
          </p>
        </div>

        <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
          20 eliminated
        </span>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-6 py-12 sm:px-10">
        <div className="w-full max-w-md">
          <div aria-hidden="true" className="grid grid-cols-8 gap-2.5 sm:gap-3">
            {revisionDots.map((dot) => {
              const removed = dot < 20
              const boundaryDot = dot === 19
              const circleType = removed ? 'removed' : 'remaining'

              const isHighlighted = cycleHighlight === circleType
              const isMuted = cycleHighlight !== null && cycleHighlight !== circleType

              return (
                <motion.span
                  key={dot}
                  animate={
                    isHighlighted
                      ? {
                          opacity: [1, 0.35, 1, 0.55, 1],
                          scale: [1, 1.04, 0.98, 1.02, 1],
                          filter: [
                            'brightness(1)',
                            'brightness(1.8)',
                            'brightness(0.7)',
                            'brightness(1.4)',
                            'brightness(1)',
                          ],
                        }
                      : {
                          opacity: isMuted ? 0.7 : 1,
                          scale: 1,
                          filter: 'brightness(1)',
                        }
                  }
                  transition={
                    isHighlighted
                      ? {
                          duration: 0.48,
                          times: [0, 0.16, 0.4, 0.62, 1],
                          ease: 'linear',
                        }
                      : {
                          duration: 0.3,
                          ease: 'easeOut',
                        }
                  }
                  className={cn(
                    'aspect-square rounded-full border',
                    'transition-[border-color,background-color] duration-300 ease-out',

                    removed &&
                      !isHighlighted &&
                      'bg-[repeating-linear-gradient(45deg,transparent_0,transparent_3px,var(--border)_3px,var(--border)_4px)]',

                    removed &&
                      isHighlighted &&
                      'border-red-500/70 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_3px,rgba(239,68,68,0.5)_3px,rgba(239,68,68,0.5)_4px)]',

                    !removed && 'border-dashed',

                    !removed && isHighlighted && 'border-sky-500/70 bg-sky-500/10',

                    cycleHighlight === null && 'hover:z-10 hover:border-foreground/60',

                    boundaryDot && cycleHighlight === null && 'border-foreground',
                  )}
                />
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative grid grid-cols-2 border-t bg-background/70">
        <div
          onPointerEnter={() => setCycleHighlight('removed')}
          onPointerLeave={() => setCycleHighlight(null)}
          className={cn(
            'flex cursor-default items-center gap-2 border-r px-6 py-5 transition-colors duration-300',
            cycleHighlight === 'removed' ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <motion.span
            aria-hidden="true"
            animate={
              cycleHighlight === 'removed'
                ? {
                    opacity: [1, 0.3, 1, 0.55, 1],
                    scale: [1, 0.85, 1.1, 0.95, 1],
                    filter: [
                      'brightness(1)',
                      'brightness(1.8)',
                      'brightness(0.7)',
                      'brightness(1.4)',
                      'brightness(1)',
                    ],
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    filter: 'brightness(1)',
                  }
            }
            transition={
              cycleHighlight === 'removed'
                ? {
                    duration: 0.42,
                    times: [0, 0.16, 0.4, 0.62, 1],
                    ease: 'linear',
                  }
                : {
                    duration: 0.3,
                    ease: 'easeOut',
                  }
            }
            className={cn(
              'size-3 rounded-full border transition-[border-color,background-color] duration-300',
              cycleHighlight === 'removed'
                ? 'border-red-500/70 bg-[repeating-linear-gradient(45deg,transparent_0,transparent_2px,rgba(239,68,68,0.5)_2px,rgba(239,68,68,0.5)_3px)]'
                : 'bg-[repeating-linear-gradient(45deg,transparent_0,transparent_2px,var(--border)_2px,var(--border)_3px)]',
            )}
          />

          <span className="text-[11px]">20 eliminated</span>
        </div>

        <div
          onPointerEnter={() => setCycleHighlight('remaining')}
          onPointerLeave={() => setCycleHighlight(null)}
          className={cn(
            'flex cursor-default items-center gap-2 px-6 py-5 transition-colors duration-300',
            cycleHighlight === 'remaining' ? 'text-foreground' : 'text-muted-foreground',
          )}
        >
          <motion.span
            aria-hidden="true"
            animate={
              cycleHighlight === 'remaining'
                ? {
                    opacity: [1, 0.3, 1, 0.55, 1],
                    scale: [1, 0.85, 1.1, 0.95, 1],
                    filter: [
                      'brightness(1)',
                      'brightness(1.8)',
                      'brightness(0.7)',
                      'brightness(1.4)',
                      'brightness(1)',
                    ],
                  }
                : {
                    opacity: 1,
                    scale: 1,
                    filter: 'brightness(1)',
                  }
            }
            transition={
              cycleHighlight === 'remaining'
                ? {
                    duration: 0.42,
                    times: [0, 0.16, 0.4, 0.62, 1],
                    ease: 'linear',
                  }
                : {
                    duration: 0.3,
                    ease: 'easeOut',
                  }
            }
            className={cn(
              'size-3 rounded-full border border-dashed transition-[border-color,background-color] duration-300',
              cycleHighlight === 'remaining' ? 'border-sky-500/70 bg-sky-500/10' : 'border-border',
            )}
          />

          <span className="text-[11px]">28 remaining</span>
        </div>
      </div>
    </article>
  )
}

export default RevisionCyclesIllustration
