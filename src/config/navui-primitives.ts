export const primitives = ['base', 'aria', 'radix'] as const

export type Primitive = (typeof primitives)[number]

export type PrimitiveConfig = {
  label: string
}

export const primitiveConfig = {
  base: { label: 'Base UI' },
  aria: { label: 'React Aria' },
  radix: { label: 'Radix UI' },
} satisfies Record<Primitive, PrimitiveConfig>

export const DEFAULT_NAVUI_PRIMITIVE: Primitive = 'radix'
export const NAVUI_PRIMITIVE_COOKIE = 'navui-primitive'

export function isPrimitive(value: unknown): value is Primitive {
  return typeof value === 'string' && primitives.some((primitive) => primitive === value)
}

export function parsePrimitive(value: unknown): Primitive {
  return isPrimitive(value) ? value : DEFAULT_NAVUI_PRIMITIVE
}
