'use client'

import posthog from 'posthog-js'

import type { AnalyticsEventName, AnalyticsEventProperties } from '@/features/analytics/events'

const hasPostHogProjectToken = Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN)

export function trackAnalyticsEvent<EventName extends AnalyticsEventName>(
  event: EventName,
  properties: AnalyticsEventProperties[EventName],
) {
  if (!hasPostHogProjectToken || typeof window === 'undefined') return

  try {
    posthog.capture(event, {
      ...properties,
      pathname: window.location.pathname,
    })
  } catch {
    // Analytics must never block the product action being observed.
  }
}

export function trackAnalyticsException(error: unknown) {
  if (!hasPostHogProjectToken || typeof window === 'undefined') return

  try {
    posthog.captureException(error)
  } catch {
    // Error reporting must not make an error boundary fail again.
  }
}
