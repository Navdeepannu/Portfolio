import type { BlockDefinition } from '@/registry/types'
import { getBlockComponent } from '@/features/navui/catalog/blocks/block-entries'
import { loadRegistryCodeFiles } from '@/features/navui/code/source-loader'
import BlockSourceExplorer from '@/features/navui/code/block-source-explorer'
import BlockTabs from '@/features/navui/catalog/blocks/block-tabs'
import { registryItems } from '@/registry/items'

export default async function BlockRenderer({ block }: { block: BlockDefinition }) {
  if (!getBlockComponent(block.slug)) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{block.slug}</code> is not registered in{' '}
        <code className="text-foreground">components/blocks/</code>.
      </article>
    )
  }

  const files = await loadRegistryCodeFiles(block, registryItems)

  return (
    <article className="flex scroll-mt-24 flex-col gap-4" id={block.slug}>
      <BlockTabs
        slug={block.slug}
        title={block.title}
        code={<BlockSourceExplorer files={files} />}
      />
    </article>
  )
}
