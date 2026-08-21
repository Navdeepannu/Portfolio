import { LandingTextLink } from '@/features/portfolio/sections/landing-link'
import { LandingSection } from '@/features/portfolio/sections/landing-section'
import { landingPageContent } from '@/features/portfolio/content/landing-page.content'
import { ProjectGallery } from '@/features/portfolio/sections/project-gallery'

type SelectedWorkSectionProps = {
  showDetails?: boolean
  showProjectsLink?: boolean
}

export function SelectedWorkSection({
  showDetails = true,
  showProjectsLink = false,
}: SelectedWorkSectionProps) {
  return (
    <LandingSection id="work" label="Selected work" showDivider={false} compactTop>
      <ProjectGallery projects={landingPageContent.projects} showDetails={showDetails} />
      {showProjectsLink ? (
        <div className="mt-8">
          <LandingTextLink label="View project details" href="/projects" showArrow={false} />
        </div>
      ) : null}
    </LandingSection>
  )
}
