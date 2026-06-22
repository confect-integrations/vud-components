import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Radio, RadioGroup } from "./Radio";

const meta = {
  title: "Forms/Radio",
  component: RadioGroup,
  parameters: { layout: "padded" },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "card", label: "Credit card" },
  { value: "invoice", label: "Invoice" },
  { value: "transfer", label: "Bank transfer" },
  { value: "crypto", label: "Crypto (unavailable)", disabled: true },
];

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState("card");
    return <RadioGroup value={value} onChange={setValue} options={options} />;
  },
};

export const Horizontal: Story = {
  render: () => {
    const [value, setValue] = useState("md");
    return (
      <RadioGroup orientation="horizontal" value={value} onChange={setValue}>
        <Radio value="sm" label="Small" />
        <Radio value="md" label="Medium" />
        <Radio value="lg" label="Large" />
      </RadioGroup>
    );
  },
};

export const Single: Story = {
  render: () => <Radio label="A standalone radio" checked onChange={() => {}} />,
};
