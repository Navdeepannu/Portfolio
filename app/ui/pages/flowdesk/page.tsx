// app/pages/flowdesk/page.tsx

import { FlowDeskPage } from "@/components/pages/flowdesk"
import { PageFrame } from "@/components/pages/page-preview/page-frame"



type FlowDeskRouteProps = {
  searchParams: Promise<{
    embed?: string
  }>
}

export default async function FlowDeskRoute({
  searchParams,
}: FlowDeskRouteProps) {
  const { embed } = await searchParams

  if (embed === '1') {
    return <FlowDeskPage />
  }

  return (
    <PageFrame
      src="/pages/flowdesk?embed=1"
      title="FlowDesk responsive preview"
    />
  )
}