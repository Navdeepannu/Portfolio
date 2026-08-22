import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const releaseWorkflowIllustrationItem = defineIllustrationItem({
  slug: 'release-workflow-illustration',
  title: 'Release Workflow Illustration',
  description: 'An interactive release tracker with configurable workflow data and autoplay.',
  source:
    'src/registry/illustrations/release-workflow-illustration/release-workflow-illustration.tsx',
  target: '@components/illustrations/ReleaseWorkflowIllustration.tsx',
  size: 'wide',
  previewClassName: 'w-full max-w-lg',
  dependencies: ['lucide-react', 'motion'],
})
