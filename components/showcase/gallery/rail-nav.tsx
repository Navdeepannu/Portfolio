'use client'

import { useState } from 'react'

import { RailNav } from '@/components/ui/components/rail-nav'

const items = [
  { label: 'Overview', href: '#gallery-overview' },
  { label: 'Installation', href: '#gallery-installation' },
  { label: 'Usage', href: '#gallery-usage' },
  { label: 'Components', href: '#components' },
  { label: 'Blocks', href: '#gblocks' },
  { label: 'Illustrations', href: '#illustrations' },
] as const

export default function RailNavGalleryPreview() {
  const [value, setValue] = useState<string>(items[0].href)

  return (
    <div className="grid w-full max-w-lg grid-cols-[minmax(0,1fr)_8rem] items-start gap-6 px-5 sm:px-8">
      <div className="rounded-xl border bg-background p-5 shadow-xs">
        <p className="text-[11px] text-muted-foreground">Guide</p>
        <h3 className="mt-4 text-xl font-semibold tracking-tight">
          {items.find((item) => item.href === value)?.label}
        </h3>
        <p className="mt-2 text-sm leading-5 text-muted-foreground">
          Hover or focus the rail, then choose a section. In real setting this will scroll the page
          to linked section.
        </p>
        <div className="mt-6 space-y-2" aria-hidden="true">
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
        className="block pt-5"
      />
    </div>
  )
}
