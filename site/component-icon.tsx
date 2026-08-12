import type { ComponentProps } from 'react'
import {
  BarChart3,
  CalendarDays,
  Command,
  Expand,
  Gauge,
  Hash,
  MousePointer2,
  PanelTop,
  Route,
  Sparkles,
} from 'lucide-react'

const icons = {
  'segment-spotlight': Sparkles,
  'magnetic-button': MousePointer2,
  'animated-tabs': PanelTop,
  'expandable-card': Expand,
  'rail-nav': Route,
  'animated-numbers': Hash,
  'proximity-nav': Gauge,
  'package-manager-command': Command,
  'contribution-graph': CalendarDays,
  'public-insights': BarChart3,
} as const

export function ComponentIcon({ slug, ...props }: { slug: string } & ComponentProps<'svg'>) {
  const Icon = icons[slug as keyof typeof icons] ?? Sparkles
  return <Icon {...props} />
}
