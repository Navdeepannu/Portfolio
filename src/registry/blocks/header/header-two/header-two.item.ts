import { uiLibraryLogoFile } from '@/registry/components/ui-library-logo/ui-library-logo.file'
import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const headerTwoItem = defineBlockItem({
  slug: 'header-two',
  title: 'Header Two',
  description: 'A responsive marketing header with a bordered shell and animated mobile menu.',
  category: 'header',
  source: 'src/registry/blocks/header/header-two/header-two.tsx',
  target: '@components/blocks/header/header-two.tsx',
  status: 'published',
  dependencies: ['lucide-react', 'motion'],
  registryDependencies: ['button'],
  supportingFiles: [uiLibraryLogoFile],
})
