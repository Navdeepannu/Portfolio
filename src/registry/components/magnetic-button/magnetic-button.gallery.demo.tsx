import { ArrowRight } from 'lucide-react'

import { MagneticButton } from '@/components/magnetic-button'

export default function MagneticButtonGalleryPreview() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <MagneticButton>Hover me</MagneticButton>

      <MagneticButton variant="outline" movement={10} className="gap-2">
        Explore
        <ArrowRight data-icon="inline-end" className="size-4" aria-hidden="true" />
      </MagneticButton>
    </div>
  )
}
