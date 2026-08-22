import { UiLibraryNavbar } from '@/features/navui/landing/ui-library/ui-library-navbar-server'
import { UiLibraryPage } from '@/features/navui/landing/ui-library/ui-library-page'

export default function Page() {
  return (
    <div>
      <UiLibraryNavbar />
      <UiLibraryPage />
    </div>
  )
}
