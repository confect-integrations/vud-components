import type { ReactNode } from "react";
import {
  Badge,
  Button,
  Icon,
  Card,
  CardList,
  ListContainer,
  ListGroup,
  ListGroupItem,
  Table,
  TableRow,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TopNavigation,
  TopNavigationItem,
  Stepper,
  StepperStep,
  Wizard,
  WizardItem,
  WizardDropdownItem,
  ProgressBar,
  ProgressCircle,
  HorizontalLoadingBar,
  Spinner,
  Pills,
  PillsItem,
  FormGroup,
  Input,
  ErrorPage,
} from "@confect-development/vud-components";
import { DrawerExample } from "./components/DrawerExample";
import { ModalExample } from "./components/ModalExample";
import { OverlaysDemo } from "./components/OverlaysDemo";
import { FormsDemo } from "./components/FormsDemo";
import { AlertDemo } from "./components/AlertDemo";
import { DocsNav } from "./components/DocsNav";

type Section = {
  id: string;
  title: string;
  blurb: string;
  useCases: string[];
  demo: ReactNode;
};
type Group = { title: string; sections: Section[] };

const Brand = () => (
  <>
    <span className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-[#252626]">
      V
    </span>
    VUD Components
  </>
);

const GROUPS: Group[] = [
  {
    title: "Foundations",
    sections: [
      {
        id: "button",
        title: "Button",
        blurb:
          "Triggers actions and submits forms. Default, primary, secondary, danger and link styles, plus a loading state, an arrow-tab direction variant and optional icons.",
        useCases: ["Form submit", "Toolbars", "Primary CTAs", "Destructive actions"],
        demo: (
          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Button>Default</Button>
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="link">Link</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary" loading>
                Saving
              </Button>
              <Button variant="primary" disabled>
                Disabled
              </Button>
              <Button icon={<Icon name="search" size="sm" />}>Search</Button>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button direction="left">Previous</Button>
              <Button variant="primary" direction="right">
                Next
              </Button>
            </div>
          </div>
        ),
      },
      {
        id: "badge",
        title: "Badge",
        blurb: "Compact labels for counts and statuses, in pill or square form.",
        useCases: ["Notification counts", "Status tags", "List metadata"],
        demo: (
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="info">Info</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge pill={false}>Default</Badge>
              <Badge variant="success" pill={false}>
                Success
              </Badge>
              <Badge variant="info" pill={false}>
                Info
              </Badge>
              <Badge variant="warning" pill={false}>
                Warning
              </Badge>
              <Badge variant="danger" pill={false}>
                Danger
              </Badge>
            </div>
          </div>
        ),
      },
      {
        id: "icon",
        title: "Icon",
        blurb:
          "The VUD icon set wrapped at consistent pixel sizes (fixing VUD's 10px-root rem assumption), with filled informative variants.",
        useCases: ["In buttons", "Status indicators", "Navigation"],
        demo: (
          <div className="flex items-end gap-6 text-[#252626]">
            <Icon name="info" filled label="info" />
            <Icon name="success" filled label="success" />
            <Icon name="warning" filled label="warning" />
            <Icon name="error" filled label="error" />
            <Icon name="search" label="search" />
            <Icon name="settings" label="settings" />
            <span className="flex items-end gap-2">
              <Icon name="settings" size="sm" label="small" />
              <Icon name="settings" label="medium" />
              <Icon name="settings" size="lg" label="large" />
            </span>
          </div>
        ),
      },
      {
        id: "alert",
        title: "Alert",
        blurb:
          "Inline contextual feedback with an optional heading, rich body, a dismiss button and an action slot.",
        useCases: ["Form validation", "Status notices", "Dismissible banners"],
        demo: <AlertDemo />,
      },
      {
        id: "pills",
        title: "Pills",
        blurb:
          "Pill-shaped segmented toggles. The primary variant turns the active pill green.",
        useCases: ["View switching", "Filters", "Mode toggles"],
        demo: (
          <div className="flex flex-col gap-4">
            <Pills>
              <PillsItem>Normal</PillsItem>
              <PillsItem state="active">Active</PillsItem>
              <PillsItem state="disabled">Disabled</PillsItem>
            </Pills>
            <Pills type="primary">
              <PillsItem>Normal</PillsItem>
              <PillsItem state="active">Active</PillsItem>
              <PillsItem state="disabled">Disabled</PillsItem>
            </Pills>
          </div>
        ),
      },
    ],
  },
  {
    title: "Containers & data",
    sections: [
      {
        id: "cards",
        title: "Card & Card list",
        blurb:
          "Group related content. Stack into a list or flow into a grid, with optional hover and selection.",
        useCases: ["Dashboards", "Product lists", "Settings groups"],
        demo: (
          <div className="flex flex-col gap-4">
            <CardList hoverable className="max-w-md">
              <Card as="button" title="Clickable card">
                A hoverable, clickable list item.
              </Card>
              <Card as="button" title="Selected card" selected>
                Shows the green accent bar.
              </Card>
              <Card as="button" title="Another card">
                Each item highlights on hover.
              </Card>
            </CardList>
            <CardList orientation="grid" columns={3}>
              <Card title="Grid one">Lays out in N columns.</Card>
              <Card title="Grid two">Set via the columns prop.</Card>
              <Card title="Grid three">All sharing VUD styling.</Card>
            </CardList>
          </div>
        ),
      },
      {
        id: "collapsible",
        title: "Collapsible list",
        blurb:
          "Two-level expandable groups — blue group headers with dark, individually-collapsible items.",
        useCases: ["FAQs", "Nested settings", "Filter panels"],
        demo: (
          <ListContainer className="max-w-xl">
            <ListGroup title="First Group Title">
              <ListGroupItem title="Item 1.1" defaultOpen>
                Some Text 1.1
              </ListGroupItem>
              <ListGroupItem title="Item 1.2">Some Text 1.2</ListGroupItem>
            </ListGroup>
            <ListGroup title="Second Group Title">
              <ListGroupItem title="Item 2.1">Some Text 2.1</ListGroupItem>
            </ListGroup>
          </ListContainer>
        ),
      },
      {
        id: "table",
        title: "Table",
        blurb:
          "Tabular data with zebra rows, dotted column dividers, hover and row selection. Composes with native table elements.",
        useCases: ["Reports", "Data grids", "Record lists"],
        demo: (
          <Table hover className="max-w-2xl">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <TableRow active>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </TableRow>
              <tr>
                <th scope="row">4</th>
                <td>Stan</td>
                <td>Lucas</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        ),
      },
      {
        id: "tabs",
        title: "Tabs",
        blurb: "Tabbed panels that organise content in a single view.",
        useCases: ["Settings sections", "Detail views", "Dashboards"],
        demo: (
          <Tabs defaultValue="overview" className="max-w-xl">
            <TabList>
              <Tab value="overview">Overview</Tab>
              <Tab value="activity">Activity</Tab>
              <Tab value="settings">Settings</Tab>
              <Tab value="archived" disabled>
                Archived
              </Tab>
            </TabList>
            <TabPanel value="overview">
              A summary of the account, recent invoices and balance.
            </TabPanel>
            <TabPanel value="activity">
              A chronological feed of everything that happened.
            </TabPanel>
            <TabPanel value="settings">
              Preferences, members and billing configuration.
            </TabPanel>
          </Tabs>
        ),
      },
    ],
  },
  {
    title: "Navigation & flow",
    sections: [
      {
        id: "top-navigation",
        title: "Top navigation",
        blurb:
          "App-level header bar in a dark or Visma-blue theme, with a brand area, items and right-side actions.",
        useCases: ["Product header", "Primary navigation"],
        demo: (
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden rounded-lg border border-[#dadada]">
              <TopNavigation
                brand={<Brand />}
                actions={
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                    JM
                  </span>
                }
              >
                <TopNavigationItem href="#top-navigation" active>
                  Dashboard
                </TopNavigationItem>
                <TopNavigationItem href="#top-navigation">Invoices</TopNavigationItem>
                <TopNavigationItem href="#top-navigation">Customers</TopNavigationItem>
                <TopNavigationItem disabled>Reports</TopNavigationItem>
              </TopNavigation>
            </div>
            <div className="overflow-hidden rounded-lg border border-[#dadada]">
              <TopNavigation
                variant="default"
                brand={
                  <>
                    <span className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-[#0d5788]">
                      V
                    </span>
                    VUD Components
                  </>
                }
                actions={
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
                    JM
                  </span>
                }
              >
                <TopNavigationItem href="#top-navigation" active>
                  Dashboard
                </TopNavigationItem>
                <TopNavigationItem href="#top-navigation">Invoices</TopNavigationItem>
                <TopNavigationItem href="#top-navigation">Customers</TopNavigationItem>
              </TopNavigation>
            </div>
          </div>
        ),
      },
      {
        id: "stepper",
        title: "Stepper",
        blurb:
          "Shows progress through a linear sequence — passed, active and upcoming steps, horizontal or vertical.",
        useCases: ["Checkout", "Onboarding", "Multi-part forms"],
        demo: (
          <div className="max-w-3xl">
            <Stepper>
              <StepperStep stepTitle="Step 1 title" stepType="passed" />
              <StepperStep stepTitle="Step 2 title" stepType="active" />
              <StepperStep stepTitle="Step 3 title" />
            </Stepper>
          </div>
        ),
      },
      {
        id: "wizard",
        title: "Wizard",
        blurb:
          "Step-by-step flow built from interlocking arrow tabs, with visited/active/disabled states and an overflow dropdown.",
        useCases: ["Setup flows", "Guided tasks", "Multi-page forms"],
        demo: (
          <div className="max-w-4xl">
            <Wizard>
              <WizardItem state="visited">Visited</WizardItem>
              <WizardItem state="visited">Visited</WizardItem>
              <WizardItem state="active">Active</WizardItem>
              <WizardItem>Normal</WizardItem>
              <WizardItem state="disabled">Disabled</WizardItem>
              <WizardDropdownItem>
                <WizardItem state="disabled" role="menuitem">
                  Disabled
                </WizardItem>
                <WizardItem role="menuitem">Normal</WizardItem>
                <WizardItem role="menuitem">Normal</WizardItem>
              </WizardDropdownItem>
            </Wizard>
          </div>
        ),
      },
    ],
  },
  {
    title: "Overlays",
    sections: [
      {
        id: "modal",
        title: "Modal",
        blurb:
          "A focused, centered dialog that interrupts the flow. Fades + scales in, with Escape, backdrop and button dismissal.",
        useCases: ["Confirmations", "Quick forms", "Important alerts"],
        demo: <ModalExample />,
      },
      {
        id: "drawer",
        title: "Drawer",
        blurb:
          "A panel that slides in from the right for secondary tasks without leaving the page.",
        useCases: ["Detail editing", "Filters", "Side forms"],
        demo: <DrawerExample />,
      },
      {
        id: "overlays",
        title: "Dropdown · Tooltip · Toast",
        blurb:
          "Contextual action menus, hover hints, and transient corner notifications. Click the buttons to try them.",
        useCases: ["Row actions", "Help hints", "Save confirmations"],
        demo: <OverlaysDemo />,
      },
    ],
  },
  {
    title: "Progress & loading",
    sections: [
      {
        id: "progress-bar",
        title: "Progress bar",
        blurb:
          "Determinate horizontal progress for known durations, with a label, percentage and an over-limit (red) state.",
        useCases: ["Uploads", "Completion", "Quotas"],
        demo: (
          <div className="flex max-w-xl flex-col gap-6">
            <ProgressBar value={86} label="Maximum combined attachment size is 5 MB" />
            <ProgressBar
              value={112}
              max={100}
              label="Maximum combined attachment size exceeded"
            />
          </div>
        ),
      },
      {
        id: "progress-circle",
        title: "Progress circle",
        blurb: "Compact circular progress that animates as the value changes.",
        useCases: ["KPIs", "Compact loaders", "Quotas"],
        demo: (
          <div className="flex flex-wrap items-center gap-8">
            <ProgressCircle percentage={30} size="xs" />
            <ProgressCircle percentage={50} size="sm" />
            <ProgressCircle percentage={75} size="md" />
            <ProgressCircle percentage={100} size="lg" />
          </div>
        ),
      },
      {
        id: "loading-bar",
        title: "Loading bar",
        blurb:
          "Indeterminate sweeping bar for when progress can't be measured. Pure CSS animation.",
        useCases: ["Page loading", "Section loading"],
        demo: (
          <div className="flex max-w-xl flex-col gap-8">
            <HorizontalLoadingBar size="md" label="Loading, please wait..." />
            <HorizontalLoadingBar size="sm" />
          </div>
        ),
      },
      {
        id: "spinner",
        title: "Spinner",
        blurb:
          "Self-animating SVG loaders in doughnut, dotted and snake styles, across three tints.",
        useCases: ["Buttons", "Panels", "Async waits"],
        demo: (
          <div className="flex flex-wrap items-center gap-12">
            <Spinner type="default" color="blue" />
            <Spinner type="primary" color="blue" />
            <Spinner type="secondary" color="blue" />
            <Spinner type="default" color="green" />
            <Spinner type="default" color="grey" />
          </div>
        ),
      },
    ],
  },
  {
    title: "Forms",
    sections: [
      {
        id: "form-controls",
        title: "Form controls",
        blurb:
          "The full input family — text, email, textarea, combobox, search, select, checkbox, radio and switch — all sharing one focus/error system.",
        useCases: ["Data entry", "Settings", "Filters"],
        demo: <FormsDemo />,
      },
      {
        id: "form-group",
        title: "Form group",
        blurb:
          "Labels, hints and validation around a field. Setting an error automatically turns the wrapped field red and wires up ARIA.",
        useCases: ["Validated forms", "Required fields", "Inline errors"],
        demo: (
          <div className="grid max-w-2xl gap-5 sm:grid-cols-2">
            <FormGroup label="Full name" required helperText="As it appears on your invoice.">
              <Input placeholder="Jane Doe" />
            </FormGroup>
            <FormGroup label="Email" required error="Enter a valid email address.">
              <Input type="email" defaultValue="not-an-email" />
            </FormGroup>
          </div>
        ),
      },
    ],
  },
  {
    title: "Error states",
    sections: [
      {
        id: "error-pages",
        title: "Error pages",
        blurb:
          "Full-page states for not-found, access-denied, maintenance and server errors, each with an illustration and a recovery action.",
        useCases: ["404 / 403", "500", "Maintenance"],
        demo: (
          <div className="flex flex-col gap-6">
            <ErrorPage type="not-found" redirectUrl="/" />
            <ErrorPage type="server-down" redirectUrl="/" />
          </div>
        ),
      },
    ],
  },
];

const PKG = "@confect-development/vud-components";
const NPM_URL = "https://www.npmjs.com/package/@confect-development/vud-components";
const GITHUB_URL = "https://github.com/confect-integrations/vud-components";
const STORYBOOK_URL = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/storybook/`;

const NAV = [
  {
    title: "Get started",
    items: [
      { id: "installation", title: "Installation" },
      { id: "usage", title: "Usage" },
    ],
  },
  ...GROUPS.map((g) => ({
    title: g.title,
    items: g.sections.map((s) => ({ id: s.id, title: s.title })),
  })),
];

const code = "rounded bg-[#f0f1f3] px-1.5 py-0.5 text-[13px] text-[#252626]";

const CodeBlock = ({ children }: { children: ReactNode }) => (
  <pre className="mt-3 overflow-x-auto rounded-lg bg-[#252626] p-4 text-[13px] leading-relaxed text-[#e6e6e6]">
    <code>{children}</code>
  </pre>
);

const DocLink = ({ href, children }: { href: string; children: ReactNode }) => {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 rounded-md border border-[#e3e6ea] bg-white px-3 py-1.5 text-sm font-medium text-[#252626] transition-colors hover:border-[#1482cc] hover:text-[#1482cc]"
    >
      {children}
    </a>
  );
};

const GetStarted = () => (
  <section id="get-started" className="scroll-mt-24 border-b border-[#e3e6ea] py-12">
    <h2 className="text-2xl font-bold tracking-tight text-[#252626]">Get started</h2>
    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6f7271]">
      Install the package and import the stylesheet once. Components work in any React 18 or
      19 app, with server/client boundaries preserved for Next.js (App Router).
    </p>

    <div className="mt-5 flex flex-wrap gap-2">
      <DocLink href={NPM_URL}>npm ↗</DocLink>
      <DocLink href={GITHUB_URL}>GitHub ↗</DocLink>
      <DocLink href={STORYBOOK_URL}>Storybook ↗</DocLink>
    </div>

    <h3 id="installation" className="mt-8 scroll-mt-24 text-lg font-bold text-[#252626]">
      Installation
    </h3>
    <CodeBlock>npm install {PKG}</CodeBlock>
    <p className="mt-2 text-sm text-[#6f7271]">
      Peer dependencies: <code className={code}>react</code> and{" "}
      <code className={code}>react-dom</code> (v18 or v19).
    </p>

    <h3 id="usage" className="mt-8 scroll-mt-24 text-lg font-bold text-[#252626]">
      Usage
    </h3>
    <p className="mt-1.5 text-sm text-[#6f7271]">
      Import components by name and the stylesheet once (e.g. in your root layout):
    </p>
    <CodeBlock>{`import { Button, Modal } from "${PKG}";
import "${PKG}/styles.css";

export default function App() {
  return <Button variant="primary">Save</Button>;
}`}</CodeBlock>
    <p className="mt-3 text-sm text-[#6f7271]">
      Most components ship their own inline icons. The general-purpose{" "}
      <code className={code}>Icon</code> component additionally needs the VUD icon CSS:
    </p>
    <CodeBlock>import &quot;@confect-development/vud-components/icons.css&quot;;</CodeBlock>
  </section>
);

const SectionView = ({ id, title, blurb, useCases, demo }: Section) => (
  <section id={id} className="scroll-mt-24 py-8">
    <h3 className="text-xl font-bold text-[#252626]">{title}</h3>
    <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-[#6f7271]">{blurb}</p>
    {useCases.length > 0 && (
      <div className="mt-3 flex flex-wrap gap-2">
        {useCases.map((uc) => (
          <span
            key={uc}
            className="rounded-full border border-[#e3e6ea] bg-white px-2.5 py-0.5 text-xs text-[#6f7271]"
          >
            {uc}
          </span>
        ))}
      </div>
    )}
    <div className="mt-5 rounded-xl border border-[#e3e6ea] bg-white p-8 shadow-[0_1px_2px_0_rgba(37,38,38,0.04)]">
      {demo}
    </div>
  </section>
);

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#252626]">
      <div className="sticky top-0 z-40">
        <TopNavigation
          brand={<Brand />}
          actions={
            <a
              href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/storybook/`}
              className="text-sm text-white/80 hover:text-white"
            >
              Storybook ↗
            </a>
          }
        >
          <TopNavigationItem href="#button" active>
            Components
          </TopNavigationItem>
          <TopNavigationItem href="#form-controls">Forms</TopNavigationItem>
        </TopNavigation>
      </div>

      <div className="mx-auto flex w-full max-w-[1400px] gap-10 px-6">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-56 shrink-0 overflow-y-auto py-8 lg:block">
          <DocsNav groups={NAV} />
        </aside>

        <main className="min-w-0 flex-1 pb-24">
          <header className="border-b border-[#e3e6ea] py-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe6f7] bg-[#e7f2f9] px-3 py-1 text-xs font-semibold text-[#116fae]">
              Visma Unified Design · React
            </span>
            <h1 className="mt-4 text-4xl font-bold tracking-tight">Component Library</h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-[#6f7271]">
              A faithful React + Tailwind recreation of Visma&apos;s design system —
              accessible, typed and ready to drop into a Next.js app. Browse the components
              below; each shows its common use cases and a live example.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "Storybook"].map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-[#e3e6ea] bg-white px-2.5 py-1 text-xs font-medium text-[#494a4a]"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          <GetStarted />

          {GROUPS.map((g) => (
            <div key={g.title}>
              <h2 className="scroll-mt-24 pt-12 text-2xl font-bold tracking-tight text-[#252626]">
                {g.title}
              </h2>
              <div className="divide-y divide-[#eceef1]">
                {g.sections.map((s) => (
                  <SectionView key={s.id} {...s} />
                ))}
              </div>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}
