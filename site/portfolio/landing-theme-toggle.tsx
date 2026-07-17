'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipTrigger } from '@/components/ui/tooltip'

const subscribeNoop = () => () => {}

export function LandingThemeToggle() {
  const { theme, setTheme } = useTheme()

  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

  const isDark = theme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return
      if (event.key.toLowerCase() !== 'd') return
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target

      if (target instanceof HTMLElement) {
        if (target.isContentEditable) return

        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          return
        }
      }

      event.preventDefault()
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    document.addEventListener('keydown', onKeyDown)

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [theme, setTheme])
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon-sm" onClick={toggleTheme} aria-label="Toggle theme">
          {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </TooltipTrigger>
    </Tooltip>
  )
}
