import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const logoCloudOneItem = defineBlockItem({
  slug: 'logo-cloud-one',
  title: 'Logo Cloud One',
  description: 'A compact monochrome logo strip for customer or partner proof.',
  category: 'logo-cloud',
  source: 'src/registry/blocks/logo-cloud/logo-cloud-one/logo-cloud-one.tsx',
  target: '@components/blocks/logo-cloud/logo-cloud-one.tsx',
  status: 'published',
})
