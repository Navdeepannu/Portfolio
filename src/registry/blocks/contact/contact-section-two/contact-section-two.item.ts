import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contactSectionTwoItem = defineBlockItem({
  slug: 'contact-section-two',
  title: 'Contact Section Two',
  description:
    'A split contact section with a consultation summary and detailed project inquiry form.',
  category: 'contact',
  source: 'src/registry/blocks/contact/contact-section-two/contact-section-two.tsx',
  target: '@components/blocks/contact/contact-section-two.tsx',
  status: 'published',
})
