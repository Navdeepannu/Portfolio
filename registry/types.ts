import type { ComponentType } from 'react'
import type { BundledLanguage } from 'shiki'

import type { BlockCategoryId } from '@/data/types'

/** One on-disk file whose contents are shown in the code tab and exported to a registry. */
export type BlockSourceFileSpec = {
  /** Path relative to the project root (e.g. `components/blocks/hero.tsx`). */
  path: string
  /** Shiki language for syntax highlighting. */
  language: BundledLanguage
  /** Tab label; defaults to the basename of `path`. */
  filename?: string
}

/** Maps to shadcn registry `files[]` entries (content is read at export time). */
export type RegistryFileEntry = {
  /** Source path under the repo (same convention as `BlockSourceFileSpec.path`). */
  path: string
  /** Destination path consumers get after `shadcn add` (often mirrors `path`). */
  target: string
  type?:
    | 'registry:component'
    | 'registry:block'
    | 'registry:lib'
    | 'registry:hook'
    | 'registry:ui'
}

/** Metadata aligned with shadcn registry items for future CLI / JSON export. */
export type BlockRegistryMeta = {
  name: string
  type: 'registry:block' | 'registry:component'
  dependencies?: string[]
  registryDependencies?: string[]
  files: RegistryFileEntry[]
}

export type BlockDefinition = {
  slug: string
  title: string
  description: string
  category: BlockCategoryId
  tags: string[]
  /** Filesystem source of truth for raw code (preview code tab + registry export). */
  sourceFiles: BlockSourceFileSpec[]
  registry: BlockRegistryMeta
  /** Install command shown in the UI; optional override. */
  cli?: string
}

export type BlockRegistryEntry = {
  definition: BlockDefinition
  Component: ComponentType
}
