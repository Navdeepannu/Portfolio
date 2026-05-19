import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Navbar } from '@/site/navbar'
import CategoryNav from '@/site/category-nav'

export const metadata: Metadata = {
  title: 'UI Blocks',
  description:
    'Copy-paste UI blocks and sections for React and Next.js — hero, header, auth, teams, footer, and more.',
  alternates: { canonical: '/blocks' },
  openGraph: { url: '/blocks' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="scrollbar-gutter-stable mx-auto scrollbar-thin flex h-screen w-full max-w-365 flex-col overflow-y-auto scrollbar-thumb-mist-400 scrollbar-track-red-200">
      <Navbar fullWidth={true} className="border-x border-black/5 dark:border-white/10" />
      <div className="flex flex-col border-x border-black/5 dark:border-white/10">
        <CategoryNav />
        <div className="inset-x-0 h-14 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

        <section className="w-full min-w-0">{children}</section>
      </div>
    </main>
  )
}
