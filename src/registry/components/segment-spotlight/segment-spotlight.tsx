'use client'

import * as React from 'react'
import { Slot } from 'radix-ui'
import { motion, useReducedMotion } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { cn } from '@/lib/utils'

const segmentVariants = {
  default: 'bg-foreground text-background shadow-foreground/20',
  blue: 'bg-blue-600 text-white shadow-blue-600/25',
  purple: 'bg-violet-600 text-white shadow-violet-600/25',
  green: 'bg-emerald-600 text-white shadow-emerald-600/25',
  pink: 'bg-pink-600 text-white shadow-pink-600/25',
  teal: 'bg-teal-600 text-white shadow-teal-600/25',
  orange: 'bg-orange-500 text-white shadow-orange-500/25',
  red: 'bg-red-600 text-white shadow-red-600/25',
  yellow: 'bg-yellow-400 text-zinc-950 shadow-yellow-400/25',
} as const

type SegmentSpotlightVariant = keyof typeof segmentVariants
type SegmentSpotlightActivationMode = 'hover' | 'click'

type SegmentSpotlightContextValue = {
  activeValue: string | null
  activeTargets: ReadonlySet<string>
  activationMode: SegmentSpotlightActivationMode
  prefersReducedMotion: boolean
  setActiveValue: (value: string | null) => void
  registerTrigger: (value: string, targets: string[]) => () => void
}

const SegmentSpotlightContext = React.createContext<SegmentSpotlightContextValue | null>(null)

function useSegmentSpotlight() {
  const context = React.useContext(SegmentSpotlightContext)

  if (!context) {
    throw new Error('SegmentSpotlight components must be used within <SegmentSpotlight>.')
  }

  return context
}

type SegmentSpotlightProps = Omit<React.ComponentProps<'div'>, 'defaultValue'> & {
  value?: string | null
  defaultValue?: string | null
  onValueChange?: (value: string | null) => void
  activationMode?: SegmentSpotlightActivationMode
}

function SegmentSpotlight({
  value: valueProp,
  defaultValue = null,
  onValueChange,
  activationMode = 'hover',
  className,
  children,
  ...props
}: SegmentSpotlightProps) {
  const prefersReducedMotion = useReducedMotion()
  const [targetsByValue, setTargetsByValue] = React.useState<Map<string, string[]>>(new Map())
  const [activeValue = null, setActiveValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  })

  const registerTrigger = React.useCallback((value: string, targets: string[]) => {
    setTargetsByValue((current) => {
      const next = new Map(current)
      next.set(value, targets)
      return next
    })

    return () => {
      setTargetsByValue((current) => {
        const next = new Map(current)
        next.delete(value)
        return next
      })
    }
  }, [])

  const activeTargets = React.useMemo(
    () => new Set(activeValue ? (targetsByValue.get(activeValue) ?? []) : []),
    [activeValue, targetsByValue],
  )

  return (
    <SegmentSpotlightContext.Provider
      value={{
        activeValue,
        activeTargets,
        activationMode,
        prefersReducedMotion: Boolean(prefersReducedMotion),
        setActiveValue,
        registerTrigger,
      }}
    >
      <div
        data-slot="segment-spotlight"
        data-state={activeValue ? 'active' : 'idle'}
        className={cn('relative w-full', className)}
        {...props}
      >
        {children}
      </div>
    </SegmentSpotlightContext.Provider>
  )
}

function SegmentSpotlightViewport({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-viewport"
      className={cn('relative min-h-135 overflow-hidden bg-background', className)}
      {...props}
    />
  )
}

function SegmentSpotlightGrid({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-grid"
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] bg-[size:40px_40px] opacity-60',
        className,
      )}
      {...props}
    />
  )
}

type SegmentSpotlightSegmentProps = Omit<React.ComponentProps<typeof motion.div>, 'children'> & {
  value: string
  variant?: SegmentSpotlightVariant
  children?: React.ReactNode
}

function SegmentSpotlightSegment({
  value,
  variant = 'default',
  className,
  children,
  initial,
  animate,
  transition,
  ...props
}: SegmentSpotlightSegmentProps) {
  const context = useSegmentSpotlight()
  const hasActiveValue = context.activeValue !== null
  const isActive = hasActiveValue && context.activeTargets.has(value)
  const isMuted = hasActiveValue && !isActive

  return (
    <motion.div
      data-slot="segment-spotlight-segment"
      data-state={isActive ? 'active' : isMuted ? 'muted' : 'idle'}
      initial={
        initial ??
        (context.prefersReducedMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.96, filter: 'blur(6px)' })
      }
      animate={
        animate ?? {
          opacity: isMuted ? 0.24 : 1,
          y: isActive ? -4 : 0,
          scale: isActive ? 1.06 : 1,
          filter: isMuted ? 'blur(5px)' : 'blur(0px)',
        }
      }
      transition={
        transition ?? {
          duration: context.prefersReducedMotion ? 0 : 0.38,
          ease: [0.16, 1, 0.3, 1],
        }
      }
      className={cn(
        'absolute z-10 rounded-lg px-3 py-1.5 text-sm font-medium shadow-xl ring-1 ring-black/5 will-change-transform dark:ring-white/10',
        segmentVariants[variant],
        isActive && 'z-20',
        className,
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
}

function SegmentSpotlightToolbar({
  className,
  onPointerLeave,
  onBlur,
  initial,
  animate,
  transition,
  ...props
}: React.ComponentProps<typeof motion.div>) {
  const context = useSegmentSpotlight()

  function handlePointerLeave(event: React.PointerEvent<HTMLDivElement>) {
    onPointerLeave?.(event)

    if (
      !event.defaultPrevented &&
      context.activationMode === 'hover' &&
      event.pointerType === 'mouse'
    ) {
      context.setActiveValue(null)
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    onBlur?.(event)

    if (!event.defaultPrevented && !event.currentTarget.contains(event.relatedTarget)) {
      context.setActiveValue(null)
    }
  }

  return (
    <motion.div
      data-slot="segment-spotlight-toolbar"
      role="toolbar"
      initial={
        initial ?? (context.prefersReducedMotion ? false : { opacity: 0, y: 10, scale: 0.96 })
      }
      animate={animate ?? { opacity: 1, y: 0, scale: 1 }}
      transition={
        transition ?? {
          duration: context.prefersReducedMotion ? 0 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }
      }
      onPointerLeave={handlePointerLeave}
      onBlur={handleBlur}
      className={cn(
        'flex items-center gap-1 rounded-full bg-zinc-950/95 p-2 shadow-2xl ring-1 shadow-black/20 ring-border backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}

type SegmentSpotlightTriggerProps = Omit<React.ComponentProps<'button'>, 'value'> & {
  value: string
  targets?: string[]
  asChild?: boolean
}

function SegmentSpotlightTrigger({
  value,
  targets,
  asChild = false,
  className,
  onPointerEnter,
  onFocus,
  onClick,
  children,
  ...props
}: SegmentSpotlightTriggerProps) {
  const context = useSegmentSpotlight()
  const Comp = asChild ? Slot.Root : 'button'
  const isActive = context.activeValue === value
  const registerTrigger = context.registerTrigger
  const targetValues = React.useMemo(() => targets ?? [value], [targets, value])

  React.useLayoutEffect(
    () => registerTrigger(value, targetValues),
    [registerTrigger, targetValues, value],
  )

  function handlePointerEnter(event: React.PointerEvent<HTMLButtonElement>) {
    onPointerEnter?.(event)

    if (
      !event.defaultPrevented &&
      context.activationMode === 'hover' &&
      event.pointerType !== 'touch'
    ) {
      context.setActiveValue(value)
    }
  }

  function handleFocus(event: React.FocusEvent<HTMLButtonElement>) {
    onFocus?.(event)
    if (!event.defaultPrevented) context.setActiveValue(value)
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)

    if (!event.defaultPrevented) {
      context.setActiveValue(context.activationMode === 'click' && isActive ? null : value)
    }
  }

  return (
    <motion.div
      whileHover={context.prefersReducedMotion ? undefined : { scale: 1.08 }}
      whileTap={context.prefersReducedMotion ? undefined : { scale: 0.94 }}
    >
      <Comp
        data-slot="segment-spotlight-trigger"
        data-state={isActive ? 'active' : 'inactive'}
        type={asChild ? undefined : 'button'}
        aria-pressed={isActive}
        onPointerEnter={handlePointerEnter}
        onFocus={handleFocus}
        onClick={handleClick}
        className={cn(
          'relative grid size-10 place-items-center rounded-full text-neutral-200 transition-colors outline-none',
          'after:absolute after:inset-1 after:rounded-full after:bg-white/15 after:opacity-0 after:transition-opacity',
          'hover:text-white focus-visible:ring-2 focus-visible:ring-white/70 data-[state=active]:text-white data-[state=active]:after:opacity-100',
          '[&_svg]:relative [&_svg]:z-10',
          className,
        )}
        {...props}
      >
        {children}
      </Comp>
    </motion.div>
  )
}

function SegmentSpotlightSeparator({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="segment-spotlight-separator"
      role="separator"
      aria-orientation="vertical"
      className={cn('mx-1 h-6 w-px bg-white/15', className)}
      {...props}
    />
  )
}

function SegmentSpotlightContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="segment-spotlight-content"
      className={cn('absolute inset-x-0 bottom-0 z-20 px-6 pt-24 pb-10', className)}
      {...props}
    />
  )
}

export {
  SegmentSpotlight,
  SegmentSpotlightContent,
  SegmentSpotlightGrid,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
  type SegmentSpotlightActivationMode,
  type SegmentSpotlightProps,
  type SegmentSpotlightVariant,
}
