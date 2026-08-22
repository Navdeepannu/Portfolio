import 'server-only'

import type { AnalyticsSnapshot } from '@/features/portfolio/analytics/public-insights'

type VercelAnalyticsRow = {
  timestamp: string
  pageviews: number
  visitors: number
}

type VercelAnalyticsResponse = {
  data?: unknown
}

type DateRange = {
  since: string
  until: string
}

const DAY_IN_MS = 86_400_000
const REPORTING_DAYS = 28

function toDateString(date: Date) {
  return date.toISOString().slice(0, 10)
}

function getEqualDateRanges(now = new Date()): { current: DateRange; previous: DateRange } {
  const currentEnd = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()))
  const currentStart = new Date(currentEnd.getTime() - (REPORTING_DAYS - 1) * DAY_IN_MS)
  const previousEnd = new Date(currentStart.getTime() - DAY_IN_MS)
  const previousStart = new Date(previousEnd.getTime() - (REPORTING_DAYS - 1) * DAY_IN_MS)

  return {
    current: { since: toDateString(currentStart), until: toDateString(currentEnd) },
    previous: { since: toDateString(previousStart), until: toDateString(previousEnd) },
  }
}

function isAnalyticsRow(value: unknown): value is VercelAnalyticsRow {
  if (!value || typeof value !== 'object') return false

  const row = value as Record<string, unknown>
  return (
    typeof row.timestamp === 'string' &&
    typeof row.pageviews === 'number' &&
    Number.isFinite(row.pageviews) &&
    typeof row.visitors === 'number' &&
    Number.isFinite(row.visitors)
  )
}

function parseRows(payload: VercelAnalyticsResponse) {
  if (!Array.isArray(payload.data) || !payload.data.every(isAnalyticsRow)) {
    throw new Error('Vercel returned an invalid analytics response')
  }

  return payload.data
}

async function fetchRange(range: DateRange) {
  const token = process.env.VERCEL_TOKEN
  const projectId = process.env.VERCEL_PROJECT_ID

  if (!token || !projectId) throw new Error('Vercel analytics is not configured')

  const url = new URL('https://api.vercel.com/v1/query/web-analytics/visits/aggregate')
  url.searchParams.set('projectId', projectId)
  url.searchParams.set('since', range.since)
  url.searchParams.set('until', range.until)
  url.searchParams.set('by', 'day')

  if (process.env.VERCEL_TEAM_ID) {
    url.searchParams.set('teamId', process.env.VERCEL_TEAM_ID)
  }

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 5_000)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'navdeepsingh.dev',
      },
      next: {
        revalidate: 21_600,
        tags: ['public-insights'],
      },
    })

    if (!response.ok) throw new Error(`Vercel returned ${response.status}`)

    return parseRows((await response.json()) as VercelAnalyticsResponse)
  } finally {
    clearTimeout(timeoutId)
  }
}

function sum(rows: VercelAnalyticsRow[], key: 'pageviews' | 'visitors') {
  return rows.reduce((total, row) => total + row[key], 0)
}

function getChange(current: number, previous: number) {
  if (previous === 0) return current === 0 ? 0 : undefined
  return ((current - previous) / previous) * 100
}

export function hasVercelAnalyticsConfig() {
  return Boolean(process.env.VERCEL_TOKEN && process.env.VERCEL_PROJECT_ID)
}

export async function getVercelAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  const ranges = getEqualDateRanges()
  const [currentRows, previousRows] = await Promise.all([
    fetchRange(ranges.current),
    fetchRange(ranges.previous),
  ])
  const currentVisitors = sum(currentRows, 'visitors')
  const previousVisitors = sum(previousRows, 'visitors')
  const currentViews = sum(currentRows, 'pageviews')
  const previousViews = sum(previousRows, 'pageviews')
  const visitorChange = getChange(currentVisitors, previousVisitors)
  const viewChange = getChange(currentViews, previousViews)

  return {
    period: {
      from: ranges.current.since,
      to: ranges.current.until,
      label: `Last ${REPORTING_DAYS} days`,
    },
    metrics: [
      {
        id: 'visitors',
        label: 'Visitors',
        value: currentVisitors,
        ...(visitorChange !== undefined ? { change: visitorChange } : {}),
      },
      {
        id: 'views',
        label: 'Page views',
        value: currentViews,
        ...(viewChange !== undefined ? { change: viewChange } : {}),
      },
    ],
    series: currentRows.map((row) => ({
      date: row.timestamp.slice(0, 10),
      visitors: row.visitors,
      views: row.pageviews,
    })),
    updatedAt: new Date().toISOString(),
    source: 'Vercel Web Analytics',
  }
}
