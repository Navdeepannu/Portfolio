'use client'

import { useCallback, useState } from 'react'

import {
  KeyboardShortcut,
  type KeyboardShortcutKey,
} from '@/components/ui/components/keyboard-shortcut'
import { cn } from '@/lib/utils'

const commandKeys: readonly KeyboardShortcutKey[] = [
  { key: 'Meta', label: '⌘' },
  { key: 'j', label: 'J' },
]

export default function KeyboardShortcutShowcase() {
  const [commandOpen, setCommandOpen] = useState(false)

  const toggleCommand = useCallback(() => {
    setCommandOpen((open) => !open)
  }, [])

  return (
    <section className="flex min-h-64 w-full max-w-2xl flex-col rounded-xl border bg-background p-5 shadow-sm sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-medium">Navbar shortcut</h2>
          <p className="mt-1 text-xs text-muted-foreground">Default Kbd · no sound</p>
        </div>
        <span className="rounded-full bg-muted px-2 py-1 text-[10px] text-muted-foreground">
          Silent
        </span>
      </div>

      <button
        type="button"
        aria-pressed={commandOpen}
        onClick={toggleCommand}
        className={cn(
          'mt-8 flex h-10 w-full items-center justify-between gap-3 rounded-lg border px-3 text-sm transition-colors outline-none',
          'hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/50',
          commandOpen && 'border-foreground/20 bg-muted/60',
        )}
      >
        <span>{commandOpen ? 'Close command menu' : 'Open command menu'}</span>
        <KeyboardShortcut keys={commandKeys} onTrigger={toggleCommand} />
      </button>

      <p aria-live="polite" className="mt-auto pt-6 text-xs text-muted-foreground">
        {commandOpen ? 'Command menu is active.' : 'Press ⌘ J or click the row.'}
      </p>
    </section>
  )
}
