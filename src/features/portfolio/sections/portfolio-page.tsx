import { Suspense } from 'react'

import { AboutSection } from '@/features/portfolio/sections/about-section'
import { CapabilitiesSection } from '@/features/portfolio/sections/capabilities-section'
import { ExperienceSection } from '@/features/portfolio/sections/experience-section'
import { LandingClosing } from '@/features/portfolio/sections/landing-closing'
import { LandingHeader } from '@/features/portfolio/sections/landing-header'
import { OpenSourceSection } from '@/features/portfolio/sections/open-source-section'
import { PublicInsightsSection } from '@/features/portfolio/sections/public-insights-section'
import { SelectedWorkSection } from '@/features/portfolio/sections/selected-work-section'
import { WritingPreviewSection } from '@/features/portfolio/sections/writing-preview-section'
import { PortfolioFooter } from './portfolio-footer'

export function PortfolioPage() {
  return (
    <div className="landing-page min-h-screen overflow-x-clip bg-background font-schibsted text-foreground selection:bg-emerald-200/70 dark:selection:bg-emerald-500 dark:selection:text-white">
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
