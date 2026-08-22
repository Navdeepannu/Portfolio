import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const designedForFocusIllustrationItem = defineIllustrationItem({
  slug: 'designed-for-focus-illustration',
  title: 'Designed for Focus Illustration',
  description:
    'An interactive focus illustration with concentric motion and reduced-motion support.',
  source:
    'src/registry/illustrations/designed-for-focus-illustration/designed-for-focus-illustration.tsx',
  target: '@components/illustrations/DesignedForFocusIllustration.tsx',
  size: 'sm',
  dependencies: ['motion'],
})
