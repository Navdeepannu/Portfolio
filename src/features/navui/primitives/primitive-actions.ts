'use server'

import { cookies } from 'next/headers'

import { isPrimitive, NAVUI_PRIMITIVE_COOKIE } from '@/config/navui-primitives'

export async function setNavUIPrimitivePreference(formData: FormData): Promise<void> {
  const primitive = formData.get('primitive')
  if (!isPrimitive(primitive)) return

  const cookieStore = await cookies()
  cookieStore.set(NAVUI_PRIMITIVE_COOKIE, primitive, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
}
