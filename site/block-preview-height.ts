export const BLOCK_PREVIEW_HEIGHT_MESSAGE = 'block-preview-height' as const

export type BlockPreviewHeightPayload = {
  type: typeof BLOCK_PREVIEW_HEIGHT_MESSAGE
  slug: string
  height: number
}

export const BLOCK_PREVIEW_CHROME_PX = 20

export const BLOCK_PREVIEW_MIN_HEIGHT_PX = 520

export function getInitialBlockPreviewHeightPx(): number {
  if (typeof window === 'undefined') return BLOCK_PREVIEW_MIN_HEIGHT_PX
  const viewport = Math.round(window.innerHeight * 0.9)
  return Math.max(viewport, BLOCK_PREVIEW_MIN_HEIGHT_PX)
}

export function clampBlockPreviewHeightPx(contentHeightPx: number): number {
  const total = contentHeightPx + BLOCK_PREVIEW_CHROME_PX
  return Math.max(total, BLOCK_PREVIEW_MIN_HEIGHT_PX)
}

export function isBlockPreviewHeightPayload(
  data: unknown,
): data is BlockPreviewHeightPayload {
  if (!data || typeof data !== 'object') return false
  const payload = data as BlockPreviewHeightPayload
  return (
    payload.type === BLOCK_PREVIEW_HEIGHT_MESSAGE &&
    typeof payload.slug === 'string' &&
    typeof payload.height === 'number' &&
    Number.isFinite(payload.height) &&
    payload.height > 0
  )
}
