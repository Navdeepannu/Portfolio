export const ANALYTICS_EVENTS = {
  CATALOG_ITEM_VIEWED: 'catalog_item_viewed',
  CLI_COMMAND_COPIED: 'cli_command_copied',
  CODE_COPIED: 'code_copied',
  COMMAND_MENU_ITEM_SELECTED: 'command_menu_item_selected',
  EXTERNAL_LINK_CLICKED: 'external_link_clicked',
  LANDING_CTA_CLICKED: 'landing_cta_clicked',
  PRIMITIVE_CHANGED: 'primitive_changed',
  THEME_CHANGED: 'theme_changed',
} as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]

export type CatalogItemType = 'block' | 'component' | 'illustration'
export type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn'
export type PrimitiveId = 'aria' | 'base' | 'radix'

type AnalyticsBaseProperties = {
  pathname?: string
}

export type AnalyticsEventProperties = {
  [ANALYTICS_EVENTS.CATALOG_ITEM_VIEWED]: AnalyticsBaseProperties & {
    item_type: 'block'
    item_slug: string
    item_title?: string
    primitive?: PrimitiveId
    source: 'block_category'
  }
  [ANALYTICS_EVENTS.CLI_COMMAND_COPIED]: AnalyticsBaseProperties & {
    item_type: CatalogItemType
    item_slug: string
    item_title?: string
    package_manager?: PackageManager
    primitive?: PrimitiveId
    source:
      | 'block_detail'
      | 'component_detail_header'
      | 'component_gallery'
      | 'component_installation'
      | 'illustration_catalog'
      | 'illustration_detail'
  }
  [ANALYTICS_EVENTS.CODE_COPIED]: AnalyticsBaseProperties & {
    item_type: CatalogItemType
    item_slug: string
    item_title?: string
    primitive?: PrimitiveId
    example_id?: string
    source:
      | 'block_detail'
      | 'component_detail'
      | 'component_example'
      | 'component_manual_install'
      | 'component_utility'
      | 'illustration_detail'
  }
  [ANALYTICS_EVENTS.COMMAND_MENU_ITEM_SELECTED]: AnalyticsBaseProperties & {
    site: 'navui' | 'portfolio'
    destination_type:
      | 'action'
      | 'blog'
      | 'block'
      | 'component'
      | 'navigation'
      | 'page'
      | 'portfolio'
      | 'social'
    destination: string
    item_slug?: string
  }
  [ANALYTICS_EVENTS.EXTERNAL_LINK_CLICKED]: AnalyticsBaseProperties & {
    destination_type: 'github' | 'portfolio' | 'project' | 'resume' | 'social' | 'other'
    destination: string
    source:
      | 'navui_footer'
      | 'navui_mobile_navbar'
      | 'navui_navbar'
      | 'portfolio_content'
      | 'portfolio_hero'
      | 'portfolio_mobile_navbar'
      | 'portfolio_navbar'
  }
  [ANALYTICS_EVENTS.LANDING_CTA_CLICKED]: AnalyticsBaseProperties & {
    cta: 'browse_components' | 'explore_blocks' | 'view_github'
    destination: string
    location: 'blocks_section' | 'components_section' | 'hero'
  }
  [ANALYTICS_EVENTS.PRIMITIVE_CHANGED]: AnalyticsBaseProperties & {
    from: PrimitiveId
    to: PrimitiveId
    item_type?: 'block'
    item_slug?: string
  }
  [ANALYTICS_EVENTS.THEME_CHANGED]: AnalyticsBaseProperties & {
    from: 'dark' | 'light'
    to: 'dark' | 'light'
    source: 'keyboard' | 'navui_navbar' | 'portfolio_navbar' | 'preview_navbar'
  }
}

export type CodeCopyAnalyticsContext = Omit<
  AnalyticsEventProperties[typeof ANALYTICS_EVENTS.CODE_COPIED],
  'pathname'
>
