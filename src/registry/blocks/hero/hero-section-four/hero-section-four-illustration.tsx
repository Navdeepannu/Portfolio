'use client'

import { type ReactNode, useRef } from 'react'
import { ArrowRight, Coffee, Mail, NfcIcon, User } from 'lucide-react'
import {
  motion,
  type Variants,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'motion/react'

import { cn } from '@/lib/utils'

const ENTRANCE_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PANEL_ENTRANCE_START = 0.62
const PANEL_STAGGER = 0.12

const cardEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 52,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.05,
      duration: 0.72,
      ease: ENTRANCE_EASE,
    },
  },
}

const panelEntranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    filter: 'blur(12px)',
  },
  visible: (order: number = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      delay: PANEL_ENTRANCE_START + order * PANEL_STAGGER,
      duration: 0.64,
      ease: ENTRANCE_EASE,
    },
  }),
}

type WorkflowStage = 'receipt' | 'policy' | 'category' | 'approval'

type WorkflowPanelProps = {
  children: ReactNode
  className?: string
  isActive: boolean
  order: number
  shouldReduceMotion: boolean
  stage: WorkflowStage
  title: string
}

function WorkflowPanel({
  children,
  className,
  isActive,
  order,
  shouldReduceMotion,
  stage,
  title,
}: WorkflowPanelProps) {
  return (
    <motion.div
      variants={panelEntranceVariants}
      custom={order}
      initial={shouldReduceMotion ? false : 'hidden'}
      animate={shouldReduceMotion ? undefined : isActive ? 'visible' : 'hidden'}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -5,
              transition: {
                duration: 0.22,
                ease: 'easeOut',
              },
            }
      }
      style={{
        willChange: shouldReduceMotion ? undefined : 'transform, opacity, filter',
      }}
      className={cn(
        'absolute transform-gpu border border-border/70',
        'bg-background/95 p-2.5 text-foreground backdrop-blur-[2px]',
        'shadow-[0_12px_34px_rgba(15,23,42,0.07)]',
        'transition-shadow duration-300',
        'hover:shadow-[0_18px_42px_rgba(15,23,42,0.1)]',
        'sm:p-4',
        'dark:border-white/10 dark:bg-zinc-950/95',
        'dark:shadow-[0_14px_36px_rgba(0,0,0,0.34)]',
        'dark:hover:shadow-[0_20px_48px_rgba(0,0,0,0.48)]',
        className,
      )}
      data-workflow-panel={stage}
    >
      <PanelCornerMarkers />

      <p className="text-[8px] font-semibold tracking-wide text-muted-foreground uppercase sm:text-[10px]">
        {title}
      </p>

      {children}
    </motion.div>
  )
}

function PanelCornerMarkers() {
  const positions = [
    '-top-1 -left-1',
    '-top-1 -right-1',
    '-bottom-1 -left-1',
    '-bottom-1 -right-1',
  ] as const

  return (
    <div aria-hidden="true" className="pointer-events-none">
      {positions.map((position) => (
        <span
          key={position}
          className={cn('absolute size-1.5 rounded-full bg-muted-foreground', position)}
        />
      ))}
    </div>
  )
}

function PanelInset({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'mt-2.5 rounded-sm border border-border/60 bg-muted/80 p-2',
        'sm:mt-3 sm:p-2.5',
        className,
      )}
    >
      {children}
    </div>
  )
}

function PaymentCard({
  isActive,
  shouldReduceMotion,
}: {
  isActive: boolean
  shouldReduceMotion: boolean
}) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)

  const springX = useSpring(pointerX, {
    stiffness: 160,
    damping: 22,
    mass: 0.4,
  })

  const springY = useSpring(pointerY, {
    stiffness: 160,
    damping: 22,
    mass: 0.4,
  })

  const rotateY = useTransform(springX, [-1, 1], [-12, 12])
  const rotateX = useTransform(springY, [-1, 1], [12, -12])

  const resetTilt = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return (
    // Positioning layer
    <div
      className={cn(
        'absolute top-1/2 left-1/2 z-30',
        'h-60 w-38 -translate-x-1/2 -translate-y-1/2',
        'sm:h-72 sm:w-46',
        'lg:h-82 lg:w-52',
      )}
    >
      {/* Entrance layer */}
      <motion.div
        variants={cardEntranceVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        animate={shouldReduceMotion ? undefined : isActive ? 'visible' : 'hidden'}
        style={{
          willChange: shouldReduceMotion ? undefined : 'transform, opacity',
        }}
        className="size-full transform-gpu"
      >
        {/* Interaction layer */}
        <motion.div
          onPointerMove={(event) => {
            const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

            if (shouldReduceMotion || !hasFinePointer) {
              return
            }

            const rect = event.currentTarget.getBoundingClientRect()

            pointerX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2)

            pointerY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2)
          }}
          onPointerLeave={resetTilt}
          onPointerCancel={resetTilt}
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformPerspective: 750,
            transformStyle: 'preserve-3d',
          }}
          className={cn(
            'relative size-full transform-gpu overflow-hidden',
            'rounded-[1.2rem] border border-white/10 bg-zinc-950',
            'shadow-[0_28px_70px_rgba(15,23,42,0.2),0_10px_24px_rgba(15,23,42,0.14)]',
            'sm:rounded-[1.35rem]',
            'dark:shadow-[0_30px_80px_rgba(0,0,0,0.52)]',
          )}
        >
          <CardDecoration />
          <CardChip />

          <div className="absolute top-5 left-5 z-10 flex items-center gap-1 text-white sm:top-7 sm:left-6">
            <NfcIcon aria-hidden="true" className="size-4 sm:size-5" />

            <span className="text-[10px] font-semibold tracking-wide sm:text-xs">Payflow</span>
          </div>

          <div className="absolute bottom-5 left-5 z-10 text-[8px] font-medium tracking-[0.16em] text-white/50 uppercase sm:bottom-6 sm:left-6 sm:text-[10px] sm:tracking-[0.18em]">
            4821 •••• 8830
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function CardDecoration() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        {Array.from({ length: 16 }).map((_, index) => (
          <span
            key={index}
            className="absolute rounded-full border border-white/10"
            style={{
              right: `${index * 9 - 48}px`,
              bottom: `${index * -2 - 58}px`,
              width: `${160 + index * 22}px`,
              height: `${120 + index * 22}px`,
            }}
          />
        ))}
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] border border-white/5"
      />
    </>
  )
}

function CardChip() {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute top-5 right-5 z-10 aspect-square w-8 overflow-hidden',
        'rounded-[22%] bg-[#9d9580]',
        'shadow-[0_5px_12px_rgba(0,0,0,0.3),inset_1px_1px_2px_rgba(255,255,255,0.45),inset_-1px_-1px_2px_rgba(47,43,34,0.28)]',
        'sm:top-6 sm:right-6 sm:w-9',
      )}
    >
      <div className="relative z-10 grid size-full grid-cols-3 grid-rows-3 overflow-hidden rounded-[15%]">
        <div className="col-span-2 border-r border-b border-neutral-500/60" />
        <div className="border-b border-neutral-500/60" />

        <div className="border-r border-b border-neutral-500/60" />
        <div className="col-span-2 border-b border-neutral-500/60" />

        <div className="col-span-2 border-r border-neutral-500/60" />
      </div>
    </div>
  )
}

const receiptItems = [
  {
    name: '1 × Coffee',
    price: '$2.30',
  },
  {
    name: '1 × Classic Donut',
    price: '$3.59',
  },
] as const

function ReceiptItem({ name, price }: { name: string; price: string }) {
  return (
    <div className="flex w-full items-center justify-between gap-3">
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}

function ReceiptPanelContent() {
  return (
    <PanelInset>
      <div className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center gap-2 border-b border-dashed border-border pb-4">
          <Coffee aria-hidden="true" className="size-4 text-muted-foreground" />

          <div className="text-center text-[10px] leading-3 tracking-tight text-muted-foreground">
            <p>CAFE</p>
            <p>123 Roadhouse Ave</p>
            <p>M9A 4XZ, CA</p>
          </div>
        </div>

        <div className="flex w-full flex-col gap-2 pt-4 font-mono text-[9px] tracking-tight">
          {receiptItems.map((item) => (
            <ReceiptItem key={item.name} name={item.name} price={item.price} />
          ))}

          <div className="border-t border-muted-foreground/60 pt-1">
            <div className="flex justify-between font-semibold text-foreground">
              <p>TOTAL</p>
              <p>$5.89</p>
            </div>
          </div>
        </div>
      </div>
    </PanelInset>
  )
}

function MatchingPanelContent({
  isActive,
  shouldReduceMotion,
}: {
  isActive: boolean
  shouldReduceMotion: boolean
}) {
  return (
    <PanelInset>
      <div className="flex flex-col gap-2 text-[7px] sm:text-[8px]">
        <ProgressRow label="Office supplies" width="42%" />

        <div className="flex flex-col gap-1">
          <p>Business travel</p>

          <div className="relative h-1 overflow-hidden rounded-full bg-border">
            <motion.span
              initial={false}
              animate={{
                width: shouldReduceMotion || isActive ? '60%' : '2%',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : {
                      delay: PANEL_ENTRANCE_START + PANEL_STAGGER + 0.24,
                      duration: 0.65,
                      ease: ENTRANCE_EASE,
                    }
              }
              className="absolute inset-y-0 left-0 rounded-full bg-blue-500/80"
            />
          </div>
        </div>

        <ProgressRow label="WFH stipend" width="52%" />
      </div>
    </PanelInset>
  )
}

function ProgressRow({ label, width }: { label: string; width: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p>{label}</p>

      <div className="relative h-1 overflow-hidden rounded-full bg-border">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-muted-foreground/30"
          style={{ width }}
        />
      </div>
    </div>
  )
}

const reportItems = [
  {
    label: 'Action required',
    highlighted: false,
  },
  {
    label: 'Expense report 1084',
    highlighted: true,
  },
  {
    label: 'Missing receipt',
    highlighted: false,
  },
  {
    label: 'Report 1280',
    highlighted: false,
  },
] as const

function ReportPanelContent() {
  return (
    <div className="mt-3 space-y-2.5 sm:mt-4 sm:space-y-3">
      {reportItems.map((item) => (
        <div
          key={item.label}
          className={cn(
            'flex min-w-0 items-center gap-2',
            item.highlighted ? 'text-foreground' : 'text-muted-foreground/35',
          )}
        >
          <Mail aria-hidden="true" className="size-4 shrink-0 sm:size-4.5" />

          <p
            className={cn('truncate text-[9px] sm:text-[11px]', item.highlighted && 'font-medium')}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  )
}

function ApprovalPanelContent() {
  return (
    <PanelInset>
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="grid size-8 shrink-0 place-items-center rounded-full bg-zinc-900 text-white sm:size-9 dark:bg-white dark:text-zinc-950">
          <User aria-hidden="true" className="size-3.5 sm:size-4" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold uppercase sm:text-xs">John Doe</p>

          <p className="mt-0.5 truncate text-[8px] text-muted-foreground sm:text-[10px]">
            Finance Manager
          </p>
        </div>

        <div
          aria-hidden="true"
          className="grid size-7 shrink-0 place-items-center rounded-full border border-border/60 bg-background sm:size-8"
        >
          <ArrowRight className="size-3.5 text-muted-foreground sm:size-4" />
        </div>
      </div>
    </PanelInset>
  )
}

type SpendWorkflowIllustrationProps = {
  className?: string
  'aria-label'?: string
}

type StandaloneIllustrationProps = {
  className?: string
}

function StandalonePanelFrame({
  children,
  className,
  title,
  stage,
}: {
  children: ReactNode
  className?: string
  title: string
  stage: WorkflowStage
}) {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <div
      role="img"
      aria-label={title}
      className={cn('relative h-48 w-64 text-left sm:h-54 sm:w-72', className)}
    >
      <WorkflowPanel
        stage={stage}
        title={title}
        order={0}
        isActive={true}
        shouldReduceMotion={shouldReduceMotion}
        className="inset-0 w-full"
      >
        {children}
      </WorkflowPanel>
    </div>
  )
}

export function PaymentCardIllustration({ className }: StandaloneIllustrationProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <div
      role="img"
      aria-label="Payment card"
      className={cn('relative h-88 w-56 sm:h-96 sm:w-64', className)}
    >
      <PaymentCard isActive={true} shouldReduceMotion={shouldReduceMotion} />
    </div>
  )
}

export function ReceiptPanelIllustration({ className }: StandaloneIllustrationProps) {
  return (
    <StandalonePanelFrame title="Receipt captured" stage="receipt" className={className}>
      <ReceiptPanelContent />
    </StandalonePanelFrame>
  )
}

export function MatchingPanelIllustration({ className }: StandaloneIllustrationProps) {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <StandalonePanelFrame title="Matching..." stage="policy" className={className}>
      <MatchingPanelContent isActive={true} shouldReduceMotion={shouldReduceMotion} />
    </StandalonePanelFrame>
  )
}

export function ReportPanelIllustration({ className }: StandaloneIllustrationProps) {
  return (
    <StandalonePanelFrame title="Fetching report..." stage="category" className={className}>
      <ReportPanelContent />
    </StandalonePanelFrame>
  )
}

export function ApprovalPanelIllustration({ className }: StandaloneIllustrationProps) {
  return (
    <StandalonePanelFrame title="Approval routed" stage="approval" className={className}>
      <ApprovalPanelContent />
    </StandalonePanelFrame>
  )
}

export function SpendWorkflowIllustration({
  className,
  'aria-label': ariaLabel = 'Automated expense processing workflow',
}: SpendWorkflowIllustrationProps) {
  const illustrationRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = Boolean(useReducedMotion())

  const isInView = useInView(illustrationRef, {
    once: true,
    amount: 0.2,
    margin: '0px 0px -10% 0px',
  })

  const isActive = isInView || shouldReduceMotion

  return (
    <div
      ref={illustrationRef}
      role="img"
      aria-label={ariaLabel}
      data-slot="spend-workflow-illustration"
      className={cn(
        'relative isolate mx-auto h-130 w-full max-w-160',
        'shrink-0 overflow-hidden sm:h-140 lg:h-150',
        className,
      )}
      style={{
        maskImage:
          'linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to right, transparent 0%, black 1%, black 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 1%, black 99%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-55 dark:opacity-25"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(15,23,42,0.16) 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />

      <PaymentCard isActive={isActive} shouldReduceMotion={shouldReduceMotion} />

      <WorkflowPanel
        stage="receipt"
        title="Receipt captured"
        order={0}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-5 left-0 z-40 w-[46%] max-w-58 sm:top-[6%] sm:left-[4%]"
      >
        <ReceiptPanelContent />
      </WorkflowPanel>

      <WorkflowPanel
        stage="policy"
        title="Matching..."
        order={1}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-[10%] right-0 z-10 w-[46%] max-w-58 sm:top-[13%] sm:right-[3%]"
      >
        <MatchingPanelContent isActive={isActive} shouldReduceMotion={shouldReduceMotion} />
      </WorkflowPanel>

      <WorkflowPanel
        stage="category"
        title="Fetching report..."
        order={2}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="bottom-[7%] left-0 z-10 w-[46%] max-w-58 sm:bottom-[9%] sm:left-[3%]"
      >
        <ReportPanelContent />
      </WorkflowPanel>

      <WorkflowPanel
        stage="approval"
        title="Approval routed"
        order={3}
        isActive={isActive}
        shouldReduceMotion={shouldReduceMotion}
        className="top-[50%] right-0 z-40 w-[47%] max-w-60 sm:top-[49%] sm:right-[1%]"
      >
        <ApprovalPanelContent />
      </WorkflowPanel>
    </div>
  )
}
