import type { IllustrationDefinition, IllustrationSize, RegistryFileEntry } from '../types'

type IllustrationInput = {
  slug: string
  title: string
  description: string
  source: string
  target: string
  size: IllustrationSize
  previewClassName?: string
  dependencies: string[]
  sharedExpenseParts?: boolean
}

const sharedExpenseFile: RegistryFileEntry = {
  path: 'components/illustrations/_expense-workflow-parts.tsx',
  target: '@components/illustrations/_expense-workflow-parts.tsx',
  type: 'registry:component',
  shared: true,
}

function illustrationItem(input: IllustrationInput): IllustrationDefinition {
  const primaryFile: RegistryFileEntry = {
    path: input.source,
    target: input.target,
    type: 'registry:component',
  }
  const files = input.sharedExpenseParts ? [primaryFile, sharedExpenseFile] : [primaryFile]

  return {
    slug: input.slug,
    title: input.title,
    description: input.description,
    category: 'illustrations',
    tags: ['illustration'],
    kind: 'illustration',
    status: 'published',
    size: input.size,
    previewClassName: input.previewClassName,
    sourceFiles: files.map((file) => ({ path: file.path, language: 'tsx' })),
    preview: { module: `@/${input.source.replace(/\.tsx$/, '')}` },
    registry: {
      name: input.slug,
      type: 'registry:component',
      dependencies: input.dependencies,
      registryDependencies: [],
      files,
    },
  }
}

export const illustrationItems: IllustrationDefinition[] = [
  illustrationItem({
    slug: 'approval-panel',
    title: 'Approval Panel Illustration',
    description: 'An approval routing panel illustration.',
    source: 'components/illustrations/approval-panel.tsx',
    target: '@components/illustrations/approval-panel.tsx',
    size: 'wide',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
  illustrationItem({
    slug: 'designed-for-focus-illustration',
    title: 'Designed for Focus Illustration',
    description:
      'An interactive focus illustration with concentric motion and reduced-motion support.',
    source: 'components/illustrations/DesignedForFocusIllustration.tsx',
    target: '@components/illustrations/DesignedForFocusIllustration.tsx',
    size: 'sm',
    dependencies: ['motion'],
  }),
  illustrationItem({
    slug: 'fast-by-default-illustration',
    title: 'Fast by Default Illustration',
    description: 'An interactive field of animated speed lines with reduced-motion support.',
    source: 'components/illustrations/FastByDefaultIllustration.tsx',
    target: '@components/illustrations/FastByDefaultIllustration.tsx',
    size: 'sm',
    dependencies: ['motion'],
  }),
  illustrationItem({
    slug: 'flexible-at-scale-illustration',
    title: 'Flexible at Scale Illustration',
    description: 'An interactive spring-based line field that responds to pointer movement.',
    source: 'components/illustrations/FlexibleAtScaleIllustration.tsx',
    target: '@components/illustrations/FlexibleAtScaleIllustration.tsx',
    size: 'sm',
    dependencies: ['motion'],
  }),
  illustrationItem({
    slug: 'matching-panel',
    title: 'Matching Panel Illustration',
    description: 'A policy matching panel illustration.',
    source: 'components/illustrations/matching-panel.tsx',
    target: '@components/illustrations/matching-panel.tsx',
    size: 'sm',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
  illustrationItem({
    slug: 'payment-card',
    title: 'Payment Card Illustration',
    description: 'A motion-ready payment card illustration.',
    source: 'components/illustrations/payment-card.tsx',
    target: '@components/illustrations/payment-card.tsx',
    size: 'tall',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
  illustrationItem({
    slug: 'receipt-panel',
    title: 'Receipt Panel Illustration',
    description: 'A receipt capture panel illustration.',
    source: 'components/illustrations/receipt-panel.tsx',
    target: '@components/illustrations/receipt-panel.tsx',
    size: 'sm',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
  illustrationItem({
    slug: 'release-workflow-illustration',
    title: 'Release Workflow Illustration',
    description: 'An interactive release tracker with configurable workflow data and autoplay.',
    source: 'components/illustrations/ReleaseWorkflowIllustration.tsx',
    target: '@components/illustrations/ReleaseWorkflowIllustration.tsx',
    size: 'wide',
    previewClassName: 'w-full max-w-lg',
    dependencies: ['lucide-react', 'motion'],
  }),
  illustrationItem({
    slug: 'report-panel',
    title: 'Report Panel Illustration',
    description: 'A report fetching panel illustration.',
    source: 'components/illustrations/report-panel.tsx',
    target: '@components/illustrations/report-panel.tsx',
    size: 'sm',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
  illustrationItem({
    slug: 'revision-cycles-illustration',
    title: 'Revision Cycles Illustration',
    description: 'An interactive comparison of eliminated and remaining revision rounds.',
    source: 'components/illustrations/RevisionCyclesIllustration.tsx',
    target: '@components/illustrations/RevisionCyclesIllustration.tsx',
    size: 'wide',
    previewClassName: 'w-full max-w-xl',
    dependencies: ['motion'],
  }),
  illustrationItem({
    slug: 'workflow-desk',
    title: 'Workflow Desk Illustration',
    description:
      'A combined expense workflow illustration with a payment card and four process panels.',
    source: 'components/illustrations/workflow-desk.tsx',
    target: '@components/illustrations/workflow-desk.tsx',
    size: 'hero',
    previewClassName: 'scale-90',
    dependencies: ['lucide-react', 'motion'],
    sharedExpenseParts: true,
  }),
].sort((a, b) => a.slug.localeCompare(b.slug))
