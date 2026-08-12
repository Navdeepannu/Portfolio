'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Kbd } from '@/components/ui/kbd'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export type ComponentNavigationItem = {
  title: string
  href: string
}

type ComponentNavigationProps = {
  previous?: ComponentNavigationItem
  next?: ComponentNavigationItem
}

export function ComponentNavigation({ previous, next }: ComponentNavigationProps) {
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (
        event.defaultPrevented ||
        event.repeat ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      ) {
        return
      }

      const target = event.target

      if (
        target instanceof Element &&
        target.closest(
          'a, button, input, textarea, select, summary, [contenteditable]:not([contenteditable="false"]), [role="button"], [role="link"], [role="menuitem"], [role="option"], [role="slider"], [role="spinbutton"], [role="tab"], [tabindex]:not([tabindex="-1"])',
        )
      ) {
        return
      }

      if (event.key === 'ArrowLeft' && previous) {
        event.preventDefault()
        router.push(previous.href)
      }

      if (event.key === 'ArrowRight' && next) {
        event.preventDefault()
        router.push(next.href)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [previous, next, router])

  if (!previous && !next) return null

  return (
    <nav aria-label="Component navigation" className="flex shrink-0 items-center gap-2">
      {previous ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon" variant="secondary">
              <Link href={previous.href} aria-keyshortcuts="ArrowLeft">
                <ArrowLeft aria-hidden="true" />

                <span className="sr-only">Previous component: {previous.title}</span>
              </Link>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <span>Previous: {previous.title}</span>
            <Kbd>
              <ArrowLeft aria-hidden="true" />
            </Kbd>
          </TooltipContent>
        </Tooltip>
      ) : null}

      {next ? (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild size="icon" variant="secondary">
              <Link href={next.href} aria-keyshortcuts="ArrowRight">
                <ArrowRight aria-hidden="true" />

                <span className="sr-only">Next component: {next.title}</span>
              </Link>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <span>Next: {next.title}</span>
            <Kbd>
              <ArrowRight aria-hidden="true" />
            </Kbd>
          </TooltipContent>
        </Tooltip>
      ) : null}
    </nav>
  )
}
