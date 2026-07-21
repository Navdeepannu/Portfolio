import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../ui/components/magnetic-button'

export default function MagneticButtonShowcase() {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <h1 className="bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-xl font-semibold text-transparent md:text-5xl">
        Feel the Magnetic Pull
      </h1>

      <div className="flex items-center gap-4">
        <MagneticButton>Hover me</MagneticButton>

        <MagneticButton variant="outline" movement={10} asChild>
          <a href="#magnetic-button-docs">View docs</a>
        </MagneticButton>

        <MagneticButton variant="ghost" className="gap-2">
          Explore
          <ArrowRight className="size-4" />
        </MagneticButton>
      </div>
    </div>
  )
}
