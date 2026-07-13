'use client'

import * as React from 'react'

import { useMessageScroller, useMessageScrollerVisibility } from '@/components/ui/message-scroller'
import {
  ConversationNavigator,
  ConversationNavigatorItem,
  ConversationNavigatorProps,
} from './conversation-navigator'

export type MessageScrollerConversationNavigatorProps = Omit<
  ConversationNavigatorProps,
  'activeId' | 'autoTrack' | 'getTargetElement' | 'onNavigate' | 'scrollBlock' | 'scrollRootRef'
> & {
  activeId?: string | null
  scrollAlign?: 'start' | 'center' | 'end' | 'nearest'
  scrollMargin?: number
  onNavigate?: (item: ConversationNavigatorItem, didScroll: boolean) => void
}

export function MessageScrollerConversationNavigator({
  items,
  activeId: controlledActiveId,
  scrollAlign = 'start',
  scrollBehavior = 'smooth',
  scrollMargin = 20,
  onNavigate,
  ...props
}: MessageScrollerConversationNavigatorProps) {
  const { scrollToMessage } = useMessageScroller()
  const { currentAnchorId, visibleMessageIds } = useMessageScrollerVisibility()

  const itemByMessageId = React.useMemo(
    () => new Map(items.map((item) => [item.targetId ?? item.id, item] as const)),
    [items],
  )

  const visibleItemId = React.useMemo(() => {
    for (const messageId of visibleMessageIds) {
      const item = itemByMessageId.get(messageId)

      if (item) {
        return item.id
      }
    }

    return null
  }, [itemByMessageId, visibleMessageIds])

  const anchoredItemId = currentAnchorId ? (itemByMessageId.get(currentAnchorId)?.id ?? null) : null
  const activeId =
    controlledActiveId ??
    visibleItemId ??
    anchoredItemId ??
    items.find((item) => !item.disabled)?.id ??
    null

  const handleNavigate = React.useCallback(
    (item: ConversationNavigatorItem) => {
      const didScroll = scrollToMessage(item.targetId ?? item.id, {
        align: scrollAlign,
        behavior: scrollBehavior,
        scrollMargin,
      })

      onNavigate?.(item, didScroll)
    },
    [onNavigate, scrollAlign, scrollBehavior, scrollMargin, scrollToMessage],
  )

  return (
    <ConversationNavigator
      items={items}
      activeId={activeId}
      autoTrack={false}
      scrollBehavior={scrollBehavior}
      onNavigate={handleNavigate}
      {...props}
    />
  )
}
