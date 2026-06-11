'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'

import type { PortfolioMode } from '@/site/portfolio-config'
import { PORTFOLIO_MODES } from '@/site/portfolio-config'

const STORAGE_KEY = 'portfolio-mode'
const MODE_CHANGE_EVENT = 'portfolio-mode-change'
const DEFAULT_MODE: PortfolioMode = 'developer'

type PortfolioModeContextValue = {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
  isDeveloperMode: boolean
  isRecruiterMode: boolean
}

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null)

function isPortfolioMode(value: string | null | undefined): value is PortfolioMode {
  return !!value && (PORTFOLIO_MODES as readonly string[]).includes(value)
}

function getCookieMode(): PortfolioMode | null {
  if (typeof document === 'undefined') return null

  const value = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${STORAGE_KEY}=`))
    ?.split('=')[1]

  return isPortfolioMode(value) ? value : null
}

function setModeCookie(mode: PortfolioMode) {
  document.cookie = `${STORAGE_KEY}=${mode}; path=/; max-age=31536000; SameSite=Lax`
}

function subscribeToModeChange(onStoreChange: () => void) {
  window.addEventListener('storage', onStoreChange)
  window.addEventListener(MODE_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(MODE_CHANGE_EVENT, onStoreChange)
  }
}

export function PortfolioModeProvider({
  children,
  initialMode = DEFAULT_MODE,
}: {
  children: ReactNode
  initialMode?: PortfolioMode
}) {
  const getStoredMode = useCallback((): PortfolioMode => {
    const stored = window.localStorage.getItem(STORAGE_KEY)

    if (isPortfolioMode(stored)) {
      return stored
    }

    const cookieMode = getCookieMode()

    if (cookieMode) {
      return cookieMode
    }

    return initialMode
  }, [initialMode])

  const getServerMode = useCallback((): PortfolioMode => {
    return initialMode
  }, [initialMode])

  const mode = useSyncExternalStore(subscribeToModeChange, getStoredMode, getServerMode)

  const setMode = useCallback((next: PortfolioMode) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    setModeCookie(next)
    window.dispatchEvent(new Event(MODE_CHANGE_EVENT))
  }, [])

  const value = useMemo<PortfolioModeContextValue>(
    () => ({
      mode,
      setMode,
      isDeveloperMode: mode === 'developer',
      isRecruiterMode: mode === 'recruiter',
    }),
    [mode, setMode],
  )

  return <PortfolioModeContext.Provider value={value}>{children}</PortfolioModeContext.Provider>
}

export function usePortfolioMode(): PortfolioModeContextValue {
  const context = useContext(PortfolioModeContext)

  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }

  return context
}
