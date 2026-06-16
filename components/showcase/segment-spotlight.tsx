'use client'

import { Brain, Rocket, Shield, Zap } from 'lucide-react'

import {
  SegmentSpotlight,
  type SegmentSpotlightFocus,
  type SegmentSpotlightSegment,
} from '@/components/ui/custom/segment-spotlight'

/** Same segment / focus pattern as app/demo/page.tsx, different copy. */
const SEGMENTS: SegmentSpotlightSegment[] = [
  { id: 'ship', text: 'Ship 10x faster' },
  { id: 'with', text: ' with ' },
  { id: 'sync', text: 'real-time sync' },
  { id: 'and', text: ' & ' },
  { id: 'ai', text: 'AI insights' },
]

const FOCUSES: SegmentSpotlightFocus[] = [
  {
    id: 'velocity',
    label: 'Velocity',
    icon: Rocket,
    segmentIds: ['ship'],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: Zap,
    segmentIds: ['sync'],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    icon: Brain,
    segmentIds: ['ai'],
  },
  {
    id: 'platform',
    label: 'Full platform',
    icon: Shield,
    segmentIds: ['ship', 'with', 'sync', 'and', 'ai'],
  },
]

export default function SegmentSpotlightShowcase() {
  return (
    <div className="flex size-full items-center justify-center">
      <SegmentSpotlight segments={SEGMENTS} focuses={FOCUSES} />
    </div>
  )
}
