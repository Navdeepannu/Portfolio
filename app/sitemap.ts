import type { MetadataRoute } from 'next'

import { blogPosts } from '@/data/blog'
import { SITE_ORIGINS } from '@/lib/sites'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: SITE_ORIGINS.portfolio,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_ORIGINS.portfolio}/projects`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_ORIGINS.portfolio}/blog`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  return [
    ...staticEntries,
    ...blogPosts.map((post) => ({
      url: `${SITE_ORIGINS.portfolio}/blog/${post.slug}`,
      lastModified: new Date(`${post.updatedAt}T00:00:00Z`),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
