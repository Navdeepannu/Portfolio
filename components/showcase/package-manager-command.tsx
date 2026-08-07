'use client'

import { PackageManagerCommand } from '@/components/ui/components/package-manager-command'

const commands = {
  npm: 'npx shadcn@latest add @navui/animated-tabs',
  pnpm: 'pnpm dlx shadcn@latest add @navui/animated-tabs',
  yarn: 'yarn dlx shadcn@latest add @navui/animated-tabs',
  bun: 'bunx --bun shadcn@latest add @navui/animated-tabs',
}

export default function PackageManagerCommandShowcase() {
  return (
    <div className="flex w-full items-center justify-center px-4">
      <PackageManagerCommand
        commands={commands}
        defaultValue="bun"
        className="w-full max-w-xl sm:w-full"
      />
    </div>
  )
}
