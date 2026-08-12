import type { ReactNode, RefObject } from 'react'

type LandingSectionProps = {
  id: string
  label: string
  heading?: string
  children: ReactNode
  className?: string
  showDivider?: boolean
  compactTop?: boolean
  ref?: RefObject<HTMLElement | null>
}

export function LandingSection({
  id,
  label,
  heading,
  children,
  className = '',
  showDivider = true,
  compactTop = false,
  ref,
}: LandingSectionProps) {
  const headingId = `${id}-heading`

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={headingId}
      className={`scroll-mt-20 ${showDivider ? 'border-t border-border/70' : ''} ${compactTop ? 'pt-4 pb-14 md:pt-6 md:pb-20' : 'py-14 md:py-16'} ${className}`}
    >
      {heading ? (
        <header className="mb-8 max-w-2xl md:mb-10">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <h2
            id={headingId}
            className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl"
          >
            {heading}
          </h2>
        </header>
      ) : (
        <h2 id={headingId} className="mb-8 text-sm font-medium text-muted-foreground md:mb-10">
          {label}
        </h2>
      )}
      <div className="min-w-0">{children}</div>
    </section>
  )
}
