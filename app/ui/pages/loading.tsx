import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main
      role="status"
      aria-label="Loading page preview"
      className="grid min-h-svh place-items-center bg-muted/40 px-4 py-8"
    >
      <div className="w-full max-w-5xl space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-[70svh] w-full rounded-xl" />
      </div>
    </main>
  )
}
