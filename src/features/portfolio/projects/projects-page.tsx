import { projects } from '@/features/portfolio/content/projects'
import { SelectedWorkSection } from '@/features/portfolio/sections/selected-work-section'

import { ProjectsFeatured } from './projects-featured'
import { ProjectsHero } from './projects-hero'

export function ProjectsPage() {
  return (
    <div className="font-schibsted selection:bg-foreground selection:text-background">
      <ProjectsHero />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">
        <SelectedWorkSection />
      </div>
      <ProjectsFeatured projects={projects} />
    </div>
  )
}
