import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pills, PillsItem } from "./Pills";

const meta = {
  title: "Components/Pills",
  component: Pills,
  argTypes: {
    type: { control: "inline-radio", options: ["default", "primary"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  args: { type: "default", size: "md" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Pills>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPills: Story = {
  name: "Default Pills",
  render: (args) => (
    <Pills {...args}>
      <PillsItem>Normal</PillsItem>
      <PillsItem state="active">Active</PillsItem>
      <PillsItem state="disabled">Disabled</PillsItem>
    </Pills>
  ),
};

export const PrimaryPills: Story = {
  name: "Primary Pills",
  args: { type: "primary" },
  render: (args) => (
    <Pills {...args}>
      <PillsItem>Normal</PillsItem>
      <PillsItem state="active">Active</PillsItem>
      <PillsItem state="disabled">Disabled</PillsItem>
    </Pills>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Pills size="sm">
        <PillsItem>Small</PillsItem>
        <PillsItem state="active">Active</PillsItem>
      </Pills>
      <Pills size="md">
        <PillsItem>Medium</PillsItem>
        <PillsItem state="active">Active</PillsItem>
      </Pills>
      <Pills size="lg">
        <PillsItem>Large</PillsItem>
        <PillsItem state="active">Active</PillsItem>
      </Pills>
    </div>
  ),
};
