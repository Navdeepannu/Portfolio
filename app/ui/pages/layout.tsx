// app/pages/layout.tsx

import { ConditionalPageNavbar } from '@/components/pages/page-preview/conditional-page-navbar'
import { PagePreviewProvider } from '@/components/pages/page-preview/page-preview-provider'
import { Suspense, type ReactNode } from 'react'

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PagePreviewProvider>
      {children}

      <Suspense fallback={null}>
        <ConditionalPageNavbar />
      </Suspense>
    </PagePreviewProvider>
  )
}
