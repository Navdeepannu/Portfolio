'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

import { SiNextdotjs, SiReact, SiTailwindcss, SiPostgresql, SiExpress } from 'react-icons/si'

type TechStack = {
  title: string
  icon: React.ElementType
}

const techMap: Record<string, TechStack> = {
  'Next.js': { title: 'Next.js', icon: SiNextdotjs },
  React: { title: 'React', icon: SiReact },
  TailwindCSS: { title: 'TailwindCSS', icon: SiTailwindcss },
  PostgreSQL: { title: 'PostgreSQL', icon: SiPostgresql },
  Express: { title: 'Express', icon: SiExpress },
}

interface Project {
  id: number
  title: string
  description: string
  image: string
  liveLink: string
  githubLink: string
  techStack: string[]
  label: string
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'Invora',
    description:
      'Create Professional & Beautiful Invoices in seconds, helps freelances and small businesses generate clean, branded invoices instantly.',
    liveLink: 'https://invora-rust.vercel.app/',
    githubLink: 'https://github.com/',
    image: '/projects/project-2.png',
    techStack: ['Next.js', 'React', 'TailwindCSS', 'PostgreSQL', 'Express'],
    label: 'Invora project Image',
  },
  {
    id: 2,
    title: 'CableLink Solutions',
    description: 'Full Website for CableLink solutions Company, design and Development',
    liveLink: 'https://www.cablelinksolutions.ca',
    githubLink: 'https://github.com/',
    image: '/projects/project-1.png',
    techStack: ['Next.js', 'React', 'TailwindCSS'],
    label: 'CableLink Soilutions website Image',
  },
]

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-8">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          Projects
        </span>
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading font-normal tracking-tight text-neutral-900 md:text-xl dark:text-neutral-200">
              Full Stack Projects that I worked
            </h2>
          </div>

          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>
              Reusable, production-grade UI blocks you can drop directly into real
              applications.{' '}
            </p>

            <Button className="mt-4" variant="outline" size="sm">
              View Projects
            </Button>
          </div>
        </div>
      </div>
      <div className="relative mt-8">
        <div className="pointer-events-none absolute -inset-x-32 inset-y-0 border-y mask-x-from-75% dark:border-neutral-800" />
        <div className="relative mx-auto w-full max-w-6xl px-4">
          <div className="pointer-events-none absolute inset-x-4 -inset-y-32 border-x mask-y-from-90% dark:border-neutral-800" />

          <div className="overflow-hidden">
            <div className="-mx-8 px-8">
              <div className="grid gap-4 bg-muted/50 p-2 md:grid-cols-3 dark:bg-neutral-800/30">
                {projectsData.map((project) => (
                  <CardStructure
                    key={project.id}
                    image={project.image}
                    title={project.title}
                    description={project.description}
                    id={project.id}
                    liveLink={project.liveLink}
                    githubLink={project.githubLink}
                    techStack={project.techStack}
                    label={project.label}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

type CardProps = {
  id: number
  image: string
  title: string
  description: string
  liveLink: string
  githubLink: string
  techStack: string[]
  label: string
}

const CardStructure = ({
  id,
  image,
  title,
  description,
  liveLink,
  label,
  techStack,
}: CardProps) => {
  return (
    <article
      data-category={id}
      className={cn(
        'group break-inside-avoid font-schibsted',
        'rounded-xl border bg-white/95 p-2 shadow-md ring-1 ring-gray-200 dark:border-neutral-700 dark:bg-neutral-800/60 dark:ring-neutral-600',
        'transition-shadow hover:shadow-lg hover:ring-gray-300 dark:hover:ring-neutral-500',
      )}
    >
      <Link href={liveLink} target="_blank" rel="noreferrer" className="block">
        <div className="relative flex flex-col px-2 py-1">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="max-w-md pt-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
            {description}
          </p>
          <StackAvatar stack={techStack} />
        </div>

        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-lg bg-muted/5 shadow-sm ring-1 ring-ring/5">
          <Image
            src={image}
            alt={label}
            fill
            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </Link>
    </article>
  )
}

const StackAvatar = ({ stack }: { stack: string[] }) => {
  return (
    <div className="absolute top-0 right-0 flex items-center">
      {stack.map((tech, i) => {
        const Icon = techMap[tech]?.icon
        if (!Icon) return null

        return (
          <div
            key={tech}
            className={cn(
              'flex size-6 items-center justify-center rounded-full border bg-background shadow-sm',
              i !== 0 && '-ml-2',
            )}
          >
            <Icon className="h-4 w-4" />
          </div>
        )
      })}
    </div>
  )
}
