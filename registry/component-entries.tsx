import type { ComponentType } from 'react'

import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'
import MagneticButtonShowcase from '@/components/showcase/magnetic-button-showcase'

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
      slug: 'segment-spotlight',
      title: 'Segment Spotlight',
      description:
        'Segmented headline with hover-driven focus, blur states, and an animated dashed highlight box.',
      category: 'interactive',
      tags: ['interactive', 'marketing', 'animation', 'motion', 'accessibility'],
      bento: { size: 'lg' },
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
      usageExample: `import { Rocket, Zap } from 'lucide-react'

import {
  SegmentSpotlight,
  type SegmentSpotlightSegment,
  type SegmentSpotlightFocus,
} from '@/components/ui/custom/segment-spotlight'

const segments: SegmentSpotlightSegment[] = [
  { id: 'ship', text: 'Ship faster' },
  { id: 'with', text: ' with ' },
  { id: 'sync', text: 'real-time sync' },
]

const focuses: SegmentSpotlightFocus[] = [
  { id: 'velocity', label: 'Velocity', icon: Rocket, segmentIds: ['ship'] },
  { id: 'infra', label: 'Infrastructure', icon: Zap, segmentIds: ['sync'] },
]

export function Example() {
  return <SegmentSpotlight segments={segments} focuses={focuses} />
}`,
      api: [
        {
          prop: 'segments',
          type: 'SegmentSpotlightSegment[]',
          default: '-',
          description:
            'Ordered text fragments that make up the headline. Each item is { id, text }.',
        },
        {
          prop: 'focuses',
          type: 'SegmentSpotlightFocus[]',
          default: '-',
          description:
            'Focus buttons; hovering one highlights its segmentIds. Each item is { id, label, icon, segmentIds }.',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the outer wrapper.',
        },
        {
          prop: 'headingClassName',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the headline row.',
        },
      ],
    }),
    SegmentSpotlightShowcase,
  ),
  entry(
    defineComponent({
      slug: 'magnetic-button',
      title: 'Magnetic Button',
      description:
        'A shadcn-compatible button that subtly follows the cursor using spring-based motion.',
      category: 'buttons',
      tags: ['interactive', 'motion', 'cursor', 'animation'],
      bento: { size: 'md' },
      sourceFiles: [
        {
          path: 'components/ui/custom/magnetic-button.tsx',
          language: 'tsx',
        },
        {
          path: 'components/showcase/magnetic-button-showcase.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion'],
        registryDependencies: ['button'],
      },
      usageExample: `import { MagneticButton } from '@/components/ui/custom/magnetic-button'

export function Example() {
  return <MagneticButton>Hover me</MagneticButton>
}`,
      api: [
        {
          prop: 'movement',
          type: 'number',
          default: '6',
          description: 'How far (in px) the button drifts toward the cursor on hover.',
        },
        {
          prop: 'children',
          type: 'React.ReactNode',
          default: '-',
          description: 'Button content.',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the underlying button.',
        },
        {
          prop: '...props',
          type: 'React.ComponentProps<typeof Button>',
          default: '-',
          description:
            "All native <button> props via the shadcn Button (e.g. variant, size, disabled, onClick), except 'asChild'.",
        },
      ],
    }),
    MagneticButtonShowcase,
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
