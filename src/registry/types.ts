import type { ComponentType } from 'react'
import type { BundledLanguage } from 'shiki'

import type { Primitive } from '@/config/navui-primitives'

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

export type BlockCategoryId = string

export type BlockCategory = {
  id: BlockCategoryId
  name: string
  description?: string
}

export type ComponentCategoryId = string

export type ComponentCategory = {
  id: ComponentCategoryId
  name: string
  description?: string
}

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
  /** Narrow per-base overrides for blocks whose primitive usage cannot stay shared. */
  primitiveVariants?: Partial<Record<Primitive, BlockPrimitiveVariant>>
}

export type BlockPrimitiveVariant = {
  sourceFiles?: BlockSourceFileSpec[]
  preview?: RegistryPreviewSpec
  registry?: Partial<Pick<BlockRegistryMeta, 'dependencies' | 'registryDependencies' | 'files'>>
}

export type ResolvedBlockDefinition = Omit<BlockDefinition, 'primitiveVariants'> & {
  primitive: Primitive
}

export type BlockPreviewComponentSet = {
  default: ComponentType
  variants?: Partial<Record<Primitive, ComponentType>>
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

export type ComponentBentoSize = 'sm' | 'md' | 'lg' | 'xl'

export type ComponentBentoSpan = {
  size?: ComponentBentoSize
  /** @deprecated Legacy grid spans, ignored by the masonry layout. */
  colSpan?: 1 | 2
  /** @deprecated Legacy grid spans, ignored by the masonry layout. */
  rowSpan?: 1 | 2
}

export type ComponentGallerySize = 'compact' | 'standard' | 'wide' | 'feature'
export type ComponentGalleryHeight = 'sm' | 'md' | 'lg' | 'xl' | 'stacked'
export type ComponentGalleryTreatment = 'default' | 'muted' | 'contrast'

export type ComponentGalleryConfig = {
  size: ComponentGallerySize
  height: ComponentGalleryHeight
  tabletSpan?: 1 | 2
  treatment?: ComponentGalleryTreatment
  label?: string
}

export type ComponentApiRow = {
  prop: string
  type: string
  default: string
  description: string
}

export type ComponentDocLink = {
  label: string
  href: string
}

export type ComponentDocCredit = {
  label: string
  href?: string
}

export type ComponentDefinition = RegistryItemDefinitionBase & {
  kind: 'component'
  registryDescription?: string
  bento?: ComponentBentoSpan
  gallery: ComponentGalleryConfig
  image: string
  cli?: string
  usageExample?: string
  useCases?: string[]
  notes?: string[]
  api?: ComponentApiRow[]
  references?: ComponentDocLink[]
  credits?: ComponentDocCredit[]
}

export type NavUIRegistryItem =
  | BlockDefinition
  | ComponentDefinition
  | IllustrationDefinition
  | SupportDefinition
