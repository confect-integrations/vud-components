import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProgressCircle } from "./ProgressCircle";

const meta = {
  title: "Components/ProgressCircle",
  component: ProgressCircle,
  argTypes: {
    percentage: { control: { type: "range", min: 0, max: 100, step: 1 } },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    title: { control: "text" },
    circleDescription: { control: "text" },
  },
  args: {
    percentage: 30,
    size: "md",
    title: "Title for progress circle",
    circleDescription: "Description for progress circle",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ProgressCircle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-8">
      <ProgressCircle percentage={30} size="xs" />
      <ProgressCircle percentage={50} size="sm" />
      <ProgressCircle percentage={75} size="md" />
      <ProgressCircle percentage={90} size="lg" />
    </div>
  ),
};

export const Complete: Story = {
  args: { percentage: 100 },
};
