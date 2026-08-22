import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const headerThreeItem = defineBlockItem({
  slug: 'header-three',
  title: 'Header Three',
  description:
    'A payment-product header with grouped navigation menus and a responsive mobile drawer.',
  category: 'header',
  source: 'src/registry/blocks/header/header-three/header-three.tsx',
  target: '@components/blocks/header/header-three.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
  registryDependencies: ['button', 'navigation-menu'],
})
