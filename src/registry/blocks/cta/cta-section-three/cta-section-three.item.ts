import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const ctaSectionThreeItem = defineBlockItem({
  slug: 'cta-section-three',
  title: 'CTA Section Three',
  description: 'A centered product call to action over a restrained fading dot field.',
  category: 'cta',
  source: 'src/registry/blocks/cta/cta-section-three/cta-section-three.tsx',
  target: '@components/blocks/cta/cta-section-three.tsx',
  status: 'draft',
  registryDependencies: ['button'],
})
