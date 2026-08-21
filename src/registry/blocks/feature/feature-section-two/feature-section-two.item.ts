import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const featureSectionTwoItem = defineBlockItem({
  slug: 'feature-section-two',
  title: 'Feature Section Two',
  description:
    'An expandable workflow feature section with autoplay, reduced-motion handling, and three interactive illustrations.',
  category: 'features',
  source: 'src/registry/blocks/feature/feature-section-two/feature-section-two.tsx',
  target: '@components/blocks/features/feature-section-two.tsx',
  status: 'draft',
  dependencies: ['motion'],
})
