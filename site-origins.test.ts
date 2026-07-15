import assert from 'node:assert/strict'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { describe, test } from 'node:test'

import portfolioRobots from '@/app/robots'
import portfolioSitemap from '@/app/sitemap'
import { GET as getUiManifest } from '@/app/ui/manifest.webmanifest/route'
import { GET as getUiRobots } from '@/app/ui/robots.txt/route'
import uiSitemap from '@/app/ui/sitemap'
import { getDirectInstallCommands, getRegistryItemUrl } from '@/lib/registry'
import { portfolioMetadata, uiMetadata } from '@/lib/site'
import { SITE_ORIGINS } from '@/lib/sites'

describe('site-specific metadata origins', () => {
  test('uses independent metadata bases and sitemap origins', () => {
    assert.equal(portfolioMetadata.metadataBase?.toString(), `${SITE_ORIGINS.portfolio}/`)
    assert.equal(uiMetadata.metadataBase?.toString(), `${SITE_ORIGINS.ui}/`)

    const portfolioUrls = portfolioSitemap().map((entry) => entry.url)
    const uiUrls = uiSitemap().map((entry) => entry.url)

    assert.deepEqual(portfolioUrls, [SITE_ORIGINS.portfolio, `${SITE_ORIGINS.portfolio}/projects`])
    assert.ok(uiUrls.every((url) => url.startsWith(SITE_ORIGINS.ui)))
    assert.ok(uiUrls.every((url) => !new URL(url).pathname.startsWith('/ui')))
    assert.ok(uiUrls.includes(`${SITE_ORIGINS.ui}/components/animated-tabs`))
    assert.ok(uiUrls.includes(`${SITE_ORIGINS.ui}/pages/flowdesk`))
  })

  test('emits host-specific robots and UI manifest responses', async () => {
    const portfolioRules = portfolioRobots()
    const uiRobots = await getUiRobots().text()
    const uiManifest = (await getUiManifest().json()) as { name: string; start_url: string }

    assert.equal(portfolioRules.host, SITE_ORIGINS.portfolio)
    assert.equal(portfolioRules.sitemap, `${SITE_ORIGINS.portfolio}/sitemap.xml`)
    assert.match(uiRobots, new RegExp(`Sitemap: ${SITE_ORIGINS.ui}/sitemap\\.xml`))
    assert.match(uiRobots, new RegExp(`Host: ${SITE_ORIGINS.ui}`))
    assert.equal(uiManifest.name, 'Navdeep UI · Components, Blocks, and Templates')
    assert.equal(uiManifest.start_url, '/')
  })
})

describe('registry origin', () => {
  test('builds install commands with the canonical UI-library URL', () => {
    assert.equal(SITE_ORIGINS.ui, 'https://ui.navdeepsingh.dev')
    assert.equal(
      getRegistryItemUrl('animated-tabs'),
      'https://ui.navdeepsingh.dev/r/animated-tabs.json',
    )
    assert.match(
      getDirectInstallCommands('animated-tabs').npm,
      /https:\/\/ui\.navdeepsingh\.dev\/r\/animated-tabs\.json$/,
    )
  })

  test('keeps a real generated item on the shadcn registry schema', async () => {
    const itemPath = path.join(process.cwd(), 'public/r/animated-tabs.json')
    const item = JSON.parse(await fs.readFile(itemPath, 'utf8')) as {
      $schema?: string
      name?: string
      type?: string
      files?: unknown[]
    }

    assert.equal(item.$schema, 'https://ui.shadcn.com/schema/registry-item.json')
    assert.equal(item.name, 'animated-tabs')
    assert.equal(item.type, 'registry:ui')
    assert.ok(Array.isArray(item.files) && item.files.length > 0)
  })
})
