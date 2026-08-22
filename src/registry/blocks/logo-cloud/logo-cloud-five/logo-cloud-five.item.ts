import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const logoCloudFiveItem = defineBlockItem({
  slug: 'logo-cloud-five',
  title: 'Logo Cloud Five',
  description: 'A headline-led animated logo cloud with responsive brand cards.',
  category: 'logo-cloud',
  source: 'src/registry/blocks/logo-cloud/logo-cloud-five/logo-cloud-five.tsx',
  target: '@components/blocks/logo-cloud/logo-cloud-five.tsx',
  status: 'published',
  dependencies: ['motion'],
})
