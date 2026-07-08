import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

type FlowDeskContainerProps = {
  children: ReactNode
  className?: string
}

export function FlowDeskContainer({ children, className }: FlowDeskContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-(--flowdesk-container) px-6 lg:px-8', className)}>
      {children}
    </div>
  )
}
