import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const headerFourItem = defineBlockItem({
  slug: 'header-four',
  title: 'Header Four',
  description: 'A responsive header with animated multi-level desktop and mobile navigation menus.',
  category: 'header',
  source: 'src/registry/blocks/header/header-four/header-four.tsx',
  target: '@components/blocks/header/header-four.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'motion'],
  registryDependencies: ['button', 'navigation-menu'],
})
