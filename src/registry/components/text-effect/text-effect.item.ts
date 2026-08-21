import { defineSupportItem } from '@/registry/support/define-support-item'

export const textEffectItem = defineSupportItem({
  slug: 'text-effect',
  title: 'Text Effect',
  description: 'Motion-based per-character and per-word text animation.',
  sourceFiles: [{ path: 'src/registry/components/text-effect/text-effect.tsx', language: 'tsx' }],
  registry: {
    name: 'text-effect',
    type: 'registry:ui',
    dependencies: ['motion'],
    registryDependencies: [],
    files: [
      {
        path: 'src/registry/components/text-effect/text-effect.tsx',
        target: '@components/text-effect.tsx',
        type: 'registry:ui',
      },
    ],
  },
})
