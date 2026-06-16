'use client'

import { Briefcase, Code } from 'lucide-react'
import { motion } from 'motion/react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { usePortfolioMode } from './context/portfolio-mode-provider'

const MODES = [
  { id: 'developer' as const, label: 'Developer', icon: Code },
  { id: 'recruiter' as const, label: 'Recruiter', icon: Briefcase },
]

export function ModeSwitcher({ className }: { className?: string }) {
  const { mode, setMode, isTransitioning } = usePortfolioMode()

  return (
    <div
      role="tablist"
      aria-label="Portfolio viewing mode"
      className={cn(
        'inline-flex items-center gap-0.5 rounded-2xl border border-border/80 bg-muted/90 p-0.5 shadow-sm ring-1 ring-foreground/6.5',
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
            disabled={isTransitioning}
            aria-disabled={isTransitioning}
            aria-selected={isActive}
            variant="ghost"
            size="xs"
            onClick={() => setMode(id)}
            className={cn(
              'relative gap-1.5 rounded-xl border-0 bg-transparent px-3 shadow-none transition-colors duration-200 ease-out',
              isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
            )}
          >
            {isActive ? (
              <motion.span
                layoutId="portfolio-mode-pill"
                className="absolute inset-0 rounded-xl bg-card shadow-xs ring-1 shadow-foreground/5 ring-foreground/6.5"
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 32,
                }}
                aria-hidden="true"
              />
            ) : null}

            <span className="relative z-10 inline-flex items-center gap-1.5">
              <Icon className="size-3" aria-hidden="true" />
              {label}
            </span>
          </Button>
        )
      })}
    </div>
  )
}
