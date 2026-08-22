import { defineIllustrationItem } from '@/registry/illustrations/define-illustration-item'

export const revisionCyclesIllustrationItem = defineIllustrationItem({
  slug: 'revision-cycles-illustration',
  title: 'Revision Cycles Illustration',
  description: 'An interactive comparison of eliminated and remaining revision rounds.',
  source:
    'src/registry/illustrations/revision-cycles-illustration/revision-cycles-illustration.tsx',
  target: '@components/illustrations/RevisionCyclesIllustration.tsx',
  size: 'wide',
  previewClassName: 'w-full max-w-xl',
  dependencies: ['motion'],
})
