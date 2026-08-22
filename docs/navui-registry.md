# NavUI registry contributor guide

`src/registry/items` is the only collection consumed by registry generation and validation. Its
aggregators explicitly import the colocated `*.item.ts` definitions under `src/registry`; filename
scanning and category-level registry JSON files are not used.

## Add or update an item

1. Create an item directory in the matching boundary:
   - block: `src/registry/blocks/<category>/<slug>/`;
   - component: `src/registry/components/<slug>/`;
   - illustration: `src/registry/illustrations/<slug>/`.
2. Keep the implementation, `*.item.ts`, `*.demo.tsx`, and item-specific tests together. An
   implementation must never import its demo.
3. Export the definition from the matching explicit aggregator in `src/registry/items`.
4. Set `status` to `published`, `draft`, or `archived`. Draft items have no public output; archived
   items require `compatibilityOutput: true` to remain installable.
5. Declare every implementation/supporting file, npm dependency, registry dependency, and consumer
   target in the item definition. Shared files must use the same path and target with `shared: true`.
6. Keep demo files in preview metadata only; demos are never installed.

Internal source and consumer targets are separate contracts. For example:

```ts
{
  path: 'src/registry/blocks/header/header-one/header-one.tsx',
  target: '@components/blocks/header/header-one.tsx',
  type: 'registry:component',
}
```

Moving the internal file must not change the target or the public `@navui/<name>` command.
`hero-section-four` is the multi-file reference item. The historical public
`testamonial-section-one` name and target remain compatibility contracts even though its internal
directory and filename use `testimonial`.

## Generate and check

```bash
bun run registry:generate
bun run registry:validate
bun run registry:check
```

`registry:generate` writes `registry.json`, the static maps in `src/registry/generated`, and the
shadcn JSON under `public/r`. It then rewrites local NavUI registry dependencies to public URLs and
validates source, preview, code-tab, and installed content consistency.

Never edit these generated files manually:

- `registry.json`;
- `src/registry/generated/*.generated.tsx`;
- `public/r/*.json`.

Compatibility-only items, including `content-section-six` → `blog-section-one`, are explicitly
aggregated by `src/registry/items/support.ts`. Retired names live in
`src/registry/items/retired.ts` and must not reappear in `public/r`.
