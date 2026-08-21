import { uiLibraryLogoFile } from '@/registry/components/ui-library-logo/ui-library-logo.file'
import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const footerSectionOneItem = defineBlockItem({
  slug: 'footer-section-one',
  title: 'Footer Section One',
  description: 'A multi-column product footer with social links and an email newsletter form.',
  category: 'footer',
  source: 'src/registry/blocks/footer/footer-section-one/footer-section-one.tsx',
  target: '@components/blocks/footer/footer-section-one.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
  registryDependencies: ['button'],
  supportingFiles: [uiLibraryLogoFile],
})
