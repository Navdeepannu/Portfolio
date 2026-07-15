import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { UiLibraryNavbar } from '@/site/ui-library/ui-library-navbar'

export const metadata: Metadata = {
  title: 'Illustrations',
  description: 'A growing collection of crafted interface illustrations and visual assets.',
  alternates: { canonical: '/illustrations' },
  openGraph: { url: '/illustrations' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background selection:bg-emerald-200/60 dark:bg-zinc-950 dark:selection:bg-emerald-500 dark:selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col">
        <UiLibraryNavbar fullWidth className="border-x border-border" />
        <div className="flex flex-col border-x border-border">
          <section className="w-full min-w-0 font-geist dark:bg-zinc-950">{children}</section>
        </div>
      </div>
    </main>
  )
}
