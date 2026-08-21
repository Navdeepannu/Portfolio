import { defineComponent } from '@/registry/define-component'
import { defineComponentItem } from '@/registry/components/component-item'

export const keyboardShortcutItem = defineComponentItem(
  defineComponent({
    slug: 'keyboard-shortcut',
    status: 'published',
    title: 'Keyboard Shortcut',
    image: '/component-previews/keyboard-shortcut.svg',
    description:
      'A keyboard shortcut display that reacts to each pressed key, triggers a callback when the full chord is held, and optionally plays key sounds.',
    registryDescription:
      'Interactive keyboard shortcut display with pressed-key feedback, callback handling, optional sound, and shadcn Kbd styling.',
    category: 'interactive',
    tags: ['keyboard', 'shortcut', 'command menu', 'interaction', 'accessibility'],
    bento: { size: 'md' },
    gallery: {
      size: 'standard',
      height: 'md',
      treatment: 'muted',
      label: 'Keyboard shortcut command-menu trigger preview',
    },
    useCases: [
      'Navbar command-menu triggers',
      'Search and command palettes',
      'Editor and dashboard shortcuts',
      'Keyboard-driven onboarding',
    ],
    sourceFiles: [
      { path: 'src/registry/components/keyboard-shortcut/keyboard-shortcut.tsx', language: 'tsx' },
      {
        path: 'src/registry/components/keyboard-shortcut/keyboard-shortcut.demo.tsx',
        language: 'tsx',
        filename: 'demo.tsx',
      },
    ],
    registry: {
      dependencies: [],
      registryDependencies: ['kbd'],
    },
    usageExample: `'use client'

import { KeyboardShortcut } from '@/components/keyboard-shortcut'

const commandKeys = [
  { key: 'Meta', label: '⌘' },
  { key: 'k', label: 'K' },
]

export function NavbarShortcut({ onOpenCommand }: { onOpenCommand: () => void }) {
  return (
    <button onClick={onOpenCommand} className="flex items-center gap-3 rounded-lg border px-3 py-2">
      Open command menu
      <KeyboardShortcut keys={commandKeys} onTrigger={onOpenCommand} />
    </button>
  )
}

export function RaisedShortcut() {
  return (
    <KeyboardShortcut
      keys={[
        { key: 'Shift', label: '⇧' },
        { key: 'p', label: 'P' },
      ]}
      sound="/sounds/key-press.mp3"
      keyClassName="size-10 rounded-md shadow-sm"
    />
  )
}`,
    api: [
      {
        prop: 'keys',
        type: 'readonly KeyboardShortcutKey[]',
        default: '-',
        description:
          'The event.key values to match, with optional React labels for the visible Kbd keys.',
      },
      {
        prop: 'onTrigger',
        type: '(event: KeyboardEvent) => void',
        default: '-',
        description:
          'Called once when every configured key is held; it can open a command menu or run any shortcut action.',
      },
      {
        prop: 'sound / soundVolume',
        type: 'string / number',
        default: '- / 0.5',
        description:
          'Optional audio URL and volume from 0 to 1. The sound plays as each matching key is pressed.',
      },
      {
        prop: 'preventDefault',
        type: 'boolean',
        default: 'true',
        description: 'Prevents the browser default only after the full shortcut is matched.',
      },
      {
        prop: 'disabled',
        type: 'boolean',
        default: 'false',
        description: 'Stops listening for the shortcut while preserving its visual presentation.',
      },
      {
        prop: 'className',
        type: 'string',
        default: '-',
        description: 'Classes merged onto the Kbd group, such as a custom gap.',
      },
      {
        prop: 'keyClassName / pressedKeyClassName',
        type: 'string / string',
        default: '- / focus-ring treatment',
        description:
          'Classes applied to every key and to its active state. Use keyClassName for size-10 or raised shadows.',
      },
      {
        prop: 'aria-label',
        type: 'string',
        default: 'Generated from keys',
        description: 'Accessible name for the displayed shortcut group.',
      },
    ],
  }),
  '@/registry/components/keyboard-shortcut/keyboard-shortcut.demo',
  [
    {
      id: 'with-sound',
      title: 'With sound',
      description:
        'Pass a browser-readable audio URL to add audible feedback while preserving the same pressed-key ring.',
      sourceFiles: [
        {
          path: 'src/registry/components/keyboard-shortcut/keyboard-shortcut-with-sound.demo.tsx',
          language: 'tsx',
          filename: 'with-sound.tsx',
        },
      ],
      previewModule: '@/registry/components/keyboard-shortcut/keyboard-shortcut-with-sound.demo',
    },
  ],
)
