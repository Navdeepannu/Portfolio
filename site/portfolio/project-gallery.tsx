'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { motion, useReducedMotion, Variants } from 'motion/react'
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
import { AnimatedGroup } from '@/components/ui/components/animated-group'

type ProjectGalleryProps = {
  projects: readonly LandingProject[]
}

type ActiveImage = {
  projectIndex: number
  imageIndex: number
}

type TechnologyLogo = {
  Icon: IconType
  className: string
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
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group inline-flex min-h-11 items-center gap-0.5 text-sm font-medium text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground"
          >
            <span className="border-b border-dotted border-current/55 pb-px">{link.label}</span>
            {link.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ProjectGallery({ projects }: ProjectGalleryProps) {
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

  const transitionVariants = {
    container: {
      hidden: {},
      visible: {
        transition: {
          delayChildren: 0.08,
          staggerChildren: 0.1,
        },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(8px)',
        y: 8,
      },
      visible: {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        transition: {
          type: 'spring',
          duration: 1.25,
          ease: [0.22, 1, 0.36, 1],
          delay: 0.35,
        },
      },
    },
  } satisfies {
    container: Variants
    item: Variants
  }

  return (
    <Dialog
      open={activeImage !== null}
      onOpenChange={(open) => {
        if (!open) setActiveImage(null)
      }}
    >
      <div className="mt-7 space-y-12 sm:space-y-16">
        {projects.map((project, projectIndex) => (
          <article
            key={project.title}
            className={projectIndex > 0 ? 'border-t border-border/70 pt-12 sm:pt-16' : undefined}
          >
            <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
              <h3 className="text-lg font-medium tracking-[-0.02em] text-foreground sm:text-xl">
                {project.title}
              </h3>
              <ProjectLinks links={project.links} />
            </header>

            <div className="mt-5 -mr-5 [scrollbar-width:none] overflow-x-auto overscroll-x-contain pr-5 pb-2 sm:-mr-8 sm:pr-8 lg:mr-0 lg:w-[calc(50vw+25.5rem)] lg:pr-0 lg:pb-3 [&::-webkit-scrollbar]:hidden">
              <div className="flex w-max snap-x snap-mandatory gap-4 lg:gap-5">
                {project.images.map((image, imageIndex) => (
                  <div key={image.src} className="snap-start">
                    <button
                      type="button"
                      onClick={(event) => {
                        lastTriggerRef.current = event.currentTarget
                        setActiveImage({ projectIndex, imageIndex })
                      }}
                      aria-label={`Open ${project.title} image ${imageIndex + 1} of ${project.images.length}`}
                      className="group relative aspect-4/3 w-[min(82vw,20rem)] overflow-hidden rounded-xl bg-muted ring-1 ring-border/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground sm:w-[min(46vw,22rem)] sm:rounded-2xl lg:w-[min(46vw,29rem)]"
                    >
                      <span className="absolute inset-0">
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          preload={projectIndex === 0 && imageIndex === 0}
                          sizes="(max-width: 639px) 82vw, (max-width: 767px) 46vw, (max-width: 1023px) 352px, 464px"
                          className={`object-cover transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none ${
                            image.position === 'top' ? 'object-top' : 'object-center'
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 max-w-[68ch]">
              <p className="text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                {project.description}
              </p>
              <div className="mt-3 grid items-center gap-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-4">
                <ProjectTechStack
                  projectTitle={project.title}
                  stack={project.stack}
                  shouldReduceMotion={shouldReduceMotion}
                />
                <p className="max-w-[58ch] text-sm leading-6 text-muted-foreground">
                  {project.contribution}
                </p>
              </div>
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
              Use the left and right arrow keys to move between images for this project.
            </DialogDescription>

            <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-muted shadow-md ring-1 ring-foreground/5.5 sm:rounded-xl">
              <Image
                src={activeProjectImage.src}
                alt={activeProjectImage.alt}
                fill
                sizes="(max-width: 1024px) calc(100vw - 4rem), 1024px"
                className="object-contain"
              />

              {activeProject.images.length > 1 ? (
                <>
                  <button
                    type="button"
                    onClick={showPrevious}
                    className="absolute top-1/2 left-3 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-colors duration-100 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.95] active:transition-all"
                    aria-label="Previous project image"
                  >
                    <ChevronLeft aria-hidden="true" className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={showNext}
                    className="avtive:transition-all absolute top-1/2 right-3 inline-flex size-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-colors duration-100 hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.95]"
                    aria-label="Next project image"
                  >
                    <ChevronRight aria-hidden="true" className="size-4" />
                  </button>
                </>
              ) : null}

              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
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
