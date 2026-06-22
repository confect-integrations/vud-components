import type { Meta, StoryObj } from "@storybook/react-vite";
import { Search } from "./Search";

const meta = {
  title: "Forms/Search",
  component: Search,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hasError: { control: "boolean" },
  },
  args: { placeholder: "Search...", disabled: false, hasError: false },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Search>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Prefilled: Story = { args: { defaultValue: "Invoices" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Disabled" } };
