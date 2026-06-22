# VUD Components

A React + Tailwind recreation of the **Visma Unified Design** system — published as an npm
package, documented with a live docs site and Storybook.

## Monorepo layout

```
packages/ui     → @confect-development/vud-components (the published library + Storybook)
apps/docs       → the docs site (Next.js static export)
.github/workflows
  pages.yml     → builds & deploys docs + Storybook to GitHub Pages
  publish.yml   → publishes the library to npm on release
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

## The library — `@confect-development/vud-components`

Built with `tsc` (preserving per-file `"use client"` boundaries) plus the Tailwind CLI, which
scans the built JS and emits a single `styles.css` (utilities + global component CSS). See
[`packages/ui/README.md`](packages/ui/README.md) for installation and usage.

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

`.github/workflows/publish.yml` publishes `@confect-development/vud-components` when you create a GitHub
Release. Add an `NPM_TOKEN` repo secret with publish rights first. To publish manually:

```bash
npm run build:lib
npm publish --access public -w @confect-development/vud-components
```
