import { AnimatedNumber } from '@/components/animated-numbers'

const metrics = [
  { value: 38, suffix: '%', label: 'Faster delivery' },
  { value: 18, suffix: ' hrs', label: 'Saved weekly' },
  { value: 3.2, suffix: 'x', decimalPlaces: 1, label: 'Return on spend' },
]

export default function AnimatedNumbersShowcase() {
  return (
    <dl className="grid w-full max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-xl border bg-border sm:grid-cols-3">
      {metrics.map(({ label, ...metric }) => (
        <div key={label} className="flex min-w-0 flex-col bg-background p-5 sm:p-6">
          <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
            <AnimatedNumber {...metric} />
          </dd>
          <dt className="mt-2 text-xs leading-5 text-muted-foreground">{label}</dt>
        </div>
      ))}
    </dl>
  )
}
