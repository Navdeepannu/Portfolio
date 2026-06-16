'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import { Check, ChevronDown, CircleX, Copy } from 'lucide-react'
import { CopyButton } from '@/components/ui/custom/copy-button'
import type { PackageManagerId } from '@/site/block-install-commands'

type PackageManagerCommandProps = {
  commands: Record<PackageManagerId, string>
  defaultPackageManager?: PackageManagerId
  className?: string
  commandClassName?: string
  align?: 'start' | 'center' | 'end'
  showToast?: boolean
}

type PackageManagerMeta = {
  id: PackageManagerId
  name: string
  Icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
}

function NpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 128 128" aria-hidden="true" {...props}>
      <path
        fill="#CB3837"
        d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
      />
    </svg>
  )
}

function PnpmIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="#F9AD00" d="M3 3h5v5H3zM9.5 3h5v5h-5zM16 3h5v5h-5zM16 9.5h5v5h-5z" />
      <path fill="#4E4E4E" d="M9.5 9.5h5v5h-5zM3 16h5v5H3zM9.5 16h5v5h-5zM16 16h5v5h-5z" />
    </svg>
  )
}

function YarnIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#2C8EBB" />
      <path
        fill="white"
        d="M14.8 7.2c-.4-.2-.9.6-1.1 1.1a2.7 2.7 0 0 0-2.4.9c-.3.3-.6.3-.8.4-.3.1-.6.8-.7 1.2-.3.9.5 1.8.5 1.8s-1.2.8-1.6 1.9a5 5 0 0 0-.3 2.2s-.8.7-.9 1.5c-.1.7.2 1.4.4 1.6.2.3.6.2.6.2s-.5.6 0 .9c.5.2 1.3.4 1.7 0 .3-.3.4-1 .5-1.3 0-.1.1.1.2.2.2.2.4.3.4.3s-.7.3-.4 1c.1.3.5.4 1.1.4.2 0 2.7-.1 3.4-.3.2-.1.4-.2.5-.3 1.1-.3 2.1-.8 3-1.4.9-.6 1.3-.8 2-1 .6-.1.6-1.1-.2-1.1s-1.6.4-2.2.8c-1.2.7-1.8.7-1.8.7s.4-1.3-.1-2.7c-.5-1.5-1.4-1.9-1.3-2 .3-.5 1-1.3 1.3-2.8.2-.9.1-2.4-.3-3.2-.1-.1-.7.2-.7.2s-.6-1.3-.8-1.4z"
      />
    </svg>
  )
}

function BunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" fill="#FBF0DF" />
      <path
        fill="black"
        d="M12 3.2c1.1 0 2 .5 3.2 1.3.6.4 1.3.9 2.4 1.5 2.5 1.4 4 3.7 4 6.2 0 4.5-4.3 8.1-9.6 8.1s-9.6-3.6-9.6-8.1c0-2.5 1.5-4.8 4-6.2 1.1-.6 1.8-1.1 2.4-1.5C10 3.7 10.9 3.2 12 3.2Zm0 1.2c-.8 0-1.5.4-2.6 1.1-.6.4-1.4.9-2.5 1.5-2.1 1.2-3.3 3.1-3.3 5.2 0 3.8 3.8 6.9 8.4 6.9s8.4-3.1 8.4-6.9c0-2.1-1.2-4-3.3-5.2-1.1-.6-1.9-1.1-2.5-1.5-1.1-.7-1.8-1.1-2.6-1.1Z"
      />
      <circle cx="8.8" cy="11.7" r="1.1" fill="black" />
      <circle cx="15.2" cy="11.7" r="1.1" fill="black" />
      <path fill="black" d="M9.6 14.2h4.8c-.3 1.2-1.3 2-2.4 2s-2.1-.8-2.4-2Z" />
      <path
        fill="#FF6164"
        d="M10.8 15.1c.4.4.8.6 1.2.6s.8-.2 1.2-.6c-.4-.3-.8-.4-1.2-.4s-.8.1-1.2.4Z"
      />
    </svg>
  )
}

const PACKAGE_MANAGERS: PackageManagerMeta[] = [
  { id: 'npm', name: 'npm', Icon: NpmIcon },
  { id: 'pnpm', name: 'pnpm', Icon: PnpmIcon },
  { id: 'yarn', name: 'yarn', Icon: YarnIcon },
  { id: 'bun', name: 'bun', Icon: BunIcon },
]

export function PackageManagerCommand({
  commands,
  defaultPackageManager = 'npm',
  className,
  commandClassName,
  align = 'end',
  showToast = true,
}: PackageManagerCommandProps) {
  const [selectedPm, setSelectedPm] = useState<PackageManagerId>(defaultPackageManager)
  const [pulse, setPulse] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)

  const pulseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectedPackageManager = useMemo(
    () => PACKAGE_MANAGERS.find((item) => item.id === selectedPm) ?? PACKAGE_MANAGERS[0],
    [selectedPm],
  )

  const command = commands[selectedPm]
  const SelectedIcon = selectedPackageManager.Icon

  const handleCopySuccess = () => {
    setPulse(true)

    if (pulseTimeoutRef.current) {
      clearTimeout(pulseTimeoutRef.current)
    }

    pulseTimeoutRef.current = setTimeout(() => {
      setPulse(false)
      pulseTimeoutRef.current = null
    }, 520)

    if (showToast) {
      setToastVisible(true)

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }

      toastTimeoutRef.current = setTimeout(() => {
        setToastVisible(false)
        toastTimeoutRef.current = null
      }, 1800)
    }
  }
  useEffect(() => {
    return () => {
      if (pulseTimeoutRef.current) {
        clearTimeout(pulseTimeoutRef.current)
      }

      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <DropdownMenu modal={false}>
        <motion.div
          className={cn(
            'flex h-9 min-w-0 shrink-0 items-stretch overflow-hidden rounded-lg border border-border/60 bg-background/80 text-sm font-medium text-foreground shadow-sm ring-1 ring-foreground/6.5 will-change-transform dark:bg-background/50',
            'w-35 sm:w-[min(82vw,22rem)]',
            className,
          )}
          animate={
            pulse
              ? {
                  scale: [1, 0.987, 1],
                  filter: ['blur(0px)', 'blur(1.25px)', 'blur(0px)'],
                }
              : {
                  scale: 1,
                  filter: 'blur(0px)',
                }
          }
          transition={pulse ? { duration: 0.44, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
          style={{ transformOrigin: 'center' }}
        >
          <CopyButton
            type="button"
            variant="ghost"
            text={command}
            idleIcon={<SelectedIcon className="size-4.5 shrink-0" />}
            doneIcon={<Check className="size-4.5 text-emerald-600" />}
            errorIcon={<CircleX className="size-4.5 text-destructive" />}
            className={cn(
              'inline-flex h-full min-h-0 min-w-0 flex-1 cursor-pointer items-center justify-start gap-2 rounded-none border-0 bg-transparent px-2.5 shadow-none outline-none select-none',
              'hover:bg-muted/60 focus-visible:bg-muted/60 dark:hover:bg-input/40 dark:focus-visible:bg-input/40',
              '[&_svg]:size-4.5 [&_svg]:shrink-0',
              commandClassName,
            )}
            aria-label="Copy install command"
            title={command}
            onCopySuccess={handleCopySuccess}
          >
            <span className="block text-sm font-semibold text-muted-foreground sm:hidden">
              Copy
            </span>

            <Copy className="size-4 shrink-0 text-muted-foreground sm:hidden" />

            <span className="hidden min-w-0 truncate font-mono text-xs text-muted-foreground sm:block dark:text-card-foreground">
              {command}
            </span>
          </CopyButton>
          <span aria-hidden className="my-1.5 w-px shrink-0 self-stretch bg-border/60" />

          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              className="inline-flex h-full min-h-0 shrink-0 cursor-pointer items-center justify-center gap-1 rounded-none border-0 bg-transparent px-2.5 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
              aria-label="Choose package manager"
              title={`Choose package manager: ${selectedPackageManager.name}`}
            >
              <SelectedIcon className="hidden size-4.5 shrink-0 sm:block" />

              <ChevronDown className="size-4 shrink-0 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
        </motion.div>

        <DropdownMenuContent
          align={align}
          sideOffset={6}
          className="min-w-44 overflow-hidden border-border/80 p-1"
        >
          {PACKAGE_MANAGERS.map((pm) => {
            const PmIcon = pm.Icon
            const isSelected = pm.id === selectedPm

            return (
              <DropdownMenuItem
                key={pm.id}
                className={cn(
                  'flex cursor-pointer items-center gap-2.5 px-2 py-2 text-sm',
                  'data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                )}
                onSelect={() => setSelectedPm(pm.id)}
              >
                <PmIcon className="size-4.5 shrink-0" />

                <span className="min-w-0 flex-1">{pm.name}</span>

                {isSelected ? <Check className="size-4 shrink-0" /> : null}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      {toastVisible ? (
        <output
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-lg border border-border/80 bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5"
        >
          Copied to clipboard
        </output>
      ) : null}
    </>
  )
}
