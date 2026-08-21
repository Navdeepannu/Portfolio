import { LandingSection } from '@/features/portfolio/sections/landing-section'
import { AboutSectionContent } from './about-section-content'

export function AboutSection() {
  return (
    <LandingSection id="about" label="About">
      <AboutSectionContent />
    </LandingSection>
  )
}
