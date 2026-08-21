'use client'

import { Fragment } from 'react'
import { Accessibility, FileText, Flag, MessageCircle } from 'lucide-react'

import {
  SegmentSpotlight,
  SegmentSpotlightGrid,
  SegmentSpotlightSegment,
  SegmentSpotlightSeparator,
  SegmentSpotlightToolbar,
  SegmentSpotlightTrigger,
  SegmentSpotlightViewport,
} from '@/components/segment-spotlight'

const segments = [
  {
    value: 'comments',
    label: 'Comments',
    variant: 'blue',
    className: 'top-[18%] left-[13%] -rotate-3',
  },
  {
    value: 'drafts',
    label: 'Drafts',
    variant: 'purple',
    className: 'top-[19%] right-[17%] rotate-2',
  },
  {
    value: 'flags',
    label: 'Flags',
    variant: 'teal',
    className: 'bottom-[17%] left-[18%] rotate-2',
  },
  {
    value: 'accessibility',
    label: 'A11y',
    variant: 'green',
    className: 'right-[14%] bottom-[18%] -rotate-2',
  },
] as const

const focuses = [
  { value: 'comments', label: 'Comments', icon: MessageCircle, separator: false },
  { value: 'drafts', label: 'Drafts', icon: FileText, separator: true },
  { value: 'flags', label: 'Feature flags', icon: Flag, separator: false },
  { value: 'accessibility', label: 'Accessibility', icon: Accessibility, separator: false },
] as const

export default function SegmentSpotlightGalleryPreview() {
  return (
    <SegmentSpotlight className="w-full max-w-2xl">
      <SegmentSpotlightViewport className="min-h-60 sm:min-h-64">
        <SegmentSpotlightGrid />

        {segments.map((segment) => (
          <SegmentSpotlightSegment
            key={segment.value}
            value={segment.value}
            variant={segment.variant}
            className={`${segment.className} px-2.5 py-1 text-[11px] sm:text-xs`}
          >
            {segment.label}
          </SegmentSpotlightSegment>
        ))}

        <SegmentSpotlightToolbar
          aria-label="Highlight product capability"
          className="absolute top-1/2 left-1/2 z-30 -translate-x-1/2 -translate-y-1/2 gap-0 p-1.5 sm:gap-0.5"
        >
          {focuses.map((focus) => {
            const Icon = focus.icon

            return (
              <Fragment key={focus.value}>
                <SegmentSpotlightTrigger
                  value={focus.value}
                  targets={[focus.value]}
                  aria-label={focus.label}
                  title={focus.label}
                  className="size-8 sm:size-9"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </SegmentSpotlightTrigger>
                {focus.separator ? <SegmentSpotlightSeparator /> : null}
              </Fragment>
            )
          })}
        </SegmentSpotlightToolbar>
      </SegmentSpotlightViewport>
    </SegmentSpotlight>
  )
}
