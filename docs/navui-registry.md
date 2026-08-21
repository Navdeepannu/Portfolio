# NavUI registry contributor guide

`registry/items` is the only hand-edited registry catalog. The TypeScript definitions there control
the website catalog, preview imports, code tabs, `registry.json`, `public/r`, and shadcn installs.
Category-level `registry.json` files and filename scanning are intentionally not used.

## Add or update an item

1. Put the reusable implementation in its current source area:
   - blocks: `components/blocks/<category>/`
   - components: `components/ui/components/`
   - component demos: `components/showcase/`
   - illustrations: `components/illustrations/`
2. Add exactly one typed definition in `registry/items/blocks.ts`, `components.ts`,
   `illustrations.ts`, or `support.ts`.
3. Set `status` explicitly:
   - `published` is installable and visible in the matching website catalog;
   - `draft` remains in source but is excluded from every public registry output;
   - `archived` is excluded from visual catalogs and may set `compatibilityOutput: true` only when
     an existing install dependency must remain available.
4. Declare every implementation and supporting file. Each source needs a shadcn file `type` and an
   install `target`. Mark an identical shared source/target with `shared: true` in every claiming
   item.
5. Declare npm packages in `dependencies`. Declare shadcn primitives or other NavUI items in
   `registryDependencies`; local items use `@navdeep-singh/<name>`.
6. Keep demo-only files in component preview metadata. They are never added to the install file
   list.

`hero-section-four` in `registry/items/blocks.ts` is the real multi-file example: its definition
lists the hero and its local illustration, plus `header-three` and `logo-cloud-five` as registry
dependencies. Those same two files power its code viewer and public install artifact.

## Generate and check

```bash
bun run registry:generate
bun run registry:validate
bun run registry:check
```

`registry:generate` writes the source registry and static preview maps, safely removes only JSON
owned by `public/r`, runs `shadcn build`, rewrites local NavUI dependencies to public URLs, and
validates the result. `registry:check` is read-only and fails on source, preview-map, or public-output
drift. It is part of the normal repository check and CI.

Do not edit these generated files:

- `registry.json`
- `registry/generated/*.generated.tsx`
- `public/r/*.json`

Legacy names are explicit. `content-section-four` and `process-section-one` remain separate public
items with separate sources. Compatibility-only dependencies and the source-backed
`content-section-six` → `blog-section-one` alias live in `support.ts`. Removed orphaned names and
their reasons live in `retired.ts`; they must not reappear as stale `public/r` files.
