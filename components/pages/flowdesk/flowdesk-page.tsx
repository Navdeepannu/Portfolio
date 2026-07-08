import { FlowDeskHero } from './sections/flowdesk-hero-section'
import { FlowDeskLogoCloud } from './sections/flowdesk-logo-cloud'
import { FlowDeskNavbar } from './sections/flowdesk-navbar'
import { FlowDeskTheme } from './theme'

export function FlowDeskPage() {
  return (
    <FlowDeskTheme>
      <main className="min-h-screen bg-background text-foreground">
        <FlowDeskNavbar />
        <FlowDeskHero />
        <FlowDeskLogoCloud/>
      </main>
    </FlowDeskTheme>
  )
}
