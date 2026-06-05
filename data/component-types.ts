import type { BlockSourceFileSpec, BlockRegistryMeta } from '@/registry/types'

/** Showcase category id (known ids plus any folder-derived id). */
export type ComponentCategoryId = string

export type ComponentCategory = {
  id: ComponentCategoryId
  name: string
  description?: string
}

export type ComponentBentoSpan = {
  colSpan?: 1 | 2
  rowSpan?: 1 | 2
}

export type ComponentDefinition = {
  slug: string
  title: string
  description: string
  category: ComponentCategoryId
  tags: string[]
  sourceFiles: BlockSourceFileSpec[]
  registry: BlockRegistryMeta
  bento?: ComponentBentoSpan
  /** Install command shown in the UI; optional override. */
  cli?: string
}
