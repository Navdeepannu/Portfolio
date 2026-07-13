'use client'

import { useReducedMotion } from 'motion/react'

import { cn } from '@/lib/utils'
import { PaymentCard } from './_expense-workflow-parts'

type PaymentCardIllustrationProps = {
  className?: string
}

export function PaymentCardIllustration({ className }: PaymentCardIllustrationProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <div
      role="img"
      aria-label="Payment card"
      className={cn('relative h-88 w-56 sm:h-96 sm:w-64', className)}
    >
      <PaymentCard isActive={true} shouldReduceMotion={shouldReduceMotion} />
    </div>
  )
}

export default PaymentCardIllustration
