import assert from 'node:assert/strict'
import test from 'node:test'

import {
  DEFAULT_NAVUI_PRIMITIVE,
  parsePrimitive,
  primitiveConfig,
  primitives,
} from '@/config/navui-primitives'
import {
  loadRegistryCodeFiles,
  resolveRegistryPackageDependencies,
} from '@/features/navui/code/source-loader'
import { heroSectionOneItem } from '@/registry/blocks/hero/hero-section-one/hero-section-one.item'
import { primitiveComponentDefinitions } from '@/registry/primitives/definitions'
import { registryItems } from '@/registry/items'

test('primitive config is canonical and preserves the current Radix default', () => {
  assert.deepEqual(primitives, ['base', 'aria', 'radix'])
  assert.equal(DEFAULT_NAVUI_PRIMITIVE, 'radix')
  assert.equal(primitiveConfig.base.label, 'Base UI')
  assert.equal(primitiveConfig.aria.label, 'React Aria')
  assert.equal(primitiveConfig.radix.label, 'Radix UI')
  assert.equal(parsePrimitive('unknown'), 'radix')
})

test('Button has one install target and implementation metadata for every primitive', () => {
  const button = primitiveComponentDefinitions.find((definition) => definition.name === 'button')
  assert.ok(button)

  for (const primitive of primitives) {
    assert.equal(button.implementations[primitive].files[0]?.target, '@ui/button.tsx')
  }

  assert.ok(button.implementations.base.dependencies.includes('@base-ui/react'))
  assert.ok(button.implementations.aria.dependencies.includes('react-aria-components'))
  assert.ok(button.implementations.radix.dependencies.includes('radix-ui'))
})

test('block source and dependency resolution use the selected Button implementation', async () => {
  const expectations = {
    base: { source: '@base-ui/react/button', package: '@base-ui/react' },
    aria: { source: 'react-aria-components', package: 'react-aria-components' },
    radix: { source: 'radix-ui', package: 'radix-ui' },
  } as const

  for (const primitive of primitives) {
    const files = await loadRegistryCodeFiles(heroSectionOneItem, registryItems, primitive)
    const button = files.find((file) => file.target === '@ui/button.tsx')
    assert.ok(button)
    assert.equal(button.relationship, 'primitive-dependency')
    assert.match(button.code, new RegExp(expectations[primitive].source.replace('/', '\\/')))

    const dependencies = resolveRegistryPackageDependencies(
      heroSectionOneItem,
      registryItems,
      primitive,
    )
    assert.ok(dependencies.includes(expectations[primitive].package))
  }
})
