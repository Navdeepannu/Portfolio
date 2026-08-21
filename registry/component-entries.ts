import type { ComponentType } from 'react'

import {
  componentExamplePreviewComponents,
  componentPreviewComponents,
} from './generated/component-previews.generated'
import {
  componentItemEntries,
  type ComponentExampleItem,
  type ComponentItemEntry,
} from './items/components'

export type ComponentExampleRegistryEntry = ComponentExampleItem & {
  Showcase: ComponentType
}

export type ComponentRegistryEntry = ComponentItemEntry & {
  Showcase: ComponentType
  examples: ComponentExampleRegistryEntry[]
}

export const componentRegistryEntries: ComponentRegistryEntry[] = componentItemEntries
  .filter((entry) => entry.definition.status === 'published')
  .map((entry) => ({
    ...entry,
    Showcase: componentPreviewComponents[entry.definition.slug],
    examples: entry.examples.map((example) => ({
      ...example,
      Showcase: componentExamplePreviewComponents[`${entry.definition.slug}:${example.id}`],
    })),
  }))

export const componentDefinitions = componentRegistryEntries.map((entry) => entry.definition)

const showcaseBySlug = new Map(
  componentRegistryEntries.map((entry) => [entry.definition.slug, entry.Showcase] as const),
)

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
  return componentRegistryEntries.find((entry) => entry.definition.slug === slug)
}

export function getComponentShowcase(slug: string): ComponentType | undefined {
  return showcaseBySlug.get(slug)
}

export function getComponentExamples(slug: string): ComponentExampleRegistryEntry[] {
  return getComponentEntry(slug)?.examples ?? []
}

export function getComponentExample(
  slug: string,
  exampleId: string,
): ComponentExampleRegistryEntry | undefined {
  return getComponentExamples(slug).find((example) => example.id === exampleId)
}
