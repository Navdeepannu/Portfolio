# NavUI primitive architecture

NavUI treats primitive base and design kit as independent dimensions. Phase 1 defines the primitive
axis only:

```ts
type Primitive = 'base' | 'aria' | 'radix'
```

`src/config/navui-primitives.ts` owns these identifiers, their labels, the Radix default, and the
`navui-primitive` cookie name. No design kit or NavUI-specific theme is part of this layer.

## Documentation preference

The NavUI layout reads the cookie on the server and provides that exact value to interactive
previews. The selector writes the cookie through a Server Action. Source loading receives the same
typed value, and the iframe reloads only after the server response contains the new preference.
There is no localStorage mirror or route-specific state.

Radix is the default because this repository was initialized with `style: "radix-nova"` and its
existing `components/ui` layer uses `radix-ui`.

## Preview and source resolution

Blocks remain shared unless a primitive API requires different usage. `resolveBlockDefinition`
merges an optional `primitiveVariants` entry over the shared block metadata. The generated preview
map has the same shared-with-variant-fallback shape.

Primitive components are separate canonical registry definitions. Each implementation declares
its source file, common consumer target, npm dependencies, and registry dependencies. The Code tab
resolves supported generic dependencies through that catalog, so selecting a primitive changes the
actual `@ui/button.tsx` displayed alongside the shared block source.

Phase 1 implements Button for Base UI, React Aria, and Radix. Other `components/ui` primitives keep
their current Radix implementation until they are deliberately ported.

## Consumer registry resolution

The documentation cookie is never an installation input. A consumer project's `components.json`
currently exposes its base through its style value, such as `base-nova`, `aria-nova`, or
`radix-nova`, rather than through a separate `base` field.

Shared NavUI blocks can continue declaring standard dependencies such as `button`; shadcn resolves
those using the consumer project's base. A future NavUI block with primitive-specific usage will
need a style-aware registry endpoint (the shadcn namespace URL format supports `{style}`) or an
equivalent server-side resolver. The stable production namespace is intentionally unchanged in
Phase 1.

## Incompatible APIs

Primitive-specific usage is expected when a useful common contract does not exist. Accordion is a
representative case: Radix uses `type`, `collapsible`, and `value`; Base UI uses array values and
`multiple`; React Aria uses keys, `id`, and `allowsMultipleExpanded`. Such a block can place the
smallest differing usage in `primitiveVariants` instead of growing a universal adapter or copying
unrelated layout and content.
