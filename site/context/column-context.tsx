'use client'

import { createContext, useContext, useState } from 'react'

type Columns = 2 | 3

type ColumnsContextType = {
  columns: Columns
  setColumns: (c: Columns) => void
}

const ColumnsContext = createContext<ColumnsContextType | null>(null)

export function ColumnsProvider({ children }: { children: React.ReactNode }) {
  const [columns, setColumns] = useState<Columns>(3)

  return (
    <ColumnsContext.Provider value={{ columns, setColumns }}>
      {children}
    </ColumnsContext.Provider>
  )
}

export function useColumns() {
  const context = useContext(ColumnsContext)
  if (!context) {
    throw new Error('useColumns must be used within ColumnsProvider')
  }
  return context
}