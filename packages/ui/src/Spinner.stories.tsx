import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./Spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  argTypes: {
    type: { control: "inline-radio", options: ["default", "primary", "secondary"] },
    color: { control: "inline-radio", options: ["blue", "green", "grey"] },
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
  },
  args: { type: "default", color: "blue", size: "md" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Types: Story = {
  render: (args) => (
    <div className="flex items-center gap-12">
      <Spinner {...args} type="default" />
      <Spinner {...args} type="primary" />
      <Spinner {...args} type="secondary" />
    </div>
  ),
};

export const Colors: Story = {
  render: (args) => (
    <div className="flex items-center gap-12">
      <Spinner {...args} color="blue" />
      <Spinner {...args} color="green" />
      <Spinner {...args} color="grey" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-12">
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
    </div>
  ),
};
