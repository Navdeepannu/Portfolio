import type { Metadata } from 'next'

import { FlowDeskPage } from '@/features/navui/previews/pages/flowdesk/flowdesk-page'
import { PageFrame } from '@/features/navui/previews/pages/page-preview/page-frame'

export const metadata: Metadata = {
  title: 'FlowDesk Page Template',
  description:
    'A full-page SaaS operations workspace template with navigation, data views, and polished product UI.',
  alternates: { canonical: '/pages/flowdesk' },
  openGraph: { url: '/pages/flowdesk' },
}

type FlowDeskRouteProps = {
  searchParams: Promise<{
    embed?: string
  }>
}

export default async function FlowDeskRoute({ searchParams }: FlowDeskRouteProps) {
  const { embed } = await searchParams

  if (embed === '1') {
    return <FlowDeskPage />
  }

  return <PageFrame src="/pages/flowdesk?embed=1" title="FlowDesk responsive preview" />
}
