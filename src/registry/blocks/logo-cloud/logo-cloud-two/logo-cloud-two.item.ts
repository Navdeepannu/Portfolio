import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const logoCloudTwoItem = defineBlockItem({
  slug: 'logo-cloud-two',
  title: 'Logo Cloud Two',
  description: 'A compact partner logo strip using a mixed icon and wordmark collection.',
  category: 'logo-cloud',
  source: 'src/registry/blocks/logo-cloud/logo-cloud-two/logo-cloud-two.tsx',
  target: '@components/blocks/logo-cloud/logo-cloud-two.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
})
