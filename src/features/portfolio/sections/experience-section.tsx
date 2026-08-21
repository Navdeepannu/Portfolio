import { LandingSection } from '@/features/portfolio/sections/landing-section'
import { landingPageContent } from '@/features/portfolio/content/landing-page.content'
import { ResumeEntry } from '@/features/portfolio/sections/resume-entry'

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
