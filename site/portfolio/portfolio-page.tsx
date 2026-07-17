import { AboutSection } from '@/site/portfolio/about-section'
import { CapabilitiesSection } from '@/site/portfolio/capabilities-section'
import { EducationSection } from '@/site/portfolio/education-section'
import { ExperienceSection } from '@/site/portfolio/experience-section'
import { LandingClosing } from '@/site/portfolio/landing-closing'
import { LandingHeader } from '@/site/portfolio/landing-header'
import { SelectedWorkSection } from '@/site/portfolio/selected-work-section'

export function PortfolioPage() {
  return (
    <div className="landing-page min-h-screen overflow-x-clip bg-background font-schibsted text-foreground">
      <LandingHeader />
      <main id="main-content" className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-10">
        <SelectedWorkSection />
        <AboutSection />
        <ExperienceSection />
        <CapabilitiesSection />
        <EducationSection />
      </main>
      <LandingClosing />
    </div>
  )
}
