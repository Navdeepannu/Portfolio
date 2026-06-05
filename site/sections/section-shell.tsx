import { cn } from '@/lib/utils'

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string
  eyebrow: string
  title: string
  description: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'relative overflow-x-clip py-24 font-schibsted selection:bg-emerald-200/60 max-md:py-16 md:py-24',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-8">
        <span className="mb-4 block font-mono text-xs text-emerald-600 dark:text-emerald-400/80">
          {eyebrow}
        </span>
        <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-12">
          <div className="max-w-md text-left text-balance">
            <h2 className="font-times-heading font-normal tracking-tight text-foreground md:text-xl">
              {title}
            </h2>
          </div>
          <div className="mx-auto max-w-md pt-6 text-xs font-medium text-foreground/70">
            <p>{description}</p>
          </div>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  )
}
