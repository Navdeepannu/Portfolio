import IllustrationsShowcase from '@/site/illustrations-showcase'
import { readProjectSourceFile } from '@/lib/block-source'

const SHARED_ILLUSTRATION_SOURCE = 'components/illustrations/_expense-workflow-parts.tsx'

const illustrationSourcePaths = {
  'payment-card': ['components/illustrations/payment-card.tsx', SHARED_ILLUSTRATION_SOURCE],
  'workflow-desk': ['components/illustrations/workflow-desk.tsx', SHARED_ILLUSTRATION_SOURCE],
  'receipt-panel': ['components/illustrations/receipt-panel.tsx', SHARED_ILLUSTRATION_SOURCE],
  'matching-panel': ['components/illustrations/matching-panel.tsx', SHARED_ILLUSTRATION_SOURCE],
  'report-panel': ['components/illustrations/report-panel.tsx', SHARED_ILLUSTRATION_SOURCE],
  'approval-panel': ['components/illustrations/approval-panel.tsx', SHARED_ILLUSTRATION_SOURCE],
  'delivery-pipeline': ['components/illustrations/delivery-pipeline.tsx'],
} as const

export default async function IllustrationsPage() {
  const illustrationSources = Object.fromEntries(
    await Promise.all(
      Object.entries(illustrationSourcePaths).map(async ([slug, sourcePaths]) => {
        const files = await Promise.all(
          sourcePaths.map(async (sourcePath) => ({
            filename: sourcePath.split('/').at(-1) ?? sourcePath,
            language: 'tsx' as const,
            code: await readProjectSourceFile(sourcePath),
          })),
        )

        return [slug, files]
      }),
    ),
  )

  return <IllustrationsShowcase illustrationSources={illustrationSources} />
}
