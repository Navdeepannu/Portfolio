import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Navbar } from '@/site/navbar'
import ComponentsCategoryNav from '@/site/components-category-nav'

export const metadata: Metadata = {
  title: 'Components',
  description:
    'Copy-paste UI components and reusable code for React, tailwindcss, motion, motion/react, next.js',
  alternates: { canonical: '/components' },
  openGraph: { url: '/components' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-muted/50">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col bg-card shadow-sm">
        <Navbar fullWidth={true} className="border-x border-black/5 dark:border-white/10" />
        <div className="flex flex-col border-x border-black/5 dark:border-white/10">
          <ComponentsCategoryNav />
          <div className="inset-x-0 h-14 w-full bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)] mask-b-from-10% dark:bg-[repeating-linear-gradient(to_bottom,var(--color-border)_0,var(--color-border)_1px,transparent_1px,transparent_0.4rem)]" />

          <section className="w-full min-w-0">{children}</section>
        </div>
      </div>
    </main>
  )
}
