'use client'

import Image from 'next/image'

import type { Project } from '@/data/projects'
import { cn } from '@/lib/utils'

import {
  CaseStudyPanel,
  ProjectLinks,
  ProjectReference,
  ProjectStack,
  projectsSectionClass,
} from './project-ui'

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      aria-labelledby={`featured-project-${project.slug}`}
      className={cn(index > 0 && 'border-t border-border/60 pt-16 md:pt-20')}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ProjectReference reference={project.reference} />
          <span className="hidden h-3 w-px bg-border sm:block" aria-hidden />
          <span className="font-mono text-[0.65rem] text-muted-foreground">{project.filename}</span>
        </div>
        <div className="flex items-center gap-3 font-mono text-[0.65rem] text-muted-foreground">
          <span className="tabular-nums">{project.year}</span>
          <span aria-hidden>·</span>
          <span className="uppercase">{project.status}</span>
        </div>
      </div>

      <header className="mt-5 max-w-2xl">
        <h3
          id={`featured-project-${project.slug}`}
          className="font-schibsted text-xl font-semibold tracking-tight text-foreground md:text-2xl"
        >
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      </header>

      <div className="mt-10 flex flex-col gap-8">
        <div className="grid items-stretch gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="relative min-h-64 overflow-hidden rounded-xl bg-muted/15 shadow-md ring-1 ring-border lg:col-span-3 lg:min-h-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              priority={index === 0}
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>

          <div className="lg:col-span-2">
            <CaseStudyPanel caseStudy={project.caseStudy} className="min-h-64 lg:min-h-0" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-6 lg:col-span-3">
            {project.links.length > 0 ? (
              <div>
                <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                  Links
                </p>
                <div className="mt-2.5">
                  <ProjectLinks links={project.links} />
                </div>
              </div>
            ) : null}
            <div>
              <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                Stack
              </p>
              <div className="mt-2.5">
                <ProjectStack stack={project.stack} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsFeatured({ projects }: { projects: Project[] }) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="featured-projects-heading" className={projectsSectionClass}>
      <div className="mx-auto max-w-6xl">
        <h2 id="featured-projects-heading" className="sr-only">
          Shipped case studies
        </h2>
        <div className="space-y-16 md:space-y-20">
          {projects.map((project, index) => (
            <FeaturedProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
