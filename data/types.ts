/** Showcase category id (known ids plus any folder-derived id). */
export type BlockCategoryId = string

export type BlockCategory = {
  id: BlockCategoryId
  name: string
  description?: string
}
