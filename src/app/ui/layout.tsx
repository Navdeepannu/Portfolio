import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { UiLibraryJsonLd } from '@/components/shared/site-json-ld'
import { uiMetadata } from '@/config/sites'
import { PrimitiveProvider } from '@/features/navui/primitives/primitive-provider'
import { getNavUIPrimitivePreference } from '@/features/navui/primitives/primitive-preference'

export const metadata: Metadata = uiMetadata

export default async function UiLayout({ children }: { children: ReactNode }) {
  const primitive = await getNavUIPrimitivePreference()

  return (
    <PrimitiveProvider primitive={primitive}>
      <UiLibraryJsonLd />
      {children}
    </PrimitiveProvider>
  )
}
