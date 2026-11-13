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
> but **no preflight and no Tailwind `@theme` tokens on `:root`** (only the prefixed `--vud-*`
> variables, see [Theming](#theming)) — so importing it never restyles your
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

## Theming

Every colour, the main radii and the font the components use come from `--vud-*` CSS
variables. `styles.css` defines them on `:root` with the VUD values, so an app that sets
nothing looks exactly like VUD. To give the library your own look, override the variables
in your app's CSS:

```css
/* app/globals.css (example values) */
:root {
  --vud-primary: #5c0e27;
  --vud-primary-hover: #4a0b1f;
  --vud-primary-active: #380817;
  --vud-accent: #6b4c9a;
  --vud-focus: #6b4c9a;
  --vud-selected: #5c0e27;
  --vud-surface-hover: #f3ede4;
  --vud-surface-sunk: #f7f3ed;
  --vud-font-sans: "Roboto", system-ui, sans-serif;
}
```

The defaults live in the `theme` cascade layer, so a plain (unlayered) `:root { … }` rule in
your app always wins, whatever the import order. If you put your overrides in a layer
yourself, it must come after `theme` (e.g. `@layer base`). The variables inherit, so you can
also scope a theme to part of the page (`.my-panel { --vud-primary: … }`).

Names describe the role, not the colour:

| Variable | Default | Used for |
| --- | --- | --- |
| `--vud-primary` | `#2d7048` | Primary button, error-page call to action |
| `--vud-primary-hover` | `#28633f` | Primary button hover |
| `--vud-primary-active` | `#254934` | Primary button pressed |
| `--vud-primary-contrast` | `#ffffff` | Text on primary |
| `--vud-secondary` | `#f2f2f2` | Secondary button |
| `--vud-secondary-hover` | `#e3e6ea` | Secondary button hover |
| `--vud-secondary-active` | `#d6dade` | Secondary button pressed |
| `--vud-accent` | `#1482cc` | Hover borders, checked checkbox/radio, active tab, progress, loading bar |
| `--vud-accent-strong` | `#116fae` | Current stepper step, info toast stripe, blue spinner |
| `--vud-accent-contrast` | `#ffffff` | Checkmark and radio dot on accent |
| `--vud-link` | `#116fae` | Link button, links in collapsible lists |
| `--vud-focus` | `#1482cc` | Focus rings, outlines and focused field borders |
| `--vud-selected` | `#316245` | Switch on, selected pill, active/visited wizard step |
| `--vud-indicator` | `#4e9c54` | Selection bar on cards and list items, passed stepper steps |
| `--vud-danger` | `#cc334c` | Danger button, error borders, danger badge/toast/tooltip |
| `--vud-danger-hover` | `#b32d43` | Danger button hover |
| `--vud-danger-active` | `#99263a` | Danger button pressed |
| `--vud-danger-surface` | `#ffedef` | Error toast/tooltip background, destructive menu item hover |
| `--vud-danger-ink` | `#a12036` | Error text (field errors, progress error, error tooltip) |
| `--vud-warning` | `#c26800` | Warning badge, borders, icon |
| `--vud-warning-surface` | `#fcf2dc` | Warning toast/tooltip background |
| `--vud-warning-ink` | `#803b00` | Warning tooltip text |
| `--vud-success` | `#2d7048` | Success badge, alert/toast border, icon, passed step title |
| `--vud-success-surface` | `#eaf4ea` | Success toast background |
| `--vud-success-ink` | `#1e4d31` | Success alert text |
| `--vud-info` | `#1482cc` | Info alert border, info icon |
| `--vud-info-surface` | `#e7f2f9` | Info alert/toast background |
| `--vud-info-ink` | `#11537f` | Info alert text |
| `--vud-info-strong` | `#0d5788` | Info badge |
| `--vud-ink` | `#252626` | Body text |
| `--vud-ink-muted` | `#494a4a` | Placeholders, icon buttons, secondary text |
| `--vud-ink-subtle` | `#6f7271` | Descriptions, help text |
| `--vud-ink-faint` | `#8a8a8a` | Disabled and inactive text |
| `--vud-surface` | `#ffffff` | Fields, buttons, cards, menus, modals, drawers |
| `--vud-surface-sunk` | `#f2f2f2` | Disabled fields, zebra rows, secondary cards |
| `--vud-surface-hover` | `#d2eafa` | Hover background of rows, items and buttons |
| `--vud-rule` | `#dadada` | Dividers and panel borders |
| `--vud-rule-strong` | `#8a8a8a` | Field and control borders |
| `--vud-rule-subtle` | `#e3e6ea` | Border of the `subtle` top navigation |
| `--vud-rule-disabled` | `#c0c0c0` | Disabled borders, upcoming stepper steps |
| `--vud-track` | `#bcbcbc` | Empty part of progress bars and circles |
| `--vud-nav-primary` | `#252626` | `primary` (dark) top navigation |
| `--vud-nav-default` | `#0d5788` | `default` (blue) top navigation |
| `--vud-nav-contrast` | `#ffffff` | Text and indicator on those bars |
| `--vud-radius-sm` | `4px` | Fields, checkboxes, menus |
| `--vud-radius-md` | `0.375rem` | Toasts, tooltips, collapsible lists |
| `--vud-radius-lg` | `0.5rem` | Buttons, alerts |
| `--vud-radius-xl` | `0.75rem` | Cards |
| `--vud-font-sans` | *(unset)* | Font of the components; unset means they inherit your app's font |

Fine-tuning variables for places where VUD uses its own tints:
`--vud-alert-success-surface` (`#e7f4ec`), `--vud-alert-warning-surface` (`#fbf0e2`),
`--vud-alert-warning-ink` (`#7a4100`), `--vud-alert-danger-surface` (`#fbeaed`),
`--vud-alert-danger-ink` (`#8f2333`), `--vud-spinner-blue-track` (`#99cbec`),
`--vud-spinner-green-track` (`#afd4af`), `--vud-spinner-grey-snake` (`#959799`).

Not themed: soft drop shadows (fixed translucent greys and tints), the white glyphs inside
the status icons and on danger/badge/selected-pill backgrounds, the switch knob, the dimmed
backdrop, and the pill-shaped or very large radii (full, progress bars, modal/drawer 24px).

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
