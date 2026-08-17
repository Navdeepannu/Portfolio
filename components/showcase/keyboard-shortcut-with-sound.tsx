'use client'

import { useCallback, useState } from 'react'

import {
  KeyboardShortcut,
  type KeyboardShortcutKey,
} from '@/components/ui/components/keyboard-shortcut'

const soundKeys: readonly KeyboardShortcutKey[] = [
  { key: 'Shift', label: '⇧' },
  { key: 'p', label: 'P' },
]

const raisedKeyClassName =
  'size-10 rounded-md text-sm shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] dark:shadow-[0_0_1px_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]'

export default function KeyboardShortcutWithSoundShowcase() {
  const [triggerCount, setTriggerCount] = useState(0)

  const countTrigger = useCallback(() => {
    setTriggerCount((count) => count + 1)
  }, [])

  return (
    <section className="flex min-h-64 w-full max-w-2xl flex-col rounded-xl border bg-muted/25 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-medium">Raised shortcut</h4>
          <p className="mt-1 text-xs text-muted-foreground">Size 10 + shadow · sound on</p>
        </div>
        <span className="rounded-full bg-background px-2 py-1 text-[10px] text-muted-foreground shadow-sm">
          Sound
        </span>
      </div>

      <div className="flex flex-1 items-center justify-center py-8">
        <KeyboardShortcut
          keys={soundKeys}
          sound="/sounds/key-press.mp3"
          onTrigger={countTrigger}
          className="gap-2"
          keyClassName={raisedKeyClassName}
        />
      </div>

      <p aria-live="polite" className="text-xs text-muted-foreground">
        {triggerCount > 0
          ? `Shortcut triggered ${triggerCount} ${triggerCount === 1 ? 'time' : 'times'}.`
          : 'Press ⇧ P to hear and see each key press.'}
      </p>
    </section>
  )
}
