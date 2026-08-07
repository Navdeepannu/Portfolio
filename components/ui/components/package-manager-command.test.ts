import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import { getAvailablePackageManagers } from './package-manager-command'

describe('getAvailablePackageManagers', () => {
  test('keeps the familiar package-manager order', () => {
    const managers = getAvailablePackageManagers({
      bun: 'bunx package',
      npm: 'npx package',
    })

    assert.deepEqual(
      managers.map((manager) => manager.id),
      ['npm', 'bun'],
    )
  })

  test('omits package managers without a command', () => {
    assert.deepEqual(getAvailablePackageManagers({}), [])
  })
})
