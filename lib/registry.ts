/**
 * Centralized registry configuration & helpers — the single source of truth for
 * every registry URL, install command, and namespace reference on the site.
 *
 * ## Registry URL architecture
 *
 * All published registry artifacts live under `<base>/r/<name>.json`, where
 * `<base>` is the canonical UI-library origin from `lib/sites.ts`. Changing it
 * there updates every runtime install command and namespace template.
 *
 *   Production base : https://ui.navdeepsingh.dev
 *   Item URL        : https://ui.navdeepsingh.dev/r/animated-tabs.json
 *
 * Two installation strategies are supported, both backed by the exact same JSON
 * files in `public/r/`:
 *
 * 1. **Direct URL (default)** — consumers paste the fully-qualified item URL and
 *    need no `components.json` changes:
 *
 *      npx shadcn@latest add https://ui.navdeepsingh.dev/r/animated-tabs.json
 *
 *    The build step (`scripts/finalize-registry.ts`) rewrites internal
 *    `@navdeep-singh/<item>` registryDependencies into these absolute URLs so
 *    transitive installs resolve without any namespace registration.
 *
 * 2. **Namespace (`@navui`)** — consumers register the namespace once in their
 *    `components.json` and then install by short reference:
 *
 *      "registries": { "@navui": "https://ui.navdeepsingh.dev/r/{name}.json" }
 *      npx shadcn@latest add @navui/animated-tabs
 *
 * Note: the public-facing consumer namespace (`@navui`) is intentionally distinct
 * from the internal registry `name` (`navdeep-singh`) used for build-time
 * dependency resolution in `registry.json`.
 */

import { SITE_ORIGINS } from '@/lib/sites'

export type PackageManagerId = 'npm' | 'bun' | 'pnpm' | 'yarn'

/** Public shadcn namespace consumers register to install via `@navui/<name>`. */
export const REGISTRY_NAMESPACE = '@navui' as const

/**
 * Production base URL for all registry artifacts. Always returned without a
 * trailing slash.
 */
export function getRegistryBaseUrl(): string {
  return SITE_ORIGINS.ui
}

/** Fully-qualified URL of a published registry item: `<base>/r/<slug>.json`. */
export function getRegistryItemUrl(slug: string): string {
  return `${getRegistryBaseUrl()}/r/${slug}.json`
}

/** Short namespace reference for an item: `@navui/<slug>`. */
export function getRegistryNamespaceRef(slug: string): string {
  return `${REGISTRY_NAMESPACE}/${slug}`
}

/**
 * The `{name}` URL template a consumer registers under the namespace in their
 * `components.json` `registries` map.
 */
export function getRegistryNamespaceUrlTemplate(): string {
  return `${getRegistryBaseUrl()}/r/{name}.json`
}

/** Per-package-manager `shadcn add` executor prefixes. */
const SHADCN_ADD_EXECUTORS: Record<PackageManagerId, string> = {
  npm: 'npx shadcn@latest add',
  bun: 'bunx --bun shadcn@latest add',
  pnpm: 'pnpm dlx shadcn@latest add',
  yarn: 'yarn dlx shadcn@latest add',
}

function buildShadcnAddCommands(target: string): Record<PackageManagerId, string> {
  return {
    npm: `${SHADCN_ADD_EXECUTORS.npm} ${target}`,
    bun: `${SHADCN_ADD_EXECUTORS.bun} ${target}`,
    pnpm: `${SHADCN_ADD_EXECUTORS.pnpm} ${target}`,
    yarn: `${SHADCN_ADD_EXECUTORS.yarn} ${target}`,
  }
}

/**
 * Direct-URL install commands (the default method shown throughout the UI).
 * e.g. `npx shadcn@latest add https://ui.navdeepsingh.dev/r/animated-tabs.json`
 */
export function getDirectInstallCommands(slug: string): Record<PackageManagerId, string> {
  return buildShadcnAddCommands(getRegistryItemUrl(slug))
}

/**
 * Namespace install commands using the `@navui` short reference.
 * e.g. `npx shadcn@latest add @navui/animated-tabs`
 */
export function getNamespaceInstallCommands(slug: string): Record<PackageManagerId, string> {
  return buildShadcnAddCommands(getRegistryNamespaceRef(slug))
}

/**
 * The `registries` snippet a consumer adds to `components.json` to enable the
 * `@navui` namespace. Returned as pretty-printed JSON for display/copy.
 */
export function getRegistryConfigSnippet(): string {
  return JSON.stringify(
    { registries: { [REGISTRY_NAMESPACE]: getRegistryNamespaceUrlTemplate() } },
    null,
    2,
  )
}
