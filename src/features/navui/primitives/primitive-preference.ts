import { cache } from 'react'
import { cookies } from 'next/headers'

import { NAVUI_PRIMITIVE_COOKIE, parsePrimitive, type Primitive } from '@/config/navui-primitives'

export const getNavUIPrimitivePreference = cache(async (): Promise<Primitive> => {
  const cookieStore = await cookies()
  return parsePrimitive(cookieStore.get(NAVUI_PRIMITIVE_COOKIE)?.value)
})
