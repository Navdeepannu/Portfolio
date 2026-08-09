import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Project } from '@/data/projects'

export function ProjectsFeatured({ projects }: { projects: Project[] }) {
  return (
    <section
      aria-label="Project archive list"
      className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20 lg:px-10"
    >
      <div className="border-y border-border/70">
        <div
          aria-hidden="true"
          className="hidden grid-cols-[minmax(10rem,1.3fr)_minmax(8rem,1fr)_minmax(9rem,1fr)_7rem_6rem] gap-5 border-b border-border/70 py-3 text-xs text-muted-foreground md:grid"
        >
          <span>Project</span>
          <span>Type</span>
          <span>Role</span>
          <span>Year</span>
          <span>Status</span>
        </div>

        <ul className="divide-y divide-border/70">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="grid gap-4 py-6 md:grid-cols-[minmax(10rem,1.3fr)_minmax(8rem,1fr)_minmax(9rem,1fr)_7rem_6rem] md:gap-5"
            >
              <div>
                <p className="font-medium text-foreground">{project.title}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{project.summary}</p>
                <ul className="mt-2 flex flex-wrap gap-x-4">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="inline-flex min-h-11 items-center gap-1 rounded-sm text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring"
                      >
                        {link.label}
                        {link.external ? (
                          <ArrowUpRight className="size-3" aria-hidden="true" />
                        ) : null}
                        {link.external ? (
                          <span className="sr-only"> (opens in a new tab)</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="mr-2 text-xs font-medium text-foreground md:sr-only">Type</span>
                {project.type}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="mr-2 text-xs font-medium text-foreground md:sr-only">Role</span>
                {project.role}
              </p>
              <p className="text-sm leading-6 text-muted-foreground tabular-nums">
                <span className="mr-2 text-xs font-medium text-foreground md:sr-only">Year</span>
                {project.year}
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                <span className="mr-2 text-xs font-medium text-foreground md:sr-only">Status</span>
                {project.status}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
