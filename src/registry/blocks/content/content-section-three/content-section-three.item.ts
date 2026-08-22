import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contentSectionThreeItem = defineBlockItem({
  slug: 'content-section-three',
  title: 'Content Section Three',
  description:
    'A structured feature grid with one dominant narrative and two focused supporting ideas.',
  category: 'content',
  source: 'src/registry/blocks/content/content-section-three/content-section-three.tsx',
  target: '@components/blocks/content/content-section-three.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'motion'],
  registryDependencies: ['@navdeep-singh/release-workflow-illustration'],
})
