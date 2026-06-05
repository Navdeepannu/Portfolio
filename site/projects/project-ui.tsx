'use client'

import Link from 'next/link'
import { ArrowUpRight, CircleCheck, Lightbulb, OctagonX } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import type { CaseStudy, CaseStudySection, ProjectLink } from '@/data/projects'
import { cn } from '@/lib/utils'

export const projectsSectionClass =
  'border-t border-border/60 px-6 py-14 md:px-10 md:py-16 lg:px-12'

export const projectSurfaceClass = 'rounded-xl border border-border/60 bg-card'

export function ProjectEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-3 text-emerald-600 dark:text-emerald-400/80 block font-mono text-[0.65rem] tracking-widest  uppercase">
      {children}
    </span>
  )
}

export function ProjectReference({
  reference,
  className,
}: {
  reference: string
  className?: string
}) {
  return (
    <span
      className={cn(
        'font-mono text-[0.65rem] tracking-widest text-muted-foreground uppercase',
        className,
      )}
    >
      {reference}
    </span>
  )
}

const caseStudySections: {
  id: keyof CaseStudy
  label: string
  icon: LucideIcon
}[] = [
  { id: 'problem', label: 'Problem', icon: OctagonX },
  { id: 'solution', label: 'Solution', icon: Lightbulb },
  { id: 'outcome', label: 'Outcome', icon: CircleCheck },
]

function CaseStudyBulletList({ points }: { points: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {points.map((point) => (
        <li
          key={point}
          className="flex gap-2.5 text-xs leading-relaxed text-muted-foreground before:mt-1.5 before:size-1 before:shrink-0 before:rounded-full before:bg-border before:content-['']"
        >
          {point}
        </li>
      ))}
    </ul>
  )
}

export function CaseStudyPanel({
  caseStudy,
  className,
}: {
  caseStudy: CaseStudy
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col divide-y divide-border/80 overflow-hidden rounded-xl bg-card shadow-sm ring-1 ring-border',
        className,
      )}
    >
      {caseStudySections.map((section) => {
        const Icon = section.icon
        const content: CaseStudySection = caseStudy[section.id]

        return (
          <div key={section.id} className="flex flex-1 flex-col px-4 py-4 md:px-5 md:py-5">
            <div className="flex items-center gap-2.5">
              <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              <h4 className="text-sm font-medium text-foreground">{section.label}</h4>
            </div>
            <CaseStudyBulletList points={content.points} />
          </div>
        )
      })}
    </div>
  )
}

export function CaseStudyGrid({
  caseStudy,
  compact = false,
}: {
  caseStudy: CaseStudy
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'grid gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60',
        compact ? 'md:grid-cols-1' : 'md:grid-cols-3',
      )}
    >
      {caseStudySections.map((item) => {
        const Icon = item.icon
        const content = caseStudy[item.id]

        return (
          <div key={item.id} className="bg-card px-4 py-4 md:px-5 md:py-5">
            <div className="flex items-center gap-2">
              <Icon className="size-3.5 shrink-0 text-muted-foreground" aria-hidden />
              <p className="font-mono text-[0.6rem] tracking-widest text-muted-foreground uppercase">
                {item.label}
              </p>
            </div>
            <ul className={cn('mt-2.5 space-y-1.5', compact ? 'text-xs' : 'text-sm')}>
              {content.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-2 leading-relaxed text-foreground/85 before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:bg-border before:content-['']"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export function ProjectLinks({ links }: { links: ProjectLink[] }) {
  if (links.length === 0) return null

  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <span className="border-b border-border pb-px">{link.label}</span>
            {link.external ? (
              <ArrowUpRight className="size-3.5 opacity-50 transition-opacity group-hover:opacity-100" />
            ) : null}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function ProjectStack({ stack, limit }: { stack: string[]; limit?: number }) {
  const items = limit ? stack.slice(0, limit) : stack
  const remainder = limit && stack.length > limit ? stack.length - limit : 0

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((tech) => (
        <Badge key={tech} variant="outline" className="font-mono text-[0.6rem] font-normal">
          {tech}
        </Badge>
      ))}
      {remainder > 0 ? (
        <Badge variant="secondary" className="font-mono text-[0.6rem] font-normal">
          +{remainder}
        </Badge>
      ) : null}
    </div>
  )
}
