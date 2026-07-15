import type { MetadataRoute } from 'next'

import { portfolioSiteConfig } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: portfolioSiteConfig.title,
    short_name: portfolioSiteConfig.shortName,
    description: portfolioSiteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#171717',
    icons: [
      {
        src: '/char.jpg',
        sizes: '512x512',
        type: 'image/jpeg',
        purpose: 'any',
      },
    ],
  }
}
