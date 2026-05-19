/** postMessage payload from `/preview/[slug]` → parent showcase iframe. */
export const BLOCK_PREVIEW_HEIGHT_MESSAGE = 'block-preview-height' as const

export type BlockPreviewHeightPayload = {
  type: typeof BLOCK_PREVIEW_HEIGHT_MESSAGE
  slug: string
  height: number
}

/** Padding around the iframe inside `BlockIframe` (p-1 + p-2 + borders). */
export const BLOCK_PREVIEW_CHROME_PX = 20

/** 24rem — minimum showcase preview height. */
export const BLOCK_PREVIEW_MIN_HEIGHT_PX = 384

/** 60rem at 16px root — upper cap before the preview scrolls internally. */
export const BLOCK_PREVIEW_MAX_HEIGHT_REM = 60

export function getBlockPreviewMaxHeightPx(): number {
  if (typeof window === 'undefined') {
    return BLOCK_PREVIEW_MAX_HEIGHT_REM * 16
  }
  return Math.min(window.innerHeight * 0.88, BLOCK_PREVIEW_MAX_HEIGHT_REM * 16)
}

export function clampBlockPreviewHeightPx(contentHeightPx: number): number {
  const total = contentHeightPx + BLOCK_PREVIEW_CHROME_PX
  return Math.min(
    Math.max(total, BLOCK_PREVIEW_MIN_HEIGHT_PX),
    getBlockPreviewMaxHeightPx(),
  )
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
