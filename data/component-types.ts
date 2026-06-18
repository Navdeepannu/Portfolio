import type { BlockSourceFileSpec, BlockRegistryMeta } from '@/registry/types'

/** Showcase category id (known ids plus any folder-derived id). */
export type ComponentCategoryId = string

export type ComponentCategory = {
  id: ComponentCategoryId
  name: string
  description?: string
}

/** Preview height hint for the masonry layout. Larger = taller preview area. */
export type ComponentBentoSize = 'sm' | 'md' | 'lg' | 'xl'

export type ComponentBentoSpan = {
  /**
   * Optional preview height hint. The masonry layout auto-flows cards into
   * columns, so this is the only knob you ever need to tweak per component.
   * Defaults to 'md'.
   */
  size?: ComponentBentoSize
  /** @deprecated Legacy grid spans — ignored by the masonry layout. */
  colSpan?: 1 | 2
  /** @deprecated Legacy grid spans — ignored by the masonry layout. */
  rowSpan?: 1 | 2
}

/** A single row in a component's API reference table. */
export type ComponentApiRow = {
  prop: string
  type: string
  /** Default value, or `-` when there is none. */
  default: string
  description: string
}

/** External link rendered in the References section. */
export type ComponentDocLink = {
  label: string
  href: string
}

/** Attribution rendered in the Credits section. */
export type ComponentDocCredit = {
  label: string
  href?: string
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
  image: string
  /** Install command shown in the UI; optional override. */
  cli?: string
  /** Minimal, copy-pasteable usage example (real import + JSX). */
  usageExample?: string
  /** API reference rows. Render the API table only when present. */
  api?: ComponentApiRow[]
  /** External references. Render the References section only when present. */
  references?: ComponentDocLink[]
  /** Attribution. Render the Credits section only when present. */
  credits?: ComponentDocCredit[]
}
