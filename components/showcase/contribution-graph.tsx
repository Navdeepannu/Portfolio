import {
  ContributionGraph,
  type ContributionDay,
} from '@/components/ui/components/contribution-graph'

const start = Date.UTC(2025, 0, 5)
const days: ContributionDay[] = Array.from({ length: 84 }, (_, index) => {
  const count = index % 11 === 0 ? 8 : index % 5 === 0 ? 4 : index % 3 === 0 ? 1 : 0

  return {
    date: new Date(start + index * 86_400_000).toISOString().slice(0, 10),
    count,
    level: count >= 8 ? 4 : count >= 4 ? 3 : count > 0 ? 1 : 0,
  }
})

export default function ContributionGraphShowcase() {
  return (
    <ContributionGraph
      aria-label="Contribution activity"
      className="w-full max-w-3xl"
      data={{ days, total: 79, from: days[0].date, to: days.at(-1)?.date ?? days[0].date }}
    />
  )
}
