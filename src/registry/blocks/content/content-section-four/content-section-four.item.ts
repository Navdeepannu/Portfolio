import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contentSectionFourItem = defineBlockItem({
  slug: 'content-section-four',
  title: 'Content Section Four',
  description:
    'A connected-publishing story with an animated revision metric, trend visualization, and output checklist.',
  category: 'content',
  source: 'src/registry/blocks/content/content-section-four/content-section-four.tsx',
  target: '@components/blocks/content/content-section-four.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'motion'],
  registryDependencies: ['@navdeep-singh/revision-cycles-illustration'],
})
