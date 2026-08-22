import type { DesignSystemDefinition } from '@/registry/types'

export const navuiDefaultDesignSystem = {
  slug: 'navui-default',
  title: 'NavUI Default',
  description:
    'The optional default NavUI visual foundations for consistent block typography and layout.',
  category: 'design-system',
  tags: ['design-system', 'default'],
  kind: 'design-system',
  status: 'published',
  default: true,
  sourceFiles: [],
  registry: {
    name: 'navui-default',
    type: 'registry:style',
    dependencies: [],
    registryDependencies: [],
    files: [],
    cssVars: {
      light: {
        'navui-font-display': 'var(--font-sans)',
        'navui-container': '72rem',
        'navui-content': '48rem',
        'navui-content-narrow': '36rem',
        'navui-gutter': '1.5rem',
        'navui-section-space': '5rem',
        'navui-section-space-lg': '7rem',
      },
    },
  },
} satisfies DesignSystemDefinition
