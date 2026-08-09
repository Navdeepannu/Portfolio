import { PublicInsights } from '@/components/ui/components/public-insights'
import { getPublicInsightsSnapshot } from '@/lib/analytics/public-insights'
import { LandingSection } from '@/site/portfolio/landing-section'

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
