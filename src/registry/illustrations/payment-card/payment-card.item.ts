import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const paymentCardItem = defineIllustrationItem({
  slug: 'payment-card',
  title: 'Payment Card Illustration',
  description: 'A motion-ready payment card illustration.',
  source: 'src/registry/illustrations/payment-card/payment-card.tsx',
  target: '@components/illustrations/payment-card.tsx',
  size: 'tall',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
