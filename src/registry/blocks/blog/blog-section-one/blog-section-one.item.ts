import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const blogSectionOneItem = defineBlockItem({
  slug: 'blog-section-one',
  title: 'Blog Section One',
  description:
    'A semantic blog archive grouped by year, with aligned dates, useful metadata, and accessible row links.',
  category: 'blog',
  source: 'src/registry/blocks/blog/blog-section-one/blog-section-one.tsx',
  target: '@components/blocks/blog/blog-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
})
