'use client'

import { useState } from 'react'

import { RailNav } from '@/components/rail-nav'

const items = [
  { label: 'Overview', href: '#gallery-overview' },
  { label: 'Installation', href: '#gallery-installation' },
  { label: 'Usage', href: '#gallery-usage' },
  { label: 'Components', href: '#components' },
] as const

export default function RailNavGalleryPreview() {
  const [value, setValue] = useState<string>(items[0].href)

  return (
    <div className="grid w-full max-w-md grid-cols-[minmax(0,1fr)_7rem] items-start gap-4 px-2 sm:px-4">
      <div className="rounded-xl border bg-background p-4 shadow-xs">
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
          Guide
        </p>
        <h3 className="mt-3 text-base font-semibold tracking-tight">
          {items.find((item) => item.href === value)?.label}
        </h3>
        <div className="mt-5 space-y-2" aria-hidden="true">
          <div className="h-2 w-full rounded-full bg-muted" />
          <div className="h-2 w-4/5 rounded-full bg-muted" />
          <div className="h-2 w-2/3 rounded-full bg-muted" />
        </div>
      </div>

      <RailNav
        items={items}
        value={value}
        onValueChange={setValue}
        preventNavigation
        trackActive={false}
        label="Preview sections"
        className="block pt-3"
      />
    </div>
  )
}
