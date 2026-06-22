import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextArea } from "./TextArea";

const meta = {
  title: "Forms/TextArea",
  component: TextArea,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hasError: { control: "boolean" },
    rows: { control: "number" },
  },
  args: { placeholder: "Write your text", disabled: false, hasError: false, rows: 3 },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { hasError: true, defaultValue: "Something went wrong" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };
