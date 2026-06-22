import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  argTypes: {
    label: { control: "text" },
    checked: { control: "boolean" },
    isMixed: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: { label: "Checkbox label", checked: false, isMixed: false, disabled: false },
  parameters: { layout: "padded" },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onChange={(_, c) => setChecked(c)} />;
  },
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
      <Checkbox label="Checked" checked onChange={() => {}} />
      <Checkbox label="Indeterminate" isMixed onChange={() => {}} />
      <Checkbox label="Disabled" disabled onChange={() => {}} />
      <Checkbox label="Disabled checked" checked disabled onChange={() => {}} />
    </div>
  ),
};
