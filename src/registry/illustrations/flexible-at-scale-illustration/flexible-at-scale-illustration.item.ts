import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const flexibleAtScaleIllustrationItem = defineIllustrationItem({
  slug: 'flexible-at-scale-illustration',
  title: 'Flexible at Scale Illustration',
  description: 'An interactive spring-based line field that responds to pointer movement.',
  source:
    'src/registry/illustrations/flexible-at-scale-illustration/flexible-at-scale-illustration.tsx',
  target: '@components/illustrations/FlexibleAtScaleIllustration.tsx',
  size: 'sm',
  dependencies: ['motion'],
})
