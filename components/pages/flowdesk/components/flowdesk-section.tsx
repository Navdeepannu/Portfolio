import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { FlowDeskContainer } from './flowdesk-container'

type FlowDeskSectionProps = {
  children: ReactNode
  className?: string
  containerClassName?: string
  withBorder?: boolean
}

export function FlowDeskSection({
  children,
  className,
  containerClassName,
  withBorder = true,
}: FlowDeskSectionProps) {
  return (
    <section
      className={cn(
        'relative',
        withBorder && 'border-t border-border',
        className
      )}
    >
      <FlowDeskContainer
        className={cn('py-24 md:py-28 lg:py-32', containerClassName)}
      >
        {children}
      </FlowDeskContainer>
    </section>
  )
}