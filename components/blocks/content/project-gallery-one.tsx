/* eslint-disable @next/next/no-img-element */
'use client'

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'

const projects = [
  {
    title: 'Northstar',
    description: 'A product analytics workspace for focused, accountable teams.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Papertrail',
    description: 'A calm publishing system for product updates and documentation.',
    image:
      'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Orbit',
    description: 'A collaborative planning tool that keeps important work visible.',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
  },
]

export default function ProjectGalleryOne() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null)
  const activeProject = activeIndex === null ? null : projects[activeIndex]

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? 0 : (current - 1 + projects.length) % projects.length,
    )
  }, [])

  const showNext = useCallback(() => {
    setActiveIndex((current) => (current === null ? 0 : (current + 1) % projects.length))
  }, [])

  useEffect(() => {
    if (activeIndex === null) return

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
  }, [activeIndex, showNext, showPrevious])

  return (
    <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
      <section className="overflow-hidden py-16 text-foreground md:py-24">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <div className="max-w-xl">
            <p className="text-sm font-medium text-muted-foreground">Selected work</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
              A horizontal project gallery
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              Replace the sample items with your own work. Each project opens in a keyboard-friendly
              image viewer with previous, next, and close controls.
            </p>
          </div>

          <div className="mt-8 -mr-5 [scrollbar-width:none] overflow-x-auto pr-5 pb-2 sm:-mr-8 sm:pr-8 [&::-webkit-scrollbar]:hidden">
            <div className="flex w-max snap-x snap-mandatory gap-4">
              {projects.map((project, index) => (
                <article key={project.title} className="w-[min(78vw,17rem)] snap-start sm:w-72">
                  <button
                    type="button"
                    onClick={(event) => {
                      lastTriggerRef.current = event.currentTarget
                      setActiveIndex(index)
                    }}
                    aria-label={`Open ${project.title} image`}
                    className="group relative aspect-4/3 w-full overflow-hidden rounded-xl bg-muted ring-1 ring-border/80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} project preview`}
                      className="size-full object-cover"
                    />
                    <span className="absolute right-3 bottom-3 inline-flex size-8 items-center justify-center rounded-full bg-background/90 shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm">
                      <Expand aria-hidden="true" className="size-3.5" />
                    </span>
                  </button>
                  <h3 className="pt-4 text-base font-medium">{project.title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DialogContent
        showCloseButton={false}
        onCloseAutoFocus={(event) => {
          event.preventDefault()
          lastTriggerRef.current?.focus()
        }}
        className="w-[calc(100%-2rem)] max-w-5xl gap-0 border border-border/70 bg-background p-3 sm:max-w-5xl sm:p-4"
      >
        {activeProject ? (
          <>
            <DialogTitle className="sr-only">{activeProject.title}</DialogTitle>
            <DialogDescription className="sr-only">
              Use the left and right arrow keys to move through project images.
            </DialogDescription>

            <div className="relative aspect-16/10 overflow-hidden rounded-lg bg-muted sm:rounded-xl">
              <img
                src={activeProject.image}
                alt={`${activeProject.title} project preview`}
                className="size-full object-contain"
              />
              <button
                type="button"
                onClick={showPrevious}
                className="absolute top-1/2 left-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                aria-label="Previous project image"
              >
                <ChevronLeft aria-hidden="true" className="size-4" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="absolute top-1/2 right-3 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                aria-label="Next project image"
              >
                <ChevronRight aria-hidden="true" className="size-4" />
              </button>
              <DialogClose asChild>
                <button
                  type="button"
                  className="absolute top-3 right-3 inline-flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm ring-1 ring-foreground/10 backdrop-blur-sm hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  aria-label="Close project image"
                >
                  <X aria-hidden="true" className="size-4" />
                </button>
              </DialogClose>
            </div>

            <div className="flex items-center justify-between gap-4 px-1 pt-3">
              <p className="text-sm font-medium">{activeProject.title}</p>
              <p className="text-xs text-muted-foreground">
                {(activeIndex ?? 0) + 1} / {projects.length}
              </p>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}
