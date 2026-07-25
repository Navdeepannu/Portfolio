import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { NextRequest } from 'next/server'

import { normalizeHostname, resolveDomainRouting } from '@/lib/domain-routing'
import { proxy } from '@/proxy'

function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      assert.equal(actual, expected)
    },
    toEqual(expected: unknown) {
      assert.deepEqual(actual, expected)
    },
  }
}

describe('hostname routing decisions', () => {
  test('normalizes forwarded hosts and ports', () => {
    expect(normalizeHostname('ui.localhost:3000')).toBe('ui.localhost')
    expect(normalizeHostname('ui.navdeepsingh.dev, edge.internal')).toBe('ui.navdeepsingh.dev')
  })

  test('rewrites public UI paths to the internal route tree', () => {
    expect(
      resolveDomainRouting({
        hostname: 'ui.navdeepsingh.dev',
        pathname: '/components/animated-tabs',
        search: '?theme=dark',
      }),
    ).toEqual({ type: 'rewrite', pathname: '/ui/components/animated-tabs' })
  })

  test('supports the ui.localhost development workflow', () => {
    expect(
      resolveDomainRouting({
        hostname: 'ui.localhost:3000',
        pathname: '/blocks/hero',
      }),
    ).toEqual({ type: 'rewrite', pathname: '/ui/blocks/hero' })
  })

  test('does not classify generic Vercel previews as the UI site', () => {
    expect(
      resolveDomainRouting({
        hostname: 'portfolio-git-feature-example.vercel.app',
        pathname: '/components',
      }),
    ).toEqual({ type: 'next' })
  })

  test('keeps internal UI routes available on localhost and previews', () => {
    expect(
      resolveDomainRouting({ hostname: 'localhost:3000', pathname: '/ui/components' }),
    ).toEqual({ type: 'next' })
  })

  test('redirects apex legacy UI routes to the UI subdomain', () => {
    expect(
      resolveDomainRouting({
        hostname: 'navdeepsingh.dev',
        pathname: '/blocks/hero',
        search: 'preview=true',
      }),
    ).toEqual({
      type: 'redirect',
      destination: 'https://ui.navdeepsingh.dev/blocks/hero?preview=true',
    })
  })

  test('removes the internal prefix from public URLs without loops', () => {
    expect(
      resolveDomainRouting({
        hostname: 'ui.navdeepsingh.dev',
        pathname: '/ui/components',
      }),
    ).toEqual({
      type: 'redirect',
      destination: 'https://ui.navdeepsingh.dev/components',
    })
  })

  test('redirects old FlowDesk and registry URLs to their UI locations', () => {
    expect(resolveDomainRouting({ hostname: 'navdeepsingh.dev', pathname: '/flowdesk' })).toEqual({
      type: 'redirect',
      destination: 'https://ui.navdeepsingh.dev/pages/flowdesk',
    })
    expect(
      resolveDomainRouting({
        hostname: 'navdeepsingh.dev',
        pathname: '/r/animated-tabs.json',
      }),
    ).toEqual({
      type: 'redirect',
      destination: 'https://ui.navdeepsingh.dev/r/animated-tabs.json',
    })
  })

  test('bypasses framework, API, registry, and static asset paths on the UI host', () => {
    for (const pathname of [
      '/_next/static/chunk.js',
      '/_next/image',
      '/api/contact',
      '/r/animated-tabs.json',
      '/icon.svg',
    ]) {
      expect(resolveDomainRouting({ hostname: 'ui.navdeepsingh.dev', pathname })).toEqual({
        type: 'next',
      })
    }
  })
})

describe('Next.js proxy responses', () => {
  test('preserves nested paths and search parameters on rewrites', () => {
    const request = new NextRequest('http://ui.localhost:3000/components/card?theme=dark')
    const response = proxy(request)

    expect(response.headers.get('x-middleware-rewrite')).toBe(
      'http://ui.localhost:3000/ui/components/card?theme=dark',
    )
  })

  test('uses permanent canonical redirects', () => {
    const request = new NextRequest('https://navdeepsingh.dev/ui/illustrations?style=dark')
    const response = proxy(request)

    expect(response.status).toBe(308)
    expect(response.headers.get('location')).toBe(
      'https://ui.navdeepsingh.dev/illustrations?style=dark',
    )
  })
})
