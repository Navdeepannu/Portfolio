import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const segmentSpotlightItem = defineComponentItem(
  defineComponent({
    slug: 'segment-spotlight',
    status: 'published',
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
      height: 'xl',
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
      { path: 'src/registry/components/segment-spotlight/segment-spotlight.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/segment-spotlight/segment-spotlight.demo.tsx',
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
  '@/registry/components/segment-spotlight/segment-spotlight.demo',
)
