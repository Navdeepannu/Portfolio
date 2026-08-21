import { ContributionGraph, type ContributionInputDay } from '@/components/contribution-graph'

const start = Date.UTC(2025, 0, 5)
const inputDays: ContributionInputDay[] = Array.from({ length: 364 }, (_, index) => {
  const wave = Math.round((Math.sin(index / 8) + 1) * 3)
  const count = index % 13 === 0 ? wave + 7 : index % 5 === 0 ? wave + 2 : index % 3 === 0 ? 1 : 0

  return {
    date: new Date(start + index * 86_400_000).toISOString().slice(0, 10),
    count,
  }
})

export default function ContributionGraphShowcase() {
  return (
    <ContributionGraph
      aria-label="Contribution activity"
      className="w-full max-w-3xl"
      data={{ days: inputDays, source: 'Example API' }}
    />
  )
}
