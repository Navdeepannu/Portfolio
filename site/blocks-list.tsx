import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import type { BlockDefinition } from '@/registry/types'
import BlockRenderer from '@/site/block-renderer'

export default function BlocksList({
  category,
  blocks,
}: {
  category: { name: string; description?: string }
  blocks: BlockDefinition[]
}) {
  if (blocks.length === 0) {
    return (
      <div className="mx-auto w-full px-4 py-8 md:px-6">
        <header className="mb-6 border-b pb-4">
          <h1 className="text-xl font-semibold text-foreground">{category.name}</h1>
          {category.description ? (
            <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
          ) : null}
        </header>
        <p className="text-sm text-muted-foreground">No blocks in this category yet.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-full px-4 py-2 md:px-6">
      <Breadcrumb className="mb-8">
        <BreadcrumbList className="text-xs">
          <BreadcrumbItem>
            <BreadcrumbLink href="/blocks">Blocks</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{category.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <header className="flex flex-col items-start justify-start gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-balance">{category.name}</h1>
        <p className="max-w-2xl text-sm text-muted-foreground">{category.description}</p>
      </header>
      <div className="mt-10 flex flex-col gap-24">
        {blocks.map((block) => (
          <BlockRenderer key={block.slug} block={block} />
        ))}
      </div>
    </div>
  )
}
