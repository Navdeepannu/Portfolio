import {
  PublicInsights,
  type AnalyticsSnapshot,
} from '@/features/portfolio/analytics/public-insights'

const snapshot: AnalyticsSnapshot = {
  period: {
    from: '2025-05-01',
    to: '2025-05-14',
    label: 'May 1–14, 2025',
  },
  metrics: [
    { id: 'visitors', label: 'Visitors', value: 1284, change: 12.4 },
    { id: 'views', label: 'Page views', value: 3072, change: 8.1 },
    {
      id: 'returning',
      label: 'Returning visitors',
      value: 31.8,
      suffix: '%',
      decimalPlaces: 1,
      change: 3.6,
    },
  ],
  series: [62, 84, 76, 105, 91, 120, 134, 118, 142, 151, 139, 168, 174, 182].map(
    (visitors, index) => ({
      date: `2025-05-${String(index + 1).padStart(2, '0')}`,
      visitors,
      views: Math.round(visitors * 2.4),
    }),
  ),
  updatedAt: '2025-05-14T16:00:00.000Z',
  source: 'Example data',
}

export default function PublicInsightsShowcase() {
  return (
    <PublicInsights
      className="w-full max-w-3xl"
      snapshot={snapshot}
      description="Anonymous traffic, period-over-period context, and a daily trend without exposing visitor identities."
    />
  )
}
