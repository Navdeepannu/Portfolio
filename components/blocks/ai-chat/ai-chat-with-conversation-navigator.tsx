'use client'

import * as React from 'react'
import { motion, useReducedMotion } from 'motion/react'
import {
  ArrowUpIcon,
  BotIcon,
  FileTextIcon,
  MoreHorizontalIcon,
  PaperclipIcon,
  SparklesIcon,
  UserIcon,
} from 'lucide-react'

import {
  Attachment,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/components/ui/attachment'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import { Button } from '@/components/ui/button'
import { Marker, MarkerContent } from '@/components/ui/marker'
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/components/ui/message'
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import {
  createConversationNavigatorItems,
  getConversationMessageText,
} from './conversation-navigator'
import { MessageScrollerConversationNavigator } from './message-scroller-conversation-navigator'

export type AIChatMessagePart = {
  type: string
  text?: string
  filename?: string
  mediaType?: string
  url?: string
}

export type AIChatAttachment = {
  id?: string
  name: string
  mediaType?: string
  size?: string
  state?: 'idle' | 'uploading' | 'processing' | 'error' | 'done'
}

export type AIChatMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content?: string
  parts?: readonly AIChatMessagePart[]
  attachments?: readonly AIChatAttachment[]
  createdAt?: string
}

export type AIChatWithConversationNavigatorProps = Omit<
  React.ComponentProps<'section'>,
  'onSubmit'
> & {
  messages: readonly AIChatMessage[]
  title?: string
  description?: string
  emptyState?: React.ReactNode
  isGenerating?: boolean
  acceptedFileTypes?: string
  onFilesSelected?: (files: File[]) => void
  onSend?: (message: string) => void | Promise<void>
}

function getMessageAttachments(message: AIChatMessage) {
  const partAttachments = (message.parts ?? [])
    .filter((part) => part.type === 'file')
    .map(
      (part, index): AIChatAttachment => ({
        id: `${message.id}-part-${index}`,
        name: part.filename ?? `Attachment ${index + 1}`,
        mediaType: part.mediaType,
        state: 'done',
      }),
    )

  return [...(message.attachments ?? []), ...partAttachments]
}

function formatAttachmentDescription(attachment: AIChatAttachment) {
  return [attachment.mediaType, attachment.size].filter(Boolean).join(' · ')
}

function ChatMessageRow({ message, index }: { message: AIChatMessage; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const isUser = message.role === 'user'
  const text = getConversationMessageText(message)
  const attachments = getMessageAttachments(message)

  if (message.role === 'system') {
    return (
      <Marker variant="separator" className="mx-auto max-w-xl px-4">
        <MarkerContent>{text}</MarkerContent>
      </Marker>
    )
  }

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8, filter: 'blur(3px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{
        duration: 0.35,
        delay: Math.min(index * 0.025, 0.16),
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Message align={isUser ? 'end' : 'start'}>
        <MessageAvatar
          className={cn(
            'size-8 border bg-background shadow-xs',
            isUser && 'bg-foreground text-background',
          )}
        >
          {isUser ? (
            <UserIcon className="size-3.5" aria-hidden="true" />
          ) : (
            <SparklesIcon className="size-3.5" aria-hidden="true" />
          )}
        </MessageAvatar>

        <MessageContent className={cn(!isUser && 'max-w-[44rem]')}>
          <MessageHeader>{isUser ? 'You' : 'Navigator AI'}</MessageHeader>

          {text ? (
            <Bubble
              align={isUser ? 'end' : 'start'}
              variant={isUser ? 'secondary' : 'ghost'}
              className={cn(!isUser && 'max-w-full')}
            >
              <BubbleContent className="whitespace-pre-wrap">{text}</BubbleContent>
            </Bubble>
          ) : null}

          {attachments.length > 0 ? (
            <AttachmentGroup className={cn('max-w-full', isUser && 'justify-end')}>
              {attachments.map((attachment, attachmentIndex) => (
                <Attachment
                  key={attachment.id ?? `${message.id}-attachment-${attachmentIndex}`}
                  state={attachment.state ?? 'done'}
                  size="sm"
                >
                  <AttachmentMedia>
                    <FileTextIcon aria-hidden="true" />
                  </AttachmentMedia>
                  <AttachmentContent>
                    <AttachmentTitle>{attachment.name}</AttachmentTitle>
                    <AttachmentDescription>
                      {formatAttachmentDescription(attachment) || 'File'}
                    </AttachmentDescription>
                  </AttachmentContent>
                </Attachment>
              ))}
            </AttachmentGroup>
          ) : null}

          <MessageFooter>{message.createdAt ?? 'Now'}</MessageFooter>
        </MessageContent>
      </Message>
    </motion.div>
  )
}

function ThinkingMessage() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Message align="start" aria-live="polite">
      <MessageAvatar className="size-8 border bg-background shadow-xs">
        <BotIcon className="size-3.5" aria-hidden="true" />
      </MessageAvatar>
      <MessageContent>
        <MessageHeader>Navigator AI</MessageHeader>
        <Bubble variant="ghost" className="max-w-full">
          <BubbleContent className="flex items-center gap-1 py-2">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1.5 rounded-full bg-muted-foreground/70"
                animate={
                  shouldReduceMotion ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }
                }
                transition={{
                  duration: 1.1,
                  delay: dot * 0.14,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
            <span className="sr-only">Generating response</span>
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  )
}

export function AIChatWithConversationNavigator({
  messages,
  title = 'Project assistant',
  description = 'Ask, build, and revisit any turn',
  emptyState,
  isGenerating = false,
  acceptedFileTypes,
  onFilesSelected,
  onSend,
  className,
  ...props
}: AIChatWithConversationNavigatorProps) {
  const [draft, setDraft] = React.useState('')
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const navigatorItems = React.useMemo(() => createConversationNavigatorItems(messages), [messages])
  const isBusy = isGenerating || isSubmitting

  const submitDraft = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = draft.trim()

    if (!value || !onSend || isBusy) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSend(value)
      setDraft('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      className={cn(
        'flex h-[min(800px,calc(100svh-2rem))] min-h-[620px] w-full flex-col overflow-hidden rounded-2xl border bg-background text-foreground shadow-[0_24px_80px_-36px_color-mix(in_oklch,var(--foreground)_28%,transparent)]',
        className,
      )}
      {...props}
    >
      <header className="flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-8 shrink-0 place-items-center rounded-lg border bg-muted/60 shadow-xs">
            <SparklesIcon className="size-4" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-sm font-medium">{title}</h2>
            <p className="truncate text-xs text-muted-foreground">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden items-center gap-1.5 rounded-full border bg-muted/40 px-2.5 py-1 text-xs text-muted-foreground sm:flex">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            {navigatorItems.length} indexed turn
            {navigatorItems.length === 1 ? '' : 's'}
          </span>
          <Button variant="ghost" size="icon-sm" aria-label="Chat options">
            <MoreHorizontalIcon aria-hidden="true" />
          </Button>
        </div>
      </header>

      <MessageScrollerProvider
        autoScroll
        defaultScrollPosition="end"
        scrollMargin={24}
        scrollPreviousItemPeek={20}
      >
        <div className="relative min-h-0 flex-1">
          <MessageScroller>
            <MessageScrollerViewport aria-label="Conversation messages">
              <MessageScrollerContent className="mx-auto w-full max-w-3xl px-5 py-7 pl-16 sm:px-8 sm:pl-20">
                {messages.length === 0 ? (
                  <MessageScrollerItem messageId="conversation-empty-state">
                    {emptyState ?? (
                      <div className="grid min-h-80 place-items-center text-center">
                        <div>
                          <div className="mx-auto grid size-10 place-items-center rounded-xl border bg-muted/50">
                            <SparklesIcon className="size-4" aria-hidden="true" />
                          </div>
                          <p className="mt-3 text-sm font-medium">Start a conversation</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Your prompt outline will appear as the thread grows.
                          </p>
                        </div>
                      </div>
                    )}
                  </MessageScrollerItem>
                ) : (
                  messages.map((message, index) => (
                    <MessageScrollerItem
                      key={message.id}
                      id={message.id}
                      messageId={message.id}
                      scrollAnchor={message.role === 'user'}
                      className="scroll-mt-6"
                    >
                      <ChatMessageRow message={message} index={index} />
                    </MessageScrollerItem>
                  ))
                )}

                {isGenerating ? (
                  <MessageScrollerItem messageId="assistant-generating">
                    <ThinkingMessage />
                  </MessageScrollerItem>
                ) : null}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton className="bottom-3 shadow-md" />
          </MessageScroller>

          <MessageScrollerConversationNavigator
            items={navigatorItems}
            minimumItems={3}
            side="left"
            className="absolute top-1/2 left-3 -translate-y-1/2 sm:left-4"
          />
        </div>
      </MessageScrollerProvider>

      <form
        onSubmit={submitDraft}
        className="shrink-0 border-t bg-background/95 p-3 backdrop-blur-xl sm:p-4"
      >
        <div className="mx-auto max-w-3xl rounded-xl border bg-background p-2 shadow-sm transition-shadow focus-within:ring-3 focus-within:ring-ring/20">
          <label htmlFor="navigator-chat-input" className="sr-only">
            Message
          </label>
          <Textarea
            id="navigator-chat-input"
            value={draft}
            rows={1}
            placeholder="Ask a follow-up…"
            disabled={isBusy}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
                event.preventDefault()
                event.currentTarget.form?.requestSubmit()
              }
            }}
            className="max-h-36 min-h-11 resize-none border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent"
          />

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={acceptedFileTypes}
                tabIndex={-1}
                className="sr-only"
                onChange={(event) => {
                  const files = Array.from(event.target.files ?? [])

                  if (files.length > 0) {
                    onFilesSelected?.(files)
                  }

                  event.target.value = ''
                }}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                disabled={!onFilesSelected || isBusy}
                aria-label="Attach files"
                onClick={() => fileInputRef.current?.click()}
              >
                <PaperclipIcon aria-hidden="true" />
              </Button>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                Shift + Enter for a new line
              </span>
            </div>

            <Button
              type="submit"
              size="icon-sm"
              disabled={!draft.trim() || !onSend || isBusy}
              aria-label="Send message"
              className="rounded-full"
            >
              <ArrowUpIcon aria-hidden="true" />
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}

const demoMessages: AIChatMessage[] = [
  {
    id: 'turn-1-user',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Plan a launch checklist for our new analytics dashboard.',
      },
    ],
    createdAt: '10:02 AM',
  },
  {
    id: 'turn-1-assistant',
    role: 'assistant',
    parts: [
      {
        type: 'text',
        text: 'I’d split the launch into product readiness, data validation, access control, observability, and rollout. Start with a staging sign-off, verify event schemas against production-like traffic, test every role boundary, then use a phased release with error-rate and adoption checkpoints.',
      },
    ],
    createdAt: '10:02 AM',
  },
  {
    id: 'turn-2-user',
    role: 'user',
    parts: [
      {
        type: 'text',
        text: 'Turn that into a one-week schedule with clear owners.',
      },
      {
        type: 'file',
        filename: 'launch-owners.csv',
        mediaType: 'text/csv',
      },
    ],
    createdAt: '10:05 AM',
  },
  {
    id: 'turn-2-assistant',
    role: 'assistant',
    content:
      'Monday covers scope freeze and instrumentation, owned by Product and Data. Tuesday is permissions and accessibility QA with Engineering and Design. Wednesday is load testing and incident drills with Platform. Thursday is the internal pilot and feedback triage. Friday is the staged customer rollout, with Product owning the go/no-go decision.',
    createdAt: '10:05 AM',
  },
  {
    id: 'turn-3-user',
    role: 'user',
    content: 'What are the three highest-risk checks we should never skip?',
    createdAt: '10:08 AM',
  },
  {
    id: 'turn-3-assistant',
    role: 'assistant',
    content:
      'First, verify authorization with real role combinations—not only happy-path test accounts. Second, reconcile analytics totals against the source of truth so the dashboard cannot confidently display incorrect data. Third, prove rollback works under load and that alerts reach an accountable owner before customers report the issue.',
    createdAt: '10:08 AM',
  },
  {
    id: 'turn-4-user',
    role: 'user',
    content: 'Write the final go/no-go question set for Friday morning.',
    createdAt: '10:11 AM',
  },
  {
    id: 'turn-4-assistant',
    role: 'assistant',
    content:
      'Ask whether data accuracy is within the agreed tolerance, every production role has passed authorization tests, critical alerts have a named responder, rollback has been exercised successfully, support has the escalation guide, and no unresolved issue can cause data exposure or irreversible customer impact. Any “no” on those checks blocks launch.',
    createdAt: '10:11 AM',
  },
]

function createDemoId(prefix: string) {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return `${prefix}-${crypto.randomUUID()}`
  }

  return `${prefix}-${Date.now()}`
}

export function AIChatWithConversationNavigatorDemo() {
  const [messages, setMessages] = React.useState<AIChatMessage[]>(demoMessages)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const responseTimerRef = React.useRef<number | null>(null)

  React.useEffect(
    () => () => {
      if (responseTimerRef.current) {
        window.clearTimeout(responseTimerRef.current)
      }
    },
    [],
  )

  const handleSend = (value: string) => {
    const userMessage: AIChatMessage = {
      id: createDemoId('user'),
      role: 'user',
      content: value,
      createdAt: 'Now',
    }

    setMessages((current) => [...current, userMessage])
    setIsGenerating(true)

    responseTimerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: createDemoId('assistant'),
          role: 'assistant',
          content:
            'This demo keeps the UI local. Connect the onSend callback to your AI SDK transport, and pass the resulting messages back into the block; the navigator will index every user turn automatically.',
          createdAt: 'Now',
        },
      ])
      setIsGenerating(false)
    }, 900)
  }

  return (
    <AIChatWithConversationNavigator
      messages={messages}
      isGenerating={isGenerating}
      onSend={handleSend}
    />
  )
}
