import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Project, ProjectLink } from '@/data/projects'

function ProjectLinks({ links }: { links: ProjectLink[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-0.5">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group inline-flex min-h-11 items-center gap-0.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
          >
            <span className="border-b border-dotted border-current/55 pb-px">{link.label}</span>
            {link.external ? <ArrowUpRight aria-hidden="true" className="size-3" /> : null}
            {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const primaryLink = project.links[0]

  return (
    <article className={index > 0 ? 'border-t border-border/70 pt-12 sm:pt-16' : undefined}>
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
        <h2 className="text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
          {project.title}
        </h2>
        <ProjectLinks links={project.links} />
      </header>

      <div className="mt-5 -mr-5 [scrollbar-width:none] overflow-x-auto pr-5 pb-2 sm:-mr-8 sm:pr-8 [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max snap-x snap-mandatory gap-4">
          {project.images.map((image, imageIndex) => {
            const media = (
              <div className="group relative aspect-4/3 w-[min(78vw,17rem)] overflow-hidden rounded-xl bg-muted ring-1 ring-border/80 sm:w-72 sm:rounded-2xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  preload={index === 0 && imageIndex === 0}
                  sizes="(max-width: 639px) 78vw, 288px"
                  className={`object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none ${
                    image.position === 'top' ? 'object-top' : 'object-center'
                  }`}
                />
              </div>
            )

            return (
              <div key={image.src} className="snap-start">
                {primaryLink ? (
                  <Link
                    href={primaryLink.href}
                    target={primaryLink.external ? '_blank' : undefined}
                    rel={primaryLink.external ? 'noopener noreferrer' : undefined}
                    aria-label={`Explore ${project.title}${primaryLink.external ? ' (opens in a new tab)' : ''}`}
                    className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:rounded-2xl"
                  >
                    {media}
                  </Link>
                ) : (
                  media
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-3 max-w-[68ch]">
        <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
          {project.description}
        </p>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          {project.role} <span aria-hidden="true">·</span> {project.stack.slice(0, 3).join(' · ')}
        </p>
      </div>
    </article>
  )
}

export function ProjectsFeatured({ projects }: { projects: Project[] }) {
  return (
    <section
      aria-label="Project showcase"
      className="mx-auto max-w-4xl space-y-12 px-5 pb-16 sm:space-y-16 sm:px-8 sm:pb-20 lg:px-10"
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} />
      ))}
    </section>
  )
}
