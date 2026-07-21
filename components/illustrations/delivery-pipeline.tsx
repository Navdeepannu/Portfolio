import { Check, FileSearch, PanelsTopLeft, Rocket } from 'lucide-react'

import { cn } from '@/lib/utils'

export type DeliveryPipelineStage = {
  label: string
  detail: string
  status: string
}

export type DeliveryPipelineIllustrationProps = {
  className?: string
  stages?: readonly DeliveryPipelineStage[]
  'aria-label'?: string
}

const defaultStages: readonly DeliveryPipelineStage[] = [
  {
    label: 'Discover',
    detail: 'Goals aligned',
    status: 'Complete',
  },
  {
    label: 'Build',
    detail: 'Sprint 03 of 04',
    status: 'In progress',
  },
  {
    label: 'Launch',
    detail: 'Quality review',
    status: 'Next up',
  },
]

const stageIcons = [FileSearch, PanelsTopLeft, Rocket] as const

function PipelineCard({ index, stage }: { index: number; stage: DeliveryPipelineStage }) {
  const Icon = stageIcons[index] ?? Rocket
  const isComplete = index === 0
  const isActive = index === 1

  return (
    <div
      className={cn(
        'relative z-10 flex min-h-42 flex-col rounded-xl border bg-card p-4 text-card-foreground shadow-sm sm:min-h-48 sm:p-5',
        isActive ? 'border-primary ring-2 ring-primary/15' : 'border-border',
        index === 1 && 'mt-10',
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className={cn(
            'grid size-9 place-items-center rounded-lg',
            isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground',
          )}
        >
          <Icon aria-hidden className="size-4" />
        </div>

        <span className="text-xs font-medium text-muted-foreground">0{index + 1}</span>
      </div>

      <div className="mt-auto">
        <div className="flex items-center gap-2">
          <p className="font-semibold">{stage.label}</p>
          {isComplete ? (
            <span className="grid size-4 place-items-center rounded-full bg-primary text-primary-foreground">
              <Check aria-hidden className="size-2.5" />
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">{stage.detail}</p>
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            'h-full rounded-full bg-primary',
            isComplete ? 'w-full' : isActive ? 'w-2/3' : 'w-0',
          )}
        />
      </div>

      <p className="mt-2 text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
        {stage.status}
      </p>
    </div>
  )
}

export function DeliveryPipelineIllustration({
  className,
  stages = defaultStages,
  'aria-label':
    ariaLabel = 'A three-stage delivery pipeline moving from discovery through build to launch',
}: DeliveryPipelineIllustrationProps) {
  const visibleStages = stages.slice(0, stageIcons.length)

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      data-slot="delivery-pipeline-illustration"
      className={cn('relative mx-auto w-full max-w-170 py-8', className)}
    >
      <div aria-hidden className="absolute top-1/2 right-[12%] left-[12%] h-px bg-border" />
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {visibleStages.map((stage, index) => (
          <PipelineCard key={`${stage.label}-${index}`} stage={stage} index={index} />
        ))}
      </div>
    </div>
  )
}

export default DeliveryPipelineIllustration
