'use client'

import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react'

import { cn } from '@/lib/utils'

export type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type ContributionGraphData = {
  days: readonly ContributionDay[]
  total: number
  from: string
  to: string
}

export type ContributionGraphProps = Omit<ComponentPropsWithoutRef<'figure'>, 'children'> & {
  data: ContributionGraphData
  emptyMessage?: string
}

const levelClassNames = [
  'bg-muted/70 ring-border/60',
  'bg-foreground/15 ring-foreground/10',
  'bg-foreground/30 ring-foreground/15',
  'bg-foreground/55 ring-foreground/20',
  'bg-foreground/80 ring-foreground/25',
] as const

const dateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})
const monthFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  timeZone: 'UTC',
})

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`))
}

function getMonthLabels(days: readonly ContributionDay[]) {
  return days.reduce<Array<{ key: string; label: string; week: number }>>((labels, day, index) => {
    const key = day.date.slice(0, 7)

    if (labels.at(-1)?.key === key) return labels

    const nextLabel = {
      key,
      label: monthFormatter.format(new Date(`${day.date}T00:00:00Z`)),
      week: Math.floor(index / 7),
    }

    if (labels.at(-1)?.week === nextLabel.week) {
      labels[labels.length - 1] = nextLabel
    } else {
      labels.push(nextLabel)
    }

    return labels
  }, [])
}

function handleDayKeyDown(
  event: KeyboardEvent<HTMLButtonElement>,
  index: number,
  dayCount: number,
) {
  const movementByKey: Partial<Record<string, number>> = {
    ArrowDown: 1,
    ArrowLeft: -7,
    ArrowRight: 7,
    ArrowUp: -1,
    End: dayCount - 1 - index,
    Home: -index,
  }
  const movement = movementByKey[event.key]

  if (movement === undefined) return

  event.preventDefault()

  const nextIndex = Math.min(dayCount - 1, Math.max(0, index + movement))
  const grid = event.currentTarget.closest('[data-contribution-grid]')
  const nextDay = grid?.querySelector<HTMLButtonElement>(`[data-contribution-day="${nextIndex}"]`)

  if (!nextDay) return

  grid?.querySelector<HTMLButtonElement>('[tabindex="0"]')?.setAttribute('tabindex', '-1')
  nextDay.tabIndex = 0
  nextDay.focus()
}

export function ContributionGraph({
  data,
  emptyMessage = 'No contribution data is available for this period.',
  className,
  ...props
}: ContributionGraphProps) {
  const summary = `${data.total.toLocaleString()} contributions from ${formatDate(data.from)} to ${formatDate(data.to)}.`
  const monthLabels = getMonthLabels(data.days)
  const weekCount = Math.ceil(data.days.length / 7)

  return (
    <figure className={cn('min-w-0 bg-background', className)} {...props}>
      {data.days.length > 0 ? (
        <>
          <div className="overflow-x-clip rounded-md pt-4 pb-1">
            <div className="relative left-full w-max -translate-x-full sm:left-1/2 sm:-translate-x-1/2">
              <div
                aria-hidden="true"
                className="mb-2 grid h-4 gap-0.75 text-[0.7rem] leading-4 text-muted-foreground"
                style={{ gridTemplateColumns: `repeat(${weekCount}, 0.625rem)` }}
              >
                {monthLabels.map((month) => (
                  <span key={month.key} style={{ gridColumnStart: month.week + 1 }}>
                    {month.label}
                  </span>
                ))}
              </div>

              <ol
                data-contribution-grid
                aria-label={`${summary} The latest days remain visible on narrow screens. Use the arrow keys to review individual days.`}
                className="grid w-max grid-flow-col grid-rows-7 gap-0.75"
              >
                {data.days.map((day, index) => {
                  const label = `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(day.date)}`

                  return (
                    <li key={day.date} className="relative size-2.5">
                      <button
                        type="button"
                        tabIndex={index === data.days.length - 1 ? 0 : -1}
                        data-contribution-day={index}
                        aria-label={label}
                        onKeyDown={(event) => handleDayKeyDown(event, index, data.days.length)}
                        className={cn(
                          'group relative block size-2.5 rounded-xs ring-1 transition-shadow duration-150 outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none',
                          levelClassNames[day.level],
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-0 bottom-[calc(100%+0.5rem)] z-20 hidden w-max max-w-52 rounded-md bg-foreground px-2.5 py-1.5 text-left text-xs leading-4 font-medium text-background shadow-sm group-hover:block group-focus-visible:block"
                        >
                          {label}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          <div className="mt-3 flex flex-col items-start gap-2 text-[0.7rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span>{summary}</span>
            <div aria-label="Contribution intensity legend" className="flex items-center gap-1.5">
              <span>Less</span>
              {levelClassNames.map((levelClassName, level) => (
                <span
                  key={level}
                  aria-label={`Level ${level}`}
                  className={cn('size-2.5 rounded-xs ring-1', levelClassName)}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      ) : (
        <p className="mt-5 rounded-lg bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
          {emptyMessage}
        </p>
      )}
    </figure>
  )
}

export default ContributionGraph
