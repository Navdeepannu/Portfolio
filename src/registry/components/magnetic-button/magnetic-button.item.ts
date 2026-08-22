import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const magneticButtonItem = defineComponentItem(
  defineComponent({
    slug: 'magnetic-button',
    status: 'published',
    title: 'Magnetic Button',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlXH1ynpA2u3zKHak0FTUAL7ZrsNJE5jQiOYwt',
    description:
      'A shadcn-compatible button that subtly follows the cursor using spring-based motion.',
    category: 'buttons',
    tags: ['interactive', 'motion', 'cursor', 'animation'],
    bento: { size: 'md' },
    gallery: { size: 'standard', height: 'sm', treatment: 'muted' },
    sourceFiles: [
      {
        path: 'src/registry/components/magnetic-button/magnetic-button.tsx',
        language: 'tsx',
      },
      {
        path: 'src/registry/components/magnetic-button/magnetic-button.demo.tsx',
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
  '@/registry/components/magnetic-button/magnetic-button.demo',
)
