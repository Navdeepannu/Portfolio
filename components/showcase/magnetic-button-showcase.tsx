import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../ui/components/magnetic-button'

export default function MagneticButtonShowcase() {
  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center gap-4">
        <MagneticButton>Hover me</MagneticButton>

        <MagneticButton variant="outline" movement={10}>
          View docs
        </MagneticButton>

        <MagneticButton variant="ghost" className="gap-2">
          Explore
          <ArrowRight className="size-4" />
        </MagneticButton>
      </div>
    </div>
  )
}
