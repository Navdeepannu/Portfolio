import type { BlockDefinition, BlockRegistryMeta, RegistryFileEntry } from './types'

type DefineBlockInput = Omit<BlockDefinition, 'registry'> & {
  registry?: Partial<Omit<BlockRegistryMeta, 'files'>> & {
    files?: RegistryFileEntry[]
  }
}

/**
 * Normalizes block metadata and fills in shadcn-oriented `registry.files` from
 * `sourceFiles` when not overridden (single source of truth for on-disk paths).
 */
export function defineBlock(input: DefineBlockInput): BlockDefinition {
  const { registry: registryPartial, ...rest } = input
  const files: RegistryFileEntry[] =
    registryPartial?.files ??
    rest.sourceFiles.map((sf) => ({
      path: sf.path,
      target: sf.path,
      type: 'registry:component' as const,
    }))

  return {
    ...rest,
    registry: {
      name: registryPartial?.name ?? rest.slug,
      type: registryPartial?.type ?? 'registry:block',
      dependencies: registryPartial?.dependencies,
      registryDependencies: registryPartial?.registryDependencies,
      files,
    },
  }
}
