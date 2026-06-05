'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { getPortfolioContent } from '@/site/portfolio-config'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'
import { SectionShell } from '@/site/sections/section-shell'

export function ComponentsPreviewSection() {
  const { mode } = usePortfolioMode()
  const { components } = getPortfolioContent(mode)

  return (
    <SectionShell
      id="components"
      eyebrow={components.eyebrow}
      title={components.title}
      description={components.description}
    >
      <Button asChild variant="outline" size="sm">
        <Link href={components.cta.href}>{components.cta.label}</Link>
      </Button>
    </SectionShell>
  )
}
