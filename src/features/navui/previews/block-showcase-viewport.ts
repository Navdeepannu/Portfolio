/**
 * Fixed viewport for the Code tab (preview uses dynamic height via `BlockIframe`).
 * Tune max height here — mirrored in `site/block-preview-height.ts`.
 */
export const blockShowcaseCodeViewportClassName =
  'h-[min(88vh,60rem)] min-h-[24rem] max-h-[60rem] w-full min-w-0'

/** @deprecated Use `blockShowcaseCodeViewportClassName` — preview is height-auto. */
export const blockShowcaseViewportClassName = blockShowcaseCodeViewportClassName

/** Outer “gallery” frame (padding + surface) around the viewport. */
export const blockShowcaseFrameClassName =
  'rounded-xl border border-border/70 bg-muted/35 p-3 shadow-sm sm:p-4 dark:bg-muted/25'
