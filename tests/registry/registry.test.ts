import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { blockItems } from '@/registry/items/blocks'
import type { NavUIRegistryItem, RegistryItemStatus } from '@/registry/types'
import { validatePublicArtifacts, validateRegistryDefinitions } from '@/registry/validation'
import {
  createRootRegistry,
  expectedPublicOutputNames,
  renderRootRegistry,
  toShadcnRegistryItem,
} from '@/scripts/registry/core'

function expect<T>(actual: T) {
  return {
    toBe(expected: T) {
      assert.equal(actual, expected)
    },
    toEqual(expected: unknown) {
      assert.deepEqual(actual, expected)
    },
    toContain(expected: unknown) {
      assert.ok(Array.isArray(actual) && actual.includes(expected))
    },
    not: {
      toBe(expected: T) {
        assert.notEqual(actual, expected)
      },
    },
  }
}

function fixtureItem(
  slug: string,
  options: {
    status?: RegistryItemStatus
    source?: string
    target?: string
    registryDependencies?: string[]
    extraFiles?: Array<{ path: string; target: string }>
  } = {},
): NavUIRegistryItem {
  const source = options.source ?? `components/${slug}.tsx`
  const target = options.target ?? `@components/${slug}.tsx`
  const files = [
    { path: source, target, type: 'registry:component' as const },
    ...(options.extraFiles ?? []).map((file) => ({ ...file, type: 'registry:component' as const })),
  ]

  return {
    slug,
    title: slug,
    description: `Useful canonical description for ${slug}.`,
    category: 'test',
    tags: ['test'],
    kind: 'block',
    status: options.status ?? 'published',
    sourceFiles: files.map((file) => ({ path: file.path, language: 'tsx' as const })),
    preview: { module: `@/${source.replace(/\.tsx$/, '')}` },
    registry: {
      name: slug,
      type: 'registry:block',
      dependencies: [],
      registryDependencies: options.registryDependencies ?? [],
      files,
    },
  }
}

describe('canonical registry validation', () => {
  test('detects duplicate public identifiers', async () => {
    const errors = await validateRegistryDefinitions([
      fixtureItem('duplicate'),
      fixtureItem('duplicate'),
    ])
    expect(errors.some((error) => error.includes('Duplicate registry name'))).toBe(true)
  })

  test('detects missing sources with the item and path', async () => {
    const errors = await validateRegistryDefinitions([fixtureItem('missing-source')], {
      sourceExists: () => false,
    })
    expect(errors).toContain('[missing-source] Missing source file: components/missing-source.tsx.')
  })

  test('detects stale public artifacts', async () => {
    const artifacts = new Map([
      [
        'stale',
        {
          name: 'stale',
          files: [{ path: 'components/stale.tsx', target: '@components/stale.tsx' }],
        },
      ],
    ])
    const errors = await validatePublicArtifacts([fixtureItem('current')], artifacts, {
      readSource: () => 'source',
    })
    expect(errors.some((error) => error.includes('[stale] Stale public artifact'))).toBe(true)
  })

  test('excludes draft items from source and public output inventories', () => {
    const published = fixtureItem('published')
    const draft = fixtureItem('draft', { status: 'draft' })
    const registry = createRootRegistry([draft, published])

    expect(registry.items.map((item) => item.name)).toEqual(['published'])
    expect(expectedPublicOutputNames([draft, published])).toEqual(['published', 'registry'])
  })

  test('generates every file in a multi-file item', () => {
    const item = fixtureItem('multi-file', {
      extraFiles: [
        {
          path: 'components/multi-file-support.tsx',
          target: '@components/multi-file-support.tsx',
        },
      ],
    })
    const generated = toShadcnRegistryItem(item)

    expect(generated.files.map((file) => file.path)).toEqual([
      'components/multi-file-support.tsx',
      'components/multi-file.tsx',
    ])
  })

  test('resolves local registry dependencies and reports missing ones', async () => {
    const child = fixtureItem('child')
    const parent = fixtureItem('parent', {
      registryDependencies: ['@navdeep-singh/child'],
    })
    expect(await validateRegistryDefinitions([parent, child])).toEqual([])

    const errors = await validateRegistryDefinitions([parent])
    expect(errors.some((error) => error.includes('Unresolved local registry dependency'))).toBe(
      true,
    )
  })

  test('renders deterministically regardless of input ordering', () => {
    const first = fixtureItem('a')
    const second = fixtureItem('b')
    expect(renderRootRegistry([second, first])).toBe(renderRootRegistry([first, second]))
  })

  test('keeps content and process identities mapped to their own source', () => {
    const content = blockItems.find((item) => item.slug === 'content-section-four')
    const process = blockItems.find((item) => item.slug === 'process-section-one')

    expect(content?.registry.files[0]?.path).toBe(
      'components/blocks/content/content-section-four.tsx',
    )
    expect(process?.registry.files[0]?.path).toBe(
      'components/blocks/process/process-section-one.tsx',
    )
    expect(content?.registry.files[0]?.path).not.toBe(process?.registry.files[0]?.path)
  })

  test('compares preview/code source with generated install content', async () => {
    const item = fixtureItem('consistent')
    const artifact = {
      name: 'consistent',
      files: [
        {
          path: 'components/consistent.tsx',
          target: '@components/consistent.tsx',
          content: 'canonical source',
        },
      ],
    }

    expect(
      await validatePublicArtifacts([item], new Map([['consistent', artifact]]), {
        readSource: () => 'canonical source',
      }),
    ).toEqual([])

    const errors = await validatePublicArtifacts([item], new Map([['consistent', artifact]]), {
      readSource: () => 'changed source',
    })
    expect(
      errors.some((error) => error.includes('differs from the canonical preview/code source')),
    ).toBe(true)
  })
})
