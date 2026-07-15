import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { ColumnsProvider } from '@/site/context/column-context'

export const metadata: Metadata = {
  title: 'Pages',
  description: 'Full-page templates and layouts — coming soon.',
  alternates: { canonical: '/pages' },
  openGraph: { url: '/pages' },
}
import { BlockFiltersProvider } from '@/site/context/block-filters-context'
import { UiLibraryNavbar } from '@/site/ui-library/ui-library-navbar'
import SearchSection from '@/site/search-section'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <ColumnsProvider>
      <BlockFiltersProvider>
        <main className="flex min-h-screen w-full flex-col">
          <UiLibraryNavbar fullWidth />
          <div className="flex min-h-0 flex-1 flex-col">
            <SearchSection />
            <section className="w-full min-w-0">{children}</section>
          </div>
        </main>
      </BlockFiltersProvider>
    </ColumnsProvider>
  )
}
