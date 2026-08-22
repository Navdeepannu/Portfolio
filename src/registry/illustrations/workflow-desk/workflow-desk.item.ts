import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const workflowDeskItem = defineIllustrationItem({
  slug: 'workflow-desk',
  title: 'Workflow Desk Illustration',
  description:
    'A combined expense workflow illustration with a payment card and four process panels.',
  source: 'src/registry/illustrations/workflow-desk/workflow-desk.tsx',
  target: '@components/illustrations/workflow-desk.tsx',
  size: 'hero',
  previewClassName: 'scale-90',
  dependencies: ['lucide-react', 'motion'],
  sharedExpenseParts: true,
})
