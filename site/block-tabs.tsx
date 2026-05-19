'use client'

import Link from 'next/link'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown, Check, RotateCcw } from 'lucide-react'
import type { IconType } from 'react-icons'
import { SiBun, SiNpm, SiPnpm, SiYarn } from 'react-icons/si'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import BlockIframe from '@/site/block-iframe'
import {
  getInstallCommands,
  getShadcnAddSpec,
  type PackageManagerId,
} from '@/site/block-install-commands'
import { blockShowcaseCodeViewportClassName } from '@/site/block-showcase-viewport'

const TOOLBAR_SEGMENT_SHELL =
  'rounded-lg border border-border/50 bg-muted/70 shadow-inner dark:bg-muted/40'

const TOOLBAR_TAB_STRIP =
  'inline-flex h-8 min-h-8 w-fit shrink-0 items-stretch gap-0.5 ' + TOOLBAR_SEGMENT_SHELL

const TOOLBAR_TAB_TRIGGER =
  'h-full min-h-0 w-auto flex-none shrink-0 items-center justify-center gap-0 rounded-lg border border-transparent px-1.5 py-0 text-sm font-medium leading-none whitespace-nowrap text-muted-foreground/80 shadow-none transition-[color,background-color,border-color,box-shadow] duration-200 ease-out hover:text-foreground/75 data-[state=active]:border-border/60 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm md:gap-1.5 md:px-2'

const TOOLBAR_OPEN_PREVIEW_CHROME =
  'inline-flex h-8 min-h-8 w-8 shrink-0 items-stretch ' + TOOLBAR_SEGMENT_SHELL
const TOOLBAR_OPEN_PREVIEW_BUTTON =
  'flex size-full min-h-0 items-center justify-center gap-0 rounded-md border-0 bg-transparent p-0 shadow-none hover:bg-background/85 dark:hover:bg-background/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-4'

/** CLI install row: layered muted surface + inset depth (matches preview/code strip language) */
const INSTALL_CMD_ROW = ''

const PACKAGE_MANAGERS: readonly {
  id: PackageManagerId
  name: string
  Icon: IconType
  color: string
}[] = [
  { id: 'npm', name: 'npm', Icon: SiNpm, color: '#CB3837' },
  { id: 'pnpm', name: 'pnpm', Icon: SiPnpm, color: '#F69220' },
  { id: 'yarn', name: 'Yarn', Icon: SiYarn, color: '#2C8EBB' },
  { id: 'bun', name: 'Bun', Icon: SiBun, color: '#141414' },
] as const

function InstallPmIconSlot({
  copied,
  selectedColor,
  SelectedIcon,
}: {
  copied: boolean
  selectedColor: string
  SelectedIcon: IconType
}) {
  return (
    <span
      className="relative flex size-4.5 shrink-0 cursor-pointer items-center justify-center"
      aria-hidden
    >
      <AnimatePresence initial={false} mode="wait">
        {copied ? (
          <motion.span
            key="check"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <Check className="size-4.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          </motion.span>
        ) : (
          <motion.span
            key="pm"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
            exit={{ opacity: 0, filter: 'blur(4px)', scale: 0.88 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <SelectedIcon className="size-4.5 shrink-0" style={{ color: selectedColor }} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

export default function BlockTabs({
  slug,
  title,
  code,
  cli,
}: {
  slug: string
  title: string
  code: ReactNode
  cli?: string
}) {
  const [reloadKey, setReloadKey] = useState(0)
  const [selectedPm, setSelectedPm] = useState<PackageManagerId>('bun')
  const [copied, setCopied] = useState(false)
  const [copyPulse, setCopyPulse] = useState(false)
  const [copyToastVisible, setCopyToastVisible] = useState(false)
  const copyToastTimeoutRef = useRef<number | null>(null)
  const copyPulseTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (copyPulseTimeoutRef.current != null) {
        window.clearTimeout(copyPulseTimeoutRef.current)
      }
    }
  }, [])

  const spec = useMemo(() => getShadcnAddSpec(cli, slug), [cli, slug])
  const commands = useMemo(() => getInstallCommands(spec), [spec])

  const onReload = () => setReloadKey((k) => k + 1)

  const showCopyToast = () => {
    if (copyToastTimeoutRef.current != null) {
      window.clearTimeout(copyToastTimeoutRef.current)
    }
    setCopyToastVisible(true)
    copyToastTimeoutRef.current = window.setTimeout(() => {
      setCopyToastVisible(false)
      copyToastTimeoutRef.current = null
    }, 2000)
  }

  const copyCurrentToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(commands[selectedPm])
      setCopied(true)
      setCopyPulse(true)
      if (copyPulseTimeoutRef.current != null) {
        window.clearTimeout(copyPulseTimeoutRef.current)
      }
      copyPulseTimeoutRef.current = window.setTimeout(() => {
        setCopyPulse(false)
        copyPulseTimeoutRef.current = null
      }, 520)
      showCopyToast()
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore — clipboard might be unavailable
    }
  }

  const selectedMeta = PACKAGE_MANAGERS.find((p) => p.id === selectedPm)!
  const SelectedPmIcon = selectedMeta.Icon

  return (
    <Tabs defaultValue="preview" className="flex w-full flex-col gap-0">
      <div className="mb-3 flex min-h-9 w-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <TabsList className={TOOLBAR_TAB_STRIP}>
            <TabsTrigger
              value="preview"
              className={cn(TOOLBAR_TAB_TRIGGER)}
              aria-label="Preview"
              title="Preview"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g opacity="0.5">
                  <path
                    d="M14 2.75C15.9068 2.75 17.2615 2.75159 18.2892 2.88976C19.2952 3.02503 19.8749 3.27869 20.2981 3.7019C20.7852 4.18904 20.9973 4.56666 21.1147 5.23984C21.2471 5.9986 21.25 7.08092 21.25 9C21.25 9.41422 21.5858 9.75 22 9.75C22.4142 9.75 22.75 9.41422 22.75 9L22.75 8.90369C22.7501 7.1045 22.7501 5.88571 22.5924 4.98199C22.417 3.97665 22.0432 3.32568 21.3588 2.64124C20.6104 1.89288 19.6615 1.56076 18.489 1.40314C17.3498 1.24997 15.8942 1.24998 14.0564 1.25H14C13.5858 1.25 13.25 1.58579 13.25 2C13.25 2.41421 13.5858 2.75 14 2.75Z"
                    fill="#1C274C"
                  />
                  <path
                    d="M2.00001 14.25C2.41422 14.25 2.75001 14.5858 2.75001 15C2.75001 16.9191 2.75289 18.0014 2.88529 18.7602C3.00275 19.4333 3.21477 19.811 3.70191 20.2981C4.12512 20.7213 4.70476 20.975 5.71085 21.1102C6.73852 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.6502 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64125 21.3588C1.95681 20.6743 1.58304 20.0233 1.40762 19.018C1.24992 18.1143 1.24995 16.8955 1.25 15.0964L1.25001 15C1.25001 14.5858 1.58579 14.25 2.00001 14.25Z"
                    fill="#1C274C"
                  />
                  <path
                    d="M22 14.25C22.4142 14.25 22.75 14.5858 22.75 15L22.75 15.0963C22.7501 16.8955 22.7501 18.1143 22.5924 19.018C22.417 20.0233 22.0432 20.6743 21.3588 21.3588C20.6104 22.1071 19.6615 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0564 22.75H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7852 19.811 20.9973 19.4333 21.1147 18.7602C21.2471 18.0014 21.25 16.9191 21.25 15C21.25 14.5858 21.5858 14.25 22 14.25Z"
                    fill="#1C274C"
                  />
                  <path
                    d="M9.94359 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09319 2.75 6.73852 2.75159 5.71085 2.88976C4.70476 3.02503 4.12512 3.27869 3.70191 3.7019C3.21477 4.18904 3.00275 4.56666 2.88529 5.23984C2.75289 5.9986 2.75001 7.08092 2.75001 9C2.75001 9.41422 2.41422 9.75 2.00001 9.75C1.58579 9.75 1.25001 9.41422 1.25001 9L1.25 8.90369C1.24995 7.10453 1.24992 5.8857 1.40762 4.98199C1.58304 3.97665 1.95681 3.32568 2.64125 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10584 1.24998 9.94359 1.25Z"
                    fill="#1C274C"
                  />
                </g>
                <path
                  d="M12 10.75C11.3096 10.75 10.75 11.3096 10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75Z"
                  fill="#1C274C"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.89243 14.0598C5.29747 13.3697 5 13.0246 5 12C5 10.9754 5.29748 10.6303 5.89242 9.94021C7.08037 8.56222 9.07268 7 12 7C14.9273 7 16.9196 8.56222 18.1076 9.94021C18.7025 10.6303 19 10.9754 19 12C19 13.0246 18.7025 13.3697 18.1076 14.0598C16.9196 15.4378 14.9273 17 12 17C9.07268 17 7.08038 15.4378 5.89243 14.0598ZM9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75C10.4812 14.75 9.25 13.5188 9.25 12Z"
                  fill="#1C274C"
                />
              </svg>
              <span className="hidden md:inline">Preview</span>
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={cn(TOOLBAR_TAB_TRIGGER)}
              aria-label="Code"
              title="Code"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="800px"
                height="800px"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8.50226 5.38707C8.81015 5.10997 8.8351 4.63576 8.55801 4.32787C8.28092 4.01999 7.8067 3.99503 7.49882 4.27213L5.76133 5.83587C5.02499 6.49853 4.41418 7.04822 3.99477 7.54679C3.55374 8.07104 3.24023 8.6343 3.24023 9.3296C3.24023 10.0249 3.55374 10.5882 3.99477 11.1124C4.41418 11.611 5.02498 12.1607 5.76132 12.8233L7.49882 14.3871C7.8067 14.6642 8.28092 14.6392 8.55801 14.3313C8.8351 14.0234 8.81015 13.5492 8.50226 13.2721L6.80579 11.7453C6.01792 11.0362 5.48672 10.5558 5.14262 10.1468C4.81237 9.7542 4.74023 9.52502 4.74023 9.3296C4.74023 9.13417 4.81237 8.90499 5.14262 8.51241C5.48672 8.10338 6.01792 7.62298 6.80579 6.91389L8.50226 5.38707Z"
                  fill="#1C274C"
                />
                <path
                  d="M15.443 10.4983C15.7201 10.1904 16.1943 10.1654 16.5022 10.4425L18.2397 12.0063C18.976 12.6689 19.5868 13.2186 20.0063 13.7172C20.4473 14.2415 20.7608 14.8047 20.7608 15.5C20.7608 16.1953 20.4473 16.7586 20.0063 17.2828C19.5868 17.7814 18.976 18.3311 18.2397 18.9937L16.5022 20.5575C16.1943 20.8346 15.7201 20.8096 15.443 20.5017C15.1659 20.1938 15.1909 19.7196 15.4988 19.4425L17.1952 17.9157C17.9831 17.2066 18.5143 16.7262 18.8584 16.3172C19.1887 15.9246 19.2608 15.6954 19.2608 15.5C19.2608 15.3046 19.1887 15.0754 18.8584 14.6828C18.5143 14.2738 17.9831 13.7934 17.1952 13.0843L15.4988 11.5575C15.1909 11.2804 15.1659 10.8062 15.443 10.4983Z"
                  fill="#1C274C"
                />
                <path
                  opacity="0.5"
                  d="M14.1797 4.27511C14.58 4.38151 14.8182 4.79228 14.7118 5.19259L10.725 20.1926C10.6186 20.5929 10.2078 20.8312 9.80753 20.7248C9.40722 20.6184 9.16895 20.2076 9.27535 19.8073L13.2622 4.80729C13.3686 4.40697 13.7793 4.16871 14.1797 4.27511Z"
                  fill="#1C274C"
                />
              </svg>
              <span className="hidden md:inline">Code</span>
            </TabsTrigger>
          </TabsList>

          <div className={TOOLBAR_OPEN_PREVIEW_CHROME}>
            <Button
              asChild
              variant="ghost"
              className={cn(TOOLBAR_OPEN_PREVIEW_BUTTON)}
              aria-label="Open preview in new tab"
              title="Open in new tab"
            >
              <Link href={`/preview/${slug}`} target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="800px"
                  height="800px"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.2892 2.88976C17.2615 2.75159 15.9068 2.75 14 2.75C13.5858 2.75 13.25 2.41421 13.25 2C13.25 1.58579 13.5858 1.25 14 1.25L14.0564 1.25C15.8942 1.24998 17.3498 1.24997 18.489 1.40314C19.6614 1.56076 20.6104 1.89288 21.3588 2.64124C22.1071 3.38961 22.4392 4.33856 22.5969 5.51098C22.75 6.65019 22.75 8.10583 22.75 9.94359V10C22.75 10.4142 22.4142 10.75 22 10.75C21.5858 10.75 21.25 10.4142 21.25 10C21.25 8.09318 21.2484 6.73851 21.1102 5.71085C20.975 4.70476 20.7213 4.12511 20.2981 3.7019C19.8749 3.27869 19.2952 3.02502 18.2892 2.88976ZM2 13.25C2.41421 13.25 2.75 13.5858 2.75 14C2.75 15.9068 2.75159 17.2615 2.88976 18.2892C3.02502 19.2952 3.27869 19.8749 3.7019 20.2981C4.12511 20.7213 4.70476 20.975 5.71085 21.1102C6.73851 21.2484 8.09318 21.25 10 21.25C10.4142 21.25 10.75 21.5858 10.75 22C10.75 22.4142 10.4142 22.75 10 22.75H9.94359C8.10583 22.75 6.65019 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564L1.25 14C1.25 13.5858 1.58579 13.25 2 13.25Z"
                    fill="#1C274C"
                  />
                  <g opacity="0.5">
                    <path
                      d="M9.94358 1.25H10C10.4142 1.25 10.75 1.58579 10.75 2C10.75 2.41421 10.4142 2.75 10 2.75C8.09318 2.75 6.73851 2.75159 5.71085 2.88976C4.70476 3.02502 4.12511 3.27869 3.7019 3.7019C3.27869 4.12511 3.02502 4.70476 2.88976 5.71085C2.75159 6.73851 2.75 8.09318 2.75 10C2.75 10.4142 2.41421 10.75 2 10.75C1.58579 10.75 1.25 10.4142 1.25 10V9.94358V9.94357C1.24998 8.10582 1.24997 6.65019 1.40314 5.51098C1.56076 4.33856 1.89288 3.38961 2.64124 2.64124C3.38961 1.89288 4.33856 1.56076 5.51098 1.40314C6.65019 1.24997 8.10582 1.24998 9.94357 1.25H9.94358Z"
                      fill="#1C274C"
                    />
                    <path
                      d="M22 13.25C22.4142 13.25 22.75 13.5858 22.75 14V14.0564V14.0565C22.75 15.8942 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H14.0564H14C13.5858 22.75 13.25 22.4142 13.25 22C13.25 21.5858 13.5858 21.25 14 21.25C15.9068 21.25 17.2615 21.2484 18.2892 21.1102C19.2952 20.975 19.8749 20.7213 20.2981 20.2981C20.7213 19.8749 20.975 19.2952 21.1102 18.2892C21.2484 17.2615 21.25 15.9068 21.25 14C21.25 13.5858 21.5858 13.25 22 13.25Z"
                      fill="#1C274C"
                    />
                  </g>
                </svg>
              </Link>
            </Button>
          </div>

          <motion.div
            className="md:hidden"
            animate={
              copyPulse
                ? { scale: [1, 0.987, 1], filter: ['blur(0px)', 'blur(1.25px)', 'blur(0px)'] }
                : { scale: 1, filter: 'blur(0px)' }
            }
            transition={copyPulse ? { duration: 0.44, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
            style={{ transformOrigin: 'center' }}
          >
            <Button
              type="button"
              variant="outline"
              className={cn(
                'inline-flex h-9 w-9 shrink-0 items-center justify-center gap-0 rounded-lg border border-border/60 bg-background/80 p-0 shadow-sm dark:bg-background/50',
              )}
              aria-label="Copy install command"
              title="Install command"
              onClick={() => void copyCurrentToClipboard()}
            >
              <InstallPmIconSlot
                copied={copied}
                selectedColor={selectedMeta.color}
                SelectedIcon={SelectedPmIcon}
              />
            </Button>
          </motion.div>
        </div>

        <div className="flex min-h-9 shrink-0 items-center gap-2">
          <div className="hidden md:flex">
            <DropdownMenu modal={false}>
              <motion.div
                className="flex h-8 w-80 shrink-0 items-center overflow-hidden rounded-lg border border-border/50 text-sm leading-none font-medium text-foreground shadow-inner will-change-transform dark:bg-muted/40"
                animate={
                  copyPulse
                    ? { scale: [1, 0.987, 1], filter: ['blur(0px)', 'blur(1.25px)', 'blur(0px)'] }
                    : { scale: 1, filter: 'blur(0px)' }
                }
                transition={
                  copyPulse ? { duration: 0.44, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }
                }
                style={{ transformOrigin: 'center' }}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-none border-0 bg-muted/70 shadow-none hover:bg-muted/60 dark:hover:bg-input/40"
                    aria-label="Choose package manager"
                    title="Package manager"
                  >
                    <InstallPmIconSlot
                      copied={copied}
                      selectedColor={selectedMeta.color}
                      SelectedIcon={SelectedPmIcon}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4 opacity-50"
                      aria-hidden="true"
                      data-slot="select-icon"
                    >
                      <path d="m7 15 5 5 5-5"></path>
                      <path d="m7 9 5-5 5 5"></path>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <button
                  type="button"
                  className="flex h-9 min-h-9 min-w-0 flex-1 items-center truncate px-2.5 text-left font-mono text-xs leading-none text-foreground outline-none select-none hover:bg-muted/40 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:hover:bg-input/30"
                  aria-label="Copy install command"
                  title={commands[selectedPm]}
                  onClick={() => void copyCurrentToClipboard()}
                >
                  {commands[selectedPm]}
                </button>
              </motion.div>
              <DropdownMenuContent
                sideOffset={6}
                className={cn(
                  'max-h-[min(var(--radix-dropdown-menu-content-available-height),320px)] min-w-40 border-border/80',
                )}
              >
                {PACKAGE_MANAGERS.map((pm) => {
                  const PmIcon = pm.Icon
                  return (
                    <DropdownMenuItem
                      key={pm.id}
                      className={cn(
                        'gap-2.5 px-2 py-2 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground',
                      )}
                      onSelect={() => {
                        setSelectedPm(pm.id)
                      }}
                    >
                      <PmIcon
                        className="size-4.5 shrink-0"
                        style={{ color: pm.color }}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1">{pm.name}</span>
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            type="button"
            variant="ghost"
            className={cn('rounded-lg border bg-muted/70 shadow-inner')}
            onClick={onReload}
            aria-label="Reload preview"
            title="Reload preview"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1000px"
              height="1000px"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12.0789 2.25C7.2854 2.25 3.34478 5.913 2.96055 10.5833H2.00002C1.69614 10.5833 1.42229 10.7667 1.30655 11.0477C1.19081 11.3287 1.25606 11.6517 1.47178 11.8657L3.15159 13.5324C3.444 13.8225 3.91567 13.8225 4.20808 13.5324L5.88789 11.8657C6.10361 11.6517 6.16886 11.3287 6.05312 11.0477C5.93738 10.7667 5.66353 10.5833 5.35965 10.5833H4.4668C4.84652 6.75167 8.10479 3.75 12.0789 3.75C14.8484 3.75 17.2727 5.20845 18.6156 7.39279C18.8325 7.74565 19.2944 7.85585 19.6473 7.63892C20.0002 7.42199 20.1104 6.96007 19.8934 6.60721C18.2871 3.99427 15.3873 2.25 12.0789 2.25Z"
                fill="#1C274C"
              />
              <path
                opacity="0.5"
                d="M20.8412 10.4666C20.5491 10.1778 20.0789 10.1778 19.7868 10.4666L18.1005 12.1333C17.8842 12.3471 17.8185 12.6703 17.934 12.9517C18.0496 13.233 18.3236 13.4167 18.6278 13.4167H19.5269C19.1456 17.2462 15.876 20.25 11.8828 20.25C9.10034 20.25 6.66595 18.7903 5.31804 16.6061C5.10051 16.2536 4.63841 16.1442 4.28591 16.3618C3.93342 16.5793 3.82401 17.0414 4.04154 17.3939C5.65416 20.007 8.56414 21.75 11.8828 21.75C16.6907 21.75 20.6476 18.0892 21.0332 13.4167H22.0002C22.3044 13.4167 22.5784 13.233 22.694 12.9517C22.8096 12.6703 22.7438 12.3471 22.5275 12.1333L20.8412 10.4666Z"
                fill="#1C274C"
              />
            </svg>
          </Button>
        </div>
      </div>

      <div className="flex w-full min-w-0 flex-col">
        <TabsContent
          value="preview"
          className="mt-0 flex min-w-0 flex-col outline-none data-[state=inactive]:hidden"
        >
          <BlockIframe slug={slug} title={title} reloadKey={reloadKey} />
        </TabsContent>
        <TabsContent
          value="code"
          className={cn(
            'mt-0 flex min-h-0 min-w-0 flex-col overflow-hidden outline-none data-[state=inactive]:hidden',
            blockShowcaseCodeViewportClassName,
          )}
        >
          <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">{code}</div>
        </TabsContent>
      </div>

      {copyToastVisible ? (
        <output
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed top-6 left-1/2 z-100 -translate-x-1/2 rounded-lg border border-border/80 bg-popover px-3 py-2 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5"
        >
          Copied to clipboard
        </output>
      ) : null}
    </Tabs>
  )
}
