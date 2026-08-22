import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import {
  buildSourceTree,
  getSourceTreeDirectoryPaths,
  registryTargetToDisplayPath,
} from '@/features/navui/code/source-tree'

describe('registry source file tree', () => {
  test('normalizes portable registry targets without exposing repository paths', () => {
    assert.equal(
      registryTargetToDisplayPath('@components/blocks/hero/hero-one.tsx'),
      'components/blocks/hero/hero-one.tsx',
    )
  })

  test('builds nested directories from file paths and sorts directories before files', () => {
    const tree = buildSourceTree([
      'components/hero.tsx',
      'components/ui/button.tsx',
      'components/ui/svgs/vercel.tsx',
      'components/header.tsx',
    ])

    assert.deepEqual(tree, [
      {
        type: 'directory',
        name: 'components',
        path: 'components',
        children: [
          {
            type: 'directory',
            name: 'ui',
            path: 'components/ui',
            children: [
              {
                type: 'directory',
                name: 'svgs',
                path: 'components/ui/svgs',
                children: [
                  {
                    type: 'file',
                    name: 'vercel.tsx',
                    path: 'components/ui/svgs/vercel.tsx',
                  },
                ],
              },
              {
                type: 'file',
                name: 'button.tsx',
                path: 'components/ui/button.tsx',
              },
            ],
          },
          {
            type: 'file',
            name: 'header.tsx',
            path: 'components/header.tsx',
          },
          {
            type: 'file',
            name: 'hero.tsx',
            path: 'components/hero.tsx',
          },
        ],
      },
    ])
    assert.deepEqual(getSourceTreeDirectoryPaths(tree), [
      'components',
      'components/ui',
      'components/ui/svgs',
    ])
  })

  test('uses the same structure for a single file', () => {
    assert.deepEqual(buildSourceTree(['components/blocks/hero-one.tsx']), [
      {
        type: 'directory',
        name: 'components',
        path: 'components',
        children: [
          {
            type: 'directory',
            name: 'blocks',
            path: 'components/blocks',
            children: [
              {
                type: 'file',
                name: 'hero-one.tsx',
                path: 'components/blocks/hero-one.tsx',
              },
            ],
          },
        ],
      },
    ])
  })
})
