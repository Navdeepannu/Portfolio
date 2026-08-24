export type RetiredRegistryName = {
  name: string
  reason: string
  replacement?: string
}

/** Historical outputs with no maintained canonical source. They must not reappear in `public/r`. */
export const retiredRegistryNames: RetiredRegistryName[] = [
  {
    name: 'context-section-one',
    reason: 'Legacy misspelled duplicate of the removed project gallery source.',
  },
  {
    name: 'project-gallery-one',
    reason:
      'The source implementation was removed before Phase 2; only a stale generated payload remained.',
  },
  {
    name: 'process-section-one',
    reason: 'Renamed and recategorized as a content block.',
    replacement: 'content-section-five',
  },
]
