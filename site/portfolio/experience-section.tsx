import { LandingSection } from '@/site/portfolio/landing-section'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { ResumeEntry } from '@/site/portfolio/resume-entry'

export function ExperienceSection() {
  return (
    <LandingSection id="experience" label="Experience">
      <div className="space-y-10">
        {landingPageContent.experience.map((entry) => (
          <ResumeEntry key={`${entry.period}-${entry.title}`} entry={entry} />
        ))}
      </div>
    </LandingSection>
  )
}
