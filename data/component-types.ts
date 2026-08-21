import type {
  BlockRegistryMeta,
  BlockSourceFileSpec,
  RegistryItemStatus,
  RegistryPreviewSpec,
} from '@/registry/types'

/** Showcase category id */
export type ComponentCategoryId = string

export type ComponentCategory = {
  id: ComponentCategoryId
  name: string
  description?: string
}

export type ComponentBentoSize = 'sm' | 'md' | 'lg' | 'xl'

export type ComponentBentoSpan = {
  size?: ComponentBentoSize
  /** @deprecated Legacy grid spans — ignored by the masonry layout. */
  colSpan?: 1 | 2
  /** @deprecated Legacy grid spans — ignored by the masonry layout. */
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

export type ComponentDefinition = {
  kind: 'component'
  status: RegistryItemStatus
  slug: string
  title: string
  description: string
  registryDescription?: string
  category: ComponentCategoryId
  tags: string[]
  sourceFiles: BlockSourceFileSpec[]
  registry: BlockRegistryMeta
  preview?: RegistryPreviewSpec
  compatibilityOutput?: boolean
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
