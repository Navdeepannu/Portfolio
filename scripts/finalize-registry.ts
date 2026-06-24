/**
 * Post-processes the output of `shadcn build` so that registry items can be
 * installed by **URL only**, without a consumer registering the `@nav`
 * namespace in their `components.json`.
 *
 * What this does:
 *   - Reads every `public/r/*.json` file produced by `shadcn build`.
 *   - In each item's `registryDependencies`, rewrites any `@<name>/<item>`
 *     reference that matches the root `registry.json` `name` into a fully
 *     qualified URL: `<baseUrl>/r/<item>.json`.
 *   - Recurses through nested item bundles when `shadcn build` inlines them
 *     into the catalog (`registry.json`).
 *
 * Base URL resolution order (first match wins):
 *   1. `process.env.NEXT_PUBLIC_REGISTRY_URL` (deploy-time override)
 *   2. `homepage` field in `registry.json` (the canonical production domain)
 *   3. `PRODUCTION_FALLBACK_BASE_URL` below
 *
 * All three resolve to the production origin (https://navdeepsingh.dev) — the
 * domain lives in `registry.json#homepage` / `lib/site.ts`, never localhost, so
 * generated `registryDependencies` URLs always resolve after deployment.
 *
 * Run via `bun scripts/finalize-registry.ts` (chained after `shadcn build`).
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'

type Json = unknown

const ROOT = process.cwd()
const REGISTRY_JSON_PATH = path.join(ROOT, 'registry.json')
const OUT_DIR = path.join(ROOT, 'public/r')

/**
 * Production registry origin used when neither the env override nor
 * `registry.json#homepage` is set. Must match `getSiteUrl()` in `lib/site.ts`.
 */
const PRODUCTION_FALLBACK_BASE_URL = 'https://navdeepsingh.dev'

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '')
}

async function readJson<T = Json>(filePath: string): Promise<T> {
  const raw = await fs.readFile(filePath, 'utf8')
  return JSON.parse(raw) as T
}

async function writeJson(filePath: string, data: Json): Promise<void> {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8')
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((entry) => typeof entry === 'string')
}

/** Mutates `node` in place; returns the number of rewrites it performed. */
function rewriteRegistryDeps(
  node: unknown,
  namespacePrefix: string,
  baseUrl: string,
): number {
  let count = 0

  const rewriteArray = (arr: string[]): string[] =>
    arr.map((dep) => {
      if (dep.startsWith(namespacePrefix)) {
        const name = dep.slice(namespacePrefix.length)
        count += 1
        return `${baseUrl}/r/${name}.json`
      }
      return dep
    })

  const walk = (value: unknown): void => {
    if (Array.isArray(value)) {
      value.forEach(walk)
      return
    }
    if (value && typeof value === 'object') {
      const obj = value as Record<string, unknown>
      if (isStringArray(obj.registryDependencies)) {
        obj.registryDependencies = rewriteArray(obj.registryDependencies)
      }
      for (const key of Object.keys(obj)) {
        if (key === 'registryDependencies') continue
        walk(obj[key])
      }
    }
  }

  walk(node)
  return count
}

async function main() {
  const rootRegistry = await readJson<{ name?: string; homepage?: string }>(
    REGISTRY_JSON_PATH,
  )

  const registryName = rootRegistry.name?.trim()
  if (!registryName) {
    throw new Error('[finalize:registry] registry.json is missing a `name` field')
  }
  const namespacePrefix = `@${registryName}/`

  const envBase = process.env.NEXT_PUBLIC_REGISTRY_URL?.trim()
  const homepage = rootRegistry.homepage?.trim()
  const resolvedBase = trimTrailingSlashes(envBase || homepage || PRODUCTION_FALLBACK_BASE_URL)

  let entries: string[]
  try {
    entries = await fs.readdir(OUT_DIR)
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.warn(
        `[finalize:registry] ${path.relative(ROOT, OUT_DIR)} not found — did \`shadcn build\` run?`,
      )
      return
    }
    throw error
  }

  let filesTouched = 0
  let totalRewrites = 0

  for (const entry of entries) {
    if (!entry.endsWith('.json')) continue
    const filePath = path.join(OUT_DIR, entry)
    const data = await readJson(filePath)
    const rewrites = rewriteRegistryDeps(data, namespacePrefix, resolvedBase)
    if (rewrites > 0) {
      await writeJson(filePath, data)
      filesTouched += 1
      totalRewrites += rewrites
    }
  }

  console.log(
    `[finalize:registry] base=${resolvedBase} — rewrote ${totalRewrites} ${namespacePrefix}* dep(s) across ${filesTouched} file(s).`,
  )
}

main().catch((error) => {
  console.error('[finalize:registry] Failed:', error)
  process.exit(1)
})
