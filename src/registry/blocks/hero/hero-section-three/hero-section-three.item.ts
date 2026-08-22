import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const heroSectionThreeItem = defineBlockItem({
  slug: 'hero-section-three',
  title: 'Hero Section Three',
  description: 'An art-directed hero with shader-backed visuals and a focused primary action.',
  category: 'hero',
  source: 'src/registry/blocks/hero/hero-section-three/hero-section-three.tsx',
  target: '@components/blocks/hero-section/hero-section-three.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react', 'shaders'],
  registryDependencies: ['button'],
})
