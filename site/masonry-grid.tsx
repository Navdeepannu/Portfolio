'use client'

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { gsap } from 'gsap'

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const getSnapshot = (): number => {
    if (typeof window === 'undefined') return defaultValue

    const index = queries.findIndex((q) => window.matchMedia(q).matches)
    return values[index] ?? defaultValue
  }

  return useSyncExternalStore(
    (callback) => {
      const mediaQueries = queries.map((q) => window.matchMedia(q))

      mediaQueries.forEach((mql) => mql.addEventListener('change', callback))

      return () => {
        mediaQueries.forEach((mql) => mql.removeEventListener('change', callback))
      }
    },
    getSnapshot,
    () => defaultValue,
  )
}

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useLayoutEffect(() => {
    if (!ref.current) return

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    ro.observe(ref.current)

    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}

interface Item {
  id: string
  img: string
  url?: string
}

interface GridItem extends Item {
  x: number
  y: number
  w: number
  h: number
}

interface LoadedImageData {
  items: Item[]
  ratios: Record<string, number>
}

interface MasonryProps {
  items: Item[]
  ease?: string
  duration?: number
  stagger?: number
  animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random'
  scaleOnHover?: boolean
  hoverScale?: number
  blurToFocus?: boolean
  colorShiftOnHover?: boolean
}

const preloadImagesWithRatios = async (items: Item[]) => {
  const entries = await Promise.all(
    items.map(
      (item) =>
        new Promise<[string, number]>((resolve) => {
          const img = new window.Image()
          img.src = item.img

          img.onload = () => {
            const ratio = img.naturalWidth / img.naturalHeight
            resolve([item.id, Number.isFinite(ratio) ? ratio : 16 / 10])
          }

          img.onerror = () => {
            resolve([item.id, 16 / 10])
          }
        }),
    ),
  )

  return Object.fromEntries(entries) as Record<string, number>
}

const Masonry: React.FC<MasonryProps> = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.98,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:640px)'],
    [4, 3, 2],
    2,
  )

  const [containerRef, { width }] = useMeasure<HTMLDivElement>()
  const [loadedImageData, setLoadedImageData] = useState<LoadedImageData | null>(null)
  const hasMounted = useRef(false)

  useEffect(() => {
    let cancelled = false

    preloadImagesWithRatios(items).then((result) => {
      if (cancelled) return

      setLoadedImageData({ items, ratios: result })
    })

    return () => {
      cancelled = true
    }
  }, [items])

  const imagesReady = loadedImageData?.items === items

  const { grid, containerHeight } = useMemo(() => {
    if (!width || loadedImageData?.items !== items) {
      return { grid: [] as GridItem[], containerHeight: 0 }
    }

    const ratios = loadedImageData.ratios
    const gap = 12
    const colHeights = new Array(columns).fill(0)
    const totalGaps = (columns - 1) * gap
    const columnWidth = (width - totalGaps) / columns

    const grid = items.map((item) => {
      const shortestCol = colHeights.indexOf(Math.min(...colHeights))
      const ratio = ratios[item.id] ?? 16 / 10

      const x = shortestCol * (columnWidth + gap)
      const y = colHeights[shortestCol]
      const h = columnWidth / ratio
      const w = columnWidth

      colHeights[shortestCol] += h + gap

      return {
        ...item,
        x,
        y,
        w,
        h,
      }
    })

    return {
      grid,
      containerHeight: Math.max(...colHeights, 0),
    }
  }, [columns, items, loadedImageData, width])

  const getInitialPosition = useCallback(
    (item: GridItem) => {
      const containerRect = containerRef.current?.getBoundingClientRect()

      if (!containerRect) {
        return { x: item.x, y: item.y }
      }

      let direction = animateFrom

      if (animateFrom === 'random') {
        const dirs = ['top', 'bottom', 'left', 'right'] as const
        direction = dirs[Math.floor(Math.random() * dirs.length)]
      }

      switch (direction) {
        case 'top':
          return { x: item.x, y: -item.h - 40 }

        case 'bottom':
          return { x: item.x, y: item.y + 80 }

        case 'left':
          return { x: -item.w - 80, y: item.y }

        case 'right':
          return { x: containerRect.width + 80, y: item.y }

        case 'center':
          return {
            x: containerRect.width / 2 - item.w / 2,
            y: containerRect.height / 2 - item.h / 2,
          }

        default:
          return { x: item.x, y: item.y + 80 }
      }
    },
    [animateFrom, containerRef],
  )

  useLayoutEffect(() => {
    if (!imagesReady || grid.length === 0) return

    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`

      const animProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      }

      if (!hasMounted.current) {
        const start = getInitialPosition(item)

        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: start.x,
            y: start.y,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          },
        )
      } else {
        gsap.to(selector, {
          ...animProps,
          duration,
          ease,
          overwrite: 'auto',
        })
      }
    })

    hasMounted.current = true
  }, [blurToFocus, duration, ease, getInitialPosition, grid, imagesReady, stagger])

  const handleMouseEnter = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) {
        gsap.to(overlay, { opacity: 0.3, duration: 0.3 })
      }
    }
  }

  const handleMouseLeave = (id: string, element: HTMLElement) => {
    if (scaleOnHover) {
      gsap.to(`[data-key="${id}"]`, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    if (colorShiftOnHover) {
      const overlay = element.querySelector('.color-overlay') as HTMLElement | null
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3 })
      }
    }
  }

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight || 400 }}>
      {grid.map((item) => (
        <a
          key={item.id}
          data-key={item.id}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="absolute block cursor-pointer overflow-hidden rounded-lg border border-border/70 bg-muted shadow-[0px_10px_50px_-20px_rgba(0,0,0,0.35)]"
          style={{
            willChange: 'transform, width, height, opacity',
          }}
          onMouseEnter={(e) => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={(e) => handleMouseLeave(item.id, e.currentTarget)}
        >
          <img src={item.img} alt="" draggable={false} className="h-full w-full object-cover" />

          {colorShiftOnHover && (
            <div className="color-overlay pointer-events-none absolute inset-0 bg-linear-to-tr from-pink-500/50 to-sky-500/50 opacity-0" />
          )}
        </a>
      ))}
    </div>
  )
}

export default Masonry
