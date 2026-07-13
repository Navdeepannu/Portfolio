'use client'

import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from 'gsap'

export interface ShowcaseItem {
  id: string
  title: string
  img: string
  url: string
  category: 'blocks' | 'components' | 'pages'
}

interface ShowcaseWallProps {
  items: ShowcaseItem[]
}

const tabs = [
  { label: 'Blocks', value: 'blocks' },
  { label: 'Components', value: 'components' },
  { label: 'Pages', value: 'pages' },
] as const

type TabValue = (typeof tabs)[number]['value']

type ImageMeta = Record<string, number>

const loadImageRatio = (src: string) => {
  return new Promise<number>((resolve) => {
    const image = new window.Image()
    image.src = src

    image.onload = () => {
      const ratio = image.naturalWidth / image.naturalHeight
      resolve(Number.isFinite(ratio) ? ratio : 16 / 10)
    }

    image.onerror = () => {
      resolve(16 / 10)
    }
  })
}

const ShowcaseWall: React.FC<ShowcaseWallProps> = ({ items }) => {
  const [activeTab, setActiveTab] = useState<TabValue>('blocks')
  const [ratios, setRatios] = useState<ImageMeta>({})
  const gridRef = useRef<HTMLDivElement | null>(null)

  const availableTabs = useMemo(() => {
    return tabs.filter((tab) => items.some((item) => item.category === tab.value))
  }, [items])

  const activeItems = useMemo(() => {
    return items.filter((item) => item.category === activeTab)
  }, [items, activeTab])

  useEffect(() => {
    let isCancelled = false

    const loadRatios = async () => {
      const entries = await Promise.all(
        activeItems.map(async (item) => {
          const ratio = await loadImageRatio(item.img)
          return [item.id, ratio] as const
        }),
      )

      if (!isCancelled) {
        setRatios((prev) => ({
          ...prev,
          ...Object.fromEntries(entries),
        }))
      }
    }

    loadRatios()

    return () => {
      isCancelled = true
    }
  }, [activeItems])

  useLayoutEffect(() => {
    if (!gridRef.current) return

    const cards = gridRef.current.querySelectorAll('[data-showcase-card]')

    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 28,
        scale: 0.98,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.65,
        stagger: 0.055,
        ease: 'power3.out',
      },
    )
  }, [activeTab, activeItems.length])

  const handleMouseEnter = (element: HTMLElement) => {
    gsap.to(element, {
      y: -4,
      scale: 0.985,
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = (element: HTMLElement) => {
    gsap.to(element, {
      y: 0,
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
    })
  }

  return (
    <div className="relative overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="inline-flex rounded-full border border-border/70 bg-background/80 p-1 shadow-sm backdrop-blur">
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.value

              return (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setActiveTab(tab.value)}
                  className={[
                    'rounded-full px-4 py-1.5 text-sm transition',
                    isActive
                      ? 'bg-foreground text-background shadow-sm'
                      : 'text-muted-foreground hover:text-foreground',
                  ].join(' ')}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="relative mt-8 px-4 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-background to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-background to-transparent sm:w-24" />

        <div
          className="relative mx-auto max-w-360 overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
          }}
        >
          <div
            ref={gridRef}
            className={[
              'relative left-1/2 w-[165vw] -translate-x-1/2',
              'columns-2 [column-gap:10px]',
              'sm:w-[140vw] sm:columns-3 sm:[column-gap:12px]',
              'lg:w-full lg:columns-3 lg:[column-gap:12px]',
            ].join(' ')}
          >
            {activeItems.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                data-showcase-card
                onMouseEnter={(e) => handleMouseEnter(e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="mb-2 block break-inside-avoid rounded-xl border border-border/70 bg-background/70 p-1 shadow-[0_20px_70px_-35px_rgba(0,0,0,0.45)] backdrop-blur transition sm:mb-3"
              >
                <div
                  className="relative overflow-hidden rounded-lg bg-muted"
                  style={{
                    aspectRatio: ratios[item.id] ?? 16 / 10,
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    draggable={false}
                    className="h-full w-full object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseWall
