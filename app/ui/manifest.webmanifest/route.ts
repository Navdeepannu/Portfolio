import { uiSiteConfig } from '@/lib/site'

export function GET() {
  return Response.json(
    {
      name: uiSiteConfig.title,
      short_name: uiSiteConfig.shortName,
      description: uiSiteConfig.description,
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#171717',
      icons: [
        {
          src: '/icon.svg',
          sizes: 'any',
          type: 'image/svg+xml',
          purpose: 'any',
        },
      ],
    },
    { headers: { 'Content-Type': 'application/manifest+json' } },
  )
}
