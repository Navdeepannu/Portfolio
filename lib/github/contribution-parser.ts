import type {
  ContributionDay,
  ContributionGraphData,
} from '@/components/ui/components/contribution-graph'

const PUBLIC_CONTRIBUTION_DAY_PATTERN =
  /<td\b([^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*)>\s*<\/td>\s*<tool-tip\b[^>]*>([^<]+)<\/tool-tip>/g

export function parseGithubContributionHtml(html: string): ContributionGraphData | null {
  const days: ContributionDay[] = []

  for (const match of html.matchAll(PUBLIC_CONTRIBUTION_DAY_PATTERN)) {
    const attributes = match[1]
    const tooltip = match[2].trim()
    const date = attributes.match(/\bdata-date="(\d{4}-\d{2}-\d{2})"/)?.[1]
    const level = attributes.match(/\bdata-level="([0-4])"/)?.[1]
    const countLabel = tooltip.match(/^(No|[\d,]+) contribution/)?.[1]

    if (!date || level === undefined || !countLabel) continue

    days.push({
      date,
      count: countLabel === 'No' ? 0 : Number(countLabel.replaceAll(',', '')),
      level: Number(level) as ContributionDay['level'],
    })
  }

  if (days.length === 0) return null

  const sortedDays = days.sort((a, b) => a.date.localeCompare(b.date))

  return {
    days: sortedDays,
    total: sortedDays.reduce((total, day) => total + day.count, 0),
    from: sortedDays[0].date,
    to: sortedDays.at(-1)?.date ?? sortedDays[0].date,
    source: 'GitHub public profile',
  }
}
