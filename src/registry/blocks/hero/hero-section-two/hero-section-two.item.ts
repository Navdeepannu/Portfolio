import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const heroSectionTwoItem = defineBlockItem({
  slug: 'hero-section-two',
  title: 'Hero Section Two',
  description: 'A motion-led hero with animated copy, grouped reveals, and its matching header.',
  category: 'hero',
  source: 'src/registry/blocks/hero/hero-section-two/hero-section-two.tsx',
  target: '@components/blocks/hero-section/hero-section-two.tsx',
  status: 'published',
  dependencies: ['motion'],
  registryDependencies: [
    '@navdeep-singh/header-two',
    '@navdeep-singh/animated-group',
    '@navdeep-singh/text-effect',
  ],
})
