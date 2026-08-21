import type { ComponentType, SVGProps } from 'react'

export type SearchIcon = ComponentType<SVGProps<SVGSVGElement>>

export type SearchItemType =
  | 'navigation'
  | 'portfolio'
  | 'block'
  | 'component'
  | 'page'
  | 'blog'
  | 'social'
  | 'action'

export type SearchItem = {
  id: string
  label: string
  description?: string
  href?: string
  external?: boolean
  type: SearchItemType
  icon?: SearchIcon
  shortcut?: string[]
  keywords?: string[]
  onSelect?: () => void
}

export type SearchGroup = {
  id: string
  heading: string
  items: SearchItem[]
}
