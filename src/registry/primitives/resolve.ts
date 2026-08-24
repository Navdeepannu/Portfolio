import type { Primitive } from '@/config/navui-primitives'
import type { BlockDefinition, NavUIRegistryItem, ResolvedBlockDefinition } from '@/registry/types'

export function resolveBlockDefinition(
  definition: BlockDefinition,
  primitive: Primitive,
): ResolvedBlockDefinition {
  const variant = definition.primitiveVariants?.[primitive]
  const shared = { ...definition }
  delete shared.primitiveVariants

  return {
    ...shared,
    primitive,
    sourceFiles: variant?.sourceFiles ?? shared.sourceFiles,
    preview: variant?.preview ?? shared.preview,
    registry: {
      ...shared.registry,
      dependencies: variant?.registry?.dependencies ?? shared.registry.dependencies,
      registryDependencies:
        variant?.registry?.registryDependencies ?? shared.registry.registryDependencies,
      files: variant?.registry?.files ?? shared.registry.files,
    },
  }
}

export function resolveRegistryItemForPrimitive(
  item: NavUIRegistryItem,
  primitive: Primitive,
): NavUIRegistryItem | ResolvedBlockDefinition {
  return item.kind === 'block' ? resolveBlockDefinition(item, primitive) : item
}
