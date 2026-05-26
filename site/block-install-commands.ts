export type PackageManagerId = 'npm' | 'bun' | 'pnpm' | 'yarn'

/** Namespace registered in the consumer's `components.json` and matching the root `registry.json` `name`. */
export const REGISTRY_NAMESPACE = '@nav'

/** Extract `@scope/pkg` from an existing install line, or fall back to `@nav/<slug>`. */
export function getShadcnAddSpec(cli: string | undefined, slug: string): string {
  if (cli) {
    const m = cli.match(/add\s+(@\S+)/)
    if (m) return m[1]
  }
  return `${REGISTRY_NAMESPACE}/${slug}`
}

export function getInstallCommands(spec: string): Record<PackageManagerId, string> {
  return {
    npm: `npx shadcn@latest add ${spec}`,
    bun: `bunx --bun shadcn@latest add ${spec}`,
    pnpm: `pnpm dlx shadcn@latest add ${spec}`,
    yarn: `yarn dlx shadcn@latest add ${spec}`,
  }
}
