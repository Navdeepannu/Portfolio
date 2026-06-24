'use client'
import { Accessibility, Activity, FileText, Flag, MessageCircle, Share2, Users } from 'lucide-react'

import {
  SegmentSpotlight,
  type SegmentSpotlightFocus,
  type SegmentSpotlightSegment,
} from '@/components/ui/components/segment-spotlight'

const SEGMENTS: SegmentSpotlightSegment[] = [
  {
    id: 'comments',
    label: 'Comments',
    color: 'blue',
    className: 'left-[18%] top-[20%] -rotate-3',
  },
  {
    id: 'cms',
    label: 'CMS Drafts',
    color: 'purple',
    className: 'left-[39%] top-[17%] rotate-0',
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    color: 'green',
    className: 'right-[28%] top-[20%] rotate-1',
  },
  {
    id: 'share',
    label: 'Share',
    color: 'pink',
    className: 'right-[18%] top-[24%] rotate-6',
  },
  {
    id: 'flags',
    label: 'Feature Flags',
    color: 'teal',
    className: 'left-[22%] top-[58%] rotate-2',
  },
  {
    id: 'collaborators',
    label: 'Collaborators',
    color: 'orange',
    className: 'left-[47%] top-[61%] -rotate-1',
  },
  {
    id: 'layout',
    label: 'Layout Shift',
    color: 'red',
    className: 'right-[23%] top-[58%] -rotate-3',
  },
]

const FOCUSES: SegmentSpotlightFocus[] = [
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageCircle,
    segmentIds: ['comments'],
  },
  {
    id: 'cms',
    label: 'CMS Drafts',
    icon: FileText,
    segmentIds: ['cms'],
    dividerAfter: true,
  },
  {
    id: 'flags',
    label: 'Feature Flags',
    icon: Flag,
    segmentIds: ['flags'],
  },
  {
    id: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    segmentIds: ['collaborators'],
    dividerAfter: true,
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: Accessibility,
    segmentIds: ['accessibility'],
  },
  {
    id: 'layout',
    label: 'Layout Shift',
    icon: Activity,
    segmentIds: ['layout'],
  },
  {
    id: 'share',
    label: 'Share',
    icon: Share2,
    segmentIds: ['share'],
  },
]

export default function SegmentSpotlightShowcase() {
  return (
    <>
      {/* Desktop: floating labels are absolutely positioned, so render on md+. */}
      <div className="hidden size-full items-center justify-center md:flex">
        <SegmentSpotlight segments={SEGMENTS} focuses={FOCUSES} />
      </div>

      {/* Mobile fallback */}
      <div className="flex w-full max-w-sm flex-col items-center justify-center gap-2 px-6 py-12 text-center md:hidden">
        <p className="text-sm font-medium text-foreground">Segment Spotlight is desktop-focused</p>
        <p className="text-sm text-muted-foreground">
          Open this preview on a wider screen to explore the floating labels and icon toolbar.
        </p>
      </div>
    </>
  )
}
