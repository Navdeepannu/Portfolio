'use client'

import { useCallback, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import {
  BLOCK_PREVIEW_CHROME_PX,
  BLOCK_PREVIEW_MIN_HEIGHT_PX,
  clampBlockPreviewHeightPx,
  getBlockPreviewMaxHeightPx,
  isBlockPreviewHeightPayload,
} from '@/site/block-preview-height'

export default function BlockIframe({
  slug,
  reloadKey,
  title,
}: {
  slug: string
  reloadKey: number
  title: string
}) {
  const [frameHeightPx, setFrameHeightPx] = useState(BLOCK_PREVIEW_MIN_HEIGHT_PX)

  const applyContentHeight = useCallback((contentHeightPx: number) => {
    setFrameHeightPx(clampBlockPreviewHeightPx(contentHeightPx))
  }, [])

  useEffect(() => {
    setFrameHeightPx(BLOCK_PREVIEW_MIN_HEIGHT_PX)
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

  useEffect(() => {
    const onResize = () => {
      setFrameHeightPx((current) =>
        Math.min(current, getBlockPreviewMaxHeightPx()),
      )
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const iframeHeightPx = Math.max(frameHeightPx - BLOCK_PREVIEW_CHROME_PX, 1)

  return (
    <div
      className="w-full min-w-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 p-1 shadow-inner transition-[height] duration-200 ease-out dark:border-neutral-800 dark:bg-neutral-900"
      style={{ height: frameHeightPx }}
    >
      <div className="h-full overflow-hidden rounded-lg bg-white p-2 shadow-sm dark:bg-neutral-950">
        <iframe
          key={`${slug}-${reloadKey}`}
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
