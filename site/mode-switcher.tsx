'use client'

import { Briefcase, Code } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePortfolioMode } from '@/site/portfolio-mode-provider'

const MODES = [
  { id: 'developer' as const, label: 'Developer', icon: Code },
  { id: 'recruiter' as const, label: 'Recruiter', icon: Briefcase },
]

export function ModeSwitcher({ className }: { className?: string }) {
  const { mode, setMode } = usePortfolioMode()

  return (
    <div
      role="tablist"
      aria-label="Portfolio viewing mode"
      className={cn(
        'inline-flex items-center rounded-lg border border-border/80 bg-muted/30 p-0.5 shadow-sm ring-1 ring-foreground/5',
        className,
      )}
    >
      {MODES.map(({ id, label, icon: Icon }) => {
        const isActive = mode === id

        return (
          <Button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            variant="ghost"
            size="sm"
            onClick={() => setMode(id)}
            className={cn(
              'relative gap-1.5 rounded-md border-0 px-3 shadow-none',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground/80',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="portfolio-mode-pill"
                className="absolute inset-0 rounded-md bg-background shadow-sm ring-1 ring-border/60"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                aria-hidden
              />
            ) : null}
            <span className="relative z-10 inline-flex items-center gap-1.5">
              <Icon className="size-3.5" aria-hidden />
              {label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
