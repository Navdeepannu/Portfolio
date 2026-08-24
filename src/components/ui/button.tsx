'use client'

import type { ComponentType } from 'react'

import { useNavUIPrimitive } from '@/features/navui/primitives/primitive-provider'
import { Button as AriaButton } from '@/registry/primitives/aria/button'
import { Button as BaseButton } from '@/registry/primitives/base/button'
import {
  Button as RadixButton,
  buttonVariants,
  type ButtonProps,
} from '@/registry/primitives/radix/button'

const buttonImplementations = {
  base: BaseButton,
  aria: AriaButton,
  radix: RadixButton,
} as const

function Button(props: ButtonProps) {
  const primitive = useNavUIPrimitive()
  const PrimitiveButton = buttonImplementations[primitive] as ComponentType<ButtonProps>

  return <PrimitiveButton {...props} />
}

export { Button, buttonVariants }
export type { ButtonProps }
