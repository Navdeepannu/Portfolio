'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import type { Primitive } from '@/config/navui-primitives'
import {
  BLOCK_PREVIEW_CHROME_PX,
  BLOCK_PREVIEW_MIN_HEIGHT_PX,
  clampBlockPreviewHeightPx,
  getInitialBlockPreviewHeightPx,
  isBlockPreviewHeightPayload,
} from '@/features/navui/previews/block-preview-height'

export type BlockPreviewWidth = 'full' | 768 | 390

export default function BlockIframe({
  slug,
  reloadKey,
  title,
  primitive,
  width,
}: {
  slug: string
  reloadKey: number
  title: string
  primitive: Primitive
  width: BlockPreviewWidth
}) {
  const [frameHeightPx, setFrameHeightPx] = useState(BLOCK_PREVIEW_MIN_HEIGHT_PX)

  const applyContentHeight = useCallback((contentHeightPx: number) => {
    setFrameHeightPx(clampBlockPreviewHeightPx(contentHeightPx))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setFrameHeightPx(getInitialBlockPreviewHeightPx())
    }, 100)
  }, [slug, reloadKey])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (!isBlockPreviewHeightPayload(event.data)) return
      if (event.data.slug !== slug) return
      applyContentHeight(event.data.height)
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [slug, applyContentHeight])

  const iframeHeightPx = Math.max(frameHeightPx - BLOCK_PREVIEW_CHROME_PX, 1)

  return (
    <div
      className="max-w-full min-w-0 overflow-hidden rounded-xl bg-neutral-100 p-1 shadow-xs ring-1 ring-foreground/6.5 transition-[height] duration-200 ease-out dark:border-neutral-800 dark:bg-neutral-900"
      style={{ width: width === 'full' ? '100%' : width, height: frameHeightPx }}
    >
      <div className="h-full overflow-hidden rounded-lg bg-white p-2 shadow-sm dark:bg-neutral-950">
        <iframe
          key={`${slug}-${primitive}-${reloadKey}`}
          src={`/preview/${slug}`}
          title={title}
          loading="lazy"
          className={cn('block w-full border-0 shadow-inner')}
          style={{ height: iframeHeightPx }}
          aria-label={`Preview: ${title}`}
        />
      </div>
    </div>
  )
}
