'use client'

import { createContext, useContext, useMemo, useState } from 'react'

export type BlocksTypeFilter = 'blocks' | 'pages'
export type BlocksViewMode = 'all-blocks' | 'by-category'

type BlockFiltersContextType = {
  query: string
  setQuery: (value: string) => void
  viewMode: BlocksViewMode
  setViewMode: (value: BlocksViewMode) => void
  type: BlocksTypeFilter
  setType: (value: BlocksTypeFilter) => void
}

const BlockFiltersContext = createContext<BlockFiltersContextType | null>(null)

export function BlockFiltersProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState<BlocksViewMode>('all-blocks')
  const [type, setType] = useState<BlocksTypeFilter>('blocks')

  const value = useMemo(
    () => ({
      query,
      setQuery,
      viewMode,
      setViewMode,
      type,
      setType,
    }),
    [query, viewMode, type],
  )

  return <BlockFiltersContext.Provider value={value}>{children}</BlockFiltersContext.Provider>
}

export function useBlockFilters() {
  const context = useContext(BlockFiltersContext)
  if (!context) throw new Error('useBlockFilters must be used within BlockFiltersProvider')
  return context
}
