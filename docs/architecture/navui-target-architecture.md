# NavUI target architecture

This document describes the intended end state. Phase 2 implements the canonical registry model and
generation boundary only; it does not authorize the source-layout, portability, design-kit, page, or
template migrations described below.

## Current Phase 2 boundary

The portfolio and NavUI remain one Next.js application. Canonical typed definitions live in
`registry/items`, reusable source remains in the existing `components` folders, and generated
registry artifacts live in `registry/generated`, `registry.json`, and `public/r`.

One item definition now owns its public name, lifecycle status, category, description, npm and
registry dependencies, implementation/supporting files, install targets, and preview entry. Runtime
catalog adapters may add React component references, but they do not redefine item metadata.

## Proposed later structure

```text
src/
  app/                         # Next.js routes and host-specific application shells
  components/
    ui/                        # Local primitive wrappers
    shared/                    # Portable application-neutral components
  features/
    navui/
      catalog/                 # Public catalog queries and presentation
      navigation/              # Catalog navigation
      previews/                # Website-only demos and preview shells
      search/                  # Catalog search
    portfolio/
      blog/
      projects/
      sections/
      content/
  registry/
    blocks/
    components/
    illustrations/
    pages/
    themes/
    generated/                 # Machine-written runtime maps only
  lib/
  config/

scripts/
  registry/                    # Generate, clean, validate, and drift-check tooling

tests/
  registry/                    # Focused registry invariants

fixtures/                      # Portable consumer/install fixtures

public/
  r/                           # Generated shadcn JSON only
```

A mature item should eventually be colocated:

```text
src/registry/blocks/header/header-mega-menu/
  header-mega-menu.tsx
  header-mega-menu.demo.tsx
  header-mega-menu.item.ts
  header-mega-menu.test.tsx
```

Phase 3 should perform that move with `git mv`, legacy aliases, and focused compatibility checks.
Phase 2 keeps centralized item modules to avoid mixing a repository-wide path migration into the
source-of-truth correction.

## Responsibilities and boundaries

- Registry implementation files contain distributable code. They may import React, declared npm
  dependencies, local shadcn-compatible wrappers, declared registry items, and portable utilities
  such as `cn`.
- Registry implementations must not import routes, portfolio features, preview infrastructure,
  website-only catalog components, or server-only application code.
- Demo files own sample content and website presentation. Item files own install metadata. Generated
  files own static import maps and shadcn output, and are never edited by hand.
- Application features may consume registry items. Registry items must not depend on application
  features.

These boundaries should become enforceable import checks in Phase 4. Existing Next.js coupling is
not expanded in Phase 2 and should be reduced only during the planned portability work.

## Naming

- Public names and paths use kebab-case.
- New names describe the UI purpose rather than only a sequence number when that improves clarity.
- Existing public identifiers remain stable or receive an explicit compatibility migration.
- The historical `testamonial` spelling remains unchanged until the Phase 3 naming migration.
- Registry dependencies use `@navdeep-singh/<name>` in canonical metadata and become public URLs in
  generated output.

## Product types

- **Components** are small reusable interactive elements or primitives.
- **Blocks** are complete reusable sections and may contain multiple files or depend on components.
- **Illustrations** are installable visual components used independently or by blocks.
- **Pages** compose canonical blocks and components; they must not duplicate those implementations.
- **Themes/design kits** define coherent tokens and design rules rather than per-block themes.
- **Templates** are complete runnable products. Paid template source belongs in future private
  repositories, not this public portfolio repository.

## Later phases

1. Phase 3: kebab-case source layout, colocated item/demo/test files, spelling migration, and legacy
   aliases.
2. Phase 4: enforced dependency boundaries, reduced Next.js coupling, adapters, and portable
   fixtures.
3. Phase 5: a small Radix, Base UI, and React Aria compatibility pilot behind stable local wrappers.
4. Phase 6: focused typed content APIs for suitable blocks without a universal schema.
5. Phases 7–10: catalog quality audit, composed downloadable pages, additional React framework
   outputs, and coherent NavUI design kits.
6. Phase 11: private template repositories, licensing/distribution, and only then a possible NavUI
   repository/deployment split.

Because the canonical model stores portable source paths, targets, dependencies, preview boundaries,
and statuses without importing the portfolio application, a future NavUI extraction can move the
registry folders and tooling together. The shadcn contract and item internals do not need to be
rewritten when the deployment or repository boundary changes.
