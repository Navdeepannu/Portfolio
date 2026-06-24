'use client'

import { useSyncExternalStore, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

const subscribeNoop = () => () => {}

function getStandaloneSnapshot(): boolean {
  try {
    return window.self === window.top
  } catch {
    return false
  }
}

function useIsStandalone() {
  return useSyncExternalStore(subscribeNoop, getStandaloneSnapshot, () => false)
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  )

  const isDark = theme === 'dark'

  return (
    <Button
      variant="outline"
      size="icon-sm"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label="Toggle theme"
      className="rounded-full"
    >
      {mounted && isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  )
}

export function PreviewNavbar({ name, fallbackHref }: { name: string; fallbackHref: string }) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }

    router.push(fallbackHref)
  }

  return (
    <header className="fixed inset-x-4 bottom-10 z-20 mx-auto grid h-12 w-[calc(100%-2rem)] max-w-xl shrink-0 grid-cols-[1fr_auto_1fr] items-center rounded-full border border-border bg-background/80 px-4 shadow-xs backdrop-blur-md">
      <Button
        variant="ghost"
        size="sm"
        className="gap-1.5 justify-self-start rounded-full text-muted-foreground hover:text-foreground"
        onClick={handleBack}
      >
        <ArrowLeft className="size-4" />
        Back
      </Button>

      <span className="max-w-[40vw] truncate text-sm font-medium text-foreground">{name}</span>

      <div className="justify-self-end">
        <ThemeToggle />
      </div>
    </header>
  )
}

export default function PreviewShell({
  name,
  fallbackHref,
  children,
}: {
  name: string
  fallbackHref: string
  children: ReactNode
}) {
  const standalone = useIsStandalone()

  if (!standalone) return <>{children}</>

  return (
    <div className="min-h-screen py-12">
      <PreviewNavbar name={name} fallbackHref={fallbackHref} />

      <div >{children}</div>
    </div>
  )
}
