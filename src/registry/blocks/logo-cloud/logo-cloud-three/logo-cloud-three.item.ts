import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const logoCloudThreeItem = defineBlockItem({
  slug: 'logo-cloud-three',
  title: 'Logo Cloud Three',
  description: 'A horizontally framed customer logo strip with restrained typography.',
  category: 'logo-cloud',
  source: 'src/registry/blocks/logo-cloud/logo-cloud-three/logo-cloud-three.tsx',
  target: '@components/blocks/logo-cloud/logo-cloud-three.tsx',
  status: 'published',
})
