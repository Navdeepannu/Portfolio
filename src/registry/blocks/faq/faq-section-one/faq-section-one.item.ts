import { defineBlockItem } from '@/registry/blocks/define-block-item'

export const faqSectionOneItem = defineBlockItem({
  slug: 'faq-section-one',
  title: 'FAQ Section One',
  description: 'A two-column FAQ layout with accessible accordion answers and a support prompt.',
  category: 'faqs',
  source: 'src/registry/blocks/faq/faq-section-one/faq-section-one.tsx',
  target: '@components/blocks/faqs/faq-section-one.tsx',
  status: 'published',
  registryDependencies: ['accordion'],
})
