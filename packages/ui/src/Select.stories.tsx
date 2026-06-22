import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const meta = {
  title: "Forms/Select",
  component: Select,
  argTypes: {
    hasError: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
  },
  args: { hasError: false, disabled: false, placeholder: "Choose option…" },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: "se", label: "Sweden" },
  { value: "no", label: "Norway" },
  { value: "fi", label: "Finland" },
  { value: "dk", label: "Denmark" },
];

export const Default: Story = {
  args: { options: countries, defaultValue: "" },
};

export const Error: Story = {
  args: { options: countries, hasError: true, defaultValue: "" },
};

export const Disabled: Story = {
  args: { options: countries, disabled: true, defaultValue: "se" },
};
