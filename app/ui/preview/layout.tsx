import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import BlockPreviewResizeReporter from '@/site/block-preview-resize-reporter'

/** Block iframe previews — not meant for search indexing. */
export const metadata: Metadata = {
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

/**
 * Isolated shell for iframe previews. Height follows block content so the
 * parent showcase can shrink-wrap; tall blocks scroll inside the iframe cap.
 */
export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BlockPreviewResizeReporter />
      <div className="w-full bg-background text-foreground antialiased" data-block-root>
        {children}
      </div>
    </>
  )
}
