import IllustrationsShowcase from '@/site/illustrations-showcase'
import { readProjectSourceFile } from '@/lib/block-source'
import { illustrationItems } from '@/registry/items/illustrations'

export default async function IllustrationsPage() {
  const illustrationSources = Object.fromEntries(
    await Promise.all(
      illustrationItems
        .filter((item) => item.status === 'published')
        .map(async (item) => {
          const files = await Promise.all(
            item.sourceFiles.map(async (sourceFile) => ({
              filename: sourceFile.filename ?? sourceFile.path.split('/').at(-1) ?? sourceFile.path,
              language: sourceFile.language,
              code: await readProjectSourceFile(sourceFile.path),
            })),
          )

          return [item.slug, files]
        }),
    ),
  )

  return <IllustrationsShowcase illustrationSources={illustrationSources} />
}
