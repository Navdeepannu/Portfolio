'use client'

import { usePathname } from 'next/navigation'

import { ProgressiveBlur } from '@/components/ui/progressive-blur'

/** Fixed bottom fade on all routes except iframe block previews. */
export function GlobalBottomBlur() {
  const pathname = usePathname()

  if (pathname?.startsWith('/preview')) {
    return null
  }

  return (
    <ProgressiveBlur
      direction="bottom"
      blurLayers={6}
      blurIntensity={0.3}
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-14 md:h-16"
      aria-hidden
    />
  )
}
