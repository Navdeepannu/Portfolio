'use client'

import { useEffect, useRef, type ReactNode } from 'react'

import type { Primitive } from '@/config/navui-primitives'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'

export function BlockCatalogItem({
  children,
  primitive,
  slug,
  title,
}: {
  children: ReactNode
  primitive: Primitive
  slug: string
  title: string
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let viewed = false
    let viewTimeout: ReturnType<typeof setTimeout> | undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (viewed) return

        if (!entry?.isIntersecting) {
          if (viewTimeout) clearTimeout(viewTimeout)
          viewTimeout = undefined
          return
        }

        viewTimeout = setTimeout(() => {
          viewed = true
          trackAnalyticsEvent(ANALYTICS_EVENTS.CATALOG_ITEM_VIEWED, {
            item_type: 'block',
            item_slug: slug,
            item_title: title,
            primitive,
            source: 'block_category',
          })
          observer.disconnect()
        }, 750)
      },
      { threshold: 0.2 },
    )

    observer.observe(element)

    return () => {
      if (viewTimeout) clearTimeout(viewTimeout)
      observer.disconnect()
    }
  }, [primitive, slug, title])

  return (
    <article ref={ref} className="flex scroll-mt-24 flex-col gap-4" id={slug}>
      {children}
    </article>
  )
}
