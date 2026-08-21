import type { SupportDefinition } from '../types'

function supportItem(
  input: Omit<SupportDefinition, 'category' | 'kind' | 'status' | 'tags' | 'compatibilityOutput'>,
): SupportDefinition {
  return {
    ...input,
    category: 'support',
    kind: 'support',
    status: 'archived',
    tags: ['support'],
    compatibilityOutput: true,
  }
}

/** Installable compatibility dependencies intentionally hidden from the visual catalogs. */
export const supportItems: SupportDefinition[] = [
  supportItem({
    slug: 'animated-group',
    title: 'Animated Group',
    description: 'Motion-powered staggered animation container.',
    sourceFiles: [{ path: 'components/ui/components/animated-group.tsx', language: 'tsx' }],
    registry: {
      name: 'animated-group',
      type: 'registry:ui',
      dependencies: ['motion'],
      registryDependencies: [],
      files: [
        {
          path: 'components/ui/components/animated-group.tsx',
          target: '@components/animated-group.tsx',
          type: 'registry:ui',
        },
      ],
    },
  }),
  supportItem({
    slug: 'brand-logo',
    title: 'Brand Logo',
    description: 'Shared brand mark used across authentication and marketing blocks.',
    sourceFiles: [{ path: 'components/brand-logo.tsx', language: 'tsx' }],
    registry: {
      name: 'brand-logo',
      type: 'registry:component',
      dependencies: ['lucide-react'],
      registryDependencies: [],
      files: [
        {
          path: 'components/brand-logo.tsx',
          target: '@components/brand-logo.tsx',
          type: 'registry:component',
        },
      ],
    },
  }),
  supportItem({
    slug: 'text-effect',
    title: 'Text Effect',
    description: 'Motion-based per-character and per-word text animation.',
    sourceFiles: [{ path: 'components/ui/components/text-effect.tsx', language: 'tsx' }],
    registry: {
      name: 'text-effect',
      type: 'registry:ui',
      dependencies: ['motion'],
      registryDependencies: [],
      files: [
        {
          path: 'components/ui/components/text-effect.tsx',
          target: '@components/text-effect.tsx',
          type: 'registry:ui',
        },
      ],
    },
  }),
  supportItem({
    slug: 'content-section-six',
    title: 'Content Section Six',
    description: 'Compatibility alias for the renamed Blog Section One archive block.',
    sourceFiles: [{ path: 'components/blocks/blog/content-section-six.tsx', language: 'tsx' }],
    registry: {
      name: 'content-section-six',
      type: 'registry:block',
      dependencies: [],
      registryDependencies: ['@navdeep-singh/blog-section-one'],
      files: [
        {
          path: 'components/blocks/blog/content-section-six.tsx',
          target: '@components/blocks/blog/content-section-six.tsx',
          type: 'registry:component',
        },
      ],
    },
  }),
].sort((a, b) => a.slug.localeCompare(b.slug))
