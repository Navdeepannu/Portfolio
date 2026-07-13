'use client'

import { useReducedMotion } from 'motion/react'

import { MatchingPanelContent, StandalonePanelFrame } from './_expense-workflow-parts'

type MatchingPanelIllustrationProps = {
  className?: string
}

export function MatchingPanelIllustration({ className }: MatchingPanelIllustrationProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <StandalonePanelFrame title="Matching..." stage="policy" className={className}>
      <MatchingPanelContent isActive={true} shouldReduceMotion={shouldReduceMotion} />
    </StandalonePanelFrame>
  )
}

export default MatchingPanelIllustration
