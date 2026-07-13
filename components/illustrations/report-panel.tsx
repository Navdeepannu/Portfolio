'use client'

import { ReportPanelContent, StandalonePanelFrame } from './_expense-workflow-parts'

type ReportPanelIllustrationProps = {
  className?: string
}

export function ReportPanelIllustration({ className }: ReportPanelIllustrationProps) {
  return (
    <StandalonePanelFrame title="Fetching report..." stage="category" className={className}>
      <ReportPanelContent />
    </StandalonePanelFrame>
  )
}

export default ReportPanelIllustration
