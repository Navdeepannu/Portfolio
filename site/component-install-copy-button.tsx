'use client'

import { Copy } from 'lucide-react'

import { CopyButton } from '@/components/ui/components/copy-button'

export function ComponentInstallCopyButton({ title, command }: { title: string; command: string }) {
  return (
    <CopyButton
      type="button"
      variant="outline"
      size="sm"
      text={command}
      idleIcon={<Copy aria-hidden="true" />}
      className="active:scale-[0.98]"
      aria-label={`Copy ${title} install command`}
      title={command}
    >
      {(state) => (state === 'done' ? 'Copied' : state === 'error' ? 'Try again' : 'Copy install')}
    </CopyButton>
  )
}
