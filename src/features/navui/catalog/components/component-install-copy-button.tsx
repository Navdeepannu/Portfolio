'use client'

import { Copy } from 'lucide-react'

import { CopyButton } from '@/features/navui/code/copy-button/copy-button'

export function ComponentInstallCopyButton({ title, command }: { title: string; command: string }) {
  return (
    <CopyButton
      type="button"
      variant="ghost"
      size="sm"
      text={command}
      idleIcon={<Copy aria-hidden="true" />}
      className="text-muted-foreground hover:text-foreground active:scale-[0.98] motion-reduce:transform-none"
      aria-label={`Copy ${title} install command`}
      title={command}
    >
      {(state) => (state === 'done' ? 'Copied' : state === 'error' ? 'Retry' : 'Copy')}
    </CopyButton>
  )
}
