'use client'

import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'

import { AnimatedNumber } from '@/components/animated-numbers'
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
    prefix?: string
    suffix?: string
    decimalPlaces?: number
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
  animateMetrics?: boolean
  locale?: string
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

function formatNumber(value: number, locale: string, decimalPlaces = 0, prefix = '', suffix = '') {
  return `${prefix}${new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value)}${suffix}`
}

function getChartGeometry(snapshot: AnalyticsSnapshot, seriesKey: PublicInsightsSeriesKey) {
  const values = snapshot.series.map((point) => point[seriesKey] ?? 0)
  const maximum = Math.max(...values, 1)
  const width = 640
  const height = 180
  const plotTop = 10
  const plotBottom = 164
  const points = values.map((value, index) => {
    const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width
    const y = plotBottom - (value / maximum) * (plotBottom - plotTop)
    return { x, y }
  })
  const line = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ')
  const area = points.length > 0 ? `${line} L${width},${plotBottom} L0,${plotBottom} Z` : ''

  return { area, height, line, maximum, plotBottom, plotTop, width }
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
  animateMetrics = true,
  locale = 'en-US',
  formatMetric,
  formatDate = defaultFormatDate,
  emptyMessage = 'No public analytics are available for this period.',
  errorMessage = 'Public analytics are temporarily unavailable.',
  className,
  ...props
}: PublicInsightsProps) {
  const shouldReduceMotion = useReducedMotion()
  const chartRevealId = `public-insights-reveal-${useId().replace(/:/g, '')}`
  const effectiveStatus = status === 'ready' && !snapshot ? 'empty' : status
  const geometry = snapshot ? getChartGeometry(snapshot, seriesKey) : null
  const seriesLabel =
    seriesKey === 'views' ? 'Page views' : `${seriesKey[0].toUpperCase()}${seriesKey.slice(1)}`
  const seriesPoints = snapshot?.series.map((point) => ({
    date: point.date,
    value: point[seriesKey] ?? 0,
  }))
  const peakPoint = seriesPoints?.reduce<{ date: string; value: number } | null>(
    (peak, point) => (!peak || point.value > peak.value ? point : peak),
    null,
  )
  const average = seriesPoints?.length
    ? seriesPoints.reduce((total, point) => total + point.value, 0) / seriesPoints.length
    : 0

  function renderMetricValue(metric: AnalyticsSnapshot['metrics'][number], index: number) {
    if (formatMetric) return formatMetric(metric.value, metric.id)
    if (typeof metric.value !== 'number') return metric.value

    if (!animateMetrics) {
      return formatNumber(metric.value, locale, metric.decimalPlaces, metric.prefix, metric.suffix)
    }

    return (
      <AnimatedNumber
        value={metric.value}
        prefix={metric.prefix}
        suffix={metric.suffix}
        decimalPlaces={metric.decimalPlaces}
        locale={locale}
        duration={0.75}
        delay={index * 0.06}
      />
    )
  }

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
            {snapshot.metrics.map((metric, index) => (
              <div key={metric.id} className="min-w-0 bg-background p-4">
                <dt className="text-xs text-muted-foreground">{metric.label}</dt>
                <dd className="mt-2 text-xl font-semibold tracking-[-0.025em] text-foreground tabular-nums">
                  <span>{renderMetricValue(metric, index)}</span>
                  {metric.change !== undefined ? (
                    <span className="mt-1.5 flex items-center gap-1.5 text-xs font-normal">
                      <span
                        className={cn(
                          'font-medium tabular-nums',
                          metric.change > 0
                            ? 'text-emerald-700 dark:text-emerald-400'
                            : metric.change < 0
                              ? 'text-rose-700 dark:text-rose-400'
                              : 'text-muted-foreground',
                        )}
                      >
                        {animateMetrics ? (
                          <AnimatedNumber
                            value={metric.change}
                            prefix={metric.change > 0 ? '+' : ''}
                            suffix="%"
                            decimalPlaces={1}
                            locale={locale}
                            duration={0.65}
                            delay={index * 0.06 + 0.08}
                          />
                        ) : (
                          `${metric.change > 0 ? '+' : ''}${metric.change.toFixed(1)}%`
                        )}
                      </span>
                      <span className="text-muted-foreground">vs previous period</span>
                    </span>
                  ) : null}
                </dd>
              </div>
            ))}
          </dl>

          {snapshot.series.length > 0 ? (
            <div className="mt-6 rounded-lg border border-border/80 bg-muted/20 p-3 sm:p-4">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-foreground">
                    Daily {seriesLabel.toLowerCase()}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{snapshot.period.label}</p>
                </div>
                <p className="text-xs text-muted-foreground tabular-nums">
                  Peak{' '}
                  <span className="font-medium text-foreground">
                    {animateMetrics ? (
                      <AnimatedNumber
                        value={peakPoint?.value ?? 0}
                        locale={locale}
                        duration={0.65}
                      />
                    ) : (
                      (peakPoint?.value ?? 0).toLocaleString(locale)
                    )}
                  </span>{' '}
                  {peakPoint ? `on ${formatDate(peakPoint.date)}` : ''} · Avg{' '}
                  <span className="font-medium text-foreground">
                    {animateMetrics ? (
                      <AnimatedNumber
                        value={Math.round(average)}
                        locale={locale}
                        duration={0.65}
                        delay={0.08}
                      />
                    ) : (
                      Math.round(average).toLocaleString(locale)
                    )}
                  </span>
                  /day
                </p>
              </div>

              <svg
                viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={`${seriesLabel} trend for ${snapshot.period.label}. Peak ${peakPoint?.value ?? 0}; daily average ${Math.round(average)}.`}
                className="block h-auto w-full overflow-visible text-emerald-600 dark:text-emerald-400"
              >
                <defs>
                  <clipPath id={chartRevealId} clipPathUnits="userSpaceOnUse">
                    {shouldReduceMotion ? (
                      <rect x="0" y="0" width={geometry.width} height={geometry.height} />
                    ) : (
                      <motion.rect
                        x="0"
                        y="0"
                        height={geometry.height}
                        initial={{ width: 0 }}
                        whileInView={{ width: geometry.width }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                      />
                    )}
                  </clipPath>
                </defs>
                {[
                  geometry.plotTop,
                  (geometry.plotTop + geometry.plotBottom) / 2,
                  geometry.plotBottom,
                ].map((y) => (
                  <line
                    key={y}
                    x1="0"
                    x2={geometry.width}
                    y1={y}
                    y2={y}
                    stroke="currentColor"
                    strokeDasharray="2 6"
                    opacity="0.12"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
                <g clipPath={`url(#${chartRevealId})`}>
                  {shouldReduceMotion ? (
                    <path d={geometry.area} fill="currentColor" opacity="0.09" />
                  ) : (
                    <motion.path
                      d={geometry.area}
                      fill="currentColor"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.09 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                    />
                  )}
                  <path
                    d={geometry.line}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              </svg>

              <div className="mt-2 flex items-center justify-between text-[0.7rem] text-muted-foreground">
                <time dateTime={snapshot.period.from}>{formatDate(snapshot.period.from)}</time>
                <span aria-hidden="true">
                  {seriesLabel} · 0–{geometry.maximum.toLocaleString()}
                </span>
                <time dateTime={snapshot.period.to}>{formatDate(snapshot.period.to)}</time>
              </div>

              <table className="sr-only">
                <caption>{`${seriesLabel} by date for ${snapshot.period.label}`}</caption>
                <thead>
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">{seriesLabel}</th>
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
