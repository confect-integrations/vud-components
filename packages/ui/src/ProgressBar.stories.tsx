import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressBar } from "./ProgressBar";

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
  argTypes: {
    value: { control: { type: "range", min: 0, max: 120, step: 1 } },
    max: { control: "number" },
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
    label: { control: "text" },
    showPercentage: { control: "boolean" },
  },
  args: {
    value: 86,
    max: 100,
    size: "md",
    label: "Maximum combined attachment size is 5 MB",
    showPercentage: true,
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <ProgressBar size="xs" value={40} label="Extra small (xs)" />
      <ProgressBar size="sm" value={60} label="Small (sm)" />
      <ProgressBar size="md" value={86} label="Medium (md)" />
    </div>
  ),
};

export const OverLimit: Story = {
  name: "Over limit",
  args: {
    value: 112,
    max: 100,
    label: "Maximum combined attachment size exceeded",
  },
};

export const NoLabel: Story = {
  name: "Percentage only",
  args: { label: "" },
};
