'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import type { Project, ProjectStatus } from '@/data/projects'
import { cn } from '@/lib/utils'

import {
  CaseStudyGrid,
  ProjectEyebrow,
  ProjectLinks,
  ProjectReference,
  ProjectStack,
  projectsSectionClass,
} from './project-ui'

const statusStyles: Record<ProjectStatus, string> = {
  shipped: 'text-foreground/70',
  'in-progress': 'text-amber-700 dark:text-amber-400',
  archived: 'text-muted-foreground',
}

function ArchiveRow({
  project,
  isExpanded,
  onToggle,
}: {
  project: Project
  isExpanded: boolean
  onToggle: () => void
}) {
  const panelId = `archive-panel-${project.slug}`
  const triggerId = `archive-trigger-${project.slug}`

  return (
    <article className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        id={triggerId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          'grid w-full grid-cols-[auto_1fr_auto_auto] items-center gap-3 px-4 py-4 text-left transition-colors sm:grid-cols-[5.5rem_1fr_4rem_6rem_auto] sm:gap-4 md:px-5',
          'hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
          isExpanded && 'bg-muted/20',
        )}
      >
        <ProjectReference reference={project.reference} className="hidden sm:inline" />
        <span className="min-w-0 font-mono text-sm text-foreground">
          <span className="text-muted-foreground/50">{project.filename}</span>
        </span>
        <span className="hidden font-mono text-xs tabular-nums text-muted-foreground sm:block">
          {project.year}
        </span>
        <span
          className={cn(
            'hidden font-mono text-[0.65rem] tracking-wide uppercase sm:block',
            statusStyles[project.status],
          )}
        >
          {project.status}
        </span>
        <ChevronDown
          className={cn(
            'size-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isExpanded && 'rotate-180',
          )}
          aria-hidden
        />
      </button>

      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-out',
          isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div className="space-y-6 border-t border-border/40 px-4 pb-6 pt-5 md:px-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 sm:hidden">
                  <ProjectReference reference={project.reference} />
                  <span className="font-mono text-xs text-muted-foreground">{project.year}</span>
                </div>
                <h3 className="mt-2 font-schibsted text-lg font-semibold tracking-tight text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>
              <ProjectStack stack={project.stack} limit={4} />
            </div>

            <CaseStudyGrid caseStudy={project.caseStudy} compact />

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/60 pt-4">
              <dl className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                <div>
                  <dt className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                    Role
                  </dt>
                  <dd className="mt-1 text-foreground">{project.role}</dd>
                </div>
              </dl>
              <ProjectLinks links={project.links} />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export function ProjectsArchive({ projects }: { projects: Project[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  if (projects.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="archive-heading" className={projectsSectionClass}>
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 max-w-xl md:mb-10">
          <ProjectEyebrow>In progress · 03</ProjectEyebrow>
          <h2
            id="archive-heading"
            className="font-schibsted text-xl font-semibold tracking-tight text-foreground md:text-2xl"
          >
            Active entries
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Work still in flight — indexed and documented before release.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/60 bg-card">
          <div className="hidden border-b border-border/60 bg-muted/20 px-5 py-3 font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase sm:grid sm:grid-cols-[5.5rem_1fr_4rem_6rem_auto] sm:gap-4">
            <span>Ref</span>
            <span>Entry</span>
            <span>Year</span>
            <span>Status</span>
            <span className="sr-only">Expand</span>
          </div>

          <div>
            {projects.map((project) => (
              <ArchiveRow
                key={project.slug}
                project={project}
                isExpanded={expandedSlug === project.slug}
                onToggle={() =>
                  setExpandedSlug((current) =>
                    current === project.slug ? null : project.slug,
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
