// components/page-preview/page-frame.tsx

'use client'

import { cn } from '@/lib/utils'

import {
  type PreviewViewport,
  usePagePreview,
} from './page-preview-provider'

type PageFrameProps = {
  src: string
  title: string
}

const viewportWidths: Record<PreviewViewport, string> = {
  desktop: 'w-full',
  tablet: 'w-[768px] max-w-full',
  mobile: 'w-[390px] max-w-full',
}

export function PageFrame({
  src,
  title,
}: PageFrameProps) {
  const { viewport } = usePagePreview()

  return (
    <main className="flex h-dvh justify-center overflow-hidden bg-muted/40">
      <div
        className={cn(
          'h-full overflow-hidden bg-background shadow-2xl',
          'transition-[width] duration-300 ease-out',
          viewportWidths[viewport],
        )}
      >
        <iframe
          src={src}
          title={title}
          sandbox="allow-scripts"
          className="size-full border-0 bg-background"
        />
      </div>
    </main>
  )
}
