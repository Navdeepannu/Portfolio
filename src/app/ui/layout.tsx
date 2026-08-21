import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { UiLibraryJsonLd } from '@/components/shared/site-json-ld'
import { uiMetadata } from '@/config/sites'

export const metadata: Metadata = uiMetadata

export default function UiLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <UiLibraryJsonLd />
      {children}
    </>
  )
}
