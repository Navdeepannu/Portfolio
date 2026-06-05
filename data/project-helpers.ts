import { projects, type Project } from './projects'

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured)
}

export function getArchiveProjects(): Project[] {
  return projects.filter((project) => project.status !== 'shipped')
}

export function getProjectCount(): number {
  return projects.length
}

export function getProjectTechnologies(): string[] {
  const stack = new Set<string>()
  for (const project of projects) {
    for (const tech of project.stack) {
      stack.add(tech)
    }
  }
  return Array.from(stack).sort()
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
