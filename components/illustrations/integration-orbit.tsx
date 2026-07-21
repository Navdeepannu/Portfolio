import type { ComponentType } from 'react'
import { BarChart3, Cloud, CreditCard, Database, Layers3, Mail, MessageSquare } from 'lucide-react'

import { cn } from '@/lib/utils'

type OrbitIcon = ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

export type IntegrationOrbitItem = {
  label: string
  icon: OrbitIcon
}

export type IntegrationOrbitIllustrationProps = {
  className?: string
  items?: readonly IntegrationOrbitItem[]
  'aria-label'?: string
}

const defaultItems: readonly IntegrationOrbitItem[] = [
  { label: 'Messages', icon: MessageSquare },
  { label: 'Email', icon: Mail },
  { label: 'Data', icon: Database },
  { label: 'Billing', icon: CreditCard },
  { label: 'Analytics', icon: BarChart3 },
  { label: 'Storage', icon: Cloud },
]

const positions = [
  'top-[4%] left-1/2 -translate-x-1/2',
  'top-[24%] right-[1%]',
  'right-[8%] bottom-[8%]',
  'bottom-[4%] left-1/2 -translate-x-1/2',
  'bottom-[8%] left-[8%]',
  'top-[24%] left-[1%]',
] as const

function OrbitNode({ item, position }: { item: IntegrationOrbitItem; position: string }) {
  const Icon = item.icon

  return (
    <div
      className={cn(
        'absolute z-10 flex w-24 flex-col items-center gap-2 text-center sm:w-28',
        position,
      )}
    >
      <div className="grid size-12 place-items-center rounded-xl border border-border bg-background text-foreground shadow-sm sm:size-14">
        <Icon aria-hidden className="size-5" />
      </div>
      <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase sm:text-xs">
        {item.label}
      </span>
    </div>
  )
}

export function IntegrationOrbitIllustration({
  className,
  items = defaultItems,
  'aria-label':
    ariaLabel = 'A product hub connected to messaging, email, data, billing, analytics, and storage',
}: IntegrationOrbitIllustrationProps) {
  const visibleItems = items.slice(0, positions.length)

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      data-slot="integration-orbit-illustration"
      className={cn('relative mx-auto aspect-square w-full max-w-130', className)}
    >
      <div
        aria-hidden
        className="absolute inset-[16%] rounded-full border border-dashed border-border"
      />
      <div aria-hidden className="absolute inset-[30%] rounded-full border border-border/70" />

      <div className="absolute inset-[34%] z-20 grid place-items-center rounded-full border border-border bg-card text-card-foreground shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground sm:size-14">
            <Layers3 aria-hidden className="size-5 sm:size-6" />
          </div>
          <span className="text-xs font-semibold sm:text-sm">Your product</span>
          <span className="text-[10px] text-muted-foreground sm:text-xs">One connected hub</span>
        </div>
      </div>

      {visibleItems.map((item, index) => (
        <OrbitNode key={`${item.label}-${index}`} item={item} position={positions[index]} />
      ))}
    </div>
  )
}

export default IntegrationOrbitIllustration
