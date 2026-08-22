import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const expandableCardItem = defineComponentItem(
  defineComponent({
    slug: 'expandable-card',
    status: 'published',
    title: 'Expandable Card',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlSoC1OywE8Bm2KWO3IgkTqwviNajx6JyfGHAQ',
    description:
      'A compound card-dialog component for composing a compact trigger and a fully custom expanded experience with shared-layout motion.',
    registryDescription:
      'Composable card-dialog primitives with accessible modal behavior, controlled state, shared media motion, and custom actions.',
    category: 'interactive',
    tags: ['interactive', 'motion', 'animation', 'card', 'accessibility'],
    bento: { size: 'lg' },
    gallery: { size: 'feature', height: 'stacked', treatment: 'muted' },
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
      { path: 'src/registry/components/expandable-card/expandable-card.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/expandable-card/expandable-card.demo.tsx',
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
        description: 'Unopinionated content regions for application-specific details and actions.',
      },
      {
        prop: 'ExpandableCardClose',
        type: 'React.ComponentProps<typeof Dialog.Close>',
        default: '-',
        description: 'Optional close primitive for custom action placement; supports asChild.',
      },
    ],
  }),
  '@/registry/components/expandable-card/expandable-card.demo',
)
