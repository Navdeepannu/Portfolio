"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type ConversationNavigatorItem = {
  id: string
  targetId?: string
  title: string
  preview?: string
  meta?: string
  disabled?: boolean
}

export type ConversationMessageLike = {
  id: string
  role?: string
  content?: string
  parts?: readonly unknown[]
  attachments?: readonly unknown[]
}

export type CreateConversationNavigatorItemsOptions<
  TMessage extends ConversationMessageLike,
> = {
  includeRoles?: readonly string[]
  titleLength?: number
  previewLength?: number
  getTitle?: (message: TMessage, turnIndex: number, text: string) => string
  getPreview?: (message: TMessage, turnIndex: number, text: string) => string
  getMeta?: (message: TMessage, turnIndex: number) => string | undefined
}

export type ConversationNavigatorProps = Omit<
  React.ComponentProps<"nav">,
  "onChange"
> & {
  items: readonly ConversationNavigatorItem[]
  activeId?: string | null
  defaultActiveId?: string
  autoTrack?: boolean
  minimumItems?: number
  railLabel?: string
  scrollBehavior?: ScrollBehavior
  scrollBlock?: ScrollLogicalPosition
  scrollRootRef?: React.RefObject<HTMLElement | null>
  showPreview?: boolean
  side?: "left" | "right"
  getTargetElement?: (item: ConversationNavigatorItem) => HTMLElement | null
  onActiveChange?: (id: string) => void
  onNavigate?: (item: ConversationNavigatorItem) => void
}

function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function truncateText(value: string, maxLength: number) {
  const normalized = normalizeText(value)

  if (normalized.length <= maxLength) {
    return normalized
  }

  const shortened = normalized.slice(0, Math.max(0, maxLength - 1))
  const lastSpace = shortened.lastIndexOf(" ")
  const boundary = lastSpace > maxLength * 0.65 ? lastSpace : shortened.length

  return `${shortened.slice(0, boundary).trimEnd()}…`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function getConversationMessageText(message: ConversationMessageLike) {
  if (typeof message.content === "string" && message.content.trim()) {
    return normalizeText(message.content)
  }

  return normalizeText(
    (message.parts ?? [])
      .filter(
        (part): part is Record<string, unknown> =>
          isRecord(part) &&
          part.type === "text" &&
          typeof part.text === "string"
      )
      .map((part) => String(part.text))
      .join(" ")
  )
}

function getMessageFileCount(message: ConversationMessageLike) {
  const fileParts = (message.parts ?? []).filter(
    (part) => isRecord(part) && part.type === "file"
  ).length

  return fileParts + (message.attachments?.length ?? 0)
}

export function createConversationNavigatorItems<
  TMessage extends ConversationMessageLike,
>(
  messages: readonly TMessage[],
  options: CreateConversationNavigatorItemsOptions<TMessage> = {}
) {
  const {
    includeRoles = ["user"],
    titleLength = 52,
    previewLength = 180,
    getTitle,
    getPreview,
    getMeta,
  } = options
  const includedRoles = new Set(includeRoles)

  return messages
    .filter((message) => !message.role || includedRoles.has(message.role))
    .map((message, turnIndex): ConversationNavigatorItem => {
      const text = getConversationMessageText(message)
      const fileCount = getMessageFileCount(message)
      const defaultMeta = `Turn ${turnIndex + 1}${
        fileCount > 0 ? ` · ${fileCount} file${fileCount === 1 ? "" : "s"}` : ""
      }`

      return {
        id: message.id,
        targetId: message.id,
        title:
          getTitle?.(message, turnIndex, text) ??
          truncateText(text || "Untitled turn", titleLength),
        preview:
          getPreview?.(message, turnIndex, text) ??
          truncateText(text || "No text content", previewLength),
        meta: getMeta?.(message, turnIndex) ?? defaultMeta,
      }
    })
}

function getNextEnabledIndex(
  items: readonly ConversationNavigatorItem[],
  startIndex: number,
  direction: 1 | -1
) {
  let index = startIndex

  for (let attempts = 0; attempts < items.length; attempts += 1) {
    index = (index + direction + items.length) % items.length

    if (!items[index]?.disabled) {
      return index
    }
  }

  return startIndex
}

export function ConversationNavigator({
  items,
  activeId: controlledActiveId,
  defaultActiveId,
  autoTrack = true,
  minimumItems = 2,
  railLabel = "Conversation turns",
  scrollBehavior = "smooth",
  scrollBlock = "start",
  scrollRootRef,
  showPreview = true,
  side = "left",
  getTargetElement,
  onActiveChange,
  onNavigate,
  className,
  ...props
}: ConversationNavigatorProps) {
  const shouldReduceMotion = useReducedMotion()
  const [internalActiveId, setInternalActiveId] = React.useState(
    defaultActiveId ?? items.find((item) => !item.disabled)?.id ?? null
  )
  const [previewedId, setPreviewedId] = React.useState<string | null>(null)
  const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([])
  const fallbackActiveId = items.find((item) => !item.disabled)?.id ?? null
  const validInternalActiveId = items.some(
    (item) => item.id === internalActiveId && !item.disabled
  )
    ? internalActiveId
    : fallbackActiveId
  const activeId = controlledActiveId ?? validInternalActiveId
  const activeIdRef = React.useRef(activeId)

  React.useEffect(() => {
    activeIdRef.current = activeId
  }, [activeId])

  const resolveTarget = React.useCallback(
    (item: ConversationNavigatorItem) => {
      if (getTargetElement) {
        return getTargetElement(item)
      }

      if (typeof document === "undefined") {
        return null
      }

      return document.getElementById(item.targetId ?? item.id)
    },
    [getTargetElement]
  )

  const commitActiveId = React.useCallback(
    (nextActiveId: string) => {
      if (activeIdRef.current === nextActiveId) {
        return
      }

      activeIdRef.current = nextActiveId

      if (controlledActiveId === undefined) {
        setInternalActiveId(nextActiveId)
      }

      onActiveChange?.(nextActiveId)
    },
    [controlledActiveId, onActiveChange]
  )

  React.useEffect(() => {
    if (!autoTrack || typeof window === "undefined" || items.length === 0) {
      return
    }

    const scrollRoot = scrollRootRef?.current ?? null
    const eventTarget: HTMLElement | Window = scrollRoot ?? window
    let frame = 0

    const measure = () => {
      frame = 0
      const rootRect = scrollRoot?.getBoundingClientRect()
      const viewportTop = rootRect?.top ?? 0
      const viewportHeight = rootRect?.height ?? window.innerHeight
      const activationLine = viewportTop + Math.min(128, viewportHeight * 0.24)
      let closestBefore: { id: string; top: number } | null = null
      let closestAfter: { id: string; top: number } | null = null

      for (const item of items) {
        if (item.disabled) {
          continue
        }

        const target = resolveTarget(item)

        if (!target?.isConnected) {
          continue
        }

        const top = target.getBoundingClientRect().top

        if (top <= activationLine) {
          if (!closestBefore || top > closestBefore.top) {
            closestBefore = { id: item.id, top }
          }
        } else if (!closestAfter || top < closestAfter.top) {
          closestAfter = { id: item.id, top }
        }
      }

      const nextActiveId = closestBefore?.id ?? closestAfter?.id

      if (nextActiveId) {
        commitActiveId(nextActiveId)
      }
    }

    const requestMeasure = () => {
      if (frame) {
        return
      }

      frame = window.requestAnimationFrame(measure)
    }

    requestMeasure()
    eventTarget.addEventListener("scroll", requestMeasure, { passive: true })
    window.addEventListener("resize", requestMeasure, { passive: true })

    return () => {
      if (frame) {
        window.cancelAnimationFrame(frame)
      }

      eventTarget.removeEventListener("scroll", requestMeasure)
      window.removeEventListener("resize", requestMeasure)
    }
  }, [autoTrack, commitActiveId, items, resolveTarget, scrollRootRef])

  const navigateToItem = React.useCallback(
    (item: ConversationNavigatorItem) => {
      if (item.disabled) {
        return
      }

      if (onNavigate) {
        onNavigate(item)
      } else {
        resolveTarget(item)?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : scrollBehavior,
          block: scrollBlock,
        })
      }

      commitActiveId(item.id)
    },
    [
      commitActiveId,
      onNavigate,
      resolveTarget,
      scrollBehavior,
      scrollBlock,
      shouldReduceMotion,
    ]
  )

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex: number | null = null

    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      nextIndex = getNextEnabledIndex(items, index, 1)
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      nextIndex = getNextEnabledIndex(items, index, -1)
    } else if (event.key === "Home") {
      nextIndex = items.findIndex((item) => !item.disabled)
    } else if (event.key === "End") {
      nextIndex = items.findLastIndex((item) => !item.disabled)
    }

    if (nextIndex === null || nextIndex < 0) {
      return
    }

    event.preventDefault()
    buttonRefs.current[nextIndex]?.focus()
  }

  if (items.length < minimumItems) {
    return null
  }

  return (
    <nav
      aria-label={railLabel}
      data-side={side}
      className={cn("relative z-30 w-10", className)}
      {...props}
    >
      <ol className="flex flex-col gap-0.5 py-2">
        {items.map((item, index) => {
          const isActive = activeId === item.id
          const isPreviewed = previewedId === item.id
          const isEmphasized = isActive || isPreviewed
          const idleWidth = 12 + (index % 3) * 6
          const previewId = `conversation-navigator-preview-${item.id}`

          return (
            <li key={item.id} className="relative flex h-4 items-center">
              <button
                ref={(node) => {
                  buttonRefs.current[index] = node
                }}
                type="button"
                disabled={item.disabled}
                tabIndex={isActive || (!activeId && index === 0) ? 0 : -1}
                aria-controls={item.targetId ?? item.id}
                aria-current={isActive ? "location" : undefined}
                aria-describedby={isPreviewed ? previewId : undefined}
                aria-label={`Jump to ${item.meta ? `${item.meta}: ` : ""}${item.title}`}
                onBlur={() => setPreviewedId(null)}
                onClick={() => navigateToItem(item)}
                onFocus={() => setPreviewedId(item.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                onPointerEnter={() => setPreviewedId(item.id)}
                onPointerLeave={() => setPreviewedId(null)}
                className={cn(
                  "group flex h-4 w-10 items-center rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-40",
                  side === "left" ? "justify-start" : "justify-end"
                )}
              >
                <motion.span
                  aria-hidden="true"
                  className={cn(
                    "block h-px rounded-full bg-border transition-colors",
                    isEmphasized && "bg-foreground"
                  )}
                  initial={false}
                  animate={{ width: isEmphasized ? 34 : idleWidth }}
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 480, damping: 34 }
                  }
                />
              </button>

              <AnimatePresence>
                {showPreview && isPreviewed ? (
                  <div
                    className={cn(
                      "pointer-events-none absolute top-1/2 hidden sm:block",
                      side === "left" ? "left-full ml-3" : "right-full mr-3"
                    )}
                  >
                    <motion.div
                      id={previewId}
                      role="tooltip"
                      initial={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: side === "left" ? -8 : 8,
                              y: "-50%",
                              scale: 0.98,
                            }
                      }
                      animate={{ opacity: 1, x: 0, y: "-50%", scale: 1 }}
                      exit={
                        shouldReduceMotion
                          ? { opacity: 0 }
                          : {
                              opacity: 0,
                              x: side === "left" ? -5 : 5,
                              y: "-50%",
                              scale: 0.985,
                            }
                      }
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "w-[min(19rem,calc(100vw-5rem))] rounded-xl border bg-popover/96 p-3 text-popover-foreground shadow-[0_16px_50px_-18px_color-mix(in_oklch,var(--foreground)_28%,transparent)] backdrop-blur-xl",
                        side === "left" ? "origin-left" : "origin-right"
                      )}
                    >
                      <p className="truncate text-sm font-medium">
                        {item.title}
                      </p>
                      {item.preview ? (
                        <p className="mt-1 line-clamp-3 text-sm leading-5 text-muted-foreground">
                          {item.preview}
                        </p>
                      ) : null}
                      {item.meta ? (
                        <p className="mt-2 text-xs font-medium text-muted-foreground/80">
                          {item.meta}
                        </p>
                      ) : null}
                    </motion.div>
                  </div>
                ) : null}
              </AnimatePresence>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
