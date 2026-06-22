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

const Actions = () => (
  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm font-bold">
    JM
  </span>
);

const meta = {
  title: "Components/TopNavigation",
  component: TopNavigation,
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "default"] },
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
