import type { ComponentType } from 'react'

import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'
import MagneticButtonShowcase from '@/components/showcase/magnetic-button'
import AnimatedTabsShowcase from '@/components/showcase/animated-tabs'
import ExpandableCardShowcase from '@/components/showcase/expandable-card'

import { defineComponent } from './define-component'
import type { ComponentDefinition } from '@/data/component-types'

export type ComponentRegistryEntry = {
  definition: ComponentDefinition
  Showcase: ComponentType
}

function entry(definition: ComponentDefinition, Showcase: ComponentType): ComponentRegistryEntry {
  return { definition, Showcase }
}

export const componentRegistryEntries: ComponentRegistryEntry[] = [
  entry(
    defineComponent({
      slug: 'segment-spotlight',
      title: 'Segment Spotlight',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlM04Gne1uOodGSrWg4T1VFeXnaL6f08c9vlJx',
      description:
        'A desktop-focused spotlight component for showcasing product features, services, or workflow steps with floating labels and an interactive icon toolbar.',
      registryDescription:
        'A desktop-focused floating feature spotlight with animated chips, icon controls, hover focus, and blurred inactive states.',
      category: 'interactive',
      tags: ['interactive', 'marketing', 'animation', 'motion', 'accessibility'],
      bento: { size: 'lg' },
      useCases: [
        'Hero sections',
        'Product landing pages',
        'SaaS feature sections',
        'AI workflow explainers',
        'Interactive desktop previews',
        'Service or feature highlight sections',
      ],
      notes: ['Desktop-first. Use `hidden md:flex` or add a simple mobile fallback.'],
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
      usageExample: `import { Flag, MessageCircle, Share2 } from 'lucide-react'

import {
  SegmentSpotlight,
  type SegmentSpotlightSegment,
  type SegmentSpotlightFocus,
} from '@/components/segment-spotlight'

const SEGMENTS: SegmentSpotlightSegment[] = [
  { id: 'comments', label: 'Comments', color: 'blue', className: 'left-[18%] top-[20%] -rotate-3' },
  { id: 'flags', label: 'Feature Flags', color: 'teal', className: 'left-[22%] top-[58%] rotate-2' },
  { id: 'share', label: 'Share', color: 'pink', className: 'right-[18%] top-[24%] rotate-6' },
]

const FOCUSES: SegmentSpotlightFocus[] = [
  { id: 'comments', label: 'Comments', icon: MessageCircle, segmentIds: ['comments'] },
  { id: 'flags', label: 'Feature Flags', icon: Flag, segmentIds: ['flags'] },
  { id: 'share', label: 'Share', icon: Share2, segmentIds: ['share'] },
]

export function Example() {
  // Desktop-focused: floating labels are absolutely positioned, so render the
  // component on md+ screens (or provide your own mobile fallback).
  return (
    <div className="hidden size-full items-center justify-center md:flex">
      <SegmentSpotlight segments={SEGMENTS} focuses={FOCUSES} />
    </div>
  )
}`,
      api: [
        {
          prop: 'segments',
          type: 'SegmentSpotlightSegment[]',
          default: '-',
          description:
            'Floating label chips. Each item is { id, label, color?, className? }, where className positions the chip (e.g. "left-[18%] top-[20%]").',
        },
        {
          prop: 'focuses',
          type: 'SegmentSpotlightFocus[]',
          default: '-',
          description:
            'Icon toolbar buttons; hovering/focusing one highlights its segmentIds and blurs the rest. Each item is { id, label, icon, segmentIds, dividerAfter? }.',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the outer wrapper.',
        },
        {
          prop: 'viewportClassName',
          type: 'string',
          default: '-',
          description:
            'Classes merged onto the inner viewport that contains the chips and toolbar.',
        },
        {
          prop: 'toolbarClassName',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the floating icon toolbar.',
        },
        {
          prop: 'showGrid',
          type: 'boolean',
          default: 'false',
          description: 'Renders a subtle background grid inside the viewport.',
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
          path: 'components/showcase/magnetic-button.tsx',
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
  entry(
    defineComponent({
      slug: 'expandable-card',
      title: 'Expandable Card',
      image:
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1080&auto=format&fit=crop',
      description:
        'Expandable Card is a reusable interactive card component for showing a compact preview first, then expanding to reveal more details, supporting descriptions, actions, and optional learn-more links.',
      registryDescription:
        'An animated expandable card that reveals more content, actions, and optional links on interaction.',
      category: 'interactive',
      tags: ['interactive', 'motion', 'animation', 'card', 'accessibility'],
      bento: { size: 'lg' },
      useCases: [
        'FAQ cards',
        'Product feature cards',
        'Service cards',
        'Pricing highlights',
        'Portfolio project cards',
        'Team/member cards',
        'Blog/resource previews',
      ],
      sourceFiles: [
        { path: 'components/ui/components/expandable-card.tsx', language: 'tsx' },
        {
          path: 'components/showcase/expandable-card.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion', 'lucide-react', '@radix-ui/react-use-controllable-state'],
        registryDependencies: [],
      },
      usageExample: `import { ExpandableCard } from '@/components/expandable-card'

export function Example() {
  return (
    <ExpandableCard
      title="Smart Automation"
      description="Automate repetitive tasks and help users move faster with fewer manual steps."
      image="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop"
      learnMore={{ label: 'View docs', href: '#' }}
      items={[
        {
          title: 'What it does',
          description: 'Handles repeated actions like updates, reminders, and simple workflows.',
        },
        {
          title: 'Best for',
          description: 'Admin dashboards, productivity apps, SaaS tools, and customer portals.',
        },
      ]}
    />
  )
}`,
      api: [
        {
          prop: 'title',
          type: 'string',
          default: '-',
          description: 'Card title, shown in both the collapsed and expanded states.',
        },
        {
          prop: 'description',
          type: 'string',
          default: '-',
          description: 'Short summary shown in the preview and again when expanded.',
        },
        {
          prop: 'image',
          type: 'string',
          default: '-',
          description: 'Optional cover image URL shown in the media area.',
        },
        {
          prop: 'icon',
          type: 'React.ReactNode',
          default: '-',
          description: 'Optional icon/media node, used in the media area when no `image` is set.',
        },
        {
          prop: 'items',
          type: 'ExpandableCardItem[]',
          default: '[]',
          description:
            'Detail rows revealed in the expanded state. Each item is { title, description }.',
        },
        {
          prop: 'footer',
          type: 'React.ReactNode',
          default: '-',
          description: 'Custom footer/actions rendered in the expanded state.',
        },
        {
          prop: 'learnMore',
          type: '{ label?: string; href?: string; onClick?: () => void }',
          default: '-',
          description:
            'Optional learn-more link (when `href`) or action (when `onClick`) rendered in the expanded state.',
        },
        {
          prop: 'open',
          type: 'boolean',
          default: '-',
          description: 'Controlled open state. Use with `onOpenChange`.',
        },
        {
          prop: 'defaultOpen',
          type: 'boolean',
          default: 'false',
          description: 'Uncontrolled initial open state.',
        },
        {
          prop: 'onOpenChange',
          type: '(open: boolean) => void',
          default: '-',
          description: 'Called whenever the open state changes (controlled or uncontrolled).',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the collapsed card.',
        },
      ],
    }),
    ExpandableCardShowcase,
  ),
]

export const componentDefinitions: ComponentDefinition[] = componentRegistryEntries.map(
  (entry) => entry.definition,
)

const showcaseBySlug = new Map(
  componentRegistryEntries.map((entry) => [entry.definition.slug, entry.Showcase] as const),
)

export function getComponentEntry(slug: string): ComponentRegistryEntry | undefined {
  return componentRegistryEntries.find((entry) => entry.definition.slug === slug)
}

/** Resolve the showcase/demo component for a slug (docs + preview rendering). */
export function getComponentShowcase(slug: string): ComponentType | undefined {
  return showcaseBySlug.get(slug)
}
