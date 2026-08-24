import { vemetric } from '@vemetric/web'
import posthog from 'posthog-js'

const posthogProjectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN

if (posthogProjectToken) {
  try {
    posthog.init(posthogProjectToken, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      autocapture: {
        element_attribute_ignorelist: ['href', 'title', 'value'],
      },
      before_send(event) {
        if (!event) return event

        const urlProperties = [
          '$current_url',
          '$referrer',
          '$initial_current_url',
          '$initial_referrer',
        ]

        for (const property of urlProperties) {
          const value = event.properties?.[property]
          if (typeof value === 'string') event.properties[property] = value.split(/[?#]/)[0]
        }

        return event
      },
      capture_exceptions: true,
      session_recording: {
        maskAllInputs: true,
        recordBody: false,
        recordHeaders: false,
        maskCapturedNetworkRequestFn(request) {
          if (request.name?.includes('/api/contact')) return null
          if (request.name) request.name = request.name.split(/[?#]/)[0]
          return request
        },
      },
      debug: process.env.NODE_ENV === 'development',
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Unable to initialize PostHog.', error)
    }
  }
} else if (process.env.NODE_ENV === 'development') {
  console.warn('PostHog is disabled because NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is not configured.')
}

const vemetricToken = process.env.NEXT_PUBLIC_VEMETRIC_TOKEN

if (vemetricToken) {
  try {
    vemetric.init({ token: vemetricToken })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Unable to initialize Vemetric.', error)
    }
  }
}
