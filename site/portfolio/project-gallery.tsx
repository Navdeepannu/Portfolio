'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { IconType } from 'react-icons'
import { SiNextdotjs, SiReact, SiShadcnui, SiTailwindcss, SiTypescript } from 'react-icons/si'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import type { LandingLink, LandingProject } from '@/site/portfolio/landing-page-content'

type ProjectGalleryProps = {
  projects: readonly LandingProject[]
  showDetails?: boolean
}

type ActiveImage = {
  projectIndex: number
  imageIndex: number
}

type TechnologyLogo = {
  Icon: IconType
  className: string
}

type ProjectImageProps = {
  image: LandingProject['images'][number]
  sizes: string
  preload?: boolean
}

const technologyLogos: Record<string, TechnologyLogo> = {
  'Next.js': {
    Icon: SiNextdotjs,
    className: 'text-foreground',
  },
  React: {
    Icon: SiReact,
    className: 'text-[#61DAFB]',
  },
  TypeScript: {
    Icon: SiTypescript,
    className: 'text-[#3178C6]',
  },
  'Tailwind CSS': {
    Icon: SiTailwindcss,
    className: 'text-[#06B6D4]',
  },
  'shadcn/ui': {
    Icon: SiShadcnui,
    className: 'text-foreground',
  },
}

function ProjectImage({ image, sizes, preload = false }: ProjectImageProps) {
  const positionClassName = image.position === 'top' ? 'object-top' : 'object-center'
  const className = `object-contain ${positionClassName}`

  if (!image.darkSrc) {
    return (
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        preload={preload}
        sizes={sizes}
        className={className}
      />
    )
  }

  return (
    <>
      <Image
        src={image.src}
        alt=""
        aria-hidden="true"
        fill
        loading={preload ? 'eager' : 'lazy'}
        fetchPriority={preload ? 'high' : undefined}
        sizes={sizes}
        className={`${className} dark:hidden`}
      />
      <Image
        src={image.darkSrc}
        alt=""
        aria-hidden="true"
        fill
        loading={preload ? 'eager' : 'lazy'}
        fetchPriority={preload ? 'high' : undefined}
        sizes={sizes}
        className={`hidden ${className} dark:block`}
      />
    </>
  )
}

function ProjectTechStack({
  projectTitle,
  stack,
  shouldReduceMotion,
}: {
  projectTitle: string
  stack: string[]
  shouldReduceMotion: boolean
}) {
  const technologies = stack.flatMap((label) => {
    const logo = technologyLogos[label]
    return logo ? [{ ...logo, label }] : []
  })

  if (technologies.length === 0) return null

  return (
    <ul
      aria-label={`Technologies used for ${projectTitle}`}
      className="project-tech-stack isolate flex shrink-0 items-center pl-1"
    >
      {technologies.map(({ label, Icon, className }, index) => (
        <li key={label} className={index > 0 ? '-ml-2.5' : undefined}>
          <motion.span
            title={label}
            whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.05 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="relative flex size-8 origin-center items-center justify-center rounded-full border border-border/80 bg-background shadow-sm ring-1 ring-background hover:z-10 sm:size-9"
          >
            <Icon aria-hidden="true" className={`size-4 sm:size-4.5 ${className}`} />
            <span className="sr-only">{label}</span>
          </motion.span>
        </li>
      ))}
    </ul>
  )
}

function ProjectLinks({ links }: { links: readonly LandingLink[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-0.5">
      {links.map((link, index) => (
        <li key={link.label}>
          <Link
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className={`group inline-flex min-h-11 items-center gap-0.5 text-sm font-medium transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}
          >
            <span className="border-b border-dotted border-current/55 pb-px">{link.label}</span>
            {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ProjectGallery({ projects, showDetails = true }: ProjectGalleryProps) {
  const shouldReduceMotion = useReducedMotion() ?? false
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const activeProject = activeImage ? projects[activeImage.projectIndex] : null
  const activeProjectImage = activeProject
    ? activeProject.images[activeImage?.imageIndex ?? 0]
    : null

  const showPrevious = useCallback(() => {
    setActiveImage((current) => {
      if (!current) return null

      const imageCount = projects[current.projectIndex]?.images.length ?? 0
      if (imageCount === 0) return null

      return {
        projectIndex: current.projectIndex,
        imageIndex: (current.imageIndex - 1 + imageCount) % imageCount,
      }
    })
  }, [projects])

  const showNext = useCallback(() => {
    setActiveImage((current) => {
      if (!current) return null

      const imageCount = projects[current.projectIndex]?.images.length ?? 0
      if (imageCount === 0) return null

      return {
        projectIndex: current.projectIndex,
        imageIndex: (current.imageIndex + 1) % imageCount,
      }
    })
  }, [projects])

  useEffect(() => {
    if (!activeImage) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        showPrevious()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        showNext()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage, showNext, showPrevious])

  if (projects.length === 0) return null

  return (
    <Dialog
      open={activeImage !== null}
      onOpenChange={(open) => {
        if (!open) setActiveImage(null)
      }}
    >
      <div className="mt-8 space-y-12 sm:space-y-16">
        {projects.map((project, projectIndex) => (
          <article
            key={project.title}
            className={projectIndex > 0 ? 'border-t border-border/70 pt-12 sm:pt-16' : undefined}
          >
            <header className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-x-6">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{project.category}</p>
                <h3 className="mt-1.5 text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
                  {project.title}
                </h3>
              </div>
              <ProjectLinks links={project.links} />
            </header>

            <div
              role="region"
              aria-label={`${project.title} media gallery`}
              tabIndex={0}
              className="mt-5 -mr-5 touch-pan-x scroll-px-1 overflow-x-auto overscroll-x-contain rounded-xl pt-1 pr-5 pb-2 pl-1 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:-mr-8 sm:pr-8 lg:mr-0 lg:w-[calc(50vw+25.5rem)] lg:pr-0 lg:pb-3 [&::-webkit-scrollbar]:hidden"
            >
              <div className="flex w-max snap-x snap-mandatory gap-4 lg:gap-5">
                {project.images.map((image, imageIndex) => (
                  <div key={image.src} className="snap-start">
                    <button
                      type="button"
                      onClick={(event) => {
                        lastTriggerRef.current = event.currentTarget
                        setActiveImage({ projectIndex, imageIndex })
                      }}
                      aria-label={`${image.alt}. Open image ${imageIndex + 1} of ${project.images.length}.`}
                      className="group relative aspect-16/10 w-[min(82vw,20rem)] rounded-xl bg-muted/60 p-1 shadow-sm ring-1 ring-foreground/5 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 hover:scale-[1.005] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transform-none motion-reduce:transition-none sm:w-[min(46vw,22rem)] sm:rounded-2xl lg:w-[min(46vw,29rem)]"
                    >
                      <span className="relative block size-full overflow-hidden rounded-lg bg-background sm:rounded-xl">
                        <ProjectImage
                          image={image}
                          preload={projectIndex === 0 && imageIndex === 0}
                          sizes="(max-width: 639px) 82vw, (max-width: 767px) 46vw, (max-width: 1023px) 352px, 464px"
                        />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {showDetails ? (
              <dl className="mt-4 grid gap-4 text-sm leading-6 sm:grid-cols-3">
                <div>
                  <dt className="font-medium text-foreground">Problem</dt>
                  <dd className="mt-1 text-muted-foreground">{project.problem}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">My contribution</dt>
                  <dd className="mt-1 text-muted-foreground">{project.contribution}</dd>
                </div>
                <div>
                  <dt className="font-medium text-foreground">Outcome</dt>
                  <dd className="mt-1 text-muted-foreground">{project.outcome}</dd>
                </div>
              </dl>
            ) : null}

            <div className="mt-5 flex items-center gap-4">
              <ProjectTechStack
                projectTitle={project.title}
                stack={project.stack}
                shouldReduceMotion={shouldReduceMotion}
              />
              <p className="text-xs leading-5 text-muted-foreground">{project.stack.join(' · ')}</p>
            </div>
          </article>
        ))}
      </div>

      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          lastTriggerRef.current?.focus()
        }}
        className="w-[calc(100%-2rem)] max-w-5xl gap-0 border-0 p-0 ring-0 sm:max-w-5xl"
      >
        {activeProject && activeProjectImage && activeImage ? (
          <>
            <DialogTitle className="sr-only">{activeProject.title}</DialogTitle>
            <DialogDescription className="sr-only">
              {activeProjectImage.alt}. Use the left and right arrow keys to move between images for
              this project.
            </DialogDescription>

            <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-muted shadow-md ring-1 ring-foreground/5.5 sm:rounded-xl">
              <ProjectImage
                image={activeProjectImage}
                sizes="(max-width: 1024px) calc(100vw - 4rem), 1024px"
              />

              {activeProject.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="absolute top-1/2 left-3 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-[background-color,transform] duration-100 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.97]"
                    aria-label="Previous project image"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute top-1/2 right-3 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-[background-color,transform] duration-100 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.97]"
                    aria-label="Next project image"
                  >
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </>
              ) : null}

              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute top-3 right-3 inline-flex size-11 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  aria-label="Close project image"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </DialogClose>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
