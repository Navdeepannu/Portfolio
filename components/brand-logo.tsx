import { Hexagon } from 'lucide-react'

import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Hexagon
      className={cn('size-8 stroke-current stroke-2', className)}
      aria-hidden
    />
  )
}
