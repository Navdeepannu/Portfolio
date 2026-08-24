'use client'

import { useRef, type ComponentType, type KeyboardEvent, type SVGProps } from 'react'

import { primitiveConfig, primitives, type Primitive } from '@/config/navui-primitives'
import { setNavUIPrimitivePreference } from '@/features/navui/primitives/primitive-actions'
import { cn } from '@/lib/utils'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'

const previousKeys = new Set(['ArrowLeft', 'ArrowUp'])
const nextKeys = new Set(['ArrowRight', 'ArrowDown'])

function BaseUiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 17 24" {...props}>
      <path
        fill="currentColor"
        d="M9.5001 7.01537C9.2245 6.99837 9 7.22385 9 7.49999V23C13.4183 23 17 19.4183 17 15C17 10.7497 13.6854 7.27351 9.5001 7.01537Z"
      />
      <path
        fill="currentColor"
        d="M8 9.8V12V23C3.58172 23 0 19.0601 0 14.2V12V1C4.41828 1 8 4.93989 8 9.8Z"
      />
    </svg>
  )
}

function ReactAriaIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="200 206 800 790" fill="none" {...props}>
      <path
        d="M720.67 205.995C867.583 205.995 986.679 325.091 986.68 472.003C986.68 590.753 908.865 691.325 801.446 725.521L979.312 948.055C994.438 966.98 980.963 995 956.736 995H795.612C778.743 995 762.715 987.629 751.734 974.823L697.365 911.421L493.126 653.39C457.134 607.918 489.518 540.979 547.511 540.977L720.67 540.971C758.758 540.971 789.635 510.091 789.635 472.003C789.634 433.915 758.758 403.038 720.67 403.038H429.939C404.955 403.038 388.623 391.886 373.994 373.623L277.349 252.966C262.194 234.045 275.664 205.996 299.905 205.995H720.67Z M396.605 720.706C407.798 705.406 430.443 704.843 442.381 719.568L503.816 797.018H502.786L535.569 838.934C548.074 854.358 549.943 877.191 538.047 893.09L476.638 972.545C465.692 986.707 448.803 995 430.903 995H242.276C218.18 995 204.665 967.248 219.523 948.278L337.992 797.018H337.923L396.605 720.706Z"
        fill="currentColor"
      />
    </svg>
  )
}

function RadixUiIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M11.52 24a7.68 7.68 0 0 1-7.68-7.68 7.68 7.68 0 0 1 7.68-7.68V24Zm0-24v7.68H3.84V0h7.68Zm4.8 7.68a3.84 3.84 0 1 1 0-7.68 3.84 3.84 0 0 1 0 7.68Z"
      />
    </svg>
  )
}

const primitiveIcons = {
  base: BaseUiIcon,
  aria: ReactAriaIcon,
  radix: RadixUiIcon,
} satisfies Record<Primitive, ComponentType<SVGProps<SVGSVGElement>>>

export default function PrimitiveSelector({
  itemSlug,
  primitive,
}: {
  itemSlug?: string
  primitive: Primitive
}) {
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
        const Icon = primitiveIcons[value]

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
              'ph-no-capture',
              'flex h-7 items-center gap-1.5 rounded-md px-2 text-xs font-medium whitespace-nowrap text-muted-foreground transition-[background-color,color,box-shadow] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/60 motion-reduce:transition-none sm:px-2.5',
              isSelected && 'bg-background text-foreground shadow-sm',
            )}
            onClick={() => {
              if (value === primitive) return
              trackAnalyticsEvent(ANALYTICS_EVENTS.PRIMITIVE_CHANGED, {
                from: primitive,
                to: value,
                item_type: itemSlug ? 'block' : undefined,
                item_slug: itemSlug,
              })
            }}
            onKeyDown={(event) => selectWithKeyboard(event, index)}
          >
            <Icon aria-hidden="true" className="size-3.5 shrink-0" />
            {primitiveConfig[value].label}
          </button>
        )
      })}
    </form>
  )
}
