import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const ctaSectionOneItem = defineBlockItem({
  slug: 'cta-section-one',
  title: 'CTA Section One',
  description: 'A polished call to action with primary and secondary links for clear next steps.',
  category: 'cta',
  source: 'src/registry/blocks/cta/cta-section-one/cta-section-one.tsx',
  target: '@components/blocks/cta/cta-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
  registryDependencies: ['button'],
})
