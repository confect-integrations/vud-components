import type { Meta, StoryObj } from "@storybook/react-vite";
import { Combobox } from "./Combobox";

const options = Array.from({ length: 8 }, (_, i) => ({
  key: i + 1,
  text: `item${i}`,
}));

const fruits = [
  { key: "apple", text: "Apple" },
  { key: "banana", text: "Banana" },
  { key: "cherry", text: "Cherry" },
  { key: "grape", text: "Grape" },
  { key: "lemon", text: "Lemon" },
  { key: "orange", text: "Orange" },
  { key: "pear", text: "Pear" },
];

const meta = {
  title: "Forms/Combobox",
  component: Combobox,
  argTypes: {
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    hasError: { control: "boolean" },
    options: { table: { disable: true } },
  },
  args: { options, placeholder: "Enter", disabled: false, hasError: false },
  parameters: { layout: "padded" },
  decorators: [
    (Story) => (
      <div className="max-w-sm pb-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Choose a fruit",
    placeholder: "Select an item",
    options: fruits,
  },
};

export const Error: Story = { args: { hasError: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: { key: 1, text: "item0" } } };
