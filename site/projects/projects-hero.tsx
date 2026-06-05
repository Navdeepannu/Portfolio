import { projectsPageMeta } from '@/data/projects'

import { ProjectEyebrow } from './project-ui'

export function ProjectsHero() {
  return (
    <header className="relative overflow-hidden px-6 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10 lg:px-12">
      <p
        aria-hidden
        className="pointer-events-none absolute -left-2 top-2 select-none font-schibsted text-[clamp(4rem,16vw,10rem)] font-semibold leading-none tracking-tighter text-foreground/[0.04] dark:text-foreground/[0.06]"
      >
        Projects
      </p>

      <div className="relative mx-auto max-w-6xl">
        <ProjectEyebrow>Work index</ProjectEyebrow>
        <h1 className="font-schibsted text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Projects
        </h1>
        <p className="mt-2 max-w-lg text-sm text-muted-foreground">
          Shipped product work — interfaces, systems, and full-stack delivery.
        </p>
        <p className="mt-3 font-mono text-[0.65rem] tracking-wide text-muted-foreground/80">
          {projectsPageMeta.expertise.slice(0, 3).join(' · ')}
        </p>
      </div>
    </header>
  )
}
