import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const processSectionOneItem = defineBlockItem({
  slug: 'process-section-one',
  title: 'Process Section One',
  description:
    'A sticky how-it-works narrative with a normal mobile flow and a sequence of image-led process panels.',
  category: 'process',
  source: 'src/registry/blocks/process/process-section-one/process-section-one.tsx',
  target: '@components/blocks/process/process-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
})
