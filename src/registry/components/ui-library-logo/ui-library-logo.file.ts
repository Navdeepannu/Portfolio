import type { RegistryFileEntry } from '@/registry/types'

/** Shared source included by blocks that render the NavUI mark. */
export const uiLibraryLogoFile: RegistryFileEntry = {
  path: 'src/registry/components/ui-library-logo/ui-library-logo.tsx',
  target: '@components/ui-library-logo.tsx',
  type: 'registry:component',
  shared: true,
}
