import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Navbar } from '@/site/navbar'

export const metadata: Metadata = {
  title: 'Components',
  description:
    'Copy-paste UI components and reusable code for React, tailwindcss, motion, motion/react, next.js',
  alternates: { canonical: '/components' },
  openGraph: { url: '/components' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-background selection:bg-emerald-200/60 font-geist dark:bg-zinc-950 dark:selection:bg-emerald-500 dark:selection:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-360 flex-col">
        <Navbar fullWidth={true} className="border-x border-border " />
        <div className="flex flex-col border-x border-border ">
          <section className="w-full min-w-0 dark:bg-zinc-950 font-geist">{children}</section>
        </div>
      </div>
    </main>
  )
}
