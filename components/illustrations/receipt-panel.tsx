'use client'

import { cn } from '@/lib/utils'

import { ReceiptPanelContent, StandalonePanelFrame } from './_expense-workflow-parts'

type ReceiptPanelIllustrationProps = {
  className?: string
}

export function ReceiptPanelIllustration({ className }: ReceiptPanelIllustrationProps) {
  return (
    <StandalonePanelFrame
      title="Receipt captured"
      stage="receipt"
      className={cn('h-60 sm:h-66', className)}
    >
      <ReceiptPanelContent />
    </StandalonePanelFrame>
  )
}

export default ReceiptPanelIllustration
