'use client'

import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/context/portfolio-mode-provider'
import { SectionShell } from '@/site/sections/section-shell'

export function SkillsSection() {
  const { mode } = usePortfolioMode()
  const { skills } = getPortfolioContent(mode)

  return (
    <SectionShell
      id="skills"
      eyebrow={skills.eyebrow}
      title={skills.title}
      description={skills.description}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <div
            key={group.category}
            className="rounded-xl border border-border/70 bg-card p-4 ring-1 ring-foreground/5"
          >
            <h3 className="text-sm font-medium text-foreground">{group.category}</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md bg-muted/60 px-2 py-1 text-xs text-muted-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
