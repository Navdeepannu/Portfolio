import { SITE_ORIGINS } from '@/lib/sites'

export type DomainRoutingDecision =
  | { type: 'next' }
  | { type: 'rewrite'; pathname: string }
  | { type: 'redirect'; destination: string }

type DomainRoutingInput = {
  hostname: string
  pathname: string
  search?: string
}

const UI_INTERNAL_PREFIX = '/ui'
const UI_PUBLIC_PREFIXES = [
  '/components',
  '/blocks',
  '/illustrations',
  '/pages',
  '/preview',
  '/r',
] as const
const UI_METADATA_PATHS = new Set(['/robots.txt', '/sitemap.xml', '/manifest.webmanifest'])
const UI_HOSTNAME = new URL(SITE_ORIGINS.ui).hostname
const PORTFOLIO_HOSTNAME = new URL(SITE_ORIGINS.portfolio).hostname

export function normalizeHostname(value: string): string {
  const hostname = value.split(',')[0]?.trim().toLowerCase() ?? ''

  if (hostname.startsWith('[')) {
    const closingBracket = hostname.indexOf(']')
    return closingBracket === -1 ? hostname : hostname.slice(1, closingBracket)
  }

  return hostname.split(':')[0] ?? ''
}

function normalizePathname(pathname: string): string {
  if (!pathname) return '/'
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function normalizeSearch(search = ''): string {
  if (!search) return ''
  return search.startsWith('?') ? search : `?${search}`
}

function matchesPrefix(pathname: string, prefix: string): boolean {
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

function removeUiPrefix(pathname: string): string {
  if (pathname === UI_INTERNAL_PREFIX) return '/'
  return pathname.slice(UI_INTERNAL_PREFIX.length) || '/'
}

function toUiPublicUrl(pathname: string, search: string): string {
  return new URL(`${pathname}${search}`, SITE_ORIGINS.ui).toString()
}

function isUiHostname(hostname: string): boolean {
  return hostname === UI_HOSTNAME || hostname === 'ui.localhost'
}

function isInfrastructurePath(pathname: string): boolean {
  if (UI_METADATA_PATHS.has(pathname)) return false

  if (
    matchesPrefix(pathname, '/_next') ||
    matchesPrefix(pathname, '/_vercel') ||
    matchesPrefix(pathname, '/api') ||
    matchesPrefix(pathname, '/r') ||
    matchesPrefix(pathname, '/.well-known')
  ) {
    return true
  }

  return /\.[^/]+$/.test(pathname)
}

export function resolveDomainRouting({
  hostname: rawHostname,
  pathname: rawPathname,
  search: rawSearch,
}: DomainRoutingInput): DomainRoutingDecision {
  const hostname = normalizeHostname(rawHostname)
  const pathname = normalizePathname(rawPathname)
  const search = normalizeSearch(rawSearch)

  if (isUiHostname(hostname)) {
    if (matchesPrefix(pathname, UI_INTERNAL_PREFIX)) {
      return {
        type: 'redirect',
        destination: toUiPublicUrl(removeUiPrefix(pathname), search),
      }
    }

    if (isInfrastructurePath(pathname)) return { type: 'next' }

    return {
      type: 'rewrite',
      pathname: pathname === '/' ? UI_INTERNAL_PREFIX : `${UI_INTERNAL_PREFIX}${pathname}`,
    }
  }

  if (hostname === PORTFOLIO_HOSTNAME) {
    if (matchesPrefix(pathname, UI_INTERNAL_PREFIX)) {
      return {
        type: 'redirect',
        destination: toUiPublicUrl(removeUiPrefix(pathname), search),
      }
    }

    if (pathname === '/flowdesk') {
      return {
        type: 'redirect',
        destination: toUiPublicUrl('/pages/flowdesk', search),
      }
    }

    if (UI_PUBLIC_PREFIXES.some((prefix) => matchesPrefix(pathname, prefix))) {
      return {
        type: 'redirect',
        destination: toUiPublicUrl(pathname, search),
      }
    }
  }

  // Localhost and Vercel preview hosts intentionally expose the internal /ui
  // tree directly. They are never inferred to be the public UI site.
  return { type: 'next' }
}
