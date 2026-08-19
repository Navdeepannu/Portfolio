'use client'

import { useCallback, useState } from 'react'

import {
  KeyboardShortcut,
  type KeyboardShortcutKey,
} from '@/components/ui/components/keyboard-shortcut'
import { cn } from '@/lib/utils'

const commandKeys: readonly KeyboardShortcutKey[] = [
  { key: 'Meta', label: '⌘' },
  { key: 'k', label: 'K' },
]

export default function KeyboardShortcutGalleryPreview() {
  const [open, setOpen] = useState(false)

  const toggle = useCallback(() => {
    setOpen((current) => !current)
  }, [])

  return (
    <button
      type="button"
      aria-pressed={open}
      onClick={toggle}
      className={cn(
        'flex h-11 w-full max-w-md items-center justify-between gap-4 rounded-xl border bg-background px-3.5 text-sm shadow-xs transition-[background-color,border-color,box-shadow] duration-150 outline-none',
        'hover:bg-muted/50 focus-visible:ring-2 focus-visible:ring-ring/50',
        open && 'border-foreground/20 shadow-sm',
      )}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        <span
          aria-hidden="true"
          className={cn(
            'size-1.5 shrink-0 rounded-full bg-muted-foreground/40',
            open && 'bg-foreground',
          )}
        />
        <span className="truncate">{open ? 'Command menu open' : 'Open command menu'}</span>
      </span>

      <KeyboardShortcut keys={commandKeys} onTrigger={toggle} />
    </button>
  )
}
