import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/lib/utils'

export type AnalyticsSnapshot = {
  period: {
    from: string
    to: string
    label: string
  }
  metrics: Array<{
    id: string
    label: string
    value: number | string
    change?: number
  }>
  series: Array<{
    date: string
    visitors?: number
    sessions?: number
    views?: number
  }>
  updatedAt: string
  source?: string
}

export type PublicInsightsStatus = 'ready' | 'loading' | 'empty' | 'error'
export type PublicInsightsSeriesKey = 'visitors' | 'sessions' | 'views'

export type PublicInsightsProps = Omit<ComponentPropsWithoutRef<'section'>, 'children'> & {
  snapshot?: AnalyticsSnapshot | null
  status?: PublicInsightsStatus
  title?: string
  description?: string
  seriesKey?: PublicInsightsSeriesKey
  formatMetric?: (value: number | string, id: string) => ReactNode
  formatDate?: (date: string) => string
  emptyMessage?: string
  errorMessage?: string
}

const defaultDateFormatter = new Intl.DateTimeFormat('en', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
})

function defaultFormatDate(date: string) {
  return defaultDateFormatter.format(new Date(`${date}T00:00:00Z`))
}

function getChartGeometry(snapshot: AnalyticsSnapshot, seriesKey: PublicInsightsSeriesKey) {
  const values = snapshot.series.map((point) => point[seriesKey] ?? 0)
  const maximum = Math.max(...values, 1)
  const width = 640
  const height = 180
  const points = values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width
    const y = height - (value / maximum) * (height - 12) - 6
    return { x, y }
  })
  const line = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ')
  const area = points.length > 0 ? `${line} L${width},${height} L0,${height} Z` : ''

  return { area, height, line, width }
}

function InsightsState({ children }: { children: ReactNode }) {
  return (
    <div className="mt-6 rounded-lg border border-dashed border-border bg-muted/30 px-4 py-8 text-center text-sm text-muted-foreground">
      {children}
    </div>
  )
}

export function PublicInsights({
  snapshot,
  status = snapshot ? 'ready' : 'empty',
  title = 'Public insights',
  description = 'A privacy-conscious view of aggregate product activity.',
  seriesKey = 'visitors',
  formatMetric = (value) => value.toLocaleString(),
  formatDate = defaultFormatDate,
  emptyMessage = 'No public analytics are available for this period.',
  errorMessage = 'Public analytics are temporarily unavailable.',
  className,
  ...props
}: PublicInsightsProps) {
  const effectiveStatus = status === 'ready' && !snapshot ? 'empty' : status
  const geometry = snapshot ? getChartGeometry(snapshot, seriesKey) : null

  return (
    <section
      aria-busy={effectiveStatus === 'loading'}
      aria-label={title}
      className={cn('rounded-xl border border-border/80 bg-background p-4 sm:p-6', className)}
      {...props}
    >
      <header>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{description}</p>
      </header>

      {effectiveStatus === 'loading' ? (
        <InsightsState>
          <span className="sr-only">Loading public analytics.</span>
          <span aria-hidden="true" className="inline-flex gap-2">
            <span className="h-4 w-16 animate-pulse rounded bg-muted motion-reduce:animate-none" />
            <span className="h-4 w-24 animate-pulse rounded bg-muted motion-reduce:animate-none" />
          </span>
        </InsightsState>
      ) : null}

      {effectiveStatus === 'empty' ? <InsightsState>{emptyMessage}</InsightsState> : null}
      {effectiveStatus === 'error' ? <InsightsState>{errorMessage}</InsightsState> : null}

      {effectiveStatus === 'ready' && snapshot && geometry ? (
        <>
          <dl className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(10rem,1fr))] gap-px overflow-hidden rounded-lg border border-border bg-border">
            {snapshot.metrics.map((metric) => (
              <div key={metric.id} className="min-w-0 bg-background p-4">
                <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                <dd className="mt-2 flex flex-wrap items-baseline gap-2 text-xl font-semibold tracking-[-0.025em] text-foreground tabular-nums">
                  {formatMetric(metric.value, metric.id)}
                  {metric.change !== undefined ? (
                    <span
                      className={cn(
                        'text-xs font-medium tabular-nums',
                        metric.change > 0
                          ? 'text-emerald-700 dark:text-emerald-400'
                          : metric.change < 0
                            ? 'text-rose-700 dark:text-rose-400'
                            : 'text-muted-foreground',
                      )}
                    >
                      {metric.change > 0 ? '+' : ''}
                      {metric.change.toFixed(1)}%
                      <span className="sr-only"> compared with the previous equal period</span>
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {snapshot.series.length > 0 ? (
            <div className="mt-6">
              <svg
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                role="img"
                aria-label={`${seriesKey} trend for ${snapshot.period.label}`}
                className="h-auto w-full overflow-visible text-emerald-600 dark:text-emerald-400"
              >
                <path d={geometry.area} fill="currentColor" opacity="0.08" />
                <path
                  d={geometry.line}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>

              <table className="sr-only">
                <caption>{`${seriesKey} by date for ${snapshot.period.label}`}</caption>
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">{seriesKey}</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.series.map((point) => (
                    <tr key={point.date}>
                      <th scope="row">{formatDate(point.date)}</th>
                      <td>{point[seriesKey] ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}

          <p className="mt-4 text-xs leading-5 text-muted-foreground">
            {snapshot.period.label}
            {snapshot.source ? ` · ${snapshot.source}` : ''} · Updated{' '}
            <time dateTime={snapshot.updatedAt}>{formatDate(snapshot.updatedAt.slice(0, 10))}</time>
          </p>
        </>
      ) : null}
    </section>
  )
}

export default PublicInsights
