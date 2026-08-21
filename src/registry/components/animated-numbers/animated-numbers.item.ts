import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const animatedNumbersItem = defineComponentItem(
  defineComponent({
    slug: 'animated-numbers',
    status: 'published',
    title: 'Animated Numbers',
    image: 'https://p1r7j2dwef.ufs.sh/f/nrPqHGLL1RTlh4xqmP80RlaETPbLcZQjyfg2StNvuB13w8rI',
    description:
      'An accessible number counter that animates into view with locale-aware formatting, prefixes, suffixes, decimals, delays, and reduced-motion support.',
    registryDescription:
      'Accessible in-view number counter with locale-aware formatting and reduced-motion support.',
    category: 'interactive',
    tags: ['animation', 'motion', 'numbers', 'statistics', 'accessibility'],
    bento: { size: 'md' },
    gallery: { size: 'standard', height: 'sm', treatment: 'muted' },
    useCases: [
      'Dashboard metrics',
      'Statistics sections',
      'Pricing highlights',
      'Fundraising totals',
      'Performance summaries',
    ],
    sourceFiles: [
      { path: 'src/registry/components/animated-numbers/animated-numbers.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/animated-numbers/animated-numbers.demo.tsx',
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
  '@/registry/components/animated-numbers/animated-numbers.demo',
)
