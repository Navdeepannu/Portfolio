import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contentSectionFiveItem = defineBlockItem({
  slug: 'content-section-five',
  title: 'Content Section Five',
  description:
    'A sticky editorial narrative with a normal mobile flow and a sequence of image-led content panels.',
  category: 'content',
  source: 'src/registry/blocks/content/content-section-five/content-section-five.tsx',
  target: '@components/blocks/content/content-section-five.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
})
