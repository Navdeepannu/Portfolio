import { LandingTextLink } from '@/site/portfolio/landing-link'
import { LandingSection } from '@/site/portfolio/landing-section'
import { landingPageContent } from '@/site/portfolio/landing-page-content'
import { ProjectGallery } from '@/site/portfolio/project-gallery'

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
