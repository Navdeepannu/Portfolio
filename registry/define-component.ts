import type { BlockRegistryMeta, RegistryFileEntry } from './types'
import type { ComponentDefinition } from '@/data/component-types'

type DefineComponentInput = Omit<ComponentDefinition, 'registry'> & {
  registry?: Partial<Omit<BlockRegistryMeta, 'files'>> & {
    files?: RegistryFileEntry[]
  }
}

/**
 * Normalizes component metadata and fills in shadcn-oriented `registry.files` from
 * `sourceFiles` when not overridden.
 */
export function defineComponent(input: DefineComponentInput): ComponentDefinition {
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
      type: registryPartial?.type ?? 'registry:component',
      dependencies: registryPartial?.dependencies,
      registryDependencies: registryPartial?.registryDependencies,
      files,
    },
  }
}
