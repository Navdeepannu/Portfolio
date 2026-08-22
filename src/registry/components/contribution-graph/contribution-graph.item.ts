import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const contributionGraphItem = defineComponentItem(
  defineComponent({
    slug: 'contribution-graph',
    status: 'published',
    title: 'Contribution Graph',
    image: '/component-previews/contribution-graph.svg',
    description:
      'A clean, accessible contribution calendar with built-in data normalization, keyboard navigation, day tooltips, and responsive latest-day visibility.',
    registryDescription:
      'Clean contribution calendar with built-in normalization, keyboard navigation, and responsive latest-day visibility.',
    category: 'data-display',
    tags: ['data display', 'analytics', 'github', 'accessibility', 'responsive'],
    bento: { size: 'lg' },
    gallery: {
      size: 'feature',
      height: 'md',
      treatment: 'muted',
      label: 'Contribution graph example',
    },
    useCases: [
      'Developer profiles',
      'Open-source dashboards',
      'Habit and activity tracking',
      'Release or publishing calendars',
    ],
    notes: ['Pass { date, count }; missing days and intensity are filled automatically.'],
    sourceFiles: [
      {
        path: 'src/registry/components/contribution-graph/contribution-graph.tsx',
        language: 'tsx',
      },
      {
        path: 'src/registry/components/contribution-graph/contribution-graph.demo.tsx',
        language: 'tsx',
        filename: 'demo.tsx',
      },
    ],
    registry: {
      dependencies: [],
      registryDependencies: [],
    },
    usageExample: `import { ContributionGraph } from '@/components/contribution-graph'

async function getActivity() {
  const response = await fetch(process.env.ACTIVITY_API_URL!, {
    headers: { Authorization: \`Bearer \${process.env.ACTIVITY_API_TOKEN}\` },
  })
  const providerDays = await response.json()

  return {
    days: providerDays.map((day) => ({ date: day.date, count: day.count })),
    source: 'My API',
  }
}

export default async function Example() {
  const data = await getActivity()
  return <ContributionGraph aria-label="Project activity" data={data} />
}`,
    api: [
      {
        prop: 'data',
        type: 'ContributionGraphData',
        default: '-',
        description:
          'Daily { date, count } values. Intensity, total, and date range are calculated when omitted.',
      },
      {
        prop: 'emptyMessage',
        type: 'string',
        default: 'Contextual fallback message',
        description: 'Message rendered when the daily data array is empty.',
      },
      {
        prop: 'title / description',
        type: 'string / string',
        default: 'Contribution activity / -',
        description: 'Visible heading with optional supporting context.',
      },
      {
        prop: 'showHeader',
        type: 'boolean',
        default: 'true',
        description:
          'Hides the visible heading and total for compact embeds while preserving an accessible summary.',
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
  '@/registry/components/contribution-graph/contribution-graph.demo',
)
