import { readProjectSourceFile } from '@/lib/block-source'

import type { BlockDefinition } from './types'

/** Serialized file entry suitable for a shadcn-style registry JSON `items[].files[]`. */
export type SerializedRegistryFile = {
  path: string
  type: string
  content: string
}

/**
 * Reads on-disk sources and returns a registry-item-shaped object for JSON export
 * or future `shadcn` registry publishing. Targets in the output use `target`
 * paths so install destinations stay explicit.
 */
export async function buildShadcnRegistryItemPayload(
  definition: BlockDefinition,
): Promise<{
  name: string
  type: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: SerializedRegistryFile[]
}> {
  const files: SerializedRegistryFile[] = await Promise.all(
    definition.registry.files.map(async (f) => ({
      path: f.target,
      type: f.type ?? 'registry:component',
      content: await readProjectSourceFile(f.path),
    })),
  )

  return {
    name: definition.registry.name,
    type: definition.registry.type,
    dependencies: definition.registry.dependencies,
    registryDependencies: definition.registry.registryDependencies,
    files,
  }
}
