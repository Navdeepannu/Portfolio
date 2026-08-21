import { defineBlock } from '@/registry/define-block'
import type { BlockDefinition, RegistryFileEntry, RegistryItemStatus } from '@/registry/types'

type BlockItemInput = {
  slug: string
  title: string
  description: string
  category: string
  source: string
  target: string
  status: RegistryItemStatus
  dependencies?: string[]
  registryDependencies?: string[]
  supportingFiles?: RegistryFileEntry[]
}

export function defineBlockItem(input: BlockItemInput): BlockDefinition {
  const primaryFile: RegistryFileEntry = {
    path: input.source,
    target: input.target,
    type: 'registry:component',
  }
  const files = [primaryFile, ...(input.supportingFiles ?? [])]

  return defineBlock({
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: input.category,
    tags: [input.category],
    status: input.status,
    sourceFiles: files.map((file) => ({ path: file.path, language: 'tsx' })),
    registry: {
      type: 'registry:block',
      dependencies: input.dependencies ?? [],
      registryDependencies: input.registryDependencies ?? [],
      files,
    },
  })
}
