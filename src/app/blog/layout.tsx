import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { PortfolioNavbar } from '@/features/portfolio/sections/portfolio-navbar'
import { PortfolioFooter } from '@/features/portfolio/sections/portfolio-footer'

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Practical frontend engineering notes by Navdeep Singh about Next.js, reusable UI systems, accessibility, and production debugging.',
  alternates: { canonical: '/blog' },
  openGraph: {
    type: 'website',
    url: '/blog',
    title: 'Writing · Navdeep Singh',
    description:
      'Practical frontend engineering notes about Next.js, reusable UI systems, accessibility, and production debugging.',
    images: ['/icon.svg'],
  },
  twitter: {
    card: 'summary',
    title: 'Writing · Navdeep Singh',
    description:
      'Practical frontend engineering notes about Next.js, reusable UI systems, accessibility, and production debugging.',
    images: ['/icon.svg'],
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PortfolioNavbar />
      {children}
      <PortfolioFooter />
    </div>
  )
}
