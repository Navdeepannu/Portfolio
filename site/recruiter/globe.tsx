'use client'

import { useEffect, useRef } from 'react'
import createGlobe, { type COBEOptions } from 'cobe'
import { useMotionValue, useSpring } from 'motion/react'

import { cn } from '@/lib/utils'

const MOVEMENT_DAMPING = 1800
const ROTATION_SPEED = 0.00009

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,

  // Starts focused around Toronto / Canada
  phi: -1.75,
  theta: 0.35,

  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],

  // Toronto only
  markers: [{ location: [43.6532, -79.3832], size: 0.12 }],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const phiRef = useRef(config.phi ?? 0)
  const widthRef = useRef(0)
  const pointerInteracting = useRef<number | null>(null)

  const r = useMotionValue(0)

  const rs = useSpring(r, {
    mass: 1,
    damping: 40,
    stiffness: 80,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value

    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab'
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current, {
      ...config,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        // Static by default, with extremely slow movement
        if (pointerInteracting.current === null) {
          phiRef.current += ROTATION_SPEED
        }

        state.phi = phiRef.current + rs.get()
        state.theta = config.theta ?? 0.35
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    requestAnimationFrame(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = '1'
      }
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [config, rs])

  return (
    <div className={cn('absolute inset-0 mx-auto aspect-square w-full max-w-150', className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 contain-[layout_paint_size]"
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onPointerMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX)
          }
        }}
      />
    </div>
  )
}
