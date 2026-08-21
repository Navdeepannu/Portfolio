import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const proximityNavItem = defineComponentItem(
  defineComponent({
    slug: 'proximity-nav',
    status: 'published',
    title: 'Proximity Nav',
    image: 'https://assets.navdeepsingh.dev/proxomity-nav-light.png',
    description:
      'A route-aware sidebar navigation whose guide lines stretch toward the pointer, with controlled active state and a navigation-free preview mode.',
    registryDescription:
      'Route-aware sidebar navigation with pointer-responsive guide lines, controlled active state, and a navigation-free preview mode.',
    category: 'interactive',
    tags: ['interactive', 'navigation', 'docs', 'motion', 'accessibility'],
    bento: { size: 'lg' },
    gallery: { size: 'compact', height: 'md', treatment: 'muted' },
    useCases: [
      'Documentation sidebars',
      'Settings navigation',
      'Account and workspace pages',
      'Dashboard sections',
      'Multi-page guides',
    ],
    sourceFiles: [
      { path: 'src/registry/components/proximity-nav/proximity-nav.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/proximity-nav/proximity-nav.demo.tsx',
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
  '@/registry/components/proximity-nav/proximity-nav.demo',
)
