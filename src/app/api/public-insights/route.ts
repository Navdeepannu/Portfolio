import { getPublicInsightsSnapshot } from '@/features/portfolio/analytics/server/public-insights'

export async function GET() {
  const snapshot = await getPublicInsightsSnapshot()

  if (!snapshot) {
    return Response.json(
      { status: 'unavailable' },
      {
        status: 503,
        headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600' },
      },
    )
  }

  return Response.json(snapshot, {
    headers: { 'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400' },
  })
}
