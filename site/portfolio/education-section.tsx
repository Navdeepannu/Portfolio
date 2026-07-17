import { LandingSection } from '@/site/portfolio/landing-section'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { ResumeEntry } from '@/site/portfolio/resume-entry'

export function EducationSection() {
  return (
    <LandingSection id="education" label="Education">
      <div className="space-y-10">
        {landingPageContent.education.map((entry) => (
          <ResumeEntry key={`${entry.period}-${entry.title}`} entry={entry} />
        ))}
      </div>
    </LandingSection>
  )
}
