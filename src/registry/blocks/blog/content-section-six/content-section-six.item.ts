import { defineSupportItem } from '@/registry/support/define-support-item'

export const contentSectionSixItem = defineSupportItem({
  slug: 'content-section-six',
  title: 'Content Section Six',
  description: 'Compatibility alias for the renamed Blog Section One archive block.',
  sourceFiles: [
    {
      path: 'src/registry/blocks/blog/content-section-six/content-section-six.tsx',
      language: 'tsx',
    },
  ],
  registry: {
    name: 'content-section-six',
    type: 'registry:block',
    dependencies: [],
    registryDependencies: ['@navdeep-singh/blog-section-one'],
    files: [
      {
        path: 'src/registry/blocks/blog/content-section-six/content-section-six.tsx',
        target: '@components/blocks/blog/content-section-six.tsx',
        type: 'registry:component',
      },
    ],
  },
})
