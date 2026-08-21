import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const matchingPanelItem = defineIllustrationItem({
  slug: 'matching-panel',
  title: 'Matching Panel Illustration',
  description: 'A policy matching panel illustration.',
  source: 'src/registry/illustrations/matching-panel/matching-panel.tsx',
  target: '@components/illustrations/matching-panel.tsx',
  size: 'sm',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
