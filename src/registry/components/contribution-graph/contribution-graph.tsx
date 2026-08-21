'use client'

import type { ComponentPropsWithoutRef, KeyboardEvent } from 'react'

import { cn } from '@/lib/utils'

export type ContributionDay = {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export type ContributionInputDay = Omit<ContributionDay, 'level'> & {
  level?: ContributionDay['level']
}

export type ContributionGraphData = {
  days: readonly ContributionInputDay[]
  total?: number
  from?: string
  to?: string
  source?: string
}

export type NormalizedContributionGraphData = {
  days: readonly ContributionDay[]
  total: number
  from: string
  to: string
  source?: string
}

export type ContributionGraphProps = Omit<ComponentPropsWithoutRef<'figure'>, 'children'> & {
  data: ContributionGraphData
  title?: string
  description?: string
  showHeader?: boolean
  emptyMessage?: string
}

const levelClassNames = [
  'bg-muted/55',
  'bg-foreground/20',
  'bg-foreground/40',
  'bg-foreground/65',
  'bg-foreground',
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

function toDateString(timestamp: number) {
  return new Date(timestamp).toISOString().slice(0, 10)
}

function getDerivedLevel(count: number, maximum: number): ContributionDay['level'] {
  if (count <= 0) return 0
  return Math.min(4, Math.max(1, Math.ceil((count / Math.max(maximum, 1)) * 4))) as 1 | 2 | 3 | 4
}

/**
 * Turns provider data shaped as `{ date, count }` into a complete daily calendar.
 * Missing dates are filled with zeroes and intensity levels are derived when omitted.
 */
export function createContributionGraphData(
  inputDays: readonly ContributionInputDay[],
  options: { source?: string } = {},
): NormalizedContributionGraphData {
  const countsByDate = new Map<string, ContributionInputDay>()

  for (const day of inputDays) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(day.count)) continue

    const previous = countsByDate.get(day.date)
    const count = Math.max(0, Math.round(day.count)) + (previous?.count ?? 0)
    countsByDate.set(day.date, {
      date: day.date,
      count,
      level:
        day.level === undefined && previous?.level === undefined
          ? undefined
          : (Math.max(day.level ?? 0, previous?.level ?? 0) as ContributionDay['level']),
    })
  }

  const dates = [...countsByDate.keys()].sort()

  if (dates.length === 0) {
    return { days: [], total: 0, from: '', to: '', ...options }
  }

  const from = dates[0]
  const to = dates.at(-1) ?? from
  const fromTimestamp = Date.parse(`${from}T00:00:00Z`)
  const toTimestamp = Date.parse(`${to}T00:00:00Z`)
  const maximum = Math.max(...[...countsByDate.values()].map((day) => day.count), 1)
  const days: ContributionDay[] = []

  for (let timestamp = fromTimestamp; timestamp <= toTimestamp; timestamp += 86_400_000) {
    const date = toDateString(timestamp)
    const input = countsByDate.get(date)
    const count = input?.count ?? 0

    days.push({
      date,
      count,
      level: input?.level ?? getDerivedLevel(count, maximum),
    })
  }

  return {
    days,
    total: days.reduce((total, day) => total + day.count, 0),
    from,
    to,
    ...options,
  }
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
  title = 'Contribution activity',
  description,
  showHeader = true,
  emptyMessage = 'No contribution data is available for this period.',
  className,
  ...props
}: ContributionGraphProps) {
  const normalizedData = createContributionGraphData(data.days, { source: data.source })
  const graphData: NormalizedContributionGraphData = {
    ...normalizedData,
    total: data.total ?? normalizedData.total,
    from: data.from ?? normalizedData.from,
    to: data.to ?? normalizedData.to,
  }
  const summary =
    graphData.days.length > 0
      ? `${graphData.total.toLocaleString()} contributions from ${formatDate(graphData.from)} to ${formatDate(graphData.to)}.`
      : ''
  const monthLabels = getMonthLabels(graphData.days)
  const weekCount = Math.ceil(graphData.days.length / 7)

  return (
    <figure
      className={cn(
        'min-w-0 rounded-xl border border-border/80 bg-background p-4 sm:p-5',
        className,
      )}
      {...props}
    >
      {graphData.days.length > 0 ? (
        <>
          {showHeader ? (
            <figcaption className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{title}</p>
                {description ? (
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
                ) : null}
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="text-xl font-semibold tracking-[-0.025em] text-foreground tabular-nums">
                  {graphData.total.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">total contributions</p>
              </div>
            </figcaption>
          ) : (
            <figcaption className="sr-only">{summary}</figcaption>
          )}

          <div className={cn('overflow-x-clip rounded-md pb-1', showHeader && 'mt-5')}>
            <div className="relative left-full w-max -translate-x-full sm:left-1/2 sm:-translate-x-1/2">
              <div
                aria-hidden="true"
                className="mb-2 grid h-4 gap-0.5 text-[0.7rem] leading-4 text-muted-foreground"
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
                className="grid w-max grid-flow-col grid-rows-7 gap-0.5"
              >
                {graphData.days.map((day, index) => {
                  const label = `${day.count} ${day.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(day.date)}`

                  return (
                    <li key={day.date} className="relative size-2.5">
                      <button
                        type="button"
                        tabIndex={index === graphData.days.length - 1 ? 0 : -1}
                        data-contribution-day={index}
                        aria-label={label}
                        onKeyDown={(event) => handleDayKeyDown(event, index, graphData.days.length)}
                        className={cn(
                          'group relative block size-2.5 rounded-[2px] transition-shadow duration-150 outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none',
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
            <span>
              {formatDate(graphData.from)}–{formatDate(graphData.to)}
              {graphData.source ? ` · ${graphData.source}` : ''}
              <span className="sr-only">. {summary}</span>
            </span>
            <div aria-label="Contribution intensity legend" className="flex items-center gap-1.5">
              <span>Less</span>
              {levelClassNames.map((levelClassName, level) => (
                <span
                  key={level}
                  aria-label={`Level ${level}`}
                  className={cn('size-2.5 rounded-[2px]', levelClassName)}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <figcaption>
            <p className="text-sm font-medium text-foreground">{title}</p>
            {description ? (
              <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
            ) : null}
          </figcaption>
          <p className="mt-5 rounded-lg bg-muted/50 px-4 py-5 text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        </>
      )}
    </figure>
  )
}

export default ContributionGraph
