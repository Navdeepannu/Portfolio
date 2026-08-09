import type { ComponentType } from 'react'

import SegmentSpotlightShowcase from '@/components/showcase/segment-spotlight'
import MagneticButtonShowcase from '@/components/showcase/magnetic-button'
import AnimatedTabsShowcase from '@/components/showcase/animated-tabs'
import AnimatedNumbersShowcase from '@/components/showcase/animated-numbers'
import ExpandableCardShowcase from '@/components/showcase/expandable-card'
import RailNavShowcase from '@/components/showcase/rail-nav'
import ProximityNavShowcase from '@/components/showcase/proximity-nav'
import PackageManagerCommandShowcase from '@/components/showcase/package-manager-command'
import ContributionGraphShowcase from '@/components/showcase/contribution-graph'
import PublicInsightsShowcase from '@/components/showcase/public-insights'

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
      gallery: {
        size: 'feature',
        height: 'lg',
        tabletSpan: 2,
        label: 'Segment Spotlight interactive toolbar preview',
      },
      useCases: [
        'Hero sections',
        'Product landing pages',
        'SaaS feature sections',
        'AI workflow explainers',
        'Interactive product previews',
        'Service or feature highlight sections',
      ],
      notes: ['Use positioning classes to adjust segments at each breakpoint.'],
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
      gallery: { size: 'compact', height: 'sm', treatment: 'muted' },
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
      gallery: { size: 'wide', height: 'lg' },
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
      slug: 'animated-numbers',
      title: 'Animated Numbers',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4xqmP80RlaETPbLcZQjyfg2StNvuB13w8rI',
      description:
        'An accessible number counter that animates into view with locale-aware formatting, prefixes, suffixes, decimals, delays, and reduced-motion support.',
      registryDescription:
        'Accessible in-view number counter with locale-aware formatting and reduced-motion support.',
      category: 'interactive',
      tags: ['animation', 'motion', 'numbers', 'statistics', 'accessibility'],
      bento: { size: 'md' },
      gallery: { size: 'compact', height: 'sm', treatment: 'muted' },
      useCases: [
        'Dashboard metrics',
        'Statistics sections',
        'Pricing highlights',
        'Fundraising totals',
        'Performance summaries',
      ],
      notes: ['Reduced motion shows the final value immediately.'],
      sourceFiles: [
        { path: 'components/ui/components/animated-numbers.tsx', language: 'tsx' },
        {
          path: 'components/showcase/animated-numbers.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion'],
        registryDependencies: [],
      },
      usageExample: `import { AnimatedNumber } from '@/components/animated-numbers'

export function Example() {
  return (
    <div className="flex gap-8 text-4xl font-semibold">
      <AnimatedNumber value={38} suffix="%" />
      <AnimatedNumber value={3.2} suffix="×" decimalPlaces={1} />
      <AnimatedNumber value={125000} prefix="$" duration={1.4} />
    </div>
  )
}`,
      api: [
        {
          prop: 'value',
          type: 'number',
          default: '-',
          description: 'The final numeric value displayed when the animation completes.',
        },
        {
          prop: 'from',
          type: 'number',
          default: '0',
          description: 'The starting value used before the component enters the viewport.',
        },
        {
          prop: 'prefix / suffix',
          type: 'string / string',
          default: '"" / ""',
          description: 'Text rendered immediately before or after the formatted number.',
        },
        {
          prop: 'decimalPlaces',
          type: 'number',
          default: '0',
          description: 'The fixed minimum and maximum number of fraction digits.',
        },
        {
          prop: 'duration / delay',
          type: 'number / number',
          default: '1 / 0',
          description: 'Animation duration and start delay in seconds.',
        },
        {
          prop: 'locale',
          type: 'string',
          default: '"en-US"',
          description: 'Locale passed to Intl.NumberFormat for separators and decimal formatting.',
        },
        {
          prop: '...props',
          type: 'React.ComponentPropsWithoutRef<"span">',
          default: '-',
          description:
            'Native span attributes and className. Children are omitted because the formatted value is managed by the component.',
        },
      ],
    }),
    AnimatedNumbersShowcase,
  ),
  entry(
    defineComponent({
      slug: 'expandable-card',
      title: 'Expandable Card',
      image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlSoC1OywE8Bm2KWO3IgkTqwviNajx6JyfGHAQ',
      description:
        'A compound card-dialog component for composing a compact trigger and a fully custom expanded experience with shared-layout motion.',
      registryDescription:
        'Composable card-dialog primitives with accessible modal behavior, controlled state, shared media motion, and custom actions.',
      category: 'interactive',
      tags: ['interactive', 'motion', 'animation', 'card', 'accessibility'],
      bento: { size: 'lg' },
      gallery: { size: 'wide', height: 'lg', treatment: 'muted' },
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
            'Accessible expanded dialog surface. Supports custom children, overlayClassName, closeLabel, transition, Dialog events, and optional contained rendering into a local portalContainer.',
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
      gallery: { size: 'standard', height: 'lg' },
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
        {
          prop: 'preventNavigation',
          type: 'boolean',
          default: 'false',
          description:
            'Keeps selection local for embedded previews while preserving controlled active state.',
        },
      ],
    }),
    RailNavShowcase,
  ),
  entry(
    defineComponent({
      slug: 'proximity-nav',
      title: 'Proximity Nav',
      image: '/component-previews/proximity-nav.svg',
      description:
        'A route-aware sidebar navigation whose guide lines stretch toward the pointer, with controlled active state and a navigation-free preview mode.',
      registryDescription:
        'Route-aware sidebar navigation with pointer-responsive guide lines, controlled active state, and a navigation-free preview mode.',
      category: 'interactive',
      tags: ['interactive', 'navigation', 'docs', 'motion', 'accessibility'],
      bento: { size: 'lg' },
      gallery: { size: 'standard', height: 'md', treatment: 'muted' },
      useCases: [
        'Documentation sidebars',
        'Settings navigation',
        'Account and workspace pages',
        'Dashboard sections',
        'Multi-page guides',
      ],
      notes: [
        'Uses the current pathname unless activeHref is provided.',
        'Use preventNavigation in demos and embedded previews.',
      ],
      sourceFiles: [
        { path: 'components/ui/components/proximity-nav.tsx', language: 'tsx' },
        {
          path: 'components/showcase/proximity-nav.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['motion'],
        registryDependencies: [],
      },
      usageExample: `import { ProximityNav } from '@/components/proximity-nav'

const items = [
  { title: 'Introduction', href: '/docs/introduction' },
  { title: 'Installation', href: '/docs/installation' },
  { title: 'Components', href: '/docs/components' },
]

export function DocsSidebar() {
  return <ProximityNav items={items} label="Documentation" />
}`,
      api: [
        {
          prop: 'items',
          type: 'readonly ProximityNavItem[]',
          default: '-',
          description: 'Navigation entries containing a title and destination href.',
        },
        {
          prop: 'activeHref',
          type: 'string',
          default: 'Current pathname',
          description:
            'Controlled active destination. When omitted, route navigation follows the current pathname.',
        },
        {
          prop: 'defaultActiveHref',
          type: 'string',
          default: 'First item href',
          description:
            'Initial active destination for the navigation-free, uncontrolled preview mode.',
        },
        {
          prop: 'preventNavigation',
          type: 'boolean',
          default: 'false',
          description:
            'Prevents route changes and prefetching so clicks can demonstrate active state in an embedded preview.',
        },
        {
          prop: 'onActiveHrefChange',
          type: '(href: string) => void',
          default: '-',
          description:
            'Called when an item is selected, for controlled state, analytics, or custom navigation behavior.',
        },
        {
          prop: 'label',
          type: 'string',
          default: '"Navigation"',
          description: 'Accessible label for the nav landmark.',
        },
        {
          prop: 'className',
          type: 'string',
          default: '-',
          description: 'Classes merged onto the navigation container.',
        },
      ],
    }),
    ProximityNavShowcase,
  ),
  entry(
    defineComponent({
      slug: 'package-manager-command',
      title: 'Package Manager Command',
      image: '/component-previews/package-manager-command.svg',
      description:
        'An accessible package-manager selector and copy command bar with controlled state and inline copy-status icons.',
      registryDescription:
        'Accessible package-manager selector and copy command bar for npm, pnpm, yarn, and Bun.',
      category: 'interactive',
      tags: ['interactive', 'installation', 'clipboard', 'docs', 'accessibility'],
      bento: { size: 'lg' },
      gallery: {
        size: 'wide',
        height: 'md',
        tabletSpan: 2,
        treatment: 'muted',
      },
      useCases: [
        'Component documentation',
        'CLI installation guides',
        'Developer onboarding',
        'Copyable code snippets',
      ],
      notes: ['Only configured package managers appear.'],
      sourceFiles: [
        { path: 'components/ui/components/package-manager-command.tsx', language: 'tsx' },
        {
          path: 'components/showcase/package-manager-command.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: ['lucide-react', '@radix-ui/react-use-controllable-state'],
        registryDependencies: ['button', 'dropdown-menu'],
      },
      usageExample: `import { PackageManagerCommand } from '@/components/package-manager-command'

const commands = {
  npm: 'npx shadcn@latest add @navui/animated-tabs',
  pnpm: 'pnpm dlx shadcn@latest add @navui/animated-tabs',
  yarn: 'yarn dlx shadcn@latest add @navui/animated-tabs',
  bun: 'bunx --bun shadcn@latest add @navui/animated-tabs',
}

export function Example() {
  return <PackageManagerCommand commands={commands} defaultValue="bun" />
}`,
      api: [
        {
          prop: 'commands',
          type: 'Partial<Record<PackageManagerId, string>>',
          default: '-',
          description:
            'Commands keyed by package manager. Managers without a command are omitted from the selector.',
        },
        {
          prop: 'value / defaultValue / onValueChange',
          type: 'PackageManagerId / PackageManagerId / (value) => void',
          default: 'npm',
          description: 'Controlled or uncontrolled package-manager selection.',
        },
        {
          prop: 'align',
          type: '"start" | "center" | "end"',
          default: '"end"',
          description: 'Alignment of the package-manager menu relative to the command bar.',
        },
        {
          prop: 'copyLabel / resetDelay',
          type: 'string / number',
          default: 'Contextual / 1600',
          description:
            'Customizes the accessible copy label and how long the status icon remains visible.',
        },
        {
          prop: 'onCopySuccess / onCopyError',
          type: '(command: string) => void / (error: Error) => void',
          default: '-',
          description: 'Optional callbacks for analytics or application-level clipboard handling.',
        },
        {
          prop: 'className / commandClassName',
          type: 'string / string',
          default: '-',
          description: 'Classes for the root and the copy-command button.',
        },
      ],
    }),
    PackageManagerCommandShowcase,
  ),
  entry(
    defineComponent({
      slug: 'contribution-graph',
      title: 'Contribution Graph',
      image: '/component-previews/contribution-graph.svg',
      description:
        'An accessible, responsive contribution calendar for normalized daily activity data, with monochrome intensity, month labels, day tooltips, a text summary, and graceful empty state.',
      registryDescription:
        'Accessible monochrome contribution calendar with latest-visible responsive clipping, day tooltips, and a graceful empty state.',
      category: 'data-display',
      tags: ['data display', 'analytics', 'github', 'accessibility', 'responsive'],
      bento: { size: 'lg' },
      gallery: {
        size: 'wide',
        height: 'md',
        tabletSpan: 2,
        treatment: 'muted',
        label: 'Contribution graph example',
      },
      useCases: [
        'Developer profiles',
        'Open-source dashboards',
        'Habit and activity tracking',
        'Release or publishing calendars',
      ],
      notes: [
        'Pass normalized data from any server-side provider; the component performs no authenticated requests.',
        'Contribution intensity is exposed in text and accessible labels, not only through color.',
        'The latest days stay visible on narrow screens; keyboard users can move between days with the arrow keys.',
      ],
      sourceFiles: [
        { path: 'components/ui/components/contribution-graph.tsx', language: 'tsx' },
        {
          path: 'components/showcase/contribution-graph.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: [],
        registryDependencies: [],
      },
      usageExample: `import { ContributionGraph } from '@/components/contribution-graph'

const data = {
  total: 3,
  from: '2025-05-01',
  to: '2025-05-03',
  days: [
    { date: '2025-05-01', count: 0, level: 0 },
    { date: '2025-05-02', count: 1, level: 1 },
    { date: '2025-05-03', count: 2, level: 2 },
  ],
}

export function Example() {
  return <ContributionGraph aria-label="Project activity" data={data} />
}`,
      api: [
        {
          prop: 'data',
          type: 'ContributionGraphData',
          default: '-',
          description:
            'Normalized daily counts, intensity levels from 0–4, total, and ISO date range.',
        },
        {
          prop: 'emptyMessage',
          type: 'string',
          default: 'Contextual fallback message',
          description: 'Message rendered when the daily data array is empty.',
        },
        {
          prop: 'className / figure props',
          type: 'string / ComponentPropsWithoutRef<"figure">',
          default: '-',
          description:
            'Classes and native figure attributes, including aria-label, forwarded to the root.',
        },
      ],
    }),
    ContributionGraphShowcase,
  ),
  entry(
    defineComponent({
      slug: 'public-insights',
      title: 'Public Insights',
      image: '/component-previews/public-insights.svg',
      description:
        'A provider-independent analytics panel with compact metrics, equal-period comparisons, a restrained SVG trend, accessible table data, and complete loading states.',
      registryDescription:
        'Provider-independent public analytics panel with metrics, comparisons, an accessible SVG trend, and loading states.',
      category: 'data-display',
      tags: ['data display', 'analytics', 'chart', 'dashboard', 'accessibility'],
      bento: { size: 'xl' },
      gallery: {
        size: 'feature',
        height: 'lg',
        tabletSpan: 2,
        treatment: 'muted',
        label: 'Public analytics example',
      },
      useCases: [
        'Public product metrics',
        'Portfolio traffic summaries',
        'Open-source project dashboards',
        'Privacy-conscious aggregate reporting',
      ],
      notes: [
        'Keep provider credentials and response normalization in a server-only adapter.',
        'The chart is paired with a screen-reader table and does not depend on animation or color alone.',
      ],
      sourceFiles: [
        { path: 'components/ui/components/public-insights.tsx', language: 'tsx' },
        {
          path: 'components/showcase/public-insights.tsx',
          language: 'tsx',
          filename: 'demo.tsx',
        },
      ],
      registry: {
        dependencies: [],
        registryDependencies: [],
      },
      usageExample: `import { PublicInsights } from '@/components/public-insights'

const snapshot = {
  period: { from: '2025-05-01', to: '2025-05-14', label: 'Last 14 days' },
  metrics: [{ id: 'visitors', label: 'Visitors', value: 1284, change: 12.4 }],
  series: [{ date: '2025-05-01', visitors: 62 }],
  updatedAt: '2025-05-14T16:00:00.000Z',
  source: 'Aggregate analytics',
}

export function Example() {
  return <PublicInsights snapshot={snapshot} />
}`,
      api: [
        {
          prop: 'snapshot',
          type: 'AnalyticsSnapshot | null',
          default: '-',
          description: 'Normalized period, metrics, dated series, source, and update timestamp.',
        },
        {
          prop: 'status',
          type: '"ready" | "loading" | "empty" | "error"',
          default: 'Derived from snapshot',
          description: 'Selects the ready, loading, empty, or error presentation.',
        },
        {
          prop: 'seriesKey',
          type: '"visitors" | "sessions" | "views"',
          default: '"visitors"',
          description: 'Chooses which normalized series is drawn in the SVG trend.',
        },
        {
          prop: 'formatMetric / formatDate',
          type: 'Formatting callbacks',
          default: 'Locale number / short date',
          description: 'Customizes value and date rendering without changing the data model.',
        },
        {
          prop: 'title / description',
          type: 'string / string',
          default: 'Public insights / Privacy-conscious description',
          description: 'Accessible section name and supporting explanation.',
        },
        {
          prop: 'emptyMessage / errorMessage',
          type: 'string / string',
          default: 'Contextual fallback messages',
          description: 'Custom text for unavailable analytics states.',
        },
        {
          prop: 'className / section props',
          type: 'string / ComponentPropsWithoutRef<"section">',
          default: '-',
          description: 'Classes and native section attributes forwarded to the root element.',
        },
      ],
    }),
    PublicInsightsShowcase,
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
