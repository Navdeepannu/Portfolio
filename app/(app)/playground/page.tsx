'use client'

import { KeyboardShortcut } from '@/components/ui/components/keyboard-shortcut'

export default function Page() {
  return (
    <main className="max-w-6xl px-12">
      <h1 className="py-20 font-geist text-9xl font-bold tracking-tight text-shadow-accent text-shadow-xs">
        Keyboard Shortcut
      </h1>

      <div>
        <KeyboardShortcut
          keys={[
            { key: 'Meta', label: '⌘' },
            { key: 'k', label: 'K' },
          ]}
          sound="/sounds/key-press.mp3"
          className="gap-2"
          keyClassName="size-10 rounded-md shadow-[0px_0px_1px_0px_rgba(0,0,0,0.5),0px_1px_1px_0px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(255,255,255,1)_inset] dark:shadow-[0_0_1px_rgba(255,255,255,0.16),0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.08)]"
          onTrigger={() => {
            // Open command menu here
          }}
        />
      </div>
    </main>
  )
}
