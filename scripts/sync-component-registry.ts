/**
 * Generates the component `items` inside root `registry.json` from the TypeScript
 * docs registry (`registry/component-entries.tsx`), so documented components are
 * never maintained in two places.
 *
 * Behaviour:
 *   - For every documented component, build a shadcn registry item:
 *       name  = slug
 *       type  = registry:ui
 *       title / description from the definition
 *       dependencies / registryDependencies from definition.registry (omitted if empty)
 *       files = ONLY the real reusable component file (never the showcase/demo)
 *               path:   components/ui/components/<slug>.tsx
 *               type:   registry:ui
 *               target: @components/<slug>.tsx
 *   - Items in registry.json whose `name` matches a documented slug are replaced
 *     in place with the freshly generated version.
 *   - New documented components are appended after the existing items.
 *   - Items whose `name` is NOT a documented slug (e.g. manually-maintained
 *     `animated-group`, `text-effect`) are preserved untouched.
 *   - `include` (block registries) and all other top-level fields are preserved.
 *
 * Run via `bun run sync:components` (chained before `registry:build`).
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { componentRegistryEntries } from '@/registry/component-entries'

const ROOT = process.cwd()
const REGISTRY_JSON_PATH = path.join(ROOT, 'registry.json')
const UI_DIR = 'components/ui/components'
const ITEM_SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json'

type RegistryFile = {
  path: string
  type: string
  target: string
}

type RegistryItem = {
  $schema?: string
  name?: string
  type?: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
  [key: string]: unknown
}

type RootRegistry = {
  items?: RegistryItem[]
  [key: string]: unknown
}

/** Build a single shadcn registry item from a component definition. */
function buildItem(slug: string, title: string, description: string, deps: string[], registryDeps: string[]): RegistryItem {
  const item: RegistryItem = {
    $schema: ITEM_SCHEMA,
    name: slug,
    type: 'registry:ui',
    title,
    description,
  }

  if (deps.length > 0) item.dependencies = [...deps]
  if (registryDeps.length > 0) item.registryDependencies = [...registryDeps]

  item.files = [
    {
      path: `${UI_DIR}/${slug}.tsx`,
      type: 'registry:ui',
      target: `@components/${slug}.tsx`,
    },
  ]

  return item
}

async function main() {
  const raw = await fs.readFile(REGISTRY_JSON_PATH, 'utf8')
  const registry = JSON.parse(raw) as RootRegistry

  const existingItems = Array.isArray(registry.items) ? registry.items : []

  // Generate one item per documented component, keyed by slug.
  const generatedBySlug = new Map<string, RegistryItem>()
  for (const { definition } of componentRegistryEntries) {
    const slug = definition.slug
    if (!slug) continue
    const deps = definition.registry?.dependencies ?? []
    const registryDeps = definition.registry?.registryDependencies ?? []
    const description = definition.registryDescription ?? definition.description
    generatedBySlug.set(
      slug,
      buildItem(slug, definition.title, description, deps, registryDeps),
    )
  }

  const usedSlugs = new Set<string>()
  let replaced = 0
  let preserved = 0

  // Replace documented items in place; preserve everything else untouched.
  const nextItems: RegistryItem[] = existingItems.map((item) => {
    const name = typeof item.name === 'string' ? item.name : undefined
    if (name && generatedBySlug.has(name)) {
      usedSlugs.add(name)
      replaced += 1
      return generatedBySlug.get(name) as RegistryItem
    }
    preserved += 1
    return item
  })

  // Append any documented components not already present (new components).
  let added = 0
  for (const [slug, item] of generatedBySlug) {
    if (usedSlugs.has(slug)) continue
    nextItems.push(item)
    added += 1
  }

  registry.items = nextItems

  await fs.writeFile(REGISTRY_JSON_PATH, `${JSON.stringify(registry, null, 2)}\n`, 'utf8')

  const manual = preserved
  console.log(
    `[sync:components] Synced ${generatedBySlug.size} component item(s) ` +
      `(${replaced} updated, ${added} added) — preserved ${manual} non-component/manual item(s).`,
  )

  if (manual > 0) {
    const manualNames = nextItems
      .filter((item) => typeof item.name === 'string' && !generatedBySlug.has(item.name as string))
      .map((item) => item.name)
    console.log(
      `[sync:components] Preserved manual items (not in component docs): ${manualNames.join(', ')}`,
    )
  }
}

main().catch((error) => {
  console.error('[sync:components] Failed:', error)
  process.exit(1)
})
