import { PublicInsights } from '@/features/portfolio/analytics/public-insights'
import { getPublicInsightsSnapshot } from '@/features/portfolio/analytics/server/public-insights'
import { LandingSection } from '@/features/portfolio/sections/landing-section'

export async function PublicInsightsSection() {
  const snapshot = await getPublicInsightsSnapshot()

  if (!snapshot) return null

  return (
    <LandingSection
      id="public-insights"
      label="Public insights"
      heading="A transparent view of portfolio traffic"
    >
      <PublicInsights
        snapshot={snapshot}
        description="Anonymous, aggregate traffic only. Current values are compared with the previous equal period."
      />
    </LandingSection>
  )
}
