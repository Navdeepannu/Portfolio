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
  title: 'Navdeep Singh · Design Engineer & Full Stack Developer',
  description:
    'Portfolio of Navdeep Singh, a Toronto-based design engineer and frontend-focused full stack developer building polished, production-ready products.',
  keywords: [
    'Navdeep Singh',
    'frontend developer',
    'design engineer',
    'full stack developer',
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
  name: 'Navdeep UI',
  shortName: 'Navdeep UI',
  domain: new URL(SITE_ORIGINS.ui).hostname,
  url: SITE_ORIGINS.ui,
  title: 'Navdeep UI · Components, Blocks, and Templates',
  description:
    'A shadcn-compatible design-engineering library of React components, production-ready blocks, interface illustrations, and full-page templates.',
  keywords: [
    'Navdeep UI',
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
  url: '/char.jpg',
  width: 1200,
  height: 630,
  alt: 'Navdeep Singh',
} as const

const uiOgImage = {
  url: '/char.jpg',
  width: 1200,
  height: 630,
  alt: 'Navdeep UI component and design-engineering library',
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
    card: 'summary_large_image',
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
    card: 'summary_large_image',
    title: uiSiteConfig.title,
    description: uiSiteConfig.description,
    images: [uiOgImage.url],
    creator: uiSiteConfig.author.twitterHandle,
  },
  robots: searchEngineRobots,
}
