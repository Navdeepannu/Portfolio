import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../ui/components/magnetic-button'

export default function MagneticButtonShowcase() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h3 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-xl font-semibold text-transparent md:text-5xl">
        Feel the Magnetic Pull
      </h3>

      <div className="flex items-center gap-4">
        <MagneticButton>Hover me</MagneticButton>

        <MagneticButton variant="outline" movement={10} asChild>
          <button type="button">Press me</button>
        </MagneticButton>

        <MagneticButton variant="ghost" className="gap-2">
          Explore
          <ArrowRight data-icon="inline-end" className="size-4" />
        </MagneticButton>
      </div>
    </div>
  )
}
