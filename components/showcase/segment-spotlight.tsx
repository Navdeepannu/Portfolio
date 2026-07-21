'use client'

import { Fragment } from 'react'
import { Accessibility, Activity, FileText, Flag, MessageCircle, Share2, Users } from 'lucide-react'

import {
  SegmentSpotlight,
  SegmentSpotlightGrid,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
  type SegmentSpotlightVariant,
} from '@/components/ui/components/segment-spotlight'

const segments: Array<{
  value: string
  label: string
  variant: SegmentSpotlightVariant
  className: string
}> = [
  {
    value: 'comments',
    label: 'Comments',
    variant: 'blue',
    className: 'left-[18%] top-[20%] -rotate-3',
  },
  { value: 'cms', label: 'CMS Drafts', variant: 'purple', className: 'left-[39%] top-[17%]' },
  {
    value: 'accessibility',
    label: 'Accessibility',
    variant: 'green',
    className: 'right-[28%] top-[20%] rotate-1',
  },
  { value: 'share', label: 'Share', variant: 'pink', className: 'right-[18%] top-[24%] rotate-6' },
  {
    value: 'flags',
    label: 'Feature Flags',
    variant: 'teal',
    className: 'left-[22%] top-[58%] rotate-2',
  },
  {
    value: 'collaborators',
    label: 'Collaborators',
    variant: 'orange',
    className: 'left-[47%] top-[61%] -rotate-1',
  },
  {
    value: 'layout',
    label: 'Layout Shift',
    variant: 'red',
    className: 'right-[23%] top-[58%] -rotate-3',
  },
]

const focuses = [
  { value: 'comments', label: 'Comments', icon: MessageCircle, targets: ['comments'] },
  { value: 'cms', label: 'CMS Drafts', icon: FileText, targets: ['cms'], separator: true },
  { value: 'flags', label: 'Feature Flags', icon: Flag, targets: ['flags'] },
  {
    value: 'collaborators',
    label: 'Collaborators',
    icon: Users,
    targets: ['collaborators'],
    separator: true,
  },
  {
    value: 'accessibility',
    label: 'Accessibility',
    icon: Accessibility,
    targets: ['accessibility'],
  },
  { value: 'layout', label: 'Layout Shift', icon: Activity, targets: ['layout'] },
  { value: 'share', label: 'Share', icon: Share2, targets: ['share'] },
]

export default function SegmentSpotlightShowcase() {
  return (
    <div className="hidden size-full items-center justify-center md:flex">
      <SegmentSpotlight className="mx-auto max-w-6xl">
        <SegmentSpotlightViewport>
          <SegmentSpotlightGrid />

          {segments.map((segment) => (
            <SegmentSpotlightSegment
              key={segment.value}
              value={segment.value}
              variant={segment.variant}
              className={segment.className}
            >
              {segment.label}
            </SegmentSpotlightSegment>
          ))}

          <SegmentSpotlightToolbar
            aria-label="Highlight product capability"
            className="absolute top-[42%] left-1/2 z-30 -translate-x-1/2"
          >
            {focuses.map((focus) => {
              const Icon = focus.icon

              return (
                <Fragment key={focus.value}>
                  <SegmentSpotlightTrigger
                    value={focus.value}
                    targets={focus.targets}
                    aria-label={focus.label}
                    title={focus.label}
                  >
                    <Icon className="size-5" aria-hidden />
                  </SegmentSpotlightTrigger>
                  {focus.separator ? <SegmentSpotlightSeparator /> : null}
                </Fragment>
              )
            })}
          </SegmentSpotlightToolbar>
        </SegmentSpotlightViewport>
      </SegmentSpotlight>
    </div>
  )
}
