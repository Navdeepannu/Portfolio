'use client'

import { useEffect, useId, type KeyboardEvent, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, type Transition } from 'motion/react'
import { useControllableState } from '@radix-ui/react-use-controllable-state'

import { cn } from '@/lib/utils'

export type ExpandableCardItem = {
  title: string
  description: string
}

export type ExpandableCardLearnMore = {
  /** Visible label. Defaults to "Learn more". */
  label?: string
  /** Render as a link when provided. */
  href?: string
  /** Render as a button when provided (ignored if `href` is set). */
  onClick?: () => void
}

export type ExpandableCardProps = {
  title: string
  description: string
  /** Optional cover image shown in the media area. */
  image?: string
  /** Optional icon/media node, used when no `image` is provided. */
  icon?: ReactNode
  /** Extra detail rows revealed in the expanded state. */
  items?: ExpandableCardItem[]
  /** Custom footer/actions rendered in the expanded state. */
  footer?: ReactNode
  /** Optional learn-more link or action rendered in the expanded state. */
  learnMore?: ExpandableCardLearnMore
  /** Controlled open state. */
  open?: boolean
  /** Uncontrolled initial open state. Defaults to `false`. */
  defaultOpen?: boolean
  /** Called whenever the open state changes (controlled or uncontrolled). */
  onOpenChange?: (open: boolean) => void
  className?: string
}

const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 32,
  mass: 0.8,
}

export function ExpandableCard({
  title,
  description,
  image,
  icon,
  items = [],
  footer,
  learnMore,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  className,
}: ExpandableCardProps) {
  const [open = false, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  })

  const id = useId()
  const cardId = `expandable-card-${id}`
  const mediaId = `media-${id}`
  const titleId = `title-${id}`
  const descriptionId = `description-${id}`
  const learnMoreLabel = learnMore?.label ?? 'Learn more'
  const hasMedia = Boolean(image) || Boolean(icon)

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setOpen(true)
    }
  }

  useEffect(() => {
    if (!open) return

    function handleEscape(event: globalThis.KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [open, setOpen])

  return (
    <>
      {/* Collapsed preview */}
      <motion.article
        layoutId={cardId}
        transition={layoutTransition}
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-controls={`${cardId}-expanded`}
        onClick={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        className={cn(
          'group w-full max-w-80 cursor-pointer overflow-hidden rounded-2xl border bg-background shadow-sm outline-none',
          'transition-colors duration-200 hover:border-foreground/20 hover:shadow-md',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          className,
        )}
      >
        {hasMedia ? (
          <motion.div
            layoutId={mediaId}
            transition={layoutTransition}
            className="aspect-4/3 overflow-hidden p-1"
          >
            {image ? (
              <img src={image} alt={title} className="h-full w-full rounded-xl object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-xl bg-muted text-foreground">
                {icon}
              </div>
            )}
          </motion.div>
        ) : null}

        <div className="p-4">
          <motion.h3
            layoutId={titleId}
            transition={layoutTransition}
            className="line-clamp-1 text-base font-semibold tracking-tight text-foreground"
          >
            {title}
          </motion.h3>

          <motion.p
            layoutId={descriptionId}
            transition={layoutTransition}
            className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground"
          >
            {description}
          </motion.p>

          <div className="mt-4 flex justify-end">
            <span className="rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition-colors group-hover:bg-muted">
              {learnMoreLabel}
            </span>
          </div>
        </div>
      </motion.article>

      {/* Expanded state */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16, ease: 'easeOut' }}
            onClick={() => setOpen(false)}
          >
            <div aria-hidden="true" className="absolute inset-0 bg-background/10 backdrop-blur-sm" />

            <motion.div
              id={`${cardId}-expanded`}
              layoutId={cardId}
              transition={layoutTransition}
              role="dialog"
              aria-modal="true"
              aria-labelledby={`${titleId}-expanded`}
              aria-describedby={`${descriptionId}-expanded`}
              className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl border bg-background shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close expanded card"
                className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-muted"
              >
                <X className="size-4" />
              </button>

              <div className="max-h-[90vh] overflow-y-auto">
                {hasMedia ? (
                  <motion.div
                    layoutId={mediaId}
                    transition={layoutTransition}
                    className="aspect-video overflow-hidden bg-muted"
                  >
                    {image ? (
                      <img src={image} alt={title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-foreground">
                        {icon}
                      </div>
                    )}
                  </motion.div>
                ) : null}

                <div className="p-6">
                  <motion.h2
                    id={`${titleId}-expanded`}
                    layoutId={titleId}
                    transition={layoutTransition}
                    className="text-2xl font-semibold tracking-tight text-foreground"
                  >
                    {title}
                  </motion.h2>

                  <motion.p
                    id={`${descriptionId}-expanded`}
                    layoutId={descriptionId}
                    transition={layoutTransition}
                    className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground"
                  >
                    {description}
                  </motion.p>

                  {items.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, delay: 0.08 }}
                      className="mt-8 grid gap-4 sm:grid-cols-2"
                    >
                      {items.map((item) => (
                        <div key={item.title} className="rounded-2xl border bg-muted/30 p-4">
                          <h3 className="text-sm font-medium text-foreground">{item.title}</h3>

                          <p className="mt-2 text-sm leading-6 text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {(footer || learnMore) && (
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">{footer}</div>

                      {learnMore &&
                        (learnMore.href ? (
                          <a
                            href={learnMore.href}
                            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                          >
                            {learnMoreLabel}
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={learnMore.onClick}
                            className="inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90"
                          >
                            {learnMoreLabel}
                          </button>
                        ))}
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
