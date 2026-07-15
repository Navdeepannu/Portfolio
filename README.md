# Portfolio and UI Library

One Next.js application serves two independent public sites from one repository and Vercel project:

- [navdeepsingh.dev](https://navdeepsingh.dev) — Navdeep Singh's personal portfolio and project case studies.
- [ui.navdeepsingh.dev](https://ui.navdeepsingh.dev) — shadcn-compatible components, blocks, illustrations, page templates, previews, source drawers, and registry installs.

The UI library lives under the internal `/ui` route tree. `proxy.ts` maps the UI hostname to that tree without exposing `/ui` in public canonical URLs.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Motion
- Bun

## Local development

Install dependencies and start the development server with the repository's Bun scripts:

```bash
bun install
bun run dev
```

Use these local URLs:

- Portfolio: `http://localhost:3000`
- UI library with hostname routing: `http://ui.localhost:3000`
- UI library's internal route tree: `http://localhost:3000/ui`

Generic Vercel preview hosts intentionally keep `/ui` explicit; they are not automatically classified as the public UI hostname.

## Registry

Published registry artifacts remain in `public/r`. Canonical item URLs use the UI-library origin:

```text
https://ui.navdeepsingh.dev/r/<name>.json
```

Build and validate the registry with:

```bash
bun run registry:build
```

The optional `NEXT_PUBLIC_REGISTRY_URL` build-time variable must point to the UI-library origin when set.

## Checks

```bash
bun run lint
bunx next typegen
bunx tsc --noEmit
bun test
bun run build
```

## Connect

- [Portfolio](https://navdeepsingh.dev)
- [UI library](https://ui.navdeepsingh.dev)
- [GitHub](https://github.com/navdeepannu)
- [LinkedIn](https://www.linkedin.com/in/navdeepsingh0/)

## License

Licensed under the MIT License.
