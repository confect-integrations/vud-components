import type { Meta, StoryObj } from "@storybook/react-vite";
import { TopNavigation, TopNavigationItem } from "./TopNavigation";

const Brand = () => (
  <>
    <span className="flex h-7 w-7 items-center justify-center rounded bg-white text-sm font-bold text-[#252626]">
      V
    </span>
    Visma App
  </>
);

// For the light `subtle` bar the brand/actions need dark-on-light treatment.
const BrandDark = () => (
  <>
    <span className="flex h-7 w-7 items-center justify-center rounded bg-[#252626] text-sm font-bold text-white">
      V
    </span>
    <span className="text-[#252626]">Visma App</span>
  </>
);

const Actions = () => (
  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
    JM
  </span>
);

const ActionsDark = () => (
  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e3e6ea] text-sm font-bold text-[#252626]">
    JM
  </span>
);

const meta = {
  title: "Components/TopNavigation",
  component: TopNavigation,
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "default", "subtle"] },
  },
  args: { variant: "primary" },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof TopNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => (
    <TopNavigation {...args} brand={<Brand />} actions={<Actions />}>
      <TopNavigationItem href="#" active>
        Dashboard
      </TopNavigationItem>
      <TopNavigationItem href="#">Invoices</TopNavigationItem>
      <TopNavigationItem href="#">Customers</TopNavigationItem>
      <TopNavigationItem href="#">Products</TopNavigationItem>
      <TopNavigationItem disabled>Reports</TopNavigationItem>
    </TopNavigation>
  ),
};

export const Default: Story = {
  name: "Default (Visma blue)",
  args: { variant: "default" },
  render: (args) => (
    <TopNavigation {...args} brand={<Brand />} actions={<Actions />}>
      <TopNavigationItem href="#" active>
        Dashboard
      </TopNavigationItem>
      <TopNavigationItem href="#">Invoices</TopNavigationItem>
      <TopNavigationItem href="#">Customers</TopNavigationItem>
      <TopNavigationItem disabled>Reports</TopNavigationItem>
    </TopNavigation>
  ),
};

export const Subtle: Story = {
  name: "Subtle (sub menu under a host bar)",
  args: { variant: "subtle" },
  render: (args) => (
    <div>
      {/* Simulated host application top bar (e.g. Visma Net). */}
      <div className="flex h-12 items-center bg-[#0b3a52] px-4 text-sm font-medium text-white">
        Host application
      </div>
      <TopNavigation {...args} brand={<BrandDark />} actions={<ActionsDark />}>
        <TopNavigationItem href="#" active>
          Dashboard
        </TopNavigationItem>
        <TopNavigationItem href="#">Invoices</TopNavigationItem>
        <TopNavigationItem href="#">Customers</TopNavigationItem>
        <TopNavigationItem disabled>Reports</TopNavigationItem>
      </TopNavigation>
    </div>
  ),
};
