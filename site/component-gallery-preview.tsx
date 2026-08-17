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
  'animated-tabs': dynamic(() => import('@/components/showcase/gallery/animated-tabs')),
  'animated-numbers': dynamic(() => import('@/components/showcase/animated-numbers')),
  'expandable-card': dynamic(() => import('@/components/showcase/gallery/expandable-card')),
  'rail-nav': dynamic(() => import('@/components/showcase/gallery/rail-nav')),
  'proximity-nav': dynamic(() => import('@/components/showcase/proximity-nav')),
  'package-manager-command': dynamic(() => import('@/components/showcase/package-manager-command')),
  'contribution-graph': dynamic(() => import('@/components/showcase/contribution-graph')),
  'keyboard-shortcut': dynamic(() => import('@/components/showcase/keyboard-shortcut')),
} satisfies Record<string, React.ComponentType<ComponentGalleryPreviewProps>>

const heightClassNames: Record<ComponentGalleryHeight, string> = {
  sm: 'min-h-64 sm:min-h-72',
  md: 'min-h-80 sm:min-h-88',
  lg: 'min-h-96 sm:min-h-108',
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
}: {
  slug: string
  title: string
  height: ComponentGalleryHeight
  treatment?: ComponentGalleryTreatment
  label?: string
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
        'relative isolate flex w-full items-center justify-center overflow-hidden rounded-xl border border-border/70 p-2 contain-[layout_paint]',
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
