import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const logoCloudFourItem = defineBlockItem({
  slug: 'logo-cloud-four',
  title: 'Logo Cloud Four',
  description: 'A large animated company grid with a prominent trust statement.',
  category: 'logo-cloud',
  source: 'src/registry/blocks/logo-cloud/logo-cloud-four/logo-cloud-four.tsx',
  target: '@components/blocks/logo-cloud/logo-cloud-four.tsx',
  status: 'published',
  dependencies: ['motion'],
})
