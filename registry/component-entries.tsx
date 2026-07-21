import type { ComponentType } from 'react'

import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'
import MagneticButtonShowcase from '@/components/showcase/magnetic-button'
import AnimatedTabsShowcase from '@/components/showcase/animated-tabs'
import ExpandableCardShowcase from '@/components/showcase/expandable-card'
import RailNavShowcase from '@/components/showcase/rail-nav'

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
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlHuf7vDqHjv3VPCtBSMksEJOn7pmfxyc9IoU5',
      description:
        'A composable spotlight canvas for connecting floating content with an interactive toolbar in product tours, filters, workflows, and feature sections.',
      registryDescription:
        'Composable spotlight primitives with controlled state, animated segments, arbitrary controls, and hover or click activation.',
      category: 'interactive',
      tags: ['interactive', 'marketing', 'animation', 'motion', 'accessibility'],
      bento: { size: 'lg' },
      useCases: [
        'Hero sections',
        'Product landing pages',
        'SaaS feature sections',
        'AI workflow explainers',
        'Interactive product previews',
        'Service or feature highlight sections',
      ],
      notes: [
        'Segments accept your positioning classes, so responsive layouts can reposition, hide, or restack them at any breakpoint.',
      ],
      sourceFiles: [
        { path: 'components/ui/components/segment-spotlight.tsx', language: 'tsx' },
        {
          path: 'components/showcase/segment-spotlight.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion', 'radix-ui', '@radix-ui/react-use-controllable-state'],
        registryDependencies: [],
      },
      usageExample: `import { Flag, MessageCircle } from 'lucide-react'

import {
  SegmentSpotlight,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
} from '@/components/segment-spotlight'

export function Example() {
  return (
    <SegmentSpotlight>
      <SegmentSpotlightViewport>
        <SegmentSpotlightSegment value="comments" variant="blue" className="top-16 left-[15%]">
          Comments
        </SegmentSpotlightSegment>
        <SegmentSpotlightSegment value="flags" variant="teal" className="right-[15%] bottom-16">
          Feature flags
        </SegmentSpotlightSegment>

        <SegmentSpotlightToolbar aria-label="Highlight capability" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <SegmentSpotlightTrigger value="comments" aria-label="Comments">
            <MessageCircle />
          </SegmentSpotlightTrigger>
          <SegmentSpotlightSeparator />
          <SegmentSpotlightTrigger value="flags" aria-label="Feature flags">
            <Flag />
          </SegmentSpotlightTrigger>
        </SegmentSpotlightToolbar>
      </SegmentSpotlightViewport>
    </SegmentSpotlight>
  )
}`,
      api: [
        {
          prop: 'SegmentSpotlight',
          type: 'React.ComponentProps<"div">',
          default: 'value: null; activationMode: "hover"',
          description:
            'Root state provider. Supports value, defaultValue, onValueChange, activationMode (hover or click), and native div props.',
        },
        {
          prop: 'SegmentSpotlightViewport',
          type: 'React.ComponentProps<"div">',
          default: '-',
          description: 'Positioning canvas for segments, controls, grids, and custom content.',
        },
        {
          prop: 'SegmentSpotlightSegment',
          type: 'Motion div props & { value; variant? }',
          default: 'variant: "default"',
          description:
            'An animated target. Children, position, color variant, and Motion animation props are fully customizable.',
        },
        {
          prop: 'SegmentSpotlightToolbar',
          type: 'Motion div props',
          default: '-',
          description:
            'Accessible toolbar container that resets hover state when interaction leaves.',
        },
        {
          prop: 'SegmentSpotlightTrigger',
          type: 'Button props & { value; targets?; asChild? }',
          default: 'targets: [value]',
          description:
            'Arbitrary toolbar control. targets can highlight one or many segments; asChild supports custom controls.',
        },
        {
          prop: 'SegmentSpotlightGrid / Separator / Content',
          type: 'Native element props',
          default: '-',
          description:
            'Optional layout primitives for the background grid, toolbar grouping, and supporting content.',
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
      usageExample: `import Link from 'next/link'

import { MagneticButton } from '@/components/magnetic-button'

export function Example() {
  return (
    <MagneticButton asChild movement={8} variant="outline">
      <Link href="/docs">View documentation</Link>
    </MagneticButton>
  )
}`,
      api: [
        {
          prop: 'movement',
          type: 'number',
          default: '6',
          description: 'How far (in px) the button drifts toward the cursor on hover.',
        },
        {
          prop: 'wrapperClassName',
          type: 'string',
          default: '-',
          description: 'Classes applied to the animated wrapper without changing button styles.',
        },
        {
          prop: 'springOptions',
          type: 'SpringOptions',
          default: '{ stiffness: 180, damping: 10, mass: 0.5 }',
          description: 'Custom Motion spring configuration for cursor movement and settling.',
        },
        {
          prop: '...props',
          type: 'React.ComponentProps<typeof Button>',
          default: '-',
          description:
            'The complete shadcn Button API, including variant, size, asChild, refs, event handlers, disabled, and native button props.',
        },
      ],
    }),
    MagneticButtonShowcase,
  ),
  entry(
    defineComponent({
      slug: 'animated-tabs',
      title: 'Animated Tabs',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlX3opSU2u3zKHak0FTUAL7ZrsNJE5jQiOYwtd',
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
        dependencies: ['motion', '@radix-ui/react-use-controllable-state'],
        registryDependencies: ['tabs'],
      },
      usageExample: `import {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsViewport,
} from '@/components/animated-tabs'

export function Example() {
  return (
    <AnimatedTabs defaultValue="overview">
      <AnimatedTabsList>
        <AnimatedTabsTrigger value="overview">Overview</AnimatedTabsTrigger>
        <AnimatedTabsTrigger value="pricing">Pricing</AnimatedTabsTrigger>
      </AnimatedTabsList>

      <AnimatedTabsViewport>
        <AnimatedTabsContent value="overview">Overview content</AnimatedTabsContent>
        <AnimatedTabsContent value="pricing">Pricing content</AnimatedTabsContent>
      </AnimatedTabsViewport>
    </AnimatedTabs>
  )
}`,
      api: [
        {
          prop: 'AnimatedTabs',
          type: 'React.ComponentProps<typeof Tabs>',
          default: '-',
          description:
            'Accessible root with the Radix Tabs controlled and uncontrolled state API, orientation, direction, and activationMode.',
        },
        {
          prop: 'AnimatedTabsList',
          type: 'React.ComponentProps<typeof TabsList>',
          default: '-',
          description:
            'Scrollable tab list. Accepts native Radix list props and custom layout classes.',
        },
        {
          prop: 'AnimatedTabsTrigger',
          type: 'React.ComponentProps<typeof TabsTrigger>',
          default: '-',
          description: 'Tab trigger with the shared animated active indicator.',
        },
        {
          prop: 'AnimatedTabsViewport',
          type: 'React.ComponentProps<"div">',
          default: '-',
          description: 'Grid viewport that layers outgoing and incoming panels during transitions.',
        },
        {
          prop: 'AnimatedTabsContent',
          type: 'React.ComponentProps<typeof TabsContent>',
          default: '-',
          description:
            'Accessible tab panel with directional enter and exit motion. Children can be any React content.',
        },
      ],
    }),
    AnimatedTabsShowcase,
  ),
  entry(
    defineComponent({
      slug: 'expandable-card',
      title: 'Expandable Card',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlx629Fkg7C4maJxGZf1yUPI6YWNcVgE0T9hXu',
      description:
        'A compound card-dialog component for composing a compact trigger and a fully custom expanded experience with shared-layout motion.',
      registryDescription:
        'Composable card-dialog primitives with accessible modal behavior, controlled state, shared media motion, and custom actions.',
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
        dependencies: [
          'motion',
          'lucide-react',
          'radix-ui',
          '@radix-ui/react-use-controllable-state',
        ],
        registryDependencies: ['button'],
      },
      usageExample: `import {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardHeader,
  ExpandableCardTitle,
  ExpandableCardTrigger,
} from '@/components/expandable-card'

export function Example() {
  return (
    <ExpandableCard>
      <ExpandableCardTrigger>
        <span className="block p-4">
          <span className="font-medium">Smart automation</span>
          <span className="mt-1 block text-sm text-muted-foreground">View workflow details</span>
        </span>
      </ExpandableCardTrigger>

      <ExpandableCardContent>
        <ExpandableCardHeader>
          <ExpandableCardTitle>Smart automation</ExpandableCardTitle>
          <ExpandableCardDescription>
            Automate repetitive tasks without limiting the expanded layout.
          </ExpandableCardDescription>
        </ExpandableCardHeader>
        <ExpandableCardBody>Your charts, forms, links, or any React content.</ExpandableCardBody>
      </ExpandableCardContent>
    </ExpandableCard>
  )
}`,
      api: [
        {
          prop: 'ExpandableCard',
          type: 'React.ComponentProps<typeof Dialog.Root>',
          default: 'defaultOpen: false',
          description:
            'Accessible controlled or uncontrolled root. Supports open, defaultOpen, onOpenChange, and modal behavior.',
        },
        {
          prop: 'ExpandableCardTrigger',
          type: 'Motion button props',
          default: '-',
          description:
            'Collapsed card button. Accepts arbitrary preview content, native button props, Motion props, refs, and classes.',
        },
        {
          prop: 'ExpandableCardContent',
          type: 'Dialog.Content props',
          default: 'showCloseButton: true',
          description:
            'Accessible expanded dialog surface. Supports custom children, overlayClassName, closeLabel, transition, and Dialog events.',
        },
        {
          prop: 'ExpandableCardMedia',
          type: 'Motion span props',
          default: '-',
          description:
            'Optional shared-layout media primitive. Use it in both trigger and content around any image, icon, or visual.',
        },
        {
          prop: 'ExpandableCardHeader / Title / Description',
          type: 'Native and Dialog primitive props',
          default: '-',
          description:
            'Semantic dialog heading primitives with native prop and className passthrough.',
        },
        {
          prop: 'ExpandableCardBody / Footer',
          type: 'React.ComponentProps<"div">',
          default: '-',
          description:
            'Unopinionated content regions for application-specific details and actions.',
        },
        {
          prop: 'ExpandableCardClose',
          type: 'React.ComponentProps<typeof Dialog.Close>',
          default: '-',
          description: 'Optional close primitive for custom action placement; supports asChild.',
        },
      ],
    }),
    ExpandableCardShowcase,
  ),
  entry(
    defineComponent({
      slug: 'rail-nav',
      title: 'Rail Nav',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlTxAO7Jhdub1qHgxLFNhzr80OKpXcDswBitAY',
      description:
        'A compact motion rail that preserves its line-to-link reveal while supporting anchors, application routes, custom observer targets, and controlled state.',
      registryDescription:
        'Motion rail navigation with the original line-to-link reveal, controlled expansion, flexible links, and optional scroll tracking.',
      category: 'interactive',
      tags: ['interactive', 'navigation', 'docs', 'motion', 'accessibility'],
      bento: { size: 'lg' },
      useCases: [
        'Documentation pages',
        'Long-form case studies',
        'Portfolio write-ups',
        'Changelog pages',
        'Product guides',
        'Settings and dashboard navigation',
      ],
      sourceFiles: [
        { path: 'components/ui/components/rail-nav.tsx', language: 'tsx' },
        {
          path: 'components/showcase/rail-nav.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion', '@radix-ui/react-use-controllable-state'],
        registryDependencies: [],
      },
      usageExample: `import { RailNav } from '@/components/rail-nav'

const items = [
  { label: 'Introduction', href: '#introduction' },
  { label: 'Installation', href: '#installation' },
  { label: 'Usage', href: '#usage' },
]

export function Example() {
  return (
    <RailNav
      items={items}
      label="On this page"
      className="fixed top-28 right-8"
    />
  )
}`,
      api: [
        {
          prop: 'RailNav',
          type: 'React.ComponentProps<"aside"> & RailNavProps',
          default: 'trackActive: true; defaultExpanded: false',
          description:
            'Responsive rail with native aside props, the original reveal motion, and controlled active/expanded state.',
        },
        {
          prop: 'items',
          type: 'readonly RailNavItem[]',
          default: '-',
          description:
            'Navigation entries with React labels, any link href, optional tracking targets, classes, and click handlers.',
        },
        {
          prop: 'value / defaultValue / onValueChange',
          type: 'string / string / (value: string) => void',
          default: 'First item href',
          description:
            'Controlled or uncontrolled active navigation value for anchors and application routes.',
        },
        {
          prop: 'expanded / defaultExpanded / onExpandedChange',
          type: 'boolean / boolean / (expanded: boolean) => void',
          default: 'false',
          description:
            'Controlled or uncontrolled expansion without changing the original hover and focus animation.',
        },
        {
          prop: 'trackActive / observerOptions',
          type: 'boolean / IntersectionObserverInit',
          default: 'true / tuned viewport margins',
          description:
            'Optional section tracking with configurable IntersectionObserver behavior and per-item selectors.',
        },
      ],
    }),
    RailNavShowcase,
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
