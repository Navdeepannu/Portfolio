import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Blocks, Code2, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import {
  LuAccessibility,
  LuBoxes,
  LuBraces,
  LuDatabase,
  LuMonitorSmartphone,
  LuPalette,
  LuWaves,
} from 'react-icons/lu'
import {
  SiCss,
  SiFigma,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si'
import type { IconType } from 'react-icons'

import { Badge } from '@/components/ui/badge'
import { LandingSection } from '@/features/portfolio/sections/landing-section'
import { landingPageContent } from '@/features/portfolio/content/landing-page.content'

const capabilityIcons: Record<
  (typeof landingPageContent.capabilities)[number]['icon'],
  LucideIcon
> = {
  interface: Code2,
  systems: Blocks,
  foundations: Rocket,
}

type SkillName = (typeof landingPageContent.skillGroups)[number]['items'][number]

const skillVisuals: Record<SkillName, { Icon: IconType; className: string }> = {
  JavaScript: { Icon: SiJavascript, className: 'text-amber-600 dark:text-yellow-300' },
  TypeScript: { Icon: SiTypescript, className: 'text-[#3178C6] dark:text-blue-400' },
  React: { Icon: SiReact, className: 'text-[#087EA4] dark:text-[#61DAFB]' },
  'Next.js': { Icon: SiNextdotjs, className: 'text-foreground' },
  HTML: { Icon: SiHtml5, className: 'text-[#D84924] dark:text-[#F06529]' },
  CSS: { Icon: SiCss, className: 'text-[#1572B6] dark:text-blue-400' },
  'Tailwind CSS': { Icon: SiTailwindcss, className: 'text-cyan-600 dark:text-cyan-400' },
  'shadcn/ui': { Icon: SiShadcnui, className: 'text-foreground' },
  Motion: { Icon: LuWaves, className: 'text-violet-600 dark:text-violet-400' },
  'Responsive design': {
    Icon: LuMonitorSmartphone,
    className: 'text-sky-600 dark:text-sky-400',
  },
  Accessibility: {
    Icon: LuAccessibility,
    className: 'text-indigo-600 dark:text-indigo-400',
  },
  'Component architecture': {
    Icon: LuBoxes,
    className: 'text-fuchsia-600 dark:text-fuchsia-400',
  },
  'Design systems': { Icon: LuPalette, className: 'text-rose-600 dark:text-rose-400' },
  'Node.js': { Icon: SiNodedotjs, className: 'text-green-700 dark:text-green-400' },
  'REST APIs': { Icon: LuBraces, className: 'text-orange-600 dark:text-orange-400' },
  PostgreSQL: { Icon: SiPostgresql, className: 'text-[#336791] dark:text-blue-400' },
  SQL: { Icon: LuDatabase, className: 'text-amber-700 dark:text-amber-400' },
  Prisma: { Icon: SiPrisma, className: 'text-foreground' },
  Figma: { Icon: SiFigma, className: 'text-[#A259FF] dark:text-fuchsia-400' },
  Git: { Icon: SiGit, className: 'text-[#E44C30] dark:text-orange-400' },
  GitHub: { Icon: SiGithub, className: 'text-foreground' },
  Vercel: { Icon: SiVercel, className: 'text-foreground' },
}

export function CapabilitiesSection() {
  return (
    <LandingSection id="capabilities" label="Skills & tools">
      <dl className="grid max-w-4xl gap-x-10 gap-y-12 md:grid-cols-3 md:gap-y-10">
        {landingPageContent.capabilities.map((capability) => {
          const Icon = capabilityIcons[capability.icon]

          return (
            <div key={capability.title} className="min-w-0">
              <dt className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground shadow-xs ring-1 ring-border dark:ring-ring">
                  <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                </span>
                {capability.title}
              </dt>

              <dd className="mt-4 text-sm leading-6 text-muted-foreground">
                <p>{capability.description}</p>

                {capability.preview ? (
                  <Link
                    href={capability.preview.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${capability.preview.label} (opens in a new tab)`}
                    className="group mt-5 inline-flex max-w-full items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-foreground active:scale-[0.98]"
                  >
                    <span className="relative aspect-4/3 w-20 shrink-0 overflow-hidden rounded-md bg-muted ring-1 ring-border/80">
                      <Image
                        src={capability.preview.src}
                        alt={capability.preview.alt}
                        fill
                        sizes="80px"
                        className="object-cover object-top transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.01] motion-reduce:transform-none motion-reduce:transition-none"
                      />
                    </span>
                    <span className="min-w-0 text-xs font-medium text-muted-foreground transition-colors duration-150 group-hover:text-foreground">
                      <span className="border-b border-dotted border-current/55 pb-px">
                        {capability.preview.label}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="ml-0.5 inline size-3 align-[-0.1em]"
                      />
                    </span>
                  </Link>
                ) : null}
              </dd>
            </div>
          )
        })}
      </dl>

      <div className="mt-12 grid gap-x-10 gap-y-8 border-t border-border/70 pt-8 sm:grid-cols-2">
        {landingPageContent.skillGroups.map((group) => (
          <section key={group.title} aria-labelledby={`skill-${group.title.replaceAll(' ', '-')}`}>
            <h3
              id={`skill-${group.title.replaceAll(' ', '-')}`}
              className="text-sm font-medium text-foreground"
            >
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((skill) => {
                const { Icon, className } = skillVisuals[skill]

                return (
                  <li key={skill}>
                    <Badge
                      variant="outline"
                      className="h-7 gap-1.5 rounded-md border-border/70 bg-muted/30 px-2.5 text-[0.8125rem] font-medium text-foreground shadow-xs dark:bg-muted/20"
                    >
                      <Icon
                        data-icon="inline-start"
                        className={`size-3.5! shrink-0 ${className}`}
                        aria-hidden="true"
                      />
                      {skill}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </LandingSection>
  )
}
