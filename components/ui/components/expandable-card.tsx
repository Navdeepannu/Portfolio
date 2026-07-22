'use client'

import * as React from 'react'
import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { AnimatePresence, LayoutGroup, motion, type Transition } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ExpandableCardContextValue = {
  open: boolean
  cardLayoutId: string
  mediaLayoutId: string
}

const ExpandableCardContext = React.createContext<ExpandableCardContextValue | null>(null)

const expandableCardTransition: Transition = {
  type: 'spring',
  stiffness: 220,
  damping: 30,
  mass: 0.8,
}

function useExpandableCard() {
  const context = React.useContext(ExpandableCardContext)

  if (!context) {
    throw new Error('ExpandableCard components must be used within <ExpandableCard>.')
  }

  return context
}

function ExpandableCard({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  children,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  const layoutGroupId = React.useId()
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  return (
    <ExpandableCardContext.Provider
      value={{
        open,
        cardLayoutId: `${layoutGroupId}-card`,
        mediaLayoutId: `${layoutGroupId}-media`,
      }}
    >
      <LayoutGroup id={layoutGroupId}>
        <DialogPrimitive.Root open={open} onOpenChange={setOpen} {...props}>
          {children}
        </DialogPrimitive.Root>
      </LayoutGroup>
    </ExpandableCardContext.Provider>
  )
}

type ExpandableCardTriggerProps = Omit<React.ComponentProps<typeof motion.button>, 'layoutId'>

function ExpandableCardTrigger({
  className,
  transition = expandableCardTransition,
  type = 'button',
  ...props
}: ExpandableCardTriggerProps) {
  const context = useExpandableCard()

  return (
    <DialogPrimitive.Trigger asChild>
      <motion.button
        data-slot="expandable-card-trigger"
        data-state={context.open ? 'open' : 'closed'}
        type={type}
        layoutId={context.cardLayoutId}
        transition={transition}
        className={cn(
          'group/expandable-card block w-full max-w-80 cursor-pointer overflow-hidden rounded-2xl border bg-background text-left shadow-sm outline-none',
          'transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 hover:shadow-md',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          className,
        )}
        {...props}
      />
    </DialogPrimitive.Trigger>
  )
}

type ExpandableCardMediaProps = Omit<React.ComponentProps<typeof motion.span>, 'layoutId'>

function ExpandableCardMedia({
  className,
  transition = expandableCardTransition,
  ...props
}: ExpandableCardMediaProps) {
  const context = useExpandableCard()

  return (
    <motion.span
      data-slot="expandable-card-media"
      layoutId={context.mediaLayoutId}
      transition={transition}
      className={cn('block overflow-hidden bg-muted', className)}
      {...props}
    />
  )
}

type ExpandableCardContentProps = Omit<
  React.ComponentProps<typeof DialogPrimitive.Content>,
  'asChild' | 'forceMount'
> & {
  showCloseButton?: boolean
  closeLabel?: string
  overlayClassName?: string
  transition?: Transition
}

function ExpandableCardContent({
  className,
  children,
  showCloseButton = true,
  closeLabel = 'Close',
  overlayClassName,
  transition = expandableCardTransition,
  ...props
}: ExpandableCardContentProps) {
  const context = useExpandableCard()

  return (
    <DialogPrimitive.Portal forceMount>
      <AnimatePresence initial={false}>
        {context.open ? (
          <DialogPrimitive.Overlay key="overlay" forceMount asChild>
            <motion.div
              data-slot="expandable-card-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.16, ease: 'easeOut' }}
              className={cn(
                'fixed inset-0 z-50 bg-background/10 backdrop-blur-sm',
                overlayClassName,
              )}
            />
          </DialogPrimitive.Overlay>
        ) : null}

        {context.open ? (
          <DialogPrimitive.Content key="content" forceMount asChild {...props}>
            <motion.div
              data-slot="expandable-card-content"
              layoutId={context.cardLayoutId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={transition}
              className={cn(
                'fixed top-1/2 left-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl border bg-background shadow-2xl outline-none',
                className,
              )}
            >
              <div className="max-h-[90vh] overflow-y-auto">{children}</div>

              {showCloseButton ? (
                <DialogPrimitive.Close asChild>
                  <Button
                    data-slot="expandable-card-close"
                    variant="outline"
                    size="icon"
                    className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur"
                  >
                    <XIcon />
                    <span className="sr-only">{closeLabel}</span>
                  </Button>
                </DialogPrimitive.Close>
              ) : null}
            </motion.div>
          </DialogPrimitive.Content>
        ) : null}
      </AnimatePresence>
    </DialogPrimitive.Portal>
  )
}

function ExpandableCardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="expandable-card-header"
      className={cn('flex flex-col gap-3 p-6', className)}
      {...props}
    />
  )
}

function ExpandableCardTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="expandable-card-title"
      className={cn('text-2xl font-semibold tracking-tight text-foreground', className)}
      {...props}
    />
  )
}

function ExpandableCardDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="expandable-card-description"
      className={cn('max-w-2xl text-sm leading-6 text-muted-foreground', className)}
      {...props}
    />
  )
}

function ExpandableCardBody({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="expandable-card-body" className={cn('px-6 pb-6', className)} {...props} />
}

function ExpandableCardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="expandable-card-footer"
      className={cn(
        'flex flex-wrap items-center justify-between gap-3 border-t bg-muted/30 px-6 py-4',
        className,
      )}
      {...props}
    />
  )
}

function ExpandableCardClose({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="expandable-card-close" {...props} />
}

export {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardClose,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardFooter,
  ExpandableCardHeader,
  ExpandableCardMedia,
  ExpandableCardTitle,
  ExpandableCardTrigger,
  expandableCardTransition,
}
