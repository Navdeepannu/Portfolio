import * as React from 'react'

const MOBILE_BREAKPOINT = 768
const MOBILE_QUERY = `(max-width: ${MOBILE_BREAKPOINT - 1}px)`

function subscribeToMobileQuery(callback: () => void) {
  const mediaQuery = window.matchMedia(MOBILE_QUERY)

  mediaQuery.addEventListener('change', callback)

  return () => mediaQuery.removeEventListener('change', callback)
}

function getMobileSnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches
}

function getServerMobileSnapshot() {
  return false
}

export function useIsMobile() {
  return React.useSyncExternalStore(
    subscribeToMobileQuery,
    getMobileSnapshot,
    getServerMobileSnapshot,
  )
}
