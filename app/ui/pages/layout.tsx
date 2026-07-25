// app/pages/layout.tsx

import { ConditionalPageNavbar } from '@/components/pages/page-preview/conditional-page-navbar'
import { PagePreviewProvider } from '@/components/pages/page-preview/page-preview-provider'
import { Suspense, type ReactNode } from 'react'

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <PagePreviewProvider>
      {children}

      <Suspense
        fallback={
          <div
            role="status"
            className="fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full border bg-background px-3 py-2 text-xs text-muted-foreground shadow-lg"
          >
            <span className="size-2 animate-pulse rounded-full bg-foreground" aria-hidden="true" />
            Loading preview controls…
          </div>
        }
      >
        <ConditionalPageNavbar />
      </Suspense>
    </PagePreviewProvider>
  )
}
