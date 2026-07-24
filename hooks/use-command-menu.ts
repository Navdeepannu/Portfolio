'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Self-contained controller for the global command palette.
 *
 * - Tracks `open` state for the dialog.
 * - Binds the global ⌘K / Ctrl+K shortcut to toggle it.
 * - Safely ignores the shortcut while typing inside editable fields.
 */
export function useCommandMenu() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => setOpen((prev) => !prev), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return
      if (event.key.toLowerCase() !== 'k') return
      if (!(event.metaKey || event.ctrlKey)) return

      const target = event.target
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLElement && target.isContentEditable)
      ) {
        return
      }

      event.preventDefault()
      setOpen((prev) => !prev)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return { open, setOpen, toggle }
}
