'use client'

import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'
import { SectionShell } from '@/site/sections/section-shell'

export function ExperienceSection() {
  const { mode } = usePortfolioMode()
  const { experience } = getPortfolioContent(mode)

  return (
    <SectionShell
      id="experience"
      eyebrow={experience.eyebrow}
      title={experience.title}
      description={experience.description}
    >
      <ol className="space-y-4">
        {experience.items.map((item) => (
          <li
            key={`${item.company}-${item.period}`}
            className="rounded-xl border border-border/70 bg-card p-5 ring-1 ring-foreground/5"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-sm font-medium text-foreground">{item.role}</h3>
              <span className="text-xs text-muted-foreground">{item.period}</span>
            </div>
            <p className="mt-1 text-xs font-medium text-emerald-700 dark:text-emerald-400/90">
              {item.company}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  )
}
