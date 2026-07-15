import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { PortfolioNavbar } from '@/site/portfolio/portfolio-navbar'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Curated case studies in design engineering and frontend development — production apps, UI systems, and shipped product work.',
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-muted/50">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col bg-card shadow-sm">
        <PortfolioNavbar
          fullWidth
          className="border-x border-black/5 px-2 md:px-0 dark:border-white/10"
        />
        <div className="flex flex-col border-x border-black/5 dark:border-white/10">
          <div className="inset-x-0 h-14 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

          <section className="w-full min-w-0">{children}</section>
        </div>
      </div>
    </main>
  )
}
