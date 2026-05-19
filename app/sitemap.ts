import type { MetadataRoute } from 'next'

import { getPublicSitemapPaths, getSiteUrl } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now = new Date()

  return getPublicSitemapPaths().map((path) => ({
    url: path === '/' ? base : `${base}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/blocks') ? 0.8 : 0.6,
  }))
}
