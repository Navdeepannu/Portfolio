# NavUI repository architecture

Phase 3 implements the repository source layout around the Phase 2 canonical registry. The
portfolio and NavUI still run as one Next.js application and deployment; the layout makes a future
NavUI extraction possible without changing public routes or registry contracts.

## Implemented structure

```text
src/
  app/                         # Next.js routes, metadata, handlers, and route shells
  components/
    ui/                        # shadcn-style primitives only
    shared/                    # UI shared by the portfolio and NavUI websites
  config/                      # host origins and site metadata
  features/
    navui/
      catalog/                 # catalog adapters and presentation
      code/                    # code viewers and copy controls
      landing/                 # NavUI landing-page composition
      previews/                # preview shells and website-only page demos
      search/                  # NavUI search data
    portfolio/
      analytics/
      blog/
      contact/
      content/
      navigation/
      projects/
      sections/
  lib/                         # application-neutral logic and hooks
  registry/
    blocks/
    components/
    illustrations/
    generated/                 # machine-written preview maps
    items/                     # explicit canonical aggregators

scripts/
  architecture/
  registry/
tests/
  architecture/
  fixtures/
  registry/
public/r/                      # generated public shadcn JSON
```

Root package manifests, framework/tooling configuration, `registry.json`, documentation, CI, and
public assets remain at the repository root. `src/proxy.ts` stays beside `src/app`, as required by
the installed Next.js version.

## Responsibilities

- `src/app` owns routes, layouts, route handlers, metadata, loading/error boundaries, and small
  route-specific composition. Feature implementations belong outside the route tree.
- `src/features/navui` owns the NavUI website. `src/features/portfolio` owns the personal site.
  Neither feature may use the other website's internals.
- `src/components/ui` contains low-level shadcn-style primitives. It never contains NavUI registry
  products.
- `src/components/shared` contains application UI genuinely used by both websites.
- `src/registry` contains distributable source. Registry implementations may use declared packages,
  primitives, other declared registry items, and portable `src/lib` utilities; they may not import
  `src/app` or `src/features`.
- `*.demo.tsx` owns sample composition, `*.item.ts` owns canonical metadata, and
  `src/registry/generated` owns machine-written runtime maps.

`bun run architecture:validate` enforces the deprecated-directory, import-direction, demo, app,
feature, and generated-file boundaries. It is part of `bun run check`.

## Source paths and install targets

Canonical metadata records both the repository source and the consumer destination. They are
intentionally different:

```text
src/registry/blocks/header/header-one/header-one.tsx
  -> components/blocks/header/header-one.tsx in a consumer
```

The Phase 2 generator continues to own `registry.json`, public JSON, preview maps, and validation.
No filename discovery or second catalog was introduced.

Internal folders and TypeScript filenames use kebab-case. The old public
`testamonial-section-one` identifier, exported component symbol, and install target remain stable;
only its internal directory and filename use the corrected `testimonial` spelling. The existing
`content-section-six` compatibility alias also remains explicit.

Flowdesk has no canonical `registry:page` item, so it remains a website-only page preview under
`src/features/navui/previews/pages`. No downloadable registry page was added in Phase 3.

## Later phases

Phase 4 may reduce remaining Next.js coupling inside otherwise reusable source, add portable
consumer fixtures/adapters, and expand clean-install checks. Framework compatibility layers,
design-kit work, downloadable pages, paid templates, repository splitting, and deployment changes
remain out of scope for Phase 3.
