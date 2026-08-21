import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contentSectionTwoItem = defineBlockItem({
  slug: 'content-section-two',
  title: 'Content Section Two',
  description:
    'An editorial product story with balanced copy, configurable local media, and optional caption metadata.',
  category: 'content',
  source: 'src/registry/blocks/content/content-section-two/content-section-two.tsx',
  target: '@components/blocks/content/content-section-two.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
})
