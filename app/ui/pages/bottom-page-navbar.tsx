'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {
  IconArrowLeft,
  IconCode,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
  IconEye,
} from '@tabler/icons-react'
import { useState } from 'react'
type DisplayMode = 'preview' | 'code'
type Viewport = 'desktop' | 'tablet' | 'mobile'

type PageNavbarProps = {
  pageName: string
  onModeChange?: (mode: DisplayMode) => void
  onViewportChange?: (viewport: Viewport) => void
}

const viewports = [
  {
    value: 'desktop',
    label: 'Desktop',
    icon: IconDeviceDesktop,
  },
  {
    value: 'tablet',
    label: 'Tablet',
    icon: IconDeviceTablet,
  },
  {
    value: 'mobile',
    label: 'Mobile',
    icon: IconDeviceMobile,
  },
] satisfies Array<{
  value: Viewport
  label: string
  icon: typeof IconDeviceDesktop
}>

export function PageNavbar({ pageName, onModeChange, onViewportChange }: PageNavbarProps) {
  return (
    <nav
      aria-label="Page preview controls"
      className="absolute bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2"
    >
      <div className="flex h-16 items-center justify-between gap-2 rounded-full border border-border/70 bg-background/95 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
        {/* Page information */}
        <div className="flex min-w-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 rounded-full"
            aria-label="Go back"
          >
            <IconArrowLeft className="size-4" />
          </Button>

          <h3 className="max-w-36 truncate pr-2 text-sm font-medium text-muted-foreground sm:max-w-52">
            {pageName}
          </h3>
        </div>

        {/* Preview and code */}
        <div
          role="group"
          aria-label="Display mode"
          className="flex items-center rounded-full bg-muted p-1"
        >
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className={cn('h-9 gap-2 rounded-full px-3 text-muted-foreground')}
          >
            <IconEye className="size-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>

          <Button type="button" size="sm" variant="ghost">
            <IconCode className="size-4" />
            <span className="hidden sm:inline">Code</span>
          </Button>
        </div>

        {/* Viewport controls */}
        <div
          role="group"
          aria-label="Preview viewport"
          className="flex items-center rounded-full bg-muted p-1"
        >
          {viewports.map(({ value, label, icon: Icon }) => (
            <Button
              key={value}
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`${label} viewport`}
              className={cn('size-9 rounded-full text-muted-foreground')}
            >
              <Icon className="size-4" />
            </Button>
          ))}
        </div>
      </div>
    </nav>
  )
}
