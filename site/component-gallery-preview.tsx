'use client'

import dynamic from 'next/dynamic'
import { useCallback, useRef, useState } from 'react'
import { useInView } from 'motion/react'

import type { ComponentGalleryHeight, ComponentGalleryTreatment } from '@/data/component-types'
import { cn } from '@/lib/utils'

export type ComponentGalleryPreviewProps = {
  portalContainer: HTMLElement | null
}

const galleryPreviewBySlug = {
  'segment-spotlight': dynamic(() => import('@/components/showcase/segment-spotlight')),
  'magnetic-button': dynamic(() => import('@/components/showcase/magnetic-button')),
  'animated-tabs': dynamic(() => import('@/components/showcase/animated-tabs')),
  'animated-numbers': dynamic(() => import('@/components/showcase/animated-numbers')),
  'expandable-card': dynamic(() => import('@/components/showcase/expandable-card')),
  'rail-nav': dynamic(() => import('@/components/showcase/gallery/rail-nav')),
  'proximity-nav': dynamic(() => import('@/components/showcase/proximity-nav')),
  'package-manager-command': dynamic(() => import('@/components/showcase/package-manager-command')),
  'contribution-graph': dynamic(() => import('@/components/showcase/contribution-graph')),
  'keyboard-shortcut': dynamic(() => import('@/components/showcase/keyboard-shortcut')),
} satisfies Record<string, React.ComponentType<ComponentGalleryPreviewProps>>

const heightClassNames: Record<ComponentGalleryHeight, string> = {
  sm: 'h-60',
  md: 'h-72 sm:h-80',
  lg: 'h-96 sm:h-112',
  xl: 'h-128 sm:h-144',
  stacked: 'min-h-344 sm:min-h-232 lg:h-144 lg:min-h-0',
}

const treatmentClassNames: Record<ComponentGalleryTreatment, string> = {
  default: 'bg-background',
  muted: 'bg-muted/35',
  contrast: 'bg-zinc-950 text-white dark:bg-zinc-900',
}

export function ComponentGalleryPreview({
  slug,
  title,
  height,
  treatment = 'default',
  label,
  embedded = false,
}: {
  slug: string
  title: string
  height: ComponentGalleryHeight
  treatment?: ComponentGalleryTreatment
  label?: string
  embedded?: boolean
}) {
  const boundaryRef = useRef<HTMLDivElement>(null)
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(null)
  const isInView = useInView(boundaryRef, { once: true, margin: '240px 0px' })
  const Preview = galleryPreviewBySlug[slug as keyof typeof galleryPreviewBySlug]

  const setBoundary = useCallback((node: HTMLDivElement | null) => {
    boundaryRef.current = node
    setPortalContainer(node)
  }, [])

  return (
    <div
      ref={setBoundary}
      role="region"
      aria-label={label ?? `${title} interactive preview`}
      aria-busy={!isInView}
      data-gallery-preview={slug}
      className={cn(
        'relative isolate flex w-full items-center justify-center overflow-hidden contain-[layout_paint]',
        embedded ? 'p-3 sm:p-4' : 'rounded-xl border border-border/70 p-2',
        heightClassNames[height],
        treatmentClassNames[treatment],
      )}
    >
      {isInView && Preview ? (
        <Preview portalContainer={portalContainer} />
      ) : (
        <div aria-hidden="true" className="flex items-center gap-2 text-muted-foreground/35">
          <span className="size-2 rounded-full bg-current" />
          <span className="h-2 w-10 rounded-full bg-current" />
          <span className="size-2 rounded-full bg-current" />
        </div>
      )}
    </div>
  )
}
