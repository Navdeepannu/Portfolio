import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { blockCategories } from '@/features/navui/catalog/blocks/block-categories'
import { getBlocksByCategory } from '@/features/navui/catalog/blocks/block-helpers'

describe('featured block curation', () => {
  test('puts the strongest product showcases first', () => {
    const featuredSlugs = getBlocksByCategory('featured').map((block) => block.slug)

    assert.deepEqual(featuredSlugs.slice(0, 6), [
      'hero-section-four',
      'content-section-one',
      'sign-up-two',
      'logo-cloud-five',
      'pricing-section-one',
      'stats-section-one',
    ])
  })

  test('keeps one published representative per live category', () => {
    const featuredBlocks = getBlocksByCategory('featured')
    const categories = featuredBlocks.map((block) => block.category)

    assert.equal(new Set(categories).size, categories.length)
    assert.ok(featuredBlocks.every((block) => block.status === 'published'))
  })

  test('lists Content Section Five under Content without a process category', () => {
    const contentSlugs = getBlocksByCategory('content').map((block) => block.slug)

    assert.ok(contentSlugs.includes('content-section-five'))
    assert.equal(
      blockCategories.some((category) => category.id === 'process'),
      false,
    )
  })
})
