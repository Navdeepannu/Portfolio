import { SITE_ORIGINS } from '@/lib/sites'

export function GET() {
  const body = [
    'User-Agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /preview/',
    `Sitemap: ${SITE_ORIGINS.ui}/sitemap.xml`,
    `Host: ${SITE_ORIGINS.ui}`,
    '',
  ].join('\n')

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
