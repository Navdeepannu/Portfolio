import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contactSectionOneItem = defineBlockItem({
  slug: 'contact-section-one',
  title: 'Contact Section One',
  description:
    'A contact directory that routes visitors to sales, support, community, documentation, and developer resources.',
  category: 'contact',
  source: 'src/registry/blocks/contact/contact-section-one/contact-section-one.tsx',
  target: '@components/blocks/contact/contact-section-one.tsx',
  status: 'published',
  dependencies: ['lucide-react'],
})
