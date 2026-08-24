import { defineBlockItem } from '@/registry/blocks/define-block-item'

/** Internal spelling is corrected; the public slug and target remain compatibility contracts. */
export const testimonialSectionOneItem = defineBlockItem({
  slug: 'testamonial-section-one',
  title: 'Testamonial Section One',
  description:
    'A customer-story hero with proof badges, a featured quote, and success-story action.',
  category: 'testimonials',
  source: 'src/registry/blocks/testimonial/testimonial-section-one/testimonial-section-one.tsx',
  target: '@components/blocks/testamonials/testamonial-section-one.tsx',
  status: 'archived',
  dependencies: ['@tabler/icons-react'],
  registryDependencies: ['badge', 'button'],
})
