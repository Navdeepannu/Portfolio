import type { MetadataRoute } from 'next'

import { SITE_ORIGINS } from '@/lib/sites'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const paths = ['/', '/projects'] as const

  return paths.map((path) => ({
    url: path === '/' ? SITE_ORIGINS.portfolio : `${SITE_ORIGINS.portfolio}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }))
}
