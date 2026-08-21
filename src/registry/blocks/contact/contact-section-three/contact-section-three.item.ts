import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const contactSectionThreeItem = defineBlockItem({
  slug: 'contact-section-three',
  title: 'Contact Section Three',
  description: 'A compact project contact form paired with a concise service introduction.',
  category: 'contact',
  source: 'src/registry/blocks/contact/contact-section-three/contact-section-three.tsx',
  target: '@components/blocks/contact/contact-section-three.tsx',
  status: 'published',
})
