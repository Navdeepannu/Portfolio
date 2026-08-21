import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const heroSectionOneItem = defineBlockItem({
  slug: 'hero-section-one',
  title: 'Hero Section One',
  description: 'A dark product hero with badges, dual actions, and the matching responsive header.',
  category: 'hero',
  source: 'src/registry/blocks/hero/hero-section-one/hero-section-one.tsx',
  target: '@components/blocks/hero-section/hero-section-one.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react', 'lucide-react'],
  registryDependencies: ['badge', 'button', '@navdeep-singh/header-one'],
})
