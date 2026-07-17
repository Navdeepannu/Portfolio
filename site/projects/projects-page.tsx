import { projects } from '@/data/projects'

import { ProjectsFeatured } from './projects-featured'
import { ProjectsHero } from './projects-hero'

export function ProjectsPage() {
  return (
    <div className="font-schibsted selection:bg-foreground selection:text-background">
      <ProjectsHero />
      <ProjectsFeatured projects={projects} />
    </div>
  )
}
