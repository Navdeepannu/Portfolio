import type { MetadataRoute } from 'next'

import { SITE_ORIGINS } from '@/lib/sites'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/demo', '/ui/'],
      },
    ],
    sitemap: `${SITE_ORIGINS.portfolio}/sitemap.xml`,
    host: SITE_ORIGINS.portfolio,
  }
}
