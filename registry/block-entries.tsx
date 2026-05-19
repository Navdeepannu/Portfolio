import type { ComponentType } from 'react'

import { blockRegistryEntries } from './block-registry.generated'
import type { BlockDefinition, BlockRegistryEntry } from './types'

export { blockRegistryEntries } from './block-registry.generated'

export const blockDefinitions: BlockDefinition[] = blockRegistryEntries.map((e) => e.definition)

const componentBySlug = new Map(
  blockRegistryEntries.map((e) => [e.definition.slug, e.Component] as const),
)

export function getBlockEntry(slug: string): BlockRegistryEntry | undefined {
  return blockRegistryEntries.find((e) => e.definition.slug === slug)
}

export function getBlockComponent(slug: string): ComponentType | undefined {
  return componentBySlug.get(slug)
}
