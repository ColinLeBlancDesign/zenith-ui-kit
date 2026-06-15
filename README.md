# Zenith UI — monorepo

A dark-first React component library (`packages/zenith-ui`) plus its
documentation/showcase site (`apps/web`), built from the
[Zenith UI Figma kit](https://www.figma.com/design/Fspz5ih1dQq2wlYqA1K4SJ/Zenith-UI-Kit).

```
zenith-ui/
├── packages/tokens      → design tokens, the single source of truth (@zenith-ui/tokens)
├── packages/zenith-ui   → the publishable npm package  (zenith-ui)
└── apps/web             → Next.js showcase, deploys to Vercel
```

## Design tokens (source of truth)

Tokens are authored once as DTCG JSON in `packages/tokens` and built with
**Style Dictionary** into CSS variables (consumed by the library), a Tokens Studio
file for Figma, and resolved JSON. Edit a token, rebuild, and the change flows to
every component and to Figma from the same source. See
[`packages/tokens/README.md`](packages/tokens/README.md). Build it standalone with:

```bash
npm run build:tokens
```

The library build runs it automatically (tokens → library → site).

## What's inside

**12 components, covering all 14 Figma frames:** Button (primary / secondary /
tertiary), TextButton, Checkbox, Radio, Switch, RadioCard, Input, SearchField,
Combobox, Pill, Tooltip and a composable Card. Both **light and dark themes** ship
as CSS variables.

## Develop

```bash
npm install          # install everything (workspaces)
npm run dev:lib      # terminal 1 — rebuild the library on change (tsup --watch)
npm run dev          # terminal 2 — run the Next.js site at localhost:3000
```

The site imports the library exactly as an external consumer would
(`import { Button } from "zenith-ui"`), so what you see is what npm users get.

## Build

```bash
npm run build        # builds the library, then the site
```

`apps/web`'s build is self-contained — it builds the library first, so the site
can be built on its own too (`npm run build -w web`).

## Deploy the site to Vercel

1. Push this repo to GitHub.
2. In Vercel, **New Project → import the repo**.
3. Set **Root Directory** to `apps/web`. The included `apps/web/vercel.json`
   handles the rest (framework, build command, workspace install).
4. Deploy. Every push gets a preview URL; `main` is promoted to production.

Or from the CLI:

```bash
npm i -g vercel
cd apps/web
vercel            # preview
vercel --prod     # production
```

## Publish the package to npm

```bash
cd packages/zenith-ui
npm run build
npm publish        # access is already set to public in package.json
```

> The package name `zenith-ui` may be taken on the public registry — if so,
> scope it (e.g. `@your-handle/zenith-ui`) by editing `name` in
> `packages/zenith-ui/package.json`.

## License

MIT © Colin LeBlanc
