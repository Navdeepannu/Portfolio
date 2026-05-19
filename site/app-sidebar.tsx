'use client'

import { ListFilterPlus, SidebarClose } from 'lucide-react'
import { useEffect } from 'react'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function FiltersHeaderRow({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex h-12 items-center justify-between pl-4 lg:pl-6">
      <div className="flex items-center gap-2">
        <ListFilterPlus className="size-4" aria-hidden />
        <span className="text-sm font-medium">Filters</span>
      </div>
      <div className="pr-2">
        <Button onClick={onClose} variant="ghost" size="icon-sm" aria-label="Close filters">
          <SidebarClose className="size-4" aria-hidden />
        </Button>
      </div>
    </div>
  )
}

export default function AppSidebar() {
  const { open, openMobile, isMobile, setOpen, setOpenMobile } = useSidebar()

  const isFiltersOpen = isMobile ? openMobile : open

  useEffect(() => {
    if (!isFiltersOpen) return
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        setOpenMobile(false)
      }
    }
    document.addEventListener('keydown', onEscape)
    return () => document.removeEventListener('keydown', onEscape)
  }, [isFiltersOpen, setOpen, setOpenMobile])

  const closeFilters = () => {
    setOpen(false)
    setOpenMobile(false)
  }

  if (!isMobile) {
    return (
      <div
        className={cn(
          /* overflow-x-clip: width collapse without overflow:hidden, which breaks viewport sticky */
          'relative flex min-h-full shrink-0 flex-col overflow-x-clip overflow-y-visible transition-[width] duration-300 ease-out',
          open ? 'w-72' : 'w-0',
        )}
      >
        <aside
          id="filters-sidebar"
          aria-hidden={!open}
          className={cn(
            /* self-start: don’t stretch with column; sticky top = navbar height (3rem) */
            'sticky top-0 z-30 flex h-[calc(100dvh-var(--blocks-nav-height))] max-h-[calc(100dvh-var(--blocks-nav-height))] w-72 min-w-72 shrink-0 flex-col self-start overflow-hidden bg-background',
            !open && 'pointer-events-none',
          )}
        >
          <div className="shrink-0 border-b">
            <FiltersHeaderRow onClose={closeFilters} />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto bg-background" />
        </aside>
      </div>
    )
  }

  return (
    <Sidebar
      collapsible="offcanvas"
      variant="inset"
      className={cn(
        'bg-transparent **:data-[slot=sidebar-inner]:bg-background!',
        'top-12! bottom-0! h-[calc(100dvh-3rem)]!',
      )}
    >
      <SidebarHeader className="shrink-0 border-b p-0">
        <FiltersHeaderRow onClose={closeFilters} />
      </SidebarHeader>
      <SidebarContent className="bg-red-200">hello content</SidebarContent>
    </Sidebar>
  )
}
