'use client'

<<<<<<< Updated upstream
import * as React from 'react'
import { XIcon } from 'lucide-react'
import { Dialog as DialogPrimitive } from 'radix-ui'
import { AnimatePresence, LayoutGroup, motion, type Transition } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'
=======
import {
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, type Transition } from 'motion/react'
>>>>>>> Stashed changes

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ExpandableCardContextValue = {
  open: boolean
  cardLayoutId: string
  mediaLayoutId: string
}

<<<<<<< Updated upstream
const ExpandableCardContext = React.createContext<ExpandableCardContextValue | null>(null)

const expandableCardTransition: Transition = {
=======
export type ExpandableCardProps = {
  title: string
  description: string
  image?: string
  imageAlt?: string
  items?: ExpandableCardItem[]
  action?: {
    label: string
    href: string
  }
  footer?: ReactNode
  className?: string
}

const layoutTransition: Transition = {
>>>>>>> Stashed changes
  type: 'spring',
  stiffness: 220,
  damping: 30,
  mass: 0.8,
}

<<<<<<< Updated upstream
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
=======
export function ExpandableCard({
  title,
  description,
  image,
  imageAlt = '',
  items = [],
  action,
  footer,
  className,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(false)

  const id = useId()
  const triggerRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const cardId = `expandable-card-${id}`
  const dialogId = `${cardId}-dialog`
  const titleId = `${cardId}-title`
  const descriptionId = `${cardId}-description`

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleEscape)
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <>
      <motion.button
        ref={triggerRef}
        type="button"
        layoutId={cardId}
        transition={layoutTransition}
        aria-expanded={open}
        aria-controls={dialogId}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className={cn(
          'group w-full max-w-80 cursor-pointer overflow-hidden rounded-2xl border bg-background text-left shadow-sm outline-none',
          'transition-colors duration-200 hover:border-foreground/20 hover:shadow-md',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
      >
        {image && (
          <motion.div
            layoutId={`${cardId}-media`}
            transition={layoutTransition}
            className="aspect-4/3 overflow-hidden p-1"
          >
            <img
              src={image}
              alt={imageAlt}
              className="h-full w-full rounded-xl object-cover"
            />
          </motion.div>
        )}

        <div className="p-4">
          <motion.h3
            layoutId={`${cardId}-heading`}
            transition={layoutTransition}
            className="line-clamp-1 text-base font-semibold tracking-tight"
          >
            {title}
          </motion.h3>

          <motion.p
            layoutId={`${cardId}-summary`}
            transition={layoutTransition}
            className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground"
          >
            {description}
          </motion.p>

          <div className="mt-4 flex justify-end">
            <span className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors group-hover:bg-muted">
              View details
            </span>
          </div>
        </div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            onClick={() => setOpen(false)}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-background/20 backdrop-blur-sm"
            />

            <motion.div
              id={dialogId}
              layoutId={cardId}
              transition={layoutTransition}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClick={(event) => event.stopPropagation()}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border bg-background shadow-2xl"
            >
              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full border bg-background/80 backdrop-blur transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <X className="size-4" aria-hidden="true" />
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                {image && (
                  <motion.div
                    layoutId={`${cardId}-media`}
                    transition={layoutTransition}
                    className="aspect-video overflow-hidden bg-muted"
                  >
                    <img
                      src={image}
                      alt={imageAlt}
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                )}

                <div className="p-6">
                  <motion.h2
                    id={titleId}
                    layoutId={`${cardId}-heading`}
                    transition={layoutTransition}
                    className="text-2xl font-semibold tracking-tight"
                  >
                    {title}
                  </motion.h2>

                  <motion.p
                    id={descriptionId}
                    layoutId={`${cardId}-summary`}
                    transition={layoutTransition}
                    className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground"
                  >
                    {description}
                  </motion.p>

                  {items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, delay: 0.08 }}
                      className="mt-8 grid gap-4 sm:grid-cols-2"
                    >
                      {items.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border bg-muted/30 p-4"
                        >
                          <h3 className="text-sm font-medium">
                            {item.title}
                          </h3>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {(footer || action) && (
                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      {footer}

                      {action && (
                        <a
                          href={action.href}
                          className="ml-auto inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none"
                        >
                          {action.label}
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
>>>>>>> Stashed changes
