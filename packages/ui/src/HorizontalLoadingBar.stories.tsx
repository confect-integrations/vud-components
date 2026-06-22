import type { Meta, StoryObj } from "@storybook/react-vite";
import { HorizontalLoadingBar } from "./HorizontalLoadingBar";

const meta = {
  title: "Components/HorizontalLoadingBar",
  component: HorizontalLoadingBar,
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md"] },
    label: { control: "text" },
  },
  args: { size: "md", label: "" },
  parameters: { layout: "padded" },
} satisfies Meta<typeof HorizontalLoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { label: "Loading, please wait..." },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <HorizontalLoadingBar size="xs" label="Extra small (xs)" />
      <HorizontalLoadingBar size="sm" label="Small (sm)" />
      <HorizontalLoadingBar size="md" label="Medium (md)" />
    </div>
  ),
};
