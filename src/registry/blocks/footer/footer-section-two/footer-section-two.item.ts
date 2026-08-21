import { uiLibraryLogoFile } from '@/registry/components/ui-library-logo/ui-library-logo.file'
import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const footerSectionTwoItem = defineBlockItem({
  slug: 'footer-section-two',
  title: 'Footer Section Two',
  description: 'A compact navigation footer with product links, social actions, and legal copy.',
  category: 'footer',
  source: 'src/registry/blocks/footer/footer-section-two/footer-section-two.tsx',
  target: '@components/blocks/footer/footer-section-two.tsx',
  status: 'published',
  dependencies: ['@tabler/icons-react'],
  supportingFiles: [uiLibraryLogoFile],
})
