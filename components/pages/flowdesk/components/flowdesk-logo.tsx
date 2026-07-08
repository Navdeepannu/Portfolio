import type { SVGProps } from 'react'

import { cn } from '@/lib/utils'

type FlowDeskLogoProps = SVGProps<SVGSVGElement>

export function FlowDeskLogo({ className, ...props }: FlowDeskLogoProps) {
  return (
    <svg
      width="103"
      height="96"
      viewBox="0 0 103 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-7 w-auto', className)}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M86.1824 29.2776C72.8727 36.8223 7.18237 28.1688 -3.20673e-05 53.4143C1.85942 20.5952 13.4872 11.3959 29.2595 4.82287C45.0319 -1.75013 102.57 0.303819 102.57 0.303819C102.57 0.303819 99.4922 21.7328 86.1824 29.2776Z"
        fill="#0D69F2"
      />
      <path
        d="M36.5469 67.6742C19.6089 73.3402 15.6339 92.9191 0.148157 95.5204C2.5555 59.6659 16.0711 43.7504 33.0469 38.6743C50.0469 33.5909 85.9447 38.6743 85.9447 38.6743C85.9447 38.6743 80.9951 57.9331 71.5469 64.6742C60.3794 72.6419 49.5568 63.3223 36.5469 67.6742Z"
        fill="#1E293B"
      />
    </svg>
  )
}
