import type { Primitive } from '@/config/navui-primitives'
import type { RegistryFileEntry } from '@/registry/types'

export type PrimitiveComponentImplementation = {
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFileEntry[]
}

export type PrimitiveComponentDefinition = {
  name: string
  title: string
  implementations: Record<Primitive, PrimitiveComponentImplementation>
}

function buttonFile(path: string): RegistryFileEntry {
  return {
    path,
    target: '@ui/button.tsx',
    type: 'registry:ui',
  }
}

export const buttonPrimitiveDefinition = {
  name: 'button',
  title: 'Button',
  implementations: {
    base: {
      dependencies: ['@base-ui/react', 'class-variance-authority'],
      registryDependencies: [],
      files: [buttonFile('src/registry/primitives/base/button.tsx')],
    },
    aria: {
      dependencies: ['class-variance-authority', 'react-aria-components'],
      registryDependencies: [],
      files: [buttonFile('src/registry/primitives/aria/button.tsx')],
    },
    radix: {
      dependencies: ['class-variance-authority', 'radix-ui'],
      registryDependencies: [],
      files: [buttonFile('src/registry/primitives/radix/button.tsx')],
    },
  },
} satisfies PrimitiveComponentDefinition

export const primitiveComponentDefinitions: PrimitiveComponentDefinition[] = [
  buttonPrimitiveDefinition,
]

const primitiveComponentByName = new Map(
  primitiveComponentDefinitions.map((definition) => [definition.name, definition]),
)

export function getPrimitiveComponentDefinition(
  name: string,
): PrimitiveComponentDefinition | undefined {
  return primitiveComponentByName.get(name)
}
