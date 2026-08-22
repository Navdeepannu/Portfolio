# NavUI Default design system

NavUI separates visual decisions from primitive implementation. Radix UI, Base UI, native HTML,
and any future React Aria usage are implementation choices; they are not themes.

`NavUI Default` is an optional, neutral visual preset for modern product, SaaS, developer-tool, and
professional website blocks. It favors clear hierarchy, quiet surfaces, visible focus, restrained
radius, and borders before shadows.

## The boundary

Every NavUI block uses the standard shadcn semantic contract: `background`, `foreground`, `card`,
`popover`, `primary`, `secondary`, `muted`, `accent`, `border`, `input`, `ring`, and `destructive`.
Installing a block alone never replaces those consumer values.

Installing `@navui/navui-default` is an explicit choice to apply NavUI's values for that standard
contract. The preset also adds the shared layout decisions that shadcn does not define:

| Foundation            | CSS variable               | Default value              |
| --------------------- | -------------------------- | -------------------------- |
| Display font          | `--navui-font-display`     | consumer `--font-sans`     |
| Wide container        | `--navui-container-wide`   | `80rem`                    |
| Page container        | `--navui-container`        | `72rem`                    |
| Content container     | `--navui-content`          | `48rem`                    |
| Narrow content        | `--navui-content-narrow`   | `36rem`                    |
| Horizontal gutter     | `--navui-gutter`           | `clamp(1rem, 4vw, 1.5rem)` |
| Section spacing       | `--navui-section-space`    | `clamp(4rem, 8vw, 6rem)`   |
| Large section spacing | `--navui-section-space-lg` | `clamp(5rem, 10vw, 8rem)`  |

Blocks use NavUI variables with an explicit fallback, for example
`max-w-[var(--navui-container,72rem)]`. This keeps the same block functional when the optional
preset is not installed.

## Color and surfaces

The palette is almost neutral, with only enough cool chroma to avoid a flat grayscale appearance.
Light mode uses a soft off-white page and white cards. Dark mode uses a near-black blue-neutral page
with progressively lighter card, popover, muted, and accent surfaces instead of inverting light
mode or using pure black.

The surface hierarchy is intentionally small:

1. `background` for the page
2. `muted` or `secondary` for quiet section separation
3. `card` for contained content
4. `popover` for floating content

Use `border` or a low-opacity foreground ring for normal separation. Reserve shadows for elements
that genuinely sit above another surface, such as menus, dialogs, and featured cards. Tailwind's
existing `shadow-sm`, `shadow-md`, and overlay shadows are sufficient; NavUI does not add a separate
elevation scale.

Important text and control combinations meet WCAG AA contrast targets. Muted text is deliberately
darker in light mode and lighter in dark mode, while `ring` remains strong enough for visible focus.

## Typography

The default sans family remains the body and display family so consumers do not need another font.
Future blocks should use these role conventions rather than a typography component abstraction:

| Role            | Tailwind convention                                                               |
| --------------- | --------------------------------------------------------------------------------- |
| Display / hero  | responsive `text-4xl` through `text-7xl`, `font-semibold`, tight leading/tracking |
| Section heading | responsive `text-3xl` through `text-5xl`, `font-semibold`, `tracking-tight`       |
| Normal heading  | `text-lg` through `text-2xl`, `font-medium` or `font-semibold`                    |
| Body            | `text-base leading-7`                                                             |
| Supporting text | `text-sm` or `text-base`, relaxed leading, `text-muted-foreground`                |
| Small text      | `text-sm leading-6`                                                               |
| Label           | `text-sm font-medium` with normal or slightly tight tracking                      |

Hero size remains block-level because a compact product hero and an editorial hero should not be
forced into the same scale. The shared `--navui-font-display` role lets a future system change the
family without changing block markup.

## Rhythm, containers, and radius

Use `--navui-gutter` for horizontal page padding and one of the container widths for the outer
layout. Use `--navui-section-space` for normal marketing sections and the large value only when a
hero or major transition needs more breathing room.

Inside a block, start with `gap-4` between a heading and description, `gap-6` or `gap-8` between
content groups, and `p-5` or `p-6` for ordinary cards. These are conventions, not global variables;
content density should determine the final local value.

The base shadcn radius is `0.5rem`. Buttons and controls generally use the derived medium/large
radius, cards use large/x-large, and only major panels or overlays should go beyond that. Pills stay
appropriate for badges, segmented controls, and deliberately capsule-shaped actions.

## Consumer modes

### Consumer shadcn theme

Install a block without `navui-default`. It uses the consumer's semantic colors and the fallback
values embedded in NavUI variable references.

### NavUI Default

Install the preset explicitly:

```bash
npx shadcn@latest add @navui/navui-default
```

The shadcn CLI merges the light, dark, radius, and NavUI layout variables into the consumer's
configured CSS file. Consumers can adjust those values afterward without changing block code.

## What remains block-level

Responsive columns, local grid geometry, one-off gaps, component sizes, media treatment, and
content-specific type scale remain inside each block. NavUI does not create per-block variables,
wrapper components, providers, token resolvers, or primitive adapters.

Motion is also local for now. Any existing motion must remain purposeful and respect
`prefers-reduced-motion`; a shared motion system will wait until repeated block behavior proves one
is needed.

## Source of truth

`src/registry/design-systems/navui-default.item.ts` is canonical. Registry generation derives both
the public install artifact and the local CSS consumed by NavUI previews from that item. Generated
files must not be edited directly.
