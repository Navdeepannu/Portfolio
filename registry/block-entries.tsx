import type { ComponentType } from 'react'

import { blockPreviewComponents } from './generated/block-previews.generated'
import { blockItems } from './items'
import type { BlockDefinition, BlockRegistryEntry } from './types'

export const blockDefinitions: BlockDefinition[] = blockItems.filter(
  (item) => item.status === 'published',
)

export const blockRegistryEntries: BlockRegistryEntry[] = blockDefinitions.map((definition) => ({
  definition,
  Component: blockPreviewComponents[definition.slug] as ComponentType,
}))

const componentBySlug = new Map(
  blockRegistryEntries.map((entry) => [entry.definition.slug, entry.Component] as const),
)

export function getBlockEntry(slug: string): BlockRegistryEntry | undefined {
  return blockRegistryEntries.find((entry) => entry.definition.slug === slug)
}

export function getBlockComponent(slug: string): ComponentType | undefined {
  return componentBySlug.get(slug)
}
