import { cn } from '@/lib/utils'

export default function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn(`${className} mx-auto max-w-6xl px-8 pt-24`)}>
      {children}
      <div className="absolute top-0 left-0"></div>
    </div>
  )
}
