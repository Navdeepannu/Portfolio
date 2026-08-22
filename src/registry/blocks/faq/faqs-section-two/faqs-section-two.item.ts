import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const faqsSectionTwoItem = defineBlockItem({
  slug: 'faqs-section-two',
  title: 'FAQs Section Two',
  description: 'A centered FAQ section with accessible accordions and a follow-up contact link.',
  category: 'faqs',
  source: 'src/registry/blocks/faq/faqs-section-two/faqs-section-two.tsx',
  target: '@components/blocks/faqs/faqs-section-two.tsx',
  status: 'published',
  registryDependencies: ['accordion'],
})
