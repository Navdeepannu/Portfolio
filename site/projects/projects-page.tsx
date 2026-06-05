import { getArchiveProjects, getFeaturedProjects } from '@/data/project-helpers'

import { ProjectsArchive } from './projects-archive'
import { ProjectsFeatured } from './projects-featured'
import { ProjectsHero } from './projects-hero'

export function ProjectsPage() {
  const featured = getFeaturedProjects()
  const archive = getArchiveProjects()

  return (
    <div className="font-schibsted selection:bg-emerald-200/60">
      <ProjectsHero />
      <ProjectsFeatured projects={featured} />
      <ProjectsArchive projects={archive} />
    </div>
  )
}
