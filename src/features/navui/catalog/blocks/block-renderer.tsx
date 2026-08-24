import type { BlockDefinition } from '@/registry/types'
import { getBlockComponent } from '@/features/navui/catalog/blocks/block-entries'
import { loadRegistryCodeFiles } from '@/features/navui/code/source-loader'
import BlockSourceExplorer from '@/features/navui/code/block-source-explorer'
import BlockTabs from '@/features/navui/catalog/blocks/block-tabs'
import { getNavUIPrimitivePreference } from '@/features/navui/primitives/primitive-preference'
import { registryItems } from '@/registry/items'
import { BlockCatalogItem } from '@/features/navui/catalog/blocks/block-catalog-item'

export default async function BlockRenderer({ block }: { block: BlockDefinition }) {
  const primitive = await getNavUIPrimitivePreference()

  if (!getBlockComponent(block.slug, primitive)) {
    return (
      <article className="rounded-xl bg-card p-6 text-sm text-muted-foreground">
        Component for <code className="text-foreground">{block.slug}</code> is not registered in{' '}
        <code className="text-foreground">components/blocks/</code>.
      </article>
    )
  }

  const files = await loadRegistryCodeFiles(block, registryItems, primitive)

  return (
    <BlockCatalogItem primitive={primitive} slug={block.slug} title={block.title}>
      <BlockTabs
        slug={block.slug}
        title={block.title}
        primitive={primitive}
        code={
          <BlockSourceExplorer
            key={`${block.slug}-${primitive}`}
            files={files}
            analytics={{
              item_type: 'block',
              item_slug: block.slug,
              item_title: block.title,
              primitive,
              source: 'block_detail',
            }}
          />
        }
      />
    </BlockCatalogItem>
  )
}
