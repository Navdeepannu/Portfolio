'use client'

import Link from 'next/link'
import type { ComponentProps } from 'react'

import { ANALYTICS_EVENTS, type AnalyticsEventProperties } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'
import { cn } from '@/lib/utils'

type ExternalAnalyticsLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string
  destinationType: 'github' | 'portfolio' | 'project' | 'resume' | 'social' | 'other'
  analyticsSource: AnalyticsEventProperties[typeof ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED]['source']
}

export function ExternalAnalyticsLink({
  analyticsSource,
  className,
  destinationType,
  href,
  onClick,
  ...props
}: ExternalAnalyticsLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      className={cn('ph-no-capture', className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented) return

        trackAnalyticsEvent(ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED, {
          destination_type: destinationType,
          destination: href,
          source: analyticsSource,
        })
      }}
    />
  )
}
