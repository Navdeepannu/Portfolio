// conditional-page-navbar.tsx

'use client'

import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'

import { PageNavbar } from './page-navbar'

export function ConditionalPageNavbar() {
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  const isPagesIndex = segment === null
  const isEmbedded = searchParams.get('embed') === '1'

  if (isPagesIndex || isEmbedded) {
    return null
  }

  return <PageNavbar />
}
