import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { LandingNavbar } from '@/site/portfolio/landing-header'

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Selected frontend and design-engineering work: reusable UI systems, client websites, and practical product interfaces.',
  alternates: { canonical: '/projects' },
  openGraph: { url: '/projects' },
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-background font-schibsted text-foreground">
      <LandingNavbar />
      <section className="w-full min-w-0">{children}</section>
    </main>
  )
}
