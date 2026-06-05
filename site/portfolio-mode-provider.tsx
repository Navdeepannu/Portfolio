'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { PortfolioMode } from '@/site/portfolio-config'
import { PORTFOLIO_MODES } from '@/site/portfolio-config'

const STORAGE_KEY = 'portfolio-mode'

type PortfolioModeContextValue = {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
  isDeveloperMode: boolean
  isRecruiterMode: boolean
  /** False until client has read localStorage — use to avoid hydration flashes in optional UI. */
  isReady: boolean
}

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null)

function isPortfolioMode(value: string | null): value is PortfolioMode {
  return value !== null && (PORTFOLIO_MODES as readonly string[]).includes(value)
}

export function PortfolioModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>('developer')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isPortfolioMode(stored)) setModeState(stored)
    setIsReady(true)
  }, [])

  const setMode = useCallback((next: PortfolioMode) => {
    setModeState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const value = useMemo<PortfolioModeContextValue>(
    () => ({
      mode,
      setMode,
      isDeveloperMode: mode === 'developer',
      isRecruiterMode: mode === 'recruiter',
      isReady,
    }),
    [mode, setMode, isReady],
  )

  return (
    <PortfolioModeContext.Provider value={value}>{children}</PortfolioModeContext.Provider>
  )
}

export function usePortfolioMode(): PortfolioModeContextValue {
  const context = useContext(PortfolioModeContext)
  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }
  return context
}
