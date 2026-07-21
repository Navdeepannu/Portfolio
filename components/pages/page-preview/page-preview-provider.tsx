// components/page-preview/page-preview-provider.tsx

'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type PreviewViewport = 'desktop' | 'tablet' | 'mobile'

type PagePreviewContextValue = {
  viewport: PreviewViewport
  setViewport: (viewport: PreviewViewport) => void
}

const PagePreviewContext =
  createContext<PagePreviewContextValue | null>(null)

export function PagePreviewProvider({
  children,
}: {
  children: ReactNode
}) {
  const [viewport, setViewport] =
    useState<PreviewViewport>('desktop')

  const value = useMemo(
    () => ({
      viewport,
      setViewport,
    }),
    [viewport],
  )

  return (
    <PagePreviewContext.Provider value={value}>
      {children}
    </PagePreviewContext.Provider>
  )
}

export function usePagePreview() {
  const context = useContext(PagePreviewContext)

  if (!context) {
    throw new Error(
      'usePagePreview must be used inside PagePreviewProvider',
    )
  }

  return context
}