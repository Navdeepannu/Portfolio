import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const faqSectionThreeItem = defineBlockItem({
  slug: 'faq-section-three',
  title: 'FAQ Section Three',
  description: 'An editorial FAQ section with a large introduction and accessible accordion rows.',
  category: 'faqs',
  source: 'src/registry/blocks/faq/faq-section-three/faq-section-three.tsx',
  target: '@components/blocks/faqs/faq-section-three.tsx',
  status: 'published',
  registryDependencies: ['accordion'],
})
