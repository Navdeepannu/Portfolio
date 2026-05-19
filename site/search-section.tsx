'use client'

import { Input } from '@/components/ui/input'
import { SearchIcon, Columns2, Columns3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { cn } from '@/lib/utils'
import { Kbd, KbdGroup } from '@/components/ui/kbd'
import { useColumns } from './context/column-context'
import { useBlockFilters } from './context/block-filters-context'

export default function SearchSection() {
  const router = useRouter()
  const pathname = usePathname()
  const { columns, setColumns } = useColumns()
  const { query, setQuery, viewMode, setViewMode, type, setType } = useBlockFilters()
  const searchInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (pathname.startsWith('/blocks') && type !== 'blocks') {
      setType('blocks')
      return
    }
    if (pathname.startsWith('/pages') && type !== 'pages') {
      setType('pages')
    }
  }, [pathname, type, setType])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey) || e.key !== '/') return

      const target = e.target
      if (target instanceof HTMLElement) {
        if (target.isContentEditable) return
        if (
          target instanceof HTMLInputElement ||
          target instanceof HTMLTextAreaElement ||
          target instanceof HTMLSelectElement
        ) {
          if (searchInputRef.current && target !== searchInputRef.current) return
        }
      }

      e.preventDefault()
      searchInputRef.current?.focus()
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <div className="sticky top-0 z-40 border-b bg-background">
      <div className="flex items-center gap-2 px-3 py-2 sm:px-4 lg:h-12 lg:justify-between lg:gap-4 lg:py-0">
        <div className="flex min-w-0 items-center gap-2">
          <div className="hidden items-center rounded-md border bg-background p-0.5 sm:inline-flex">
            <Button
              type="button"
              variant={type === 'blocks' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 rounded-sm px-3"
              onClick={() => {
                setType('blocks')
                router.push('/blocks')
              }}
            >
              Blocks
            </Button>
            <Button
              type="button"
              variant={type === 'pages' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-7 rounded-sm px-3"
              onClick={() => {
                setType('pages')
                router.push('/pages')
              }}
            >
              Pages
            </Button>
          </div>

          <div className="inline-flex items-center rounded-md border bg-background p-0.5">
            <Button
              type="button"
              variant={viewMode === 'all-blocks' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 rounded-sm px-2 text-xs sm:h-7 sm:px-2.5 sm:text-[0.8rem]"
              onClick={() => setViewMode('all-blocks')}
            >
              All blocks
            </Button>
            <Button
              type="button"
              variant={viewMode === 'by-category' ? 'secondary' : 'ghost'}
              size="sm"
              className="h-6 rounded-sm px-2 text-xs sm:h-7 sm:px-2.5 sm:text-[0.8rem]"
              onClick={() => setViewMode('by-category')}
            >
              By category
            </Button>
          </div>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <div className="relative w-40 min-w-0 sm:w-56 lg:w-72 xl:w-80">
            <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"></SearchIcon>

            <Input
              ref={searchInputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blocks..."
              className="h-9 w-full border-none bg-transparent pr-20 pl-9 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
            />

            <KbdGroup className="pointer-events-none absolute top-1/2 right-3 hidden -translate-y-1/2 text-xs text-muted-foreground lg:flex">
              <Kbd>⌘</Kbd>
              <Kbd>/</Kbd>
            </KbdGroup>
          </div>

          <div className="hidden items-center rounded-md border bg-background p-0.5 xl:flex">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 rounded-sm text-muted-foreground',
                columns === 3 && 'bg-muted text-foreground shadow-sm',
              )}
              onClick={() => setColumns(3)}
              aria-label="3 columns"
              title="3 columns"
            >
              <Columns3 className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                'h-8 w-8 rounded-sm text-muted-foreground',
                columns === 2 && 'bg-muted text-foreground shadow-sm',
              )}
              onClick={() => setColumns(2)}
              aria-label="2 columns"
              title="2 columns"
            >
              <Columns2 className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
