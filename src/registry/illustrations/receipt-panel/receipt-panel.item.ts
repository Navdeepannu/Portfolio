import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const receiptPanelItem = defineIllustrationItem({
  slug: 'receipt-panel',
  title: 'Receipt Panel Illustration',
  description: 'A receipt capture panel illustration.',
  source: 'src/registry/illustrations/receipt-panel/receipt-panel.tsx',
  target: '@components/illustrations/receipt-panel.tsx',
  size: 'sm',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
