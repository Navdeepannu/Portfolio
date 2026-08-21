import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const approvalPanelItem = defineIllustrationItem({
  slug: 'approval-panel',
  title: 'Approval Panel Illustration',
  description: 'An approval routing panel illustration.',
  source: 'src/registry/illustrations/approval-panel/approval-panel.tsx',
  target: '@components/illustrations/approval-panel.tsx',
  size: 'wide',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
