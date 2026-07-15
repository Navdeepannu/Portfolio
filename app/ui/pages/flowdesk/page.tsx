import type { Metadata } from 'next'

import { FlowDeskPage } from '@/components/pages/flowdesk'

export const metadata: Metadata = {
  title: 'FlowDesk Page Template',
  description:
    'A full-page SaaS operations workspace template with navigation, data views, and polished product UI.',
  alternates: { canonical: '/pages/flowdesk' },
  openGraph: { url: '/pages/flowdesk' },
}

export default function Page() {
  return <FlowDeskPage />
}
