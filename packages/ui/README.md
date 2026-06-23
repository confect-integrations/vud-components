# @confect-development/vud-components

A React + Tailwind recreation of the [Visma Unified Design](https://visma-unified-design.github.io/vud/) (VUD) component library. Ships as ESM with TypeScript types and a single precompiled stylesheet — no Tailwind setup required in the consuming app.

## Install

```bash
npm install @confect-development/vud-components
```

Peer dependencies: `react` and `react-dom` (v18 or v19).

## Usage

```tsx
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "@confect-development/vud-components";

// Component styles (Tailwind utilities + component CSS), imported once:
import "@confect-development/vud-components/styles.css";

export function Example() {
  return <Button variant="primary">Save</Button>;
}
```

That's all most apps need — alerts, buttons, forms, etc. ship their own inline
SVG icons, so they render with no extra setup.

> **Scoped on purpose:** `styles.css` ships Tailwind *utilities* + the prefixed component CSS,
> but **no preflight and no `@theme` tokens on `:root`** — so importing it never restyles your
> app or overrides its fonts/colours, regardless of import order. Components assume a
> Tailwind-style base (border-box, form font inheritance) — present in any Tailwind app; in a
> non-Tailwind host add a minimal `*{ box-sizing: border-box }`. If you also use Tailwind and
> class names overlap, import this before your own entry so your utilities win.

### The general-purpose `Icon` component

`<Icon name="…" />` renders any icon from the VUD set, which lives in the
`@vismaux/vud-icons` CSS (installed as a dependency). If you use `Icon`, import
the icon stylesheet the package re-exports (so you don't reach into the dependency):

```tsx
import "@confect-development/vud-components/icons.css";
```

## What's included

**Components** — Alert, Badge, Button, Card, CardList, CollapsibleList, Drawer, Dropdown,
ErrorPage, HorizontalLoadingBar, Icon, Modal, Pills, ProgressBar, ProgressCircle, Spinner,
Stepper, Table, Tabs, Toast, Tooltip, TopNavigation, Wizard.

**Form controls** — Checkbox, Radio/RadioGroup, Switch, Input, TextArea, Select, Search,
Combobox, FormGroup.

Server/client boundaries are preserved: interactive components carry `"use client"`, static
ones render on the server in a React Server Components app (Next.js).

## License

MIT
