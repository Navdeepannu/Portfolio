import type { Metadata } from 'next'

import { blockCategories } from '@/data/categories'

/** Production site URL — set NEXT_PUBLIC_SITE_URL in Vercel env if the domain differs. */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'https://navdeepsingh.dev'
}

export const siteConfig = {
  name: 'Navdeep Singh',
  shortName: 'Navdeep Singh',
  domain: 'navdeepsingh.dev',
  url: getSiteUrl(),
  title: `Navdeep Singh · Design Engineer & Full Stack Developer`,
  description:
    'Portfolio of Navdeep Singh · Design Engineer & Full Stack Developer  building scalable interfaces, UI systems, and production-ready products.',
  keywords: [
    'Navdeep Singh',
    'frontend developer',
    'design engineer',
    'UI systems',
    'components',
    'blocks',
    'React',
    'Next.js',
    'portfolio',
    'webiste',
    'navdeepsingh.dev',
    'Navdeep Singh',
  ],
  locale: 'en_US',
  author: {
    name: 'Navdeep Singh',
    url: 'https://www.linkedin.com/in/navdeepsingh0/',
    twitter: '@navdeepannu0',
  },
  links: {
    linkedin: 'https://www.linkedin.com/in/navdeepsingh0/',
    twitter: 'https://x.com/navdeepannu0',
  },
} as const

const ogImage = {
  url: '/char.jpg',
  width: 1200,
  height: 630,
  alt: 'Navdeep Singh',
} as const

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.links.linkedin }],
  creator: siteConfig.author.name,
  publisher: siteConfig.author.name,
  applicationName: siteConfig.shortName,
  category: 'technology',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [ogImage.url],
    creator: siteConfig.author.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export function getPublicSitemapPaths(): string[] {
  const paths = ['/', '/components', '/blocks', '/projects']

  for (const category of blockCategories) {
    paths.push(category.id === 'featured' ? '/blocks' : `/blocks/${category.id}`)
  }

  return [...new Set(paths)]
}
