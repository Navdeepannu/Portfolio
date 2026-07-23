import { IconHammer } from '@tabler/icons-react'

function PagesBuildingIllustration() {
  return (
    <svg
      viewBox="0 0 240 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-auto w-full max-w-xs text-foreground md:max-w-sm"
      aria-hidden
    >
      <rect
        x="24"
        y="28"
        width="192"
        height="132"
        rx="12"
        className="stroke-border shadow-sm"
        strokeWidth="1"
      />
      <path d="M24 52H216" className="stroke-border" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="44" cy="40" r="4" className="fill-rose-400/80" />
      <circle cx="58" cy="40" r="4" className="fill-amber-400/80" />
      <circle cx="72" cy="40" r="4" className="fill-emerald-500/80" />

      <rect x="44" y="72" width="72" height="8" rx="4" className="fill-muted-foreground/20" />
      <rect x="44" y="90" width="152" height="6" rx="3" className="fill-muted-foreground/15" />
      <rect x="44" y="104" width="128" height="6" rx="3" className="fill-muted-foreground/15" />
      <rect x="44" y="118" width="96" height="6" rx="3" className="fill-muted-foreground/15" />

      <rect
        x="128"
        y="72"
        width="68"
        height="52"
        rx="8"
        className="fill-emerald-500/10 stroke-emerald-600/30 dark:stroke-emerald-400/30"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
    </svg>
  )
}

export function PagesEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 font-geist md:py-24">
      <PagesBuildingIllustration />

      <div className="mt-8 max-w-md text-center">
        <span className="mb-4 inline-flex items-center rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Coming soon
        </span>
        <h2 className="flex items-center justify-center gap-2 text-lg font-semibold tracking-tight text-foreground md:text-xl">
          <IconHammer className="size-4 text-muted-foreground" />
          Currently building
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Full-page templates are on the way — landing pages, dashboards, and marketing layouts you
          can drop into real projects.
        </p>
      </div>
    </div>
  )
}
