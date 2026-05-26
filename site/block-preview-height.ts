/** postMessage payload from `/preview/[slug]` → parent showcase iframe. */
export const BLOCK_PREVIEW_HEIGHT_MESSAGE = 'block-preview-height' as const

export type BlockPreviewHeightPayload = {
  type: typeof BLOCK_PREVIEW_HEIGHT_MESSAGE
  slug: string
  height: number
}

/** Padding around the iframe inside `BlockIframe` (p-1 + p-2 + borders). */
export const BLOCK_PREVIEW_CHROME_PX = 20

/**
 * 45rem — minimum showcase preview height.
 *
 * Seeds the iframe tall enough that blocks using `min-h-screen` render at a
 * reasonable size on first mount (the iframe's `innerHeight` is what
 * `min-h-screen` resolves to inside the embedded document).
 */
export const BLOCK_PREVIEW_MIN_HEIGHT_PX = 720

/**
 * Best-effort initial height used when the iframe first mounts or reloads.
 * Tries ~90% of the parent viewport so `min-h-screen` blocks render close to
 * a real viewport size. Falls back to the floor during SSR.
 */
export function getInitialBlockPreviewHeightPx(): number {
  if (typeof window === 'undefined') return BLOCK_PREVIEW_MIN_HEIGHT_PX
  const viewport = Math.round(window.innerHeight * 0.9)
  return Math.max(viewport, BLOCK_PREVIEW_MIN_HEIGHT_PX)
}

/**
 * Match the iframe to its reported content height with a sane floor.
 *
 * No upper cap on purpose: capping the iframe forces an internal scrollbar
 * for tall blocks, which traps wheel events because cross-iframe scroll
 * chaining is not supported. By sizing to content, the iframe never scrolls
 * internally and the parent page scrolls naturally over it.
 */
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
