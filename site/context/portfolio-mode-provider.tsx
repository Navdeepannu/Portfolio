'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { flushSync } from 'react-dom'

import type { PortfolioMode } from '@/site/portfolio-config'
import { PORTFOLIO_MODES } from '@/site/portfolio-config'
import { ModeTransitionOverlay, type ModeTransitionOverlayRef } from './mode-transition-overlay'

const STORAGE_KEY = 'portfolio-mode'
const MODE_CHANGE_EVENT = 'portfolio-mode-change'
const DEFAULT_MODE: PortfolioMode = 'developer'

type PortfolioModeContextValue = {
  mode: PortfolioMode
  setMode: (mode: PortfolioMode) => void
  isDeveloperMode: boolean
  isRecruiterMode: boolean
  isTransitioning: boolean
}

const PortfolioModeContext = createContext<PortfolioModeContextValue | null>(null)

function isPortfolioMode(value: string | null | undefined): value is PortfolioMode {
  return !!value && (PORTFOLIO_MODES as readonly string[]).includes(value)
}

function afterNextPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve())
    })
  })
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
  if (typeof document === 'undefined') return

  document.cookie = `${STORAGE_KEY}=${mode}; path=/; max-age=31536000; SameSite=Lax`
}

function subscribeToModeChange(onStoreChange: () => void) {
  if (typeof window === 'undefined') {
    return () => {}
  }

  window.addEventListener('storage', onStoreChange)
  window.addEventListener(MODE_CHANGE_EVENT, onStoreChange)

  return () => {
    window.removeEventListener('storage', onStoreChange)
    window.removeEventListener(MODE_CHANGE_EVENT, onStoreChange)
  }
}

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function PortfolioModeProvider({
  children,
  initialMode = DEFAULT_MODE,
}: {
  children: ReactNode
  initialMode?: PortfolioMode
}) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const isTransitioningRef = useRef(false)
  const overlayRef = useRef<ModeTransitionOverlayRef>(null)

  const getStoredMode = useCallback((): PortfolioMode => {
    if (typeof window === 'undefined') {
      return initialMode
    }

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

  const commitMode = useCallback((next: PortfolioMode) => {
    window.localStorage.setItem(STORAGE_KEY, next)
    setModeCookie(next)
    window.dispatchEvent(new Event(MODE_CHANGE_EVENT))
  }, [])

  const setMode = useCallback(
    async (next: PortfolioMode) => {
      if (next === mode || isTransitioningRef.current) return

      const overlay = overlayRef.current

      if (!overlay || prefersReducedMotion()) {
        commitMode(next)
        return
      }

      isTransitioningRef.current = true
      setIsTransitioning(true)

      try {
        await overlay.transition(async () => {
          flushSync(() => {
            commitMode(next)
          })

          await afterNextPaint()
        })
      } finally {
        isTransitioningRef.current = false
        setIsTransitioning(false)
      }
    },
    [commitMode, mode],
  )

  const value = useMemo<PortfolioModeContextValue>(
    () => ({
      mode,
      setMode,
      isDeveloperMode: mode === 'developer',
      isRecruiterMode: mode === 'recruiter',
      isTransitioning,
    }),
    [isTransitioning, mode, setMode],
  )

  return (
    <PortfolioModeContext.Provider value={value}>
      {children}
      <ModeTransitionOverlay ref={overlayRef} />
    </PortfolioModeContext.Provider>
  )
}

export function usePortfolioMode(): PortfolioModeContextValue {
  const context = useContext(PortfolioModeContext)

  if (!context) {
    throw new Error('usePortfolioMode must be used within PortfolioModeProvider')
  }

  return context
}
