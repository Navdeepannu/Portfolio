'use client'

import { useRef, type KeyboardEvent } from 'react'

import { primitiveConfig, primitives, type Primitive } from '@/config/navui-primitives'
import { setNavUIPrimitivePreference } from '@/features/navui/primitives/primitive-actions'
import { cn } from '@/lib/utils'

const previousKeys = new Set(['ArrowLeft', 'ArrowUp'])
const nextKeys = new Set(['ArrowRight', 'ArrowDown'])

export default function PrimitiveSelector({ primitive }: { primitive: Primitive }) {
  const buttonsRef = useRef<Array<HTMLButtonElement | null>>([])

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined

    if (previousKeys.has(event.key)) nextIndex = (index - 1 + primitives.length) % primitives.length
    if (nextKeys.has(event.key)) nextIndex = (index + 1) % primitives.length
    if (event.key === 'Home') nextIndex = 0
    if (event.key === 'End') nextIndex = primitives.length - 1
    if (nextIndex === undefined) return

    event.preventDefault()
    const nextButton = buttonsRef.current[nextIndex]
    nextButton?.focus()
    nextButton?.click()
  }

  return (
    <form
      action={setNavUIPrimitivePreference}
      role="radiogroup"
      aria-label="Primitive implementation"
      className="flex h-9 min-w-0 items-center gap-1 rounded-lg bg-muted p-1"
    >
      {primitives.map((value, index) => {
        const isSelected = primitive === value

        return (
          <button
            key={value}
            ref={(button) => {
              buttonsRef.current[index] = button
            }}
            type="submit"
            name="primitive"
            value={value}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            className={cn(
              'h-7 rounded-md px-2 text-xs font-medium whitespace-nowrap text-muted-foreground transition-[background-color,color,box-shadow] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none sm:px-2.5',
              isSelected && 'bg-background text-foreground shadow-sm',
            )}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            {primitiveConfig[value].label}
          </button>
        )
      })}
    </form>
  )
}
