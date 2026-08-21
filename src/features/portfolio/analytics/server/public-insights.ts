import 'server-only'

import type { AnalyticsSnapshot } from '@/features/portfolio/analytics/public-insights'
import {
  getVercelAnalyticsSnapshot,
  hasVercelAnalyticsConfig,
} from '@/features/portfolio/analytics/server/providers/vercel'

export async function getPublicInsightsSnapshot(): Promise<AnalyticsSnapshot | null> {
  if (!hasVercelAnalyticsConfig()) return null

  try {
    return await getVercelAnalyticsSnapshot()
  } catch (error) {
    console.error(
      '[public-insights]',
      error instanceof Error ? error.message : 'Unable to load public analytics',
    )
    return null
  }
}
