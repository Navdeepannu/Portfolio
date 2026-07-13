'use client'

import { useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import {
  ApprovalPanelContent,
  MatchingPanelContent,
  PaymentCard,
  ReceiptPanelContent,
  ReportPanelContent,
  WorkflowPanel,
} from './_expense-workflow-parts'

type WorkflowDeskIllustrationProps = {
  className?: string
  'aria-label'?: string
}

export function WorkflowDeskIllustration({
  className,
  'aria-label': ariaLabel = 'Automated expense processing workflow',
}: WorkflowDeskIllustrationProps) {
  const illustrationRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = Boolean(useReducedMotion())

  const isInView = useInView(illustrationRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -10% 0px',
  })

  const isActive = isInView || shouldReduceMotion

  return (
    <div
      ref={illustrationRef}
      role="img"
      aria-label={ariaLabel}
      data-slot="workflow-desk-illustration"
      className={cn(
        'relative isolate mx-auto h-130 w-full max-w-160',
        'shrink-0 overflow-hidden sm:h-140 lg:h-150',
        className,
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55 dark:opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.16) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <PaymentCard isActive={isActive} shouldReduceMotion={shouldReduceMotion} />

      <WorkflowPanel
        stage="receipt"
        title="Receipt captured"
        order={0}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-5 left-0 z-40 w-[46%] max-w-58 sm:top-[6%] sm:left-[4%]"
      >
        <ReceiptPanelContent />
      </WorkflowPanel>

      <WorkflowPanel
        stage="policy"
        title="Matching..."
        order={1}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-[10%] right-0 z-10 w-[46%] max-w-58 sm:top-[13%] sm:right-[3%]"
      >
        <MatchingPanelContent isActive={isActive} shouldReduceMotion={shouldReduceMotion} />
      </WorkflowPanel>

      <WorkflowPanel
        stage="category"
        title="Fetching report..."
        order={2}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="bottom-[7%] left-0 z-10 w-[46%] max-w-58 sm:bottom-[9%] sm:left-[3%]"
      >
        <ReportPanelContent />
      </WorkflowPanel>

      <WorkflowPanel
        stage="approval"
        title="Approval routed"
        order={3}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-[50%] right-0 z-40 w-[47%] max-w-60 sm:top-[49%] sm:right-[1%]"
      >
        <ApprovalPanelContent />
      </WorkflowPanel>
    </div>
  )
}

export default WorkflowDeskIllustration
