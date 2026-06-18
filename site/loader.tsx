// components/ui/custom/navigation-progress.tsx

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
  type ComponentProps,
  type ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'motion/react'

type NavigationProgressContextValue = {
  isPending: boolean
  startNavigation: (href: string) => void
}

const NavigationProgressContext =
  createContext<NavigationProgressContextValue | null>(null)

export function NavigationProgressProvider({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const [targetHref, setTargetHref] = useState<string | null>(null)

  function startNavigation(href: string) {
    if (href === pathname) return

    setTargetHref(href)

    startTransition(() => {
      router.push(href)
    })
  }

  useEffect(() => {
    setTargetHref(null)
  }, [pathname])

  const value = useMemo(
    () => ({
      isPending: isPending && targetHref !== null,
      startNavigation,
    }),
    [isPending, targetHref],
  )

  return (
    <NavigationProgressContext.Provider value={value}>
      {children}
    </NavigationProgressContext.Provider>
  )
}

function useNavigationProgress() {
  const context = useContext(NavigationProgressContext)

  if (!context) {
    throw new Error(
      'useNavigationProgress must be used inside NavigationProgressProvider',
    )
  }

  return context
}

export function NavigationProgressBar() {
  const { isPending } = useNavigationProgress()

  return (
    <AnimatePresence>
      {isPending ? (
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-50 h-px overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="h-full origin-left bg-[color-mix(in_oklab,var(--foreground)_70%,var(--background))]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 0.75 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

type ProgressLinkProps = ComponentProps<typeof Link>

export function ProgressLink({
  href,
  onClick,
  ...props
}: ProgressLinkProps) {
  const { startNavigation } = useNavigationProgress()
  const pathname = usePathname()

  return (
    <Link
      href={href}
      onClick={(event) => {
        onClick?.(event)

        if (event.defaultPrevented) return

        // Let browser handle new tab, download, external behavior, etc.
        if (
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey ||
          event.button !== 0
        ) {
          return
        }

        if (typeof href !== 'string') return
        if (href.startsWith('http')) return
        if (href.startsWith('#')) return
        if (href.includes('#')) return

        if (href === pathname) return

        event.preventDefault()
        startNavigation(href)
      }}
      {...props}
    />
  )
}