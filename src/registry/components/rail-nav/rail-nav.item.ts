import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const railNavItem = defineComponentItem(
  defineComponent({
    slug: 'rail-nav',
    status: 'published',
    title: 'Rail Nav',
    image: 'https://assets.navdeepsingh.dev/rail-nav-light.png',
    description:
      'A compact motion rail that preserves its line-to-link reveal while supporting anchors, application routes, custom observer targets, and controlled state.',
    registryDescription:
      'Motion rail navigation with the original line-to-link reveal, controlled expansion, flexible links, and optional scroll tracking.',
    category: 'interactive',
    tags: ['interactive', 'navigation', 'docs', 'motion', 'accessibility'],
    bento: { size: 'lg' },
    gallery: { size: 'wide', height: 'md' },
    useCases: [
      'Documentation pages',
      'Long-form case studies',
      'Portfolio write-ups',
      'Changelog pages',
      'Product guides',
      'Settings and dashboard navigation',
    ],
    sourceFiles: [
      { path: 'src/registry/components/rail-nav/rail-nav.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/rail-nav/rail-nav.demo.tsx',
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
  '@/registry/components/rail-nav/rail-nav.demo',
)
