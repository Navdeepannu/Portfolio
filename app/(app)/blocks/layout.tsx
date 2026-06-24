import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Navbar } from '@/site/navbar'
import BlocksCategoryNav from '@/site/blocks-category-nav'

export const metadata: Metadata = {
  title: 'UI Blocks',
  description:
    'Copy-paste UI blocks and sections for React and Next.js — hero, header, sign-up, forgot-password, teams, footer, and more.',
  alternates: { canonical: '/blocks' },
  openGraph: { url: '/blocks' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="selection:bg-emerald-200/60 dark:bg-zinc-950 dark:selection:bg-emerald-500 dark:selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col">
        <Navbar fullWidth={true} className="border-x border-border" />
        <div className="flex flex-col border-x border-border">
          <BlocksCategoryNav />
          <div className="inset-x-0 h-14 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

          <section className="w-full min-w-0 dark:bg-zinc-950">{children}</section>
        </div>
      </div>
    </main>
  )
}
