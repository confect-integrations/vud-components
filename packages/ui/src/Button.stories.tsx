import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";
import { Icon } from "./Icon";

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: { control: "select", options: ["default", "primary", "link"] },
    size: { control: "inline-radio", options: ["md", "lg"] },
    block: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "md",
    block: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: "primary" } };
export const Link: Story = { args: { variant: "link" } };
export const FullSized: Story = { args: { block: true } };
export const Large: Story = { args: { size: "lg", variant: "primary" } };
export const Disabled: Story = { args: { disabled: true, variant: "primary" } };

export const WithIcon: Story = {
  args: {
    icon: <Icon name="search" size="sm" />,
    children: "Search",
  },
};

export const Direction: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button direction="left">Previous</Button>
      <Button direction="right" variant="primary">
        Next
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
