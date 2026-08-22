import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const packageManagerCommandItem = defineComponentItem(
  defineComponent({
    slug: 'package-manager-command',
    status: 'published',
    title: 'Package Manager Command',
    image: 'https://assets.navdeepsingh.dev/package-manager-light.png',
    description:
      'An accessible package-manager selector and copy command bar with controlled state and inline copy-status icons.',
    registryDescription:
      'Accessible package-manager selector and copy command bar for npm, pnpm, yarn, and Bun.',
    category: 'interactive',
    tags: ['interactive', 'installation', 'clipboard', 'docs', 'accessibility'],
    bento: { size: 'lg' },
    gallery: {
      size: 'standard',
      height: 'md',
      treatment: 'muted',
    },
    useCases: [
      'Component documentation',
      'CLI installation guides',
      'Developer onboarding',
      'Copyable code snippets',
    ],
    sourceFiles: [
      {
        path: 'src/registry/components/package-manager-command/package-manager-command.tsx',
        language: 'tsx',
      },
      {
        path: 'src/registry/components/package-manager-command/package-manager-command.demo.tsx',
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
  '@/registry/components/package-manager-command/package-manager-command.demo',
)
