import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const pricingSectionOneItem = defineBlockItem({
  slug: 'pricing-section-one',
  title: 'Pricing Section One',
  description:
    'A responsive three-tier pricing section with a monthly and yearly billing switcher.',
  category: 'pricing',
  source: 'src/registry/blocks/pricing/pricing-section-one/pricing-section-one.tsx',
  target: '@components/blocks/pricing/pricing-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
  registryDependencies: ['badge', 'button', 'card', 'tabs'],
})
