export const SITE_ORIGINS = {
  portfolio: 'https://navdeepsingh.dev',
  ui: 'https://ui.navdeepsingh.dev',
} as const

export type SiteId = keyof typeof SITE_ORIGINS

export function getSiteOrigin(site: SiteId): (typeof SITE_ORIGINS)[SiteId] {
  return SITE_ORIGINS[site]
}
