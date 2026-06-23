# VUD Components

A React + Tailwind recreation of the **Visma Unified Design** (VUD) system — published as an
npm package, with a live docs site and Storybook.

[![npm version](https://img.shields.io/npm/v/@confect-development/vud-components.svg)](https://www.npmjs.com/package/@confect-development/vud-components)

- 📦 **npm** — https://www.npmjs.com/package/@confect-development/vud-components
- 📖 **Docs** — https://confect-integrations.github.io/vud-components/
- 🧩 **Storybook** — https://confect-integrations.github.io/vud-components/storybook/

## Installation

```bash
npm install @confect-development/vud-components
```

Peer dependencies: `react` and `react-dom` (v18 or v19).

## Usage

Import components by name and the stylesheet once (e.g. in your root layout):

```tsx
import { Button, Modal } from "@confect-development/vud-components";
import "@confect-development/vud-components/styles.css";

export default function App() {
  return <Button variant="primary">Save</Button>;
}
```

Most components ship their own inline icons. The general-purpose `Icon` component additionally
needs the VUD icon CSS, exposed via the package (no need to reach into the dependency):

```ts
import "@confect-development/vud-components/icons.css";
```

> **Scoped on purpose:** `styles.css` ships Tailwind *utilities* + the prefixed component CSS —
> but **no preflight and no `@theme` tokens on `:root`** — so importing it won't restyle your app
> or override its fonts/colours, whatever the import order. Components assume a Tailwind-style base
> (border-box, form font inheritance), which any Tailwind app already has; in a non-Tailwind host,
> add a minimal `*{ box-sizing: border-box }`. If you also use Tailwind and class names overlap,
> import this before your own entry so your utilities win the cascade.

The components are server-friendly: per-file `"use client"` boundaries are preserved, so they
work in Next.js App Router (Server Components) and any React 18/19 app.

## Monorepo layout

```
packages/ui     → @confect-development/vud-components (the published library + Storybook)
apps/docs       → the docs site (Next.js static export)
.github/workflows
  pages.yml     → builds & deploys docs + Storybook to GitHub Pages
  publish.yml   → publishes the library to npm on a version tag
```

This is an npm workspaces monorepo. Install everything from the root:

```bash
npm install
```

## Scripts (run from the repo root)

| Command | What it does |
| --- | --- |
| `npm run dev:docs` | Run the docs site locally (Next dev) |
| `npm run storybook` | Run Storybook locally on :6006 |
| `npm run build:lib` | Build the library to `packages/ui/dist` (JS + types + `styles.css`) |
| `npm run build:docs` | Static-export the docs site to `apps/docs/out` |
| `npm run build:storybook` | Build Storybook to `packages/ui/storybook-static` |
| `npm run build:all` | All three of the above |
| `npm run typecheck` | Typecheck every workspace |

## How the library is built

`tsc` compiles the source (preserving per-file `"use client"` boundaries 1:1 — no bundler),
then the Tailwind CLI scans the built JS and emits a single `styles.css` containing the
utilities plus the global, prefixed component CSS. See
[`packages/ui/README.md`](packages/ui/README.md) for the consumer-facing reference.

## Hosting (GitHub Pages)

`.github/workflows/pages.yml` builds the library, Storybook and the docs on every push to
`main`, then publishes one Pages site:

- **`/`** — the docs site
- **`/storybook`** — Storybook

For a **project** Pages site (`user.github.io/<repo>`), the workflow sets the docs base path to
the repo name automatically. For a **user/org** site or a **custom domain**, set
`NEXT_PUBLIC_BASE_PATH` to `""` in the workflow.

> One-time setup: in the repo **Settings → Pages**, set the source to **GitHub Actions**.

## Publishing to npm

`.github/workflows/publish.yml` publishes `@confect-development/vud-components` when you push a
`v*.*.*` tag:

```bash
# bump packages/ui/package.json (and the lockfile), then tag and push
git tag v0.1.1
git push origin v0.1.1
```

You can also trigger it manually from the **Actions** tab (`workflow_dispatch`).

Either way it needs an `NPM_TOKEN` repo secret (**Settings → Secrets and variables → Actions**)
holding a **granular access token** with read/write to the package **and "Bypass two-factor
authentication" enabled at token creation** — otherwise the publish fails with a 2FA error.

To publish from your machine instead:

```bash
npm run build:lib
npm publish --access public -w @confect-development/vud-components
```
