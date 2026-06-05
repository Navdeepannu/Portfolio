import type { BlockDefinition } from '@/registry/types'
import { getBlockComponent } from '@/registry/index'
import { loadBlockCodeFiles } from '@/lib/block-source'
import BlockCode from '@/site/block-code'
import BlockTabs from '@/site/block-tabs'

export default async function BlockRenderer({ block }: { block: BlockDefinition }) {
  if (!getBlockComponent(block.slug)) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{block.slug}</code> is not registered in{' '}
        <code className="text-foreground">components/blocks/</code>.
      </article>
    )
  }

  const files = await loadBlockCodeFiles(block)

  return (
    <article className="flex scroll-mt-24 flex-col gap-4" id={block.slug}>
      <header className="captalize">{block.description}</header>
      <BlockTabs slug={block.slug} title={block.title} code={<BlockCode files={files} />} />
    </article>
  )
}
