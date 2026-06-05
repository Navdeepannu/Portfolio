'use client'

import Link from 'next/link'
import { Download } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'
import { SectionShell } from '@/site/sections/section-shell'

export function ResumeSection() {
  const { mode } = usePortfolioMode()
  const { resume } = getPortfolioContent(mode)

  return (
    <SectionShell
      id="resume"
      eyebrow={resume.eyebrow}
      title={resume.title}
      description={resume.description}
    >
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Experience" value={resume.yearsOfExperience} />
        <StatCard label="Focus" value={resume.specialization} />
        <StatCard label="Availability" value={resume.availability} />
      </div>
      <Button asChild className="mt-6" size="sm">
        <Link href={resume.resumeHref} target="_blank" rel="noopener noreferrer">
          <Download className="size-4" aria-hidden />
          {resume.downloadLabel}
        </Link>
      </Button>
    </SectionShell>
  )
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/70 bg-card p-4 ring-1 ring-foreground/5">
      <p className="text-xs font-medium text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium text-foreground">{value}</p>
    </div>
  )
}
