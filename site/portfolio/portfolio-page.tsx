import { Suspense } from 'react'

import { AboutSection } from '@/site/portfolio/about-section'
import { CapabilitiesSection } from '@/site/portfolio/capabilities-section'
import { ExperienceSection } from '@/site/portfolio/experience-section'
import { LandingClosing } from '@/site/portfolio/landing-closing'
import { LandingHeader } from '@/site/portfolio/landing-header'
import { OpenSourceSection } from '@/site/portfolio/open-source-section'
import { PublicInsightsSection } from '@/site/portfolio/public-insights-section'
import { SelectedWorkSection } from '@/site/portfolio/selected-work-section'
import { WritingPreviewSection } from '@/site/portfolio/writing-preview-section'
import { PortfolioFooter } from './portfolio-footer'

export function PortfolioPage() {
  return (
    <div className="landing-page min-h-screen overflow-x-clip bg-background font-schibsted text-foreground">
      <LandingHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <SelectedWorkSection showDetails={false} showProjectsLink />
        <AboutSection />
        <Suspense fallback={<div className="h-32 border-t border-border/70" />}>
          <OpenSourceSection />
        </Suspense>
        <Suspense fallback={null}>
          <PublicInsightsSection />
        </Suspense>
        <ExperienceSection />
        <CapabilitiesSection />
        <WritingPreviewSection />
      </main>
      <LandingClosing />
      <PortfolioFooter />
    </div>
  )
}
