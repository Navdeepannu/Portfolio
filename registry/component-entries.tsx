import type { ComponentType } from 'react'

import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'
import MagneticButtonShowcase from '@/components/showcase/magnetic-button-showcase'
import AnimatedTabsShowcase from '@/components/showcase/animated-tabs'

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
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlM04Gne1uOodGSrWg4T1VFeXnaL6f08c9vlJx',
      description:
        'Segmented headline with hover-driven focus, blur states, and an animated dashed highlight box.',
      category: 'interactive',
      tags: ['interactive', 'marketing', 'animation', 'motion', 'accessibility'],
      bento: { size: 'lg' },
      sourceFiles: [
        { path: 'components/ui/components/segment-spotlight.tsx', language: 'tsx' },
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
} from '@/components/segment-spotlight'

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
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlXH1ynpA2u3zKHak0FTUAL7ZrsNJE5jQiOYwt',
      description:
        'A shadcn-compatible button that subtly follows the cursor using spring-based motion.',
      category: 'buttons',
      tags: ['interactive', 'motion', 'cursor', 'animation'],
      bento: { size: 'md' },
      sourceFiles: [
        {
          path: 'components/ui/components/magnetic-button.tsx',
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
      usageExample: `import { MagneticButton } from '@/components/magnetic-button'

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
  entry(
    defineComponent({
      slug: 'animated-tabs',
      title: 'Animated Tabs',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTl8DHX6q4dwU2oJkmKaujTg9FMAr3QiGROq5bE',
      description: 'A tab component with a moving active pill and directional content transitions.',
      category: 'interactive',
      tags: ['interactive', 'motion', 'animation', 'tabs', 'accessibility'],
      bento: { size: 'lg' },
      sourceFiles: [
        { path: 'components/ui/components/animated-tabs.tsx', language: 'tsx' },
        {
          path: 'components/showcase/animated-tabs.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion'],
        registryDependencies: [],
      },
      usageExample: `import {
  AnimatedTabs,
  type AnimatedTabItem,
} from '@/components/animated-tabs'

const items: AnimatedTabItem[] = [
  { value: 'overview', label: 'Overview', content: <p>Overview content</p> },
  { value: 'pricing', label: 'Pricing', content: <p>Pricing content</p> },
  { value: 'faq', label: 'FAQ', content: <p>FAQ content</p> },
]

export function Example() {
  return <AnimatedTabs items={items} defaultValue="overview" />
}`,
      api: [
        {
          prop: 'items',
          type: 'AnimatedTabItem[]',
          default: '-',
          description:
            'Tabs to render. Each item is { value, label, content }, where content is any React node.',
        },
        {
          prop: 'defaultValue',
          type: 'string',
          default: '-',
          description: 'value of the tab selected on first render. Defaults to the first tab.',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the outer wrapper.',
        },
        {
          prop: 'listClassName',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the tab list (the pill track).',
        },
        {
          prop: 'triggerClassName',
          type: 'string',
          default: '-',
          description: 'Classes merged onto each tab trigger button.',
        },
        {
          prop: 'contentClassName',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the content panel wrapper.',
        },
      ],
    }),
    AnimatedTabsShowcase,
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
