import type { MetadataRoute } from 'next'

import { blockCategories, DEFAULT_CATEGORY_ID, getAllComponents } from '@/data'
import { SITE_ORIGINS } from '@/lib/sites'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    '/components',
    ...getAllComponents().map((component) => `/components/${component.slug}`),
    '/blocks',
    ...blockCategories
      .filter((category) => category.id !== DEFAULT_CATEGORY_ID)
      .map((category) => `/blocks/${category.id}`),
    '/illustrations',
    '/pages',
    '/pages/flowdesk',
  ]
  const now = new Date()

  return [...new Set(paths)].map((path) => ({
    url: path === '/' ? SITE_ORIGINS.ui : `${SITE_ORIGINS.ui}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path === '/components' || path === '/blocks' ? 0.9 : 0.7,
  }))
}
