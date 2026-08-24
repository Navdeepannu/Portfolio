'use client'

import { Copy } from 'lucide-react'

import { CopyButton } from '@/features/navui/code/copy-button/copy-button'
import { ANALYTICS_EVENTS } from '@/features/analytics/events'
import { trackAnalyticsEvent } from '@/features/analytics/track'

export function ComponentInstallCopyButton({
  slug,
  title,
  command,
}: {
  slug: string
  title: string
  command: string
}) {
  return (
    <CopyButton
      type="button"
      variant="ghost"
      size="sm"
      text={command}
      idleIcon={<Copy aria-hidden="true" />}
      className="ph-no-capture text-muted-foreground hover:text-foreground active:scale-[0.98] motion-reduce:transform-none"
      aria-label={`Copy ${title} install command`}
      title={command}
      onCopySuccess={() =>
        trackAnalyticsEvent(ANALYTICS_EVENTS.CLI_COMMAND_COPIED, {
          item_type: 'component',
          item_slug: slug,
          item_title: title,
          package_manager: 'pnpm',
          source: 'component_gallery',
        })
      }
    >
      {(state) => (state === 'done' ? 'Copied' : state === 'error' ? 'Retry' : 'Copy')}
    </CopyButton>
  )
}
