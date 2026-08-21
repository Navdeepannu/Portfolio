import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const animatedTabsItem = defineComponentItem(
  defineComponent({
    slug: 'animated-tabs',
    status: 'published',
    title: 'Animated Tabs',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlX3opSU2u3zKHak0FTUAL7ZrsNJE5jQiOYwtd',
    description: 'A tab component with a moving active pill and directional content transitions.',
    category: 'interactive',
    tags: ['interactive', 'motion', 'animation', 'tabs', 'accessibility'],
    bento: { size: 'lg' },
    gallery: { size: 'feature', height: 'xl' },
    sourceFiles: [
      { path: 'src/registry/components/animated-tabs/animated-tabs.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/animated-tabs/animated-tabs.demo.tsx',
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
  '@/registry/components/animated-tabs/animated-tabs.demo',
)
