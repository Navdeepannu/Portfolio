'use client'

import { TrendingUp } from 'lucide-react'

import {
  ExpandableCard,
  ExpandableCardBody,
  ExpandableCardContent,
  ExpandableCardDescription,
  ExpandableCardHeader,
  ExpandableCardTitle,
  ExpandableCardTrigger,
} from '@/components/ui/components/expandable-card'
import type { ComponentGalleryPreviewProps } from '@/site/component-gallery-preview'

const chartSegments = [
  {
    fill: 'var(--chart-1, var(--primary))',
    d: `M 405.0988,148
      A8,8,0,0,0,413.0762,139.3985
      A114.4,114.4,0,0,0,285.5159,34.3975
      A8,8,0,0,0,278.608,43.8793
      L291.8602,111.5442
      A8,8,0,0,0,299.5613,118.0053
      A30,30,0,0,1,328.3276,141.6842
      A8,8,0,0,0,336.1484,148Z`,
  },
  {
    fill: 'var(--chart-2, var(--muted-foreground))',
    d: `M 271.3946,45.5554
      A8,8,0,0,0,261.0137,40.0908
      A114.4,114.4,0,0,0,185.1691,136.6032
      A8,8,0,0,0,192.9331,145.3978
      L261.8628,147.0889
      A8,8,0,0,0,269.8361,140.9668
      A30,30,0,0,1,285.2711,121.3257
      A8,8,0,0,0,289.3345,112.1311Z`,
  },
  {
    fill: 'var(--chart-3, var(--secondary))',
    d: `M 193.0099,152.803
      A8,8,0,0,0,185.4301,161.7568
      A114.4,114.4,0,0,0,254.3329,253.3195
      A8,8,0,0,0,265.0354,248.5155
      L287.108,183.1935
      A8,8,0,0,0,283.6281,173.7625
      A30,30,0,0,1,269.9883,155.6369
      A8,8,0,0,0,261.8897,149.6817Z`,
  },
  {
    fill: 'var(--chart-4, var(--accent))',
    d: `M 272.1298,250.6399
      A8,8,0,0,0,278.4306,260.5356
      A114.4,114.4,0,0,0,379.3361,229.4461
      A8,8,0,0,0,378.9752,217.7204
      L327.0017,172.4112
      A8,8,0,0,0,316.9563,172.0327
      A30,30,0,0,1,297.6825,177.9711
      A8,8,0,0,0,289.5919,183.9373Z`,
  },
  {
    fill: 'var(--chart-5, var(--border))',
    d: `M 383.6438,211.9717
      A8,8,0,0,0,395.1943,209.9195
      A114.4,114.4,0,0,0,412.1983,164.5381
      A8,8,0,0,0,404.8404,155.4011
      L336.0579,150.5913
      A8,8,0,0,0,327.8156,156.3462
      A30,30,0,0,1,326.2052,160.6443
      A8,8,0,0,0,328.6363,170.3984Z`,
  },
]

function PerformanceChart() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 598 328"
      className="size-full max-h-36"
      preserveAspectRatio="xMidYMid meet"
    >
      {chartSegments.map((segment, index) => (
        <path
          key={index}
          d={segment.d}
          fill={segment.fill}
          className="transition-opacity duration-200 hover:opacity-75"
        />
      ))}
    </svg>
  )
}

export default function ExpandableCardGalleryPreview({
  portalContainer,
}: ComponentGalleryPreviewProps) {
  return (
    <ExpandableCard modal={false}>
      <ExpandableCardTrigger className="max-w-60 overflow-hidden">
        <span className="grid min-h-36 place-items-center border-b bg-card p-3">
          <PerformanceChart />
        </span>

        <span className="block p-4">
          <span className="block font-semibold tracking-tight">Weekly performance</span>

          <span className="mt-1.5 block text-sm text-muted-foreground">
            Open the focused report
          </span>
        </span>
      </ExpandableCardTrigger>

      <ExpandableCardContent
        contained
        portalContainer={portalContainer}
        className="max-w-md rounded-2xl"
        overlayClassName="bg-background/65 backdrop-blur-[2px]"
      >
        <ExpandableCardHeader className="p-5 pr-14">
          <span className="grid size-9 place-items-center rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="size-4" aria-hidden="true" />
          </span>

          <ExpandableCardTitle className="text-xl">Weekly performance</ExpandableCardTitle>

          <ExpandableCardDescription>
            Delivery increased while review time stayed within the team target.
          </ExpandableCardDescription>
        </ExpandableCardHeader>

        <ExpandableCardBody className="grid grid-cols-2 gap-3 px-5 pb-5">
          <div className="rounded-xl border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="mt-1 text-xl font-semibold">28</p>
          </div>

          <div className="rounded-xl border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Review time</p>
            <p className="mt-1 text-xl font-semibold">3.4h</p>
          </div>
        </ExpandableCardBody>
      </ExpandableCardContent>
    </ExpandableCard>
  )
}
