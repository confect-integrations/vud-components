import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta = {
  title: "Forms/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email", "number", "tel", "url"],
    },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hasError: { control: "boolean" },
  },
  args: { type: "text", placeholder: "Default placeholder", disabled: false, hasError: false },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Text: Story = { args: { type: "text" } };
export const Password: Story = { args: { type: "password", placeholder: "Password" } };
export const Email: Story = { args: { type: "email", placeholder: "name@example.com" } };
export const Error: Story = { args: { hasError: true, defaultValue: "Invalid value" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };
