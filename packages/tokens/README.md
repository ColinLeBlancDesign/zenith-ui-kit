# @zenith-ui/tokens

The **single source of truth** for Zenith UI's design tokens. Tokens are authored
once as [DTCG](https://tr.designtokens.org/) JSON and built with
[Style Dictionary](https://styledictionary.com/) into every format the system
needs — CSS variables for the component library, a Tokens Studio file for Figma,
and resolved JSON.

```
edit tokens/*.json  ──►  Style Dictionary  ──►  ┌─ build/tokens.css            → consumed by zenith-ui
                                                 ├─ build/tokens.studio.json    → import into Figma
                                                 └─ build/tokens.{light,dark}.json → resolved values
```

## Token source

```
tokens/
├── base.json            # mode-invariant: radius, spacing, font family
├── color.light.json     # primitive colour ramp (light)
├── color.dark.json      # primitive colour ramp (dark)
├── semantic.light.json  # semantic tokens (light) → reference primitives
└── semantic.dark.json   # semantic tokens (dark)  → reference primitives
```

Two layers:

- **Primitives** (`color.*`) — the raw ramp (`blue-500`, `grey-mid`, …), one value per mode.
- **Semantics** (`semantic.*`) — intent-based tokens (`accent`, `surface`, `info`, …) that
  reference primitives, e.g. `"accent": { "$value": "{color.blue-500}" }`.

## Build

```bash
npm run build -w @zenith-ui/tokens
```

Outputs to `build/`:

| File | Purpose |
| --- | --- |
| `tokens.css` | `:root` (light) + `[data-theme="dark"]` + `prefers-color-scheme` blocks. Copied into `../zenith-ui/src/tokens.generated.css`, which the library's `styles.css` `@import`s. |
| `tokens.studio.json` | Tokens Studio multi-set file (`global` / `light` / `dark` + `$themes`) for Figma. |
| `tokens.light.json` / `tokens.dark.json` | Fully-resolved token trees (for other tools). |

The CSS exposes **semantic** tokens as `--zen-*` variables (primitives stay in the
Figma/JSON outputs). The library build runs this automatically, so editing a token
JSON and rebuilding propagates everywhere.

## Sync into Figma

1. In Figma, install the **Tokens Studio** plugin.
2. Plugin → **Tools → Import** → upload `build/tokens.studio.json`.
3. You'll get `global`, `light` and `dark` token sets plus Light/Dark themes.
4. Use Tokens Studio's "Create variables" to push them into Figma Variables.

Because the JSON keeps the primitive→semantic references, the imported Figma
variables stay aliased (semantics point at primitives) — including the dark-mode
values that were previously `_TBD` in the kit.

## Change a token

Edit the value in the relevant `tokens/*.json`, then rebuild. The change flows to
the CSS variables (and thus every component) and to the Figma/JSON exports from the
same edit.
