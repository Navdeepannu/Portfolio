'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { projects, type Project } from '@/data'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { portfolioProjectsMeta } from '@/site/portfolio/portfolio-content'
import { Reveal } from '@/site/portfolio/portfolio-primitives'

const featuredProjects = projects.filter((project) => project.featured)

export function PortfolioProjects() {
  return (
    <section
      id="projects"
      className="relative overflow-x-clip py-20 font-schibsted selection:bg-emerald-200/60 max-md:py-14 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8 md:px-12">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {portfolioProjectsMeta.eyebrow}
        </span>
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {portfolioProjectsMeta.title}
            </h2>
          </div>
          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{portfolioProjectsMeta.description}</p>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y border-border mask-x-from-75% dark:border-neutral-800" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x border-border mask-y-from-90% dark:border-neutral-800" />
          <div className="overflow-hidden">
            <div className="bg-foreground/4 p-2 dark:bg-neutral-800/30">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                {featuredProjects.map((project, index) => (
                  <ProjectCard key={project.slug} project={project} delay={index * 0.08} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const liveLink = project.links.find((link) => link.label.toLowerCase().includes('live'))

  return (
    <Reveal as="article" delay={delay}>
      <Card className="group h-full gap-0 rounded-xl p-2">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-sm ring-1 ring-foreground/5">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            className="object-cover object-top transition-transform duration-400 ease-out group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {liveLink ? (
            <Link
              href={liveLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0"
              aria-label={`Open ${project.title} live site`}
            />
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3 px-2 py-4">
          <div className="space-y-1.5">
            <h3 className="font-times-heading text-lg font-normal tracking-tight text-foreground">
              {project.title}
            </h3>
            <p className="text-sm text-pretty text-muted-foreground">{project.summary}</p>
          </div>

          <div className={cn('mt-auto flex flex-wrap items-center gap-2 pt-2')}>
            {liveLink ? (
              <Button asChild size="sm">
                <Link href={liveLink.href} target="_blank" rel="noopener noreferrer">
                  Live site
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            ) : null}
            <Button asChild size="sm" variant="ghost">
              <Link href="/projects">Case study</Link>
            </Button>
          </div>
        </div>
      </Card>
    </Reveal>
  )
}
