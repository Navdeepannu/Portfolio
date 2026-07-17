import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { BlogFooter } from '@/site/blog/blog-footer'
import { BlogHeader } from '@/site/blog/blog-header'

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
    images: ['/char.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Writing · Navdeep Singh',
    description:
      'Practical frontend engineering notes about Next.js, reusable UI systems, accessibility, and production debugging.',
    images: ['/char.jpg'],
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <BlogHeader />
      {children}
      <BlogFooter />
    </div>
  )
}
