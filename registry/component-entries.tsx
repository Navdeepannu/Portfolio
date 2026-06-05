import type { ComponentType } from 'react'

import AnimateTextShowcase from '@/components/showcase/animate-text'
import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'

import { defineComponent } from './define-component'
import type { ComponentDefinition } from '@/data/component-types'

export type ComponentRegistryEntry = {
  definition: ComponentDefinition
  Component: ComponentType
  Preview: ComponentType
}

function entry(
  definition: ComponentDefinition,
  Component: ComponentType,
  Preview?: ComponentType,
): ComponentRegistryEntry {
  return { definition, Component, Preview: Preview ?? Component }
}

export const componentRegistryEntries: ComponentRegistryEntry[] = [
  entry(
    defineComponent({
      slug: 'animate-text',
      title: 'Animate Text',
      description: 'Character, word, or line reveal animations powered by Motion.',
      category: 'text',
      tags: ['text', 'animation', 'motion', 'typography'],
      bento: { colSpan: 1, rowSpan: 2 },
      sourceFiles: [
        { path: 'components/ui/custom/text-effect.tsx', language: 'tsx' },
        { path: 'components/showcase/animate-text.tsx', language: 'tsx', filename: 'demo.tsx' },
      ],
      registry: {
        dependencies: ['motion'],
        registryDependencies: [],
      },
    }),
    AnimateTextShowcase,
  ),
  entry(
    defineComponent({
      slug: 'segment-spotlight',
      title: 'Segment Spotlight',
      description:
        'Segmented headline with hover-driven focus, blur states, and an animated dashed highlight box.',
      category: 'interactive',
      tags: ['interactive', 'marketing', 'animation', 'motion', 'accessibility'],
      bento: { colSpan: 2, rowSpan: 2 },
      sourceFiles: [
        { path: 'components/ui/custom/segment-spotlight.tsx', language: 'tsx' },
        {
          path: 'components/showcase/segment-spotlight.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion', 'lucide-react'],
        registryDependencies: [],
      },
    }),
    SegmentSpotlightShowcase,
  ),
]

export const componentDefinitions: ComponentDefinition[] = componentRegistryEntries.map(
  (entry) => entry.definition,
)

const componentBySlug = new Map(
  componentRegistryEntries.map((entry) => [entry.definition.slug, entry.Component] as const),
)

const previewBySlug = new Map(
  componentRegistryEntries.map((entry) => [entry.definition.slug, entry.Preview] as const),
)

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
  return componentRegistryEntries.find((entry) => entry.definition.slug === slug)
}

export function getComponentComponent(slug: string): ComponentType | undefined {
  return componentBySlug.get(slug)
}

export function getComponentPreview(slug: string): ComponentType | undefined {
  return previewBySlug.get(slug)
}
