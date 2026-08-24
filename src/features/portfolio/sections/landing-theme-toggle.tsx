'use client'

import { Moon, Sun } from 'lucide-react'
import { useSyncExternalStore } from 'react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Kbd } from '@/components/ui/kbd'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'

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
    const from = isDark ? 'dark' : 'light'
    const to = isDark ? 'light' : 'dark'
    setTheme(to)
    trackAnalyticsEvent(ANALYTICS_EVENTS.THEME_CHANGED, {
      from,
      to,
      source: 'portfolio_navbar',
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          className="ph-no-capture"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>Toggle theme</span>
        <Kbd>D</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
