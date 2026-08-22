import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const ctaSectionTwoItem = defineBlockItem({
  slug: 'cta-section-two',
  title: 'CTA Section Two',
  description:
    'A split call to action with primary and secondary actions over a signal-line field.',
  category: 'cta',
  source: 'src/registry/blocks/cta/cta-section-two/cta-section-two.tsx',
  target: '@components/blocks/cta/cta-section-two.tsx',
  status: 'draft',
  registryDependencies: ['button'],
})
