import { getGithubActivity } from '@/lib/github-activity'
import { GithubActivityPreview } from '@/site/portfolio/github-activity-preview'
import { LandingSection } from '@/site/portfolio/landing-section'
import { AboutSectionContent } from './about-section-content'

export async function AboutSection() {
  const githubActivity = await getGithubActivity()

  return (
    <LandingSection id="about" label="About">
      <AboutSectionContent />
      <GithubActivityPreview activity={githubActivity} />
    </LandingSection>
  )
}
