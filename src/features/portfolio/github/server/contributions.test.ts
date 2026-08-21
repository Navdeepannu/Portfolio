import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { createContributionGraphData } from '@/components/contribution-graph'
import { parseGithubContributionHtml } from '@/features/portfolio/github/server/contribution-parser'

describe('createContributionGraphData', () => {
  test('sorts provider data, fills missing dates, and derives intensity', () => {
    const data = createContributionGraphData([
      { date: '2026-08-03', count: 8 },
      { date: '2026-08-01', count: 2 },
    ])

    assert.deepEqual(
      { total: data.total, from: data.from, to: data.to },
      {
        total: 10,
        from: '2026-08-01',
        to: '2026-08-03',
      },
    )
    assert.deepEqual(data.days, [
      { date: '2026-08-01', count: 2, level: 1 },
      { date: '2026-08-02', count: 0, level: 0 },
      { date: '2026-08-03', count: 8, level: 4 },
    ])
  })
})

describe('parseGithubContributionHtml', () => {
  test('normalizes GitHub public calendar cells in date order', () => {
    const html = `
      <td data-date="2026-08-02" data-level="0"></td>
      <tool-tip>No contributions on August 2nd.</tool-tip>
      <td data-date="2026-08-01" data-level="3"></td>
      <tool-tip>12 contributions on August 1st.</tool-tip>
    `

    const data = parseGithubContributionHtml(html)

    assert.ok(data)
    assert.deepEqual(
      { total: data.total, from: data.from, to: data.to, source: data.source },
      {
        total: 12,
        from: '2026-08-01',
        to: '2026-08-02',
        source: 'GitHub public profile',
      },
    )
    assert.deepEqual(data.days, [
      { date: '2026-08-01', count: 12, level: 3 },
      { date: '2026-08-02', count: 0, level: 0 },
    ])
  })
})
