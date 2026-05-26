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
    <div className="mx-auto w-full px-4 py-8 md:px-6">
      <div className="flex flex-col gap-24">
        {blocks.map((block) => (
          <BlockRenderer key={block.slug} block={block} />
        ))}
      </div>
    </div>
  )
}
