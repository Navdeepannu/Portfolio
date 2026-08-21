'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { cn } from '@/lib/utils'

export type KeyboardShortcutKey = {
  key: string
  label?: ReactNode
}

export type KeyboardShortcutProps = {
  keys: readonly KeyboardShortcutKey[]
  sound?: string
  soundVolume?: number
  onTrigger?: (event: KeyboardEvent) => void
  preventDefault?: boolean
  disabled?: boolean
  className?: string
  keyClassName?: string
  pressedKeyClassName?: string
  'aria-label'?: string
}

const defaultKeyClassName = 'transition-shadow duration-75 motion-reduce:transition-none'

const defaultPressedKeyClassName = 'ring-1 ring-ring ring-offset-1 ring-offset-background'

function normalizeKey(key: string) {
  return key.toLowerCase()
}

export function KeyboardShortcut({
  keys,
  sound,
  soundVolume = 0.5,
  onTrigger,
  preventDefault = true,
  disabled = false,
  className,
  keyClassName,
  pressedKeyClassName,
  'aria-label': ariaLabel,
}: KeyboardShortcutProps) {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  const pressedKeysRef = useRef<Set<string>>(new Set())
  const hasTriggeredRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!sound) {
      audioRef.current = null
      return
    }

    const audio = new Audio(sound)
    audio.preload = 'auto'
    audioRef.current = audio

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [sound])

  useEffect(() => {
    if (disabled) return

    const shortcutKeys = keys.map(({ key }) => normalizeKey(key))

    const playKeySound = () => {
      if (!audioRef.current) return

      const audio = audioRef.current.cloneNode() as HTMLAudioElement
      audio.volume = Math.min(1, Math.max(0, soundVolume))
      void audio.play().catch(() => {})
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.repeat) return

      const currentKey = normalizeKey(event.key)
      if (!shortcutKeys.includes(currentKey)) return

      playKeySound()

      const nextPressedKeys = new Set(pressedKeysRef.current)
      nextPressedKeys.add(currentKey)

      pressedKeysRef.current = nextPressedKeys
      setPressedKeys(new Set(nextPressedKeys))

      const shortcutComplete = shortcutKeys.every((key) => nextPressedKeys.has(key))

      if (shortcutComplete && !hasTriggeredRef.current) {
        if (preventDefault) event.preventDefault()

        hasTriggeredRef.current = true
        onTrigger?.(event)
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      const currentKey = normalizeKey(event.key)
      if (!shortcutKeys.includes(currentKey)) return

      const nextPressedKeys = new Set(pressedKeysRef.current)
      nextPressedKeys.delete(currentKey)

      pressedKeysRef.current = nextPressedKeys
      setPressedKeys(new Set(nextPressedKeys))
      hasTriggeredRef.current = false
    }

    const resetPressedKeys = () => {
      pressedKeysRef.current = new Set()
      setPressedKeys(new Set())
      hasTriggeredRef.current = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    window.addEventListener('blur', resetPressedKeys)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('blur', resetPressedKeys)
    }
  }, [disabled, keys, onTrigger, preventDefault, soundVolume])

  const accessibleLabel =
    ariaLabel ?? `Keyboard shortcut: ${keys.map(({ key }) => key).join(' + ')}`

  return (
    <KbdGroup
      aria-label={accessibleLabel}
      aria-keyshortcuts={keys.map(({ key }) => key).join('+')}
      className={className}
    >
      {keys.map(({ key, label }, index) => {
        const normalizedKey = normalizeKey(key)
        const isPressed = pressedKeys.has(normalizedKey)

        return (
          <Kbd
            key={`${normalizedKey}-${index}`}
            data-key={key}
            data-pressed={isPressed}
            className={cn(
              defaultKeyClassName,
              keyClassName,
              isPressed && defaultPressedKeyClassName,
              isPressed && pressedKeyClassName,
            )}
          >
            {label ?? key}
          </Kbd>
        )
      })}
    </KbdGroup>
  )
}
