# NavUI design-system contract

NavUI separates visual decisions from primitive implementation. Radix UI, Base UI, native HTML,
and any future React Aria usage are implementation choices; they are not themes.

## The boundary

The consumer's shadcn theme owns the standard semantic contract:

- colors and surfaces: `background`, `foreground`, `card`, `popover`, `primary`, `secondary`,
  `muted`, `accent`, and their foreground pairs
- controls and focus: `border`, `input`, `ring`, and `destructive`
- the base `radius`

Blocks use these through normal shadcn utilities such as `bg-background`, `text-foreground`,
`text-muted-foreground`, `border-border`, and `ring-ring`. Installing a block must not replace these
consumer values.

NavUI owns only decisions shared across multiple blocks that shadcn does not define:

| Foundation            | CSS variable               | Initial value          |
| --------------------- | -------------------------- | ---------------------- |
| Display font          | `--navui-font-display`     | consumer `--font-sans` |
| Page container        | `--navui-container`        | `72rem`                |
| Content container     | `--navui-content`          | `48rem`                |
| Narrow content        | `--navui-content-narrow`   | `36rem`                |
| Horizontal gutter     | `--navui-gutter`           | `1.5rem`               |
| Section spacing       | `--navui-section-space`    | `5rem`                 |
| Large section spacing | `--navui-section-space-lg` | `7rem`                 |

Blocks that adopt these foundations use Tailwind arbitrary-value classes with an explicit fallback,
for example `max-w-[var(--navui-container,72rem)]`. The fallback keeps the same block functional
when the optional system is not installed.

Grid structure, responsive column counts, one-off gaps, and component-specific sizes stay local to
the block. NavUI does not create per-block variables.

## Consumer modes

### Consumer shadcn theme

Blocks work with the consumer's standard shadcn semantic tokens and ordinary Tailwind utilities.
They must not require `navui-default` merely to render correctly.

### NavUI Default

Consumers can install `@navui/navui-default`. It is a shadcn `registry:style` item, so the CLI merges
its CSS variables into the consumer's configured CSS file. This checkpoint provides only the
shared contract; Phase 4.2 can refine the default palette and visual values without changing block
APIs.

## Typography

The contract adds a display-family role because it is a meaningful cross-block choice. Heading
sizes remain responsive Tailwind classes local to each block: a hero and a card heading should not
share one forced scale. Body, small, and label text continue to use the standard Tailwind scale,
weight, leading, and tracking utilities until real blocks demonstrate a repeated system-level need.

## Layout and motion

Containers and section rhythm are tokens rather than a `<Section>` component. The markup remains
visible and flexible, and blocks can vary grids or alignment without an adapter API.

Motion does not have a Phase 4.1 token. Existing interactions already own their durations, easing,
and reduced-motion behavior. A shared motion convention belongs in the design-system layer only
after real blocks reveal stable repetition.

## Source of truth

`src/registry/design-systems/navui-default.item.ts` is canonical. Registry generation derives both
the public install artifact and the local Tailwind CSS consumed by NavUI previews from that item.
Generated files must not be edited directly.
