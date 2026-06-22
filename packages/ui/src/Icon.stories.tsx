import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    name: { control: "text" },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    filled: { control: "boolean" },
    dynamic: { control: "boolean" },
    color: { control: "color" },
    label: { control: "text" },
  },
  args: {
    name: "settings",
    size: "md",
    filled: false,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="settings" size="sm" />
      <Icon name="settings" size="md" />
      <Icon name="settings" size="lg" />
    </div>
  ),
};

export const Informative: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="info" filled label="Information" />
      <Icon name="success" filled label="Success" />
      <Icon name="warning" filled label="Warning" />
      <Icon name="error" filled label="Error" />
      <Icon name="help" filled label="Help" />
    </div>
  ),
};

export const Gallery: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="settings" />
      <Icon name="calendar" />
      <Icon name="search" />
      <Icon name="user" />
      <Icon name="edit" />
      <Icon name="download" />
    </div>
  ),
};

export const Colored: Story = {
  args: { name: "settings", color: "#2d7048", size: "lg" },
};
