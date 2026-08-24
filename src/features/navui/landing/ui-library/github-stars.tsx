'use client'

import type { ComponentProps } from 'react'
import { IconBrandGithub } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

type ButtonProps = ComponentProps<typeof Button>

export type GitHubStarsProps = {
  repo: string
  stargazersCount: number | null
  label?: string
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  className?: string
  showTooltip?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export function GitHubStars({
  repo,
  stargazersCount,
  label,
  variant = 'ghost',
  size = 'default',
  className,
  showTooltip = true,
  onClick,
}: GitHubStarsProps) {
  const hasCount = stargazersCount !== null
  const compactStars = hasCount
    ? new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' })
        .format(stargazersCount)
        .toLowerCase()
    : null
  const formattedStars = hasCount ? new Intl.NumberFormat('en-US').format(stargazersCount) : null
  const starLabel = stargazersCount === 1 ? 'star' : 'stars'

  const link = (
    <Button
      className={cn(
        label && hasCount ? 'gap-0 overflow-hidden pr-0' : 'gap-1.5',
        !label && hasCount && 'pr-2',
        className,
      )}
      variant={variant}
      size={size}
      asChild
    >
      <a
        href={`https://github.com/${repo}`}
        className="ph-no-capture"
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        aria-label={
          hasCount
            ? `${repo} on GitHub, ${formattedStars} ${starLabel} (opens in a new tab)`
            : `${repo} on GitHub (opens in a new tab)`
        }
      >
        <IconBrandGithub aria-hidden="true" className="size-4 shrink-0" />
        {label ? <span>{label}</span> : null}
        {hasCount ? (
          <span
            className={cn(
              'text-[0.8125rem]/none text-muted-foreground tabular-nums',
              label &&
                'ml-2 inline-flex h-full items-center pr-3 before:mr-3 before:h-4 before:w-px before:bg-border',
            )}
          >
            {compactStars}
          </span>
        ) : null}
      </a>
    </Button>
  )

  if (!showTooltip || !hasCount) return link

  return (
    <Tooltip>
      <TooltipTrigger asChild>{link}</TooltipTrigger>
      <TooltipContent className="tabular-nums">
        {formattedStars} {starLabel}
      </TooltipContent>
    </Tooltip>
  )
}
