export type PackageManagerId = 'npm' | 'bun' | 'pnpm' | 'yarn'

/**
 * Build the absolute URL of a registry item served from this app
 * (`<origin>/r/<slug>.json`). Falls back to a relative URL if `origin`
 * is empty (e.g. during the very first SSR paint).
 */
export function getRegistryItemUrl(slug: string, origin: string): string {
  const base = origin.replace(/\/+$/, '')
  return base ? `${base}/r/${slug}.json` : `/r/${slug}.json`
}

/**
 * Build the URL-based shadcn install commands shown in the showcase UI.
 * Consumers paste these directly — no `@scope` namespace registration
 * is required on their side.
 */
export function getInstallCommands(
  slug: string,
  origin: string,
): Record<PackageManagerId, string> {
  const url = getRegistryItemUrl(slug, origin)
  return {
    npm: `npx shadcn@latest add ${url}`,
    bun: `bunx --bun shadcn@latest add ${url}`,
    pnpm: `pnpm dlx shadcn@latest add ${url}`,
    yarn: `yarn dlx shadcn@latest add ${url}`,
  }
}
