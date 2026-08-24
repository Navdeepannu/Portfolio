'use client'

import { createContext, useContext, type ReactNode } from 'react'

import { DEFAULT_NAVUI_PRIMITIVE, type Primitive } from '@/config/navui-primitives'

const PrimitiveContext = createContext<Primitive>(DEFAULT_NAVUI_PRIMITIVE)

export function PrimitiveProvider({
  children,
  primitive,
}: {
  children: ReactNode
  primitive: Primitive
}) {
  return <PrimitiveContext.Provider value={primitive}>{children}</PrimitiveContext.Provider>
}

export function useNavUIPrimitive(): Primitive {
  return useContext(PrimitiveContext)
}
