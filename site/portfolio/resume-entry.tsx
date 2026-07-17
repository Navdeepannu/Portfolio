import type { ResumeEntry as ResumeEntryData } from '@/site/portfolio/landing-page-content'

export function ResumeEntry({ entry }: { entry: ResumeEntryData }) {
  return (
    <article className="grid gap-3 sm:grid-cols-[8.5rem_minmax(0,1fr)] sm:gap-8">
      <p className="font-mono text-xs leading-6 text-muted-foreground tabular-nums">
        {entry.period}
      </p>
      <div>
        <h3 className="text-base font-semibold tracking-[-0.01em] text-foreground">
          {entry.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {entry.organization}
          {entry.location ? ` · ${entry.location}` : ''}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/80 sm:text-base sm:leading-7">
          {entry.description}
        </p>
      </div>
    </article>
  )
}
