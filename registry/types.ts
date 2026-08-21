import type { ComponentType } from 'react'
import type { BundledLanguage } from 'shiki'

import type { BlockCategoryId } from '@/data/types'

export const REGISTRY_ITEM_STATUSES = ['draft', 'published', 'archived'] as const
export type RegistryItemStatus = (typeof REGISTRY_ITEM_STATUSES)[number]

export const REGISTRY_ITEM_TYPES = [
  'registry:block',
  'registry:component',
  'registry:ui',
  'registry:lib',
  'registry:hook',
] as const
export type NavUIRegistryItemType = (typeof REGISTRY_ITEM_TYPES)[number]

export type RegistryItemKind = 'block' | 'component' | 'illustration' | 'support'

/** One on-disk file displayed by the code viewer and, unless noted, installed by shadcn. */
export type BlockSourceFileSpec = {
  /** Path relative to the project root. */
  path: string
  /** Shiki language for syntax highlighting. */
  language: BundledLanguage
  /** Tab label; defaults to the basename of `path`. */
  filename?: string
}

/** Static preview metadata used to generate runtime imports. */
export type RegistryPreviewSpec = {
  /** Alias-based module path suitable for a static TypeScript import. */
  module: string
  /** Export to import; omitted for a default export. */
  exportName?: string
  /** Preview/demo-only sources. These are never installed. */
  sourceFiles?: BlockSourceFileSpec[]
}

/** Maps one canonical source file to a shadcn registry file and install target. */
export type RegistryFileEntry = {
  /** Source path under the repository root. */
  path: string
  /** Destination path consumers receive after `shadcn add`. */
  target: string
  type: Exclude<NavUIRegistryItemType, 'registry:block'>
  /** Allows multiple items to install the exact same source at the exact same target. */
  shared?: boolean
}

/** The shadcn-compatible portion of one canonical NavUI item. */
export type BlockRegistryMeta = {
  name: string
  type: NavUIRegistryItemType
  dependencies: string[]
  registryDependencies: string[]
  files: RegistryFileEntry[]
}

/** Common typed model used by blocks, components, illustrations, and support items. */
export type RegistryItemDefinitionBase = {
  /** Public registry identifier and website slug. */
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  kind: RegistryItemKind
  status: RegistryItemStatus
  sourceFiles: BlockSourceFileSpec[]
  registry: BlockRegistryMeta
  preview?: RegistryPreviewSpec
  /** Archived compatibility items may remain installable without re-entering the website catalog. */
  compatibilityOutput?: boolean
}

export type BlockDefinition = RegistryItemDefinitionBase & {
  kind: 'block'
  category: BlockCategoryId
  /** Install command shown in the UI; optional override. */
  cli?: string
}

export type BlockRegistryEntry = {
  definition: BlockDefinition
  Component: ComponentType
}

export type IllustrationSize = 'sm' | 'md' | 'wide' | 'tall' | 'hero'

export type IllustrationDefinition = RegistryItemDefinitionBase & {
  kind: 'illustration'
  category: 'illustrations'
  size: IllustrationSize
  previewClassName?: string
}

export type SupportDefinition = RegistryItemDefinitionBase & {
  kind: 'support'
  category: 'support'
}

export type NavUIRegistryItem =
  | BlockDefinition
  | IllustrationDefinition
  | SupportDefinition
  | import('@/data/component-types').ComponentDefinition
