'use client'

import { ApprovalPanelContent, StandalonePanelFrame } from './_expense-workflow-parts'

type ApprovalPanelIllustrationProps = {
  className?: string
}

export function ApprovalPanelIllustration({ className }: ApprovalPanelIllustrationProps) {
  return (
    <StandalonePanelFrame title="Approval routed" stage="approval" className={className}>
      <ApprovalPanelContent />
    </StandalonePanelFrame>
  )
}

export default ApprovalPanelIllustration
