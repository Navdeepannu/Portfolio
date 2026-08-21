import { defineSupportItem } from '@/registry/support/define-support-item'

export const brandLogoItem = defineSupportItem({
  slug: 'brand-logo',
  title: 'Brand Logo',
  description: 'Shared brand mark used across authentication and marketing blocks.',
  sourceFiles: [{ path: 'src/registry/components/brand-logo/brand-logo.tsx', language: 'tsx' }],
  registry: {
    name: 'brand-logo',
    type: 'registry:component',
    dependencies: ['lucide-react'],
    registryDependencies: [],
    files: [
      {
        path: 'src/registry/components/brand-logo/brand-logo.tsx',
        target: '@components/brand-logo.tsx',
        type: 'registry:component',
      },
    ],
  },
})
