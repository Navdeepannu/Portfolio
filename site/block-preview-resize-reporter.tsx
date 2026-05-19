'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

import { BLOCK_PREVIEW_HEIGHT_MESSAGE } from '@/site/block-preview-height'

function getPreviewSlug(pathname: string | null): string | null {
  if (!pathname?.startsWith('/preview/')) return null
  const slug = pathname.slice('/preview/'.length).split('/')[0]
  return slug || null
}

/**
 * Reports the rendered block height to the parent showcase iframe so the
 * preview panel can shrink-wrap short blocks and cap tall ones.
 */
export default function BlockPreviewResizeReporter() {
  const pathname = usePathname()
  const slug = getPreviewSlug(pathname)

  useEffect(() => {
    if (!slug) return

    const root = document.querySelector('[data-block-root]') as HTMLElement | null

    const report = () => {
      const height = Math.ceil(
        root?.scrollHeight ?? document.documentElement.scrollHeight ?? 0,
      )
      if (height <= 0) return

      window.parent.postMessage(
        { type: BLOCK_PREVIEW_HEIGHT_MESSAGE, slug, height },
        window.location.origin,
      )
    }

    report()

    const resizeObserver = new ResizeObserver(() => report())
    if (root) resizeObserver.observe(root)
    resizeObserver.observe(document.documentElement)

    const mutationObserver = new MutationObserver(() => report())
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    })

    window.addEventListener('load', report)
    window.addEventListener('resize', report)

    return () => {
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('load', report)
      window.removeEventListener('resize', report)
    }
  }, [slug])

  return null
}
