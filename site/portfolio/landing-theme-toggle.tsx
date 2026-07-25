'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
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
