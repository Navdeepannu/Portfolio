import { defineSupportItem } from '@/registry/support/define-support-item'

export const animatedGroupItem = defineSupportItem({
  slug: 'animated-group',
  title: 'Animated Group',
  description: 'Motion-powered staggered animation container.',
  sourceFiles: [
    { path: 'src/registry/components/animated-group/animated-group.tsx', language: 'tsx' },
  ],
  registry: {
    name: 'animated-group',
    type: 'registry:ui',
    dependencies: ['motion'],
    registryDependencies: [],
    files: [
      {
        path: 'src/registry/components/animated-group/animated-group.tsx',
        target: '@components/animated-group.tsx',
        type: 'registry:ui',
      },
    ],
  },
})
