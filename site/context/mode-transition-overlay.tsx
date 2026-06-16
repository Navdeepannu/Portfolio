'use client'

import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { animate } from 'motion'
import { useReducedMotion } from 'motion/react'

const ENTER_DURATION = 0.95
const ENTER_DELAY = 0.045
const ENTER_EASE = [0.22, 1, 0.36, 1] as const

const EXIT_DURATION = 0.52
const EXIT_EASE = [0.72, 0, 0.22, 1] as const
const EXIT_OVERLAP_DELAY = 0.025

const SWITCH_PROGRESS = 0.84

const BASE_STROKE_WIDTH = 10
const COVER_STROKE_WIDTH = 700

const START_SCALE = 1
const COVER_SCALE = 1.14
const EXIT_SCALE = 1.24

const PATH_ONE_STROKE = 'oklch(98% 0.006 166)'
const PATH_TWO_STROKE = 'oklch(92.5% 0.065 166)'

export const PATH_ONE = `M227.549 1818.76
C227.549 1818.76 406.016 2207.75 569.049 2130.26
C843.431 1999.85 -264.104 1002.3 227.549 876.262
C552.918 792.849 773.647 2456.11 1342.05 2130.26
C1885.43 1818.76 14.9644 455.772 760.548 137.262
C1342.05 -111.152 1663.5 2266.35 2209.55 1972.76
C2755.6 1679.18 1536.63 384.467 1826.55 137.262
C2013.5 -22.1463 2209.55 381.262 2209.55 381.262`

export const PATH_TWO = `M1661.28 2255.51
C1661.28 2255.51 2311.09 1960.37 2111.78 1817.01
C1944.47 1696.67 718.456 2870.17 499.781 2255.51
C308.969 1719.17 2457.51 1613.83 2111.78 963.512
C1766.05 313.198 427.949 2195.17 132.281 1455.51
C-155.219 736.292 2014.78 891.514 1708.78 252.012
C1437.81 -314.29 369.471 909.169 132.281 566.512
C18.1772 401.672 244.781 193.012 244.781 193.012`

export type ModeTransitionOverlayRef = {
  transition: (onCovered: () => void | Promise<void>) => Promise<void>
}

type AnimationControl = PromiseLike<void> & {
  stop: () => void
}

function getPath(svg: SVGSVGElement | null) {
  return svg?.querySelector<SVGPathElement>('path') ?? null
}

function setRootVisible(root: HTMLDivElement | null) {
  if (!root) return

  root.style.visibility = 'visible'
  root.style.opacity = '1'
  root.style.pointerEvents = 'auto'
}

function setRootHidden(root: HTMLDivElement | null) {
  if (!root) return

  root.style.opacity = '0'
  root.style.visibility = 'hidden'
  root.style.pointerEvents = 'none'
}

function setSvgScale(svg: SVGSVGElement | null, scale: number) {
  if (!svg) return

  svg.style.opacity = '1'
  svg.style.transformOrigin = '50% 50%'
  svg.style.transform = `scale(${scale})`
}

function setDashArray(path: SVGPathElement, value: number) {
  const next = String(value)

  path.style.strokeDasharray = next
  path.setAttribute('stroke-dasharray', next)
}

function setDashOffset(path: SVGPathElement, value: number) {
  const next = String(value)

  path.style.strokeDashoffset = next
  path.setAttribute('stroke-dashoffset', next)
}

function setPathStrokeWidth(path: SVGPathElement, width: number) {
  const next = String(width)

  path.style.strokeWidth = next
  path.setAttribute('stroke-width', next)
}

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress
}

function easeInOut(progress: number) {
  return progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
}

function remapProgress(value: number, inputMin: number, inputMax: number) {
  return clamp((value - inputMin) / (inputMax - inputMin))
}

function widthCurve(progress: number) {
  /**
   * This is the important part.
   *
   * Width does not grow instantly from frame 1.
   * It starts after the path is slightly visible, then grows smoothly.
   */
  const widthProgress = remapProgress(progress, 0.08, 0.9)

  return easeInOut(widthProgress)
}

function resetPath(svg: SVGSVGElement | null) {
  const path = getPath(svg)

  if (!path) return 0

  const length = path.getTotalLength()

  setDashArray(path, length)
  setDashOffset(path, length)
  setPathStrokeWidth(path, BASE_STROKE_WIDTH)

  return length
}

function showCoveredPath(svg: SVGSVGElement | null) {
  const path = getPath(svg)

  if (!path) return 0

  const length = path.getTotalLength()

  setDashArray(path, length)
  setDashOffset(path, 0)
  setPathStrokeWidth(path, COVER_STROKE_WIDTH)

  return length
}

function updateEnterPath({
  path,
  svg,
  length,
  progress,
}: {
  path: SVGPathElement
  svg: SVGSVGElement
  length: number
  progress: number
}) {
  const drawProgress = clamp(progress)
  const growProgress = widthCurve(drawProgress)

  setDashOffset(path, length * (1 - drawProgress))

  setPathStrokeWidth(path, lerp(BASE_STROKE_WIDTH, COVER_STROKE_WIDTH, growProgress))

  setSvgScale(svg, lerp(START_SCALE, COVER_SCALE, growProgress))
}

export const ModeTransitionOverlay = forwardRef<ModeTransitionOverlayRef>(
  function ModeTransitionOverlay(_, ref) {
    const rootRef = useRef<HTMLDivElement>(null)
    const oneRef = useRef<SVGSVGElement>(null)
    const twoRef = useRef<SVGSVGElement>(null)

    const prefersReducedMotion = useReducedMotion()

    const runIdRef = useRef(0)
    const activeAnimationsRef = useRef<AnimationControl[]>([])
    const activeResolveRef = useRef<(() => void) | null>(null)

    const stopCurrentAnimations = useCallback(() => {
      runIdRef.current += 1

      for (const animation of activeAnimationsRef.current) {
        animation.stop()
      }

      activeAnimationsRef.current = []

      activeResolveRef.current?.()
      activeResolveRef.current = null
    }, [])

    const playAnimations = useCallback(
      (runId: number, animations: AnimationControl[], onComplete?: () => void) => {
        activeAnimationsRef.current = animations

        return new Promise<void>((resolve) => {
          activeResolveRef.current = resolve

          Promise.all(animations)
            .then(() => {
              if (runId !== runIdRef.current) return

              activeAnimationsRef.current = []
              activeResolveRef.current = null

              onComplete?.()
              resolve()
            })
            .catch(() => {
              if (runId !== runIdRef.current) return

              activeAnimationsRef.current = []
              activeResolveRef.current = null

              resolve()
            })
        })
      },
      [],
    )

    useEffect(() => {
      setRootHidden(rootRef.current)

      setSvgScale(oneRef.current, START_SCALE)
      setSvgScale(twoRef.current, START_SCALE)

      resetPath(oneRef.current)
      resetPath(twoRef.current)

      return () => {
        stopCurrentAnimations()
      }
    }, [stopCurrentAnimations])

    useImperativeHandle(
      ref,
      () => ({
        async transition(onCovered) {
          const root = rootRef.current
          const oneSvg = oneRef.current
          const twoSvg = twoRef.current
          const onePath = getPath(oneSvg)
          const twoPath = getPath(twoSvg)

          if (!root || !oneSvg || !twoSvg || !onePath || !twoPath) {
            await onCovered()
            return
          }

          stopCurrentAnimations()

          const runId = ++runIdRef.current
          const oneLength = resetPath(oneSvg)
          const twoLength = resetPath(twoSvg)

          setSvgScale(oneSvg, START_SCALE)
          setSvgScale(twoSvg, START_SCALE)
          setRootVisible(root)

          if (prefersReducedMotion) {
            showCoveredPath(oneSvg)
            showCoveredPath(twoSvg)

            await onCovered()

            setRootHidden(root)
            setSvgScale(oneSvg, START_SCALE)
            setSvgScale(twoSvg, START_SCALE)
            resetPath(oneSvg)
            resetPath(twoSvg)

            return
          }

          let hasSwitched = false
          let resolveSwitch!: () => void

          const switchPromise = new Promise<void>((resolve) => {
            resolveSwitch = resolve
            activeResolveRef.current = resolve
          })

          let enterAnimations: AnimationControl[] = []

          const switchMode = async () => {
            if (hasSwitched || runId !== runIdRef.current) return

            hasSwitched = true

            showCoveredPath(oneSvg)
            showCoveredPath(twoSvg)

            setSvgScale(oneSvg, COVER_SCALE)
            setSvgScale(twoSvg, COVER_SCALE)

            for (const animation of enterAnimations) {
              animation.stop()
            }

            activeAnimationsRef.current = []

            await onCovered()

            // Add this after the actual mode/layout switch
            window.history.replaceState(null, '', window.location.pathname)
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'instant' as ScrollBehavior,
            })

            activeResolveRef.current = null
            resolveSwitch()
          }

          enterAnimations = [
            animate(0, 1, {
              duration: ENTER_DURATION,
              ease: ENTER_EASE,
              onUpdate(progress) {
                updateEnterPath({
                  path: onePath,
                  svg: oneSvg,
                  length: oneLength,
                  progress,
                })
              },
            }) as AnimationControl,

            animate(0, 1, {
              delay: ENTER_DELAY,
              duration: ENTER_DURATION,
              ease: ENTER_EASE,
              onUpdate(progress) {
                updateEnterPath({
                  path: twoPath,
                  svg: twoSvg,
                  length: twoLength,
                  progress,
                })

                if (progress >= SWITCH_PROGRESS) {
                  void switchMode()
                }
              },
            }) as AnimationControl,
          ]

          activeAnimationsRef.current = enterAnimations

          void Promise.all(enterAnimations).then(() => {
            if (!hasSwitched) {
              void switchMode()
            }
          })

          await switchPromise

          if (runId !== runIdRef.current) return

          const finalOneLength = showCoveredPath(oneSvg)
          const finalTwoLength = showCoveredPath(twoSvg)

          const exitAnimations: AnimationControl[] = [
            animate(0, 1, {
              duration: EXIT_DURATION,
              ease: EXIT_EASE,
              onUpdate(progress) {
                setDashOffset(twoPath, -finalTwoLength * progress)
                setSvgScale(twoSvg, lerp(COVER_SCALE, EXIT_SCALE, progress))
              },
            }) as AnimationControl,

            animate(0, 1, {
              delay: EXIT_OVERLAP_DELAY,
              duration: EXIT_DURATION,
              ease: EXIT_EASE,
              onUpdate(progress) {
                setDashOffset(onePath, -finalOneLength * progress)
                setSvgScale(oneSvg, lerp(COVER_SCALE, EXIT_SCALE, progress))
              },
            }) as AnimationControl,
          ]

          await playAnimations(runId, exitAnimations, () => {
            setRootHidden(root)

            setSvgScale(oneSvg, START_SCALE)
            setSvgScale(twoSvg, START_SCALE)

            resetPath(oneSvg)
            resetPath(twoSvg)
          })
        },
      }),
      [playAnimations, prefersReducedMotion, stopCurrentAnimations],
    )

    return (
      <div
        ref={rootRef}
        aria-hidden="true"
        className="fixed inset-0 z-9999 overflow-hidden"
        style={{
          opacity: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          isolation: 'isolate',
          contain: 'layout paint style',
        }}
      >
        <OneSvg ref={oneRef} />
        <TwoSvg ref={twoRef} />
      </div>
    )
  },
)

const OneSvg = forwardRef<SVGSVGElement>(function OneSvg(_, ref) {
  return (
    <svg
      ref={ref}
      width="500"
      height="500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2453 2273"
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      preserveAspectRatio="xMidYMid slice"
      style={{
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      <path
        d={PATH_ONE}
        stroke={PATH_ONE_STROKE}
        strokeWidth={BASE_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          willChange: 'stroke-dashoffset, stroke-width',
        }}
      />
    </svg>
  )
})

const TwoSvg = forwardRef<SVGSVGElement>(function TwoSvg(_, ref) {
  return (
    <svg
      ref={ref}
      width="500"
      height="500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2453 2273"
      className="pointer-events-none fixed inset-0 h-screen w-screen"
      preserveAspectRatio="xMidYMid slice"
      style={{
        transformOrigin: '50% 50%',
        willChange: 'transform',
      }}
    >
      <path
        d={PATH_TWO}
        stroke={PATH_TWO_STROKE}
        strokeWidth={BASE_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          willChange: 'stroke-dashoffset, stroke-width',
        }}
      />
    </svg>
  )
})
