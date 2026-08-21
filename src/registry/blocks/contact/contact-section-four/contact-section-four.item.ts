import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contactSectionFourItem = defineBlockItem({
  slug: 'contact-section-four',
  title: 'Contact Section Four',
  description: 'A focused project-inquiry form with contact details and a large editorial heading.',
  category: 'contact',
  source: 'src/registry/blocks/contact/contact-section-four/contact-section-four.tsx',
  target: '@components/blocks/contact/contact-section-four.tsx',
  status: 'published',
  registryDependencies: ['button', 'input', 'label', 'textarea'],
})
