import { PagesEmptyState } from '@/site/pages-empty-state'

export default function PagesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">
      <header className="mb-6 border-b pb-4">
        <h1 className="text-xl font-semibold text-foreground">Pages</h1>
        <p className="mt-1 text-sm text-muted-foreground">Full-page templates for real products.</p>
      </header>

      <PagesEmptyState />
    </div>
  )
}
