import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const fastByDefaultIllustrationItem = defineIllustrationItem({
  slug: 'fast-by-default-illustration',
  title: 'Fast by Default Illustration',
  description: 'An interactive field of animated speed lines with reduced-motion support.',
  source:
    'src/registry/illustrations/fast-by-default-illustration/fast-by-default-illustration.tsx',
  target: '@components/illustrations/FastByDefaultIllustration.tsx',
  size: 'sm',
  dependencies: ['motion'],
})
