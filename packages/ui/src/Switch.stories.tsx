import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: { control: "inline-radio", options: ["md", "lg"] },
  },
  args: { label: "Enable notifications", checked: false, disabled: false, size: "md" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [on, setOn] = useState(args.checked ?? false);
    return <Switch {...args} checked={on} onChange={(_, c) => setOn(c)} />;
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch label="Off" checked={false} onChange={() => {}} />
      <Switch label="On" checked onChange={() => {}} />
      <Switch label="Disabled" disabled onChange={() => {}} />
      <Switch label="Disabled on" checked disabled onChange={() => {}} />
      <Switch label="Large" size="lg" checked onChange={() => {}} />
    </div>
  ),
};
