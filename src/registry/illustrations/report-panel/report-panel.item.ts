import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const reportPanelItem = defineIllustrationItem({
  slug: 'report-panel',
  title: 'Report Panel Illustration',
  description: 'A report fetching panel illustration.',
  source: 'src/registry/illustrations/report-panel/report-panel.tsx',
  target: '@components/illustrations/report-panel.tsx',
  size: 'sm',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
