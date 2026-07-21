// components/page-preview/page-navbar.tsx

'use client'

import {
  IconArrowBack,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDeviceTablet,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import {
  type PreviewViewport,
  usePagePreview,
} from './page-preview-provider'

const viewportOptions = [
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
  value: PreviewViewport
  label: string
  icon: typeof IconDeviceDesktop
}>

export function PageNavbar() {
  const router = useRouter()
  const { viewport, setViewport } = usePagePreview()

  return (
    <nav
      aria-label="Page preview controls"
      className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="flex items-center gap-2 rounded-full border bg-background/90 p-2 shadow-xl backdrop-blur-xl">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Go back"
          onClick={() => router.back()}
        >
          <IconArrowBack className="size-4" />
        </Button>

        <div
          role="group"
          aria-label="Preview viewport"
          className="flex items-center rounded-full bg-muted p-1"
        >
          {viewportOptions.map(
            ({ value, label, icon: Icon }) => (
              <Button
                key={value}
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`${label} viewport`}
                aria-pressed={viewport === value}
                onClick={() => setViewport(value)}
                className={cn(
                  'size-9 rounded-full text-muted-foreground',
                  viewport === value &&
                    'bg-background text-foreground shadow-sm',
                )}
              >
                <Icon className="size-4" />
              </Button>
            ),
          )}
        </div>
      </div>
    </nav>
  )
}