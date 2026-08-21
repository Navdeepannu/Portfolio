import { uiLibraryLogoFile } from '@/registry/components/ui-library-logo/ui-library-logo.file'
import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const headerOneItem = defineBlockItem({
  slug: 'header-one',
  title: 'Header One',
  description: 'A responsive marketing header with animated mobile navigation and account actions.',
  category: 'header',
  source: 'src/registry/blocks/header/header-one/header-one.tsx',
  target: '@components/blocks/header/header-one.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'motion'],
  registryDependencies: ['button'],
  supportingFiles: [uiLibraryLogoFile],
})
