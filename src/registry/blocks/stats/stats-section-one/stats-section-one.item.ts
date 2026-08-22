import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const statsSectionOneItem = defineBlockItem({
  slug: 'stats-section-one',
  title: 'Stats Section One',
  description:
    'A business results section that combines measurable outcomes with a customer proof point.',
  category: 'stats',
  source: 'src/registry/blocks/stats/stats-section-one/stats-section-one.tsx',
  target: '@components/blocks/stats/stats-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
  registryDependencies: ['badge', 'button', 'card', 'separator'],
})
