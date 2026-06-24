/**
 * Validates the TypeScript component docs registry (`registry/component-entries.tsx`)
 * before `shadcn build`, so broken metadata or missing files fail fast with a
 * clear message instead of producing a half-working docs page or a dangling
 * install command.
 *
 * Checks performed (see inline comments for the rule each enforces):
 *   1. Slugs are unique.
 *   2. Required fields are present (slug, title, description, category, tags, image, sourceFiles).
 *   3. Every `sourceFiles.path` exists on disk.
 *   4. Exactly one demo source file (`filename: 'demo.tsx'`) per component.
 *   5. (warn) Demo file lives at `components/showcase/<slug>.tsx`.
 *   6. (warn) Real component file lives at `components/ui/components/<slug>.tsx`.
 *   7. `registry.dependencies` and `registry.registryDependencies` are arrays (may be empty).
 *   8. Every documented component has a matching item in root `registry.json`
 *      (run `bun run sync:components` to generate it).
 *
 * Run via `bun run validate:components` (also chained before `registry:build`).
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

import { componentRegistryEntries } from '@/registry/component-entries'

const ROOT = process.cwd()
const REGISTRY_JSON_PATH = path.join(ROOT, 'registry.json')
const UI_DIR = 'components/ui/components'
const SHOWCASE_DIR = 'components/showcase'
const DEMO_FILENAME = 'demo.tsx'

const errors: string[] = []
const warnings: string[] = []

function fail(message: string): void {
  errors.push(message)
}

function warn(message: string): void {
  warnings.push(message)
}

async function pathExists(relativePath: string): Promise<boolean> {
  try {
    await fs.access(path.join(ROOT, relativePath))
    return true
  } catch {
    return false
  }
}

type RegistryItem = { name?: string }
type RootRegistry = { items?: RegistryItem[] }

async function readRegistryItemNames(): Promise<Set<string>> {
  try {
    const raw = await fs.readFile(REGISTRY_JSON_PATH, 'utf8')
    const parsed = JSON.parse(raw) as RootRegistry
    const names = (parsed.items ?? [])
      .map((item) => item?.name)
      .filter((name): name is string => typeof name === 'string')
    return new Set(names)
  } catch (error) {
    fail(`Could not read or parse registry.json: ${(error as Error).message}`)
    return new Set()
  }
}

async function main() {
  const registryItemNames = await readRegistryItemNames()

  const seenSlugs = new Set<string>()

  for (const { definition } of componentRegistryEntries) {
    const slug = definition.slug || '(missing slug)'
    const label = `[${slug}]`

    // 1. Unique slugs.
    if (definition.slug) {
      if (seenSlugs.has(definition.slug)) {
        fail(`${label} Duplicate slug — slugs must be unique.`)
      }
      seenSlugs.add(definition.slug)
    }

    // 2. Required fields.
    if (!definition.slug) fail(`${label} Missing required field: slug`)
    if (!definition.title) fail(`${label} Missing required field: title`)
    if (!definition.description) fail(`${label} Missing required field: description`)
    if (!definition.category) fail(`${label} Missing required field: category`)
    if (!Array.isArray(definition.tags) || definition.tags.length === 0) {
      fail(`${label} Missing required field: tags (must be a non-empty array)`)
    }
    if (!definition.image) fail(`${label} Missing required field: image`)
    if (!Array.isArray(definition.sourceFiles) || definition.sourceFiles.length === 0) {
      fail(`${label} Missing required field: sourceFiles (must be a non-empty array)`)
      continue
    }

    // 3. Every source file path exists on disk.
    for (const spec of definition.sourceFiles) {
      if (!spec.path) {
        fail(`${label} A sourceFiles entry is missing a "path".`)
        continue
      }
      if (!(await pathExists(spec.path))) {
        fail(`${label} sourceFiles path does not exist on disk: ${spec.path}`)
      }
    }

    // 4. Exactly one demo source file.
    const demoSpecs = definition.sourceFiles.filter((spec) => spec.filename === DEMO_FILENAME)
    if (demoSpecs.length === 0) {
      fail(`${label} No demo source file found (expected one with filename: '${DEMO_FILENAME}').`)
    } else if (demoSpecs.length > 1) {
      fail(`${label} Multiple demo source files found — expected exactly one '${DEMO_FILENAME}'.`)
    }

    // 5. (warn) Demo file lives at the conventional path.
    const expectedDemoPath = `${SHOWCASE_DIR}/${definition.slug}.tsx`
    if (demoSpecs.length === 1 && demoSpecs[0].path !== expectedDemoPath) {
      warn(
        `${label} Demo file is at "${demoSpecs[0].path}"; convention is "${expectedDemoPath}".`,
      )
    }

    // 6. (warn) Real reusable component file lives at the conventional path.
    const expectedUiPath = `${UI_DIR}/${definition.slug}.tsx`
    const hasUiFile = definition.sourceFiles.some((spec) => spec.path === expectedUiPath)
    if (!hasUiFile) {
      warn(
        `${label} No sourceFiles entry at "${expectedUiPath}" — the real component file ` +
          `should follow the "${UI_DIR}/<slug>.tsx" convention.`,
      )
    }

    // 7. Install metadata shape exists (arrays may be empty).
    if (!Array.isArray(definition.registry?.dependencies)) {
      fail(`${label} registry.dependencies must be an array (may be empty).`)
    }
    if (!Array.isArray(definition.registry?.registryDependencies)) {
      fail(`${label} registry.registryDependencies must be an array (may be empty).`)
    }

    // 8. A matching shadcn registry item exists.
    if (definition.slug && !registryItemNames.has(definition.slug)) {
      fail(
        `${label} No matching item in registry.json — run \`bun run sync:components\` ` +
          `so the install command for /r/${definition.slug}.json resolves.`,
      )
    }
  }

  if (warnings.length > 0) {
    console.warn(`\n[validate:components] ${warnings.length} warning(s):`)
    for (const message of warnings) console.warn(`  ⚠ ${message}`)
  }

  if (errors.length > 0) {
    console.error(`\n[validate:components] ${errors.length} error(s):`)
    for (const message of errors) console.error(`  ✗ ${message}`)
    console.error('\n[validate:components] FAILED')
    process.exit(1)
  }

  console.log(
    `\n[validate:components] OK — ${componentRegistryEntries.length} component(s) validated, ${warnings.length} warning(s).`,
  )
}

main().catch((error) => {
  console.error('[validate:components] Unexpected failure:', error)
  process.exit(1)
})
