import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contentSectionOneItem = defineBlockItem({
  slug: 'content-section-one',
  title: 'Content Section One',
  description:
    'A restrained principles section with a clear introduction and a responsive set of supporting ideas.',
  category: 'content',
  source: 'src/registry/blocks/content/content-section-one/content-section-one.tsx',
  target: '@components/blocks/content/content-section-one.tsx',
  status: 'published',
  dependencies: ['motion'],
  registryDependencies: [
    '@navdeep-singh/fast-by-default-illustration',
    '@navdeep-singh/designed-for-focus-illustration',
    '@navdeep-singh/flexible-at-scale-illustration',
  ],
})
