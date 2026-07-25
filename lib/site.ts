import type { Metadata } from 'next'

import { SITE_ORIGINS } from '@/lib/sites'

const author = {
  name: 'Navdeep Singh',
  twitterHandle: '@navdeepannu0',
  links: {
    github: 'https://github.com/navdeepannu',
    linkedin: 'https://www.linkedin.com/in/navdeepsingh0/',
    twitter: 'https://x.com/navdeepannu0',
  },
} as const

export const portfolioSiteConfig = {
  name: 'Navdeep Singh',
  shortName: 'Navdeep Singh',
  domain: new URL(SITE_ORIGINS.portfolio).hostname,
  url: SITE_ORIGINS.portfolio,
  title: 'Navdeep Singh · Design Engineer & Frontend Engineer',
  description:
    'Portfolio of Navdeep Singh, a Toronto-based frontend engineer and design engineer building polished, accessible interfaces and reusable UI systems.',
  keywords: [
    'Navdeep Singh',
    'NavUI',
    'Nav UI',
    'frontend developer',
    'design engineer',
    'React',
    'Next.js',
    'TypeScript',
    'Toronto',
    'portfolio',
  ],
  locale: 'en_US',
  author,
  links: author.links,
} as const

export const uiSiteConfig = {
  name: 'Nav UI',
  shortName: 'NavUI',
  domain: new URL(SITE_ORIGINS.ui).hostname,
  url: SITE_ORIGINS.ui,
  title: 'NavUI · Blocks · Components · Templates',
  description:
    'A shadcn-compatible design-engineering library of React components, production-ready blocks, interface illustrations, and full-page templates.',
  keywords: [
    'Nav UI',
    'shadcn registry',
    'React components',
    'Next.js components',
    'UI blocks',
    'Tailwind CSS',
    'design engineering',
    'interface illustrations',
    'page templates',
  ],
  locale: 'en_US',
  author,
  links: {
    github: author.links.github,
    portfolio: SITE_ORIGINS.portfolio,
  },
} as const

const portfolioOgImage = {
  url: '/icon.svg',
  width: 400,
  height: 400,
  alt: 'Navdeep Singh logo',
} as const

const uiOgImage = {
  url: '/icon.svg',
  width: 400,
  height: 400,
  alt: 'Nav UI logo',
} as const

const searchEngineRobots = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large' as const,
    'max-snippet': -1,
    'max-video-preview': -1,
  },
}

export const portfolioMetadata: Metadata = {
  metadataBase: new URL(portfolioSiteConfig.url),
  title: {
    default: portfolioSiteConfig.title,
    template: `%s · ${portfolioSiteConfig.name}`,
  },
  description: portfolioSiteConfig.description,
  keywords: [...portfolioSiteConfig.keywords],
  authors: [{ name: portfolioSiteConfig.author.name, url: portfolioSiteConfig.links.linkedin }],
  creator: portfolioSiteConfig.author.name,
  publisher: portfolioSiteConfig.author.name,
  applicationName: portfolioSiteConfig.shortName,
  category: 'technology',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: portfolioSiteConfig.locale,
    url: portfolioSiteConfig.url,
    siteName: portfolioSiteConfig.name,
    title: portfolioSiteConfig.title,
    description: portfolioSiteConfig.description,
    images: [portfolioOgImage],
  },
  twitter: {
    card: 'summary',
    title: portfolioSiteConfig.title,
    description: portfolioSiteConfig.description,
    images: [portfolioOgImage.url],
    creator: portfolioSiteConfig.author.twitterHandle,
  },
  robots: searchEngineRobots,
}

export const uiMetadata: Metadata = {
  metadataBase: new URL(uiSiteConfig.url),
  title: {
    default: uiSiteConfig.title,
    template: `%s · ${uiSiteConfig.name}`,
  },
  description: uiSiteConfig.description,
  keywords: [...uiSiteConfig.keywords],
  authors: [{ name: uiSiteConfig.author.name, url: uiSiteConfig.links.portfolio }],
  creator: uiSiteConfig.author.name,
  publisher: uiSiteConfig.author.name,
  applicationName: uiSiteConfig.shortName,
  category: 'technology',
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  openGraph: {
    type: 'website',
    locale: uiSiteConfig.locale,
    url: uiSiteConfig.url,
    siteName: uiSiteConfig.name,
    title: uiSiteConfig.title,
    description: uiSiteConfig.description,
    images: [uiOgImage],
  },
  twitter: {
    card: 'summary',
    title: uiSiteConfig.title,
    description: uiSiteConfig.description,
    images: [uiOgImage.url],
    creator: uiSiteConfig.author.twitterHandle,
  },
  robots: searchEngineRobots,
}
