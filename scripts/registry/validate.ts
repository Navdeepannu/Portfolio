import { promises as fs } from 'node:fs'
import path from 'node:path'

import { registryItemSchema, registrySchema } from 'shadcn/schema'

import { componentItemEntries, registryItems } from '@/registry/items'
import { validatePublicArtifacts, validateRegistryDefinitions } from '@/registry/validation'

import {
  GENERATED_BLOCK_PREVIEWS_PATH,
  GENERATED_COMPONENT_PREVIEWS_PATH,
  GENERATED_DEFAULT_DESIGN_SYSTEM_CSS_PATH,
  GENERATED_ILLUSTRATION_PREVIEWS_PATH,
  PUBLIC_REGISTRY_DIR,
  ROOT_REGISTRY_PATH,
  renderBlockPreviewModule,
  renderComponentPreviewModule,
  renderDefaultDesignSystemCss,
  renderIllustrationPreviewModule,
  renderRootRegistry,
} from './core'

const ROOT = process.cwd()

async function read(relativePath: string): Promise<string> {
  return fs.readFile(path.join(ROOT, relativePath), 'utf8')
}

async function exists(relativePath: string): Promise<boolean> {
  try {
    await fs.access(path.join(ROOT, relativePath))
    return true
  } catch {
    return false
  }
}

async function main() {
  const errors = await validateRegistryDefinitions(registryItems, { sourceExists: exists })

  const expectedGenerated = new Map<string, string>([
    [ROOT_REGISTRY_PATH, renderRootRegistry(registryItems)],
    [GENERATED_BLOCK_PREVIEWS_PATH, renderBlockPreviewModule(registryItems)],
    [GENERATED_DEFAULT_DESIGN_SYSTEM_CSS_PATH, renderDefaultDesignSystemCss(registryItems)],
    [
      GENERATED_COMPONENT_PREVIEWS_PATH,
      renderComponentPreviewModule(registryItems, componentItemEntries),
    ],
    [GENERATED_ILLUSTRATION_PREVIEWS_PATH, renderIllustrationPreviewModule(registryItems)],
  ])
  for (const [relativePath, expected] of expectedGenerated) {
    let actual = ''
    try {
      actual = await read(relativePath)
    } catch {
      errors.push(`[generated] Missing ${relativePath}; run \`bun run registry:generate\`.`)
      continue
    }
    if (actual !== expected) {
      errors.push(`[generated] ${relativePath} has drifted; run \`bun run registry:generate\`.`)
    }
  }

  try {
    const sourceRegistry = JSON.parse(await read(ROOT_REGISTRY_PATH))
    const result = registrySchema.safeParse(sourceRegistry)
    if (!result.success) {
      errors.push(
        `[schema] registry.json is invalid: ${result.error.issues[0]?.message ?? 'unknown error'}`,
      )
    }
  } catch (error) {
    errors.push(`[schema] Could not parse registry.json: ${(error as Error).message}`)
  }

  const outputDir = path.join(ROOT, PUBLIC_REGISTRY_DIR)
  const artifacts = new Map<string, import('@/registry/validation').PublicArtifact>()
  let publicCatalogNames: string[] = []
  let publicEntries: string[] = []
  try {
    publicEntries = await fs.readdir(outputDir)
  } catch (error) {
    errors.push(`[public/r] Could not read generated output: ${(error as Error).message}`)
  }

  for (const entry of publicEntries.filter((name) => name.endsWith('.json')).sort()) {
    const name = entry.slice(0, -'.json'.length)
    try {
      const parsed = JSON.parse(await fs.readFile(path.join(outputDir, entry), 'utf8'))
      if (name === 'registry') {
        const result = registrySchema.safeParse(parsed)
        if (!result.success) {
          errors.push(
            `[schema] public/r/registry.json is invalid: ${result.error.issues[0]?.message ?? 'unknown error'}`,
          )
        }
        publicCatalogNames = Array.isArray(parsed.items)
          ? parsed.items
              .map((item: { name?: unknown }) => item.name)
              .filter((itemName: unknown): itemName is string => typeof itemName === 'string')
              .sort((a: string, b: string) => a.localeCompare(b))
          : []
        continue
      }

      const result = registryItemSchema.safeParse(parsed)
      if (!result.success) {
        errors.push(
          `[schema] public/r/${entry} is invalid: ${result.error.issues[0]?.message ?? 'unknown error'}`,
        )
      }
      artifacts.set(name, parsed)
    } catch (error) {
      errors.push(`[schema] Could not parse public/r/${entry}: ${(error as Error).message}`)
    }
  }

  errors.push(
    ...(await validatePublicArtifacts(registryItems, artifacts, {
      readSource: read,
    })),
  )

  const expectedCatalogNames = registryItems
    .filter((item) => item.status === 'published')
    .map((item) => item.slug)
    .sort((a, b) => a.localeCompare(b))
  if (JSON.stringify(publicCatalogNames) !== JSON.stringify(expectedCatalogNames)) {
    errors.push(
      '[public/r/registry.json] Catalog names differ from published canonical items; archived or draft items may have leaked.',
    )
  }

  if (errors.length > 0) {
    console.error(`\n[registry:validate] ${errors.length} error(s):`)
    for (const error of errors) console.error(`  ✗ ${error}`)
    console.error('\n[registry:validate] FAILED')
    process.exit(1)
  }

  console.log(
    `[registry:validate] OK — ${registryItems.length} canonical item(s), ${artifacts.size} public item(s), no drift.`,
  )
}

main().catch((error) => {
  console.error('[registry:validate] Unexpected failure:', error)
  process.exit(1)
})
