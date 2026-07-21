'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

type AnimatedTabsContextValue = {
  value: string
  previousValue: string | null
  direction: number
  activationMode: 'automatic' | 'manual'
  setValue: (value: string) => void
  registerTrigger: (value: string) => () => void
}

const AnimatedTabsContext = React.createContext<AnimatedTabsContextValue | null>(null)

function useAnimatedTabs() {
  const context = React.useContext(AnimatedTabsContext)

  if (!context) {
    throw new Error('AnimatedTabs components must be used within <AnimatedTabs>.')
  }

  return context
}

function AnimatedTabs({
  value: valueProp,
  defaultValue,
  onValueChange,
  activationMode = 'automatic',
  className,
  children,
  ...props
}: React.ComponentProps<typeof Tabs>) {
  const triggerValues = React.useRef<string[]>([])
  const lastValue = React.useRef(valueProp ?? defaultValue ?? '')
  const [previousValue, setPreviousValue] = React.useState<string | null>(null)
  const [direction, setDirection] = React.useState(0)
  const [value = '', setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue ?? '',
    onChange: onValueChange,
  })

  const registerTrigger = React.useCallback((triggerValue: string) => {
    if (!triggerValues.current.includes(triggerValue)) {
      triggerValues.current.push(triggerValue)
    }

    return () => {
      triggerValues.current = triggerValues.current.filter((value) => value !== triggerValue)
    }
  }, [])

  React.useLayoutEffect(() => {
    const previous = lastValue.current

    if (!value || previous === value) return

    const previousIndex = triggerValues.current.indexOf(previous)
    const nextIndex = triggerValues.current.indexOf(value)

    setPreviousValue(previous || null)
    setDirection(previousIndex === -1 || nextIndex === -1 ? 0 : nextIndex > previousIndex ? 1 : -1)
    lastValue.current = value
  }, [value])

  React.useEffect(() => {
    if (!previousValue) return

    const timeout = window.setTimeout(() => setPreviousValue(null), 240)

    return () => window.clearTimeout(timeout)
  }, [previousValue])

  return (
    <AnimatedTabsContext.Provider
      value={{
        value,
        previousValue,
        direction,
        activationMode,
        setValue,
        registerTrigger,
      }}
    >
      <Tabs
        data-slot="animated-tabs"
        value={value}
        onValueChange={setValue}
        activationMode={activationMode}
        className={cn('w-full', className)}
        {...props}
      >
        {children}
      </Tabs>
    </AnimatedTabsContext.Provider>
  )
}

function AnimatedTabsList({
  className,
  children,
  ref,
  ...props
}: React.ComponentProps<typeof TabsList>) {
  const context = useAnimatedTabs()
  const listRef = React.useRef<React.ComponentRef<typeof TabsList>>(null)
  const [indicator, setIndicator] = React.useState({ x: 0, width: 0, ready: false })

  const setListRef = React.useCallback(
    (node: React.ComponentRef<typeof TabsList> | null) => {
      listRef.current = node

      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    },
    [ref],
  )

  const measureIndicator = React.useCallback(() => {
    const list = listRef.current
    const activeTrigger = list?.querySelector<HTMLElement>(
      '[data-slot="animated-tabs-trigger"][data-state="active"]',
    )

    if (!list || !activeTrigger) return

    setIndicator((current) => {
      const next = {
        x: activeTrigger.offsetLeft,
        width: activeTrigger.offsetWidth,
        ready: true,
      }

      return current.x === next.x && current.width === next.width && current.ready === next.ready
        ? current
        : next
    })
  }, [])

  React.useLayoutEffect(measureIndicator, [context.value, children, measureIndicator])

  React.useEffect(() => {
    if (typeof ResizeObserver === 'undefined' || !listRef.current) return

    const observer = new ResizeObserver(measureIndicator)
    observer.observe(listRef.current)

    const activeTrigger = listRef.current.querySelector<HTMLElement>(
      '[data-slot="animated-tabs-trigger"][data-state="active"]',
    )

    if (activeTrigger) observer.observe(activeTrigger)

    return () => observer.disconnect()
  }, [context.value, measureIndicator])

  return (
    <TabsList
      data-slot="animated-tabs-list"
      ref={setListRef}
      className={cn(
        'relative isolate h-auto min-h-0 w-full justify-start gap-1 overflow-x-auto rounded-xl p-1',
        className,
      )}
      {...props}
    >
      <motion.span
        data-slot="animated-tabs-indicator"
        aria-hidden="true"
        initial={false}
        animate={{
          x: indicator.x,
          width: indicator.width,
          opacity: indicator.ready ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
        className="pointer-events-none absolute top-1 bottom-1 left-0 z-0 rounded-lg bg-background shadow-sm will-change-transform"
      />
      {children}
    </TabsList>
  )
}

function AnimatedTabsTrigger({
  value,
  className,
  children,
  onClick,
  onFocus,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) {
  const context = useAnimatedTabs()
  const registerTrigger = context.registerTrigger

  React.useLayoutEffect(() => registerTrigger(value), [registerTrigger, value])

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    onClick?.(event)
    if (!event.defaultPrevented) context.setValue(value)
  }

  function handleFocus(event: React.FocusEvent<HTMLButtonElement>) {
    onFocus?.(event)

    if (!event.defaultPrevented && context.activationMode === 'automatic') {
      context.setValue(value)
    }
  }

  return (
    <TabsTrigger
      data-slot="animated-tabs-trigger"
      value={value}
      onClick={handleClick}
      onFocus={handleFocus}
      className={cn(
        'relative isolate z-10 flex-1 overflow-hidden rounded-lg px-4 py-2 text-muted-foreground shadow-none',
        'data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
        className,
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
    </TabsTrigger>
  )
}

function AnimatedTabsViewport({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="animated-tabs-viewport"
      className={cn('grid overflow-hidden outline-none', className)}
      {...props}
    />
  )
}

function AnimatedTabsContent({
  value,
  className,
  children,
  tabIndex,
  ...props
}: React.ComponentProps<typeof TabsContent>) {
  const context = useAnimatedTabs()
  const isActive = context.value === value
  const isPrevious = context.previousValue === value
  const isVisible = isActive || isPrevious

  const animation = isActive
    ? { opacity: 1, x: 0, filter: 'blur(0px)' }
    : {
        opacity: 0,
        x: context.direction > 0 ? -32 : context.direction < 0 ? 32 : 0,
        filter: 'blur(4px)',
      }

  return (
    <TabsContent
      data-slot="animated-tabs-content"
      value={value}
      forceMount
      aria-hidden={!isActive}
      tabIndex={isActive ? tabIndex : -1}
      className={cn(
        'col-start-1 row-start-1 min-w-0 outline-none',
        !isVisible && 'hidden',
        className,
      )}
      {...props}
    >
      <motion.div
        initial={false}
        animate={animation}
        transition={{ duration: 0.22, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </TabsContent>
  )
}

export {
  AnimatedTabs,
  AnimatedTabsContent,
  AnimatedTabsList,
  AnimatedTabsTrigger,
  AnimatedTabsViewport,
}
