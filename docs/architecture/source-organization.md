# Source organization

Use ownership and runtime responsibility to choose a location:

- Next.js entry point or special file: `src/app` (or `src/proxy.ts`).
- Portfolio feature/content: `src/features/portfolio`.
- NavUI website catalog, preview, search, code, or landing UI: `src/features/navui`.
- Shared shadcn-style primitive: `src/components/ui`.
- UI genuinely shared by both websites: `src/components/shared`.
- Distributable NavUI source: `src/registry`.
- Application-neutral non-UI logic or hooks: `src/lib`.
- Generated public registry JSON: `public/r`.

Registry item folders colocate implementation, metadata, demos, and focused tests. Use direct
imports by default; only the canonical registry and NavUI catalog expose small, intentional entry
points. Keep configuration, scripts, tests, documentation, public assets, manifests, and lockfiles
at the repository root.

When adding a block, create `src/registry/blocks/<category>/<slug>/<slug>.tsx` and a sibling
`<slug>.item.ts`, then add that item to `src/registry/items/blocks.ts`. Add a sibling
`<slug>.demo.tsx` only when preview composition differs from the implementation. Set the canonical
source path to the internal `src/registry` file and preserve the separate shadcn consumer target.
Run `bun run registry:generate`, `bun run registry:validate`, and `bun run check`.
