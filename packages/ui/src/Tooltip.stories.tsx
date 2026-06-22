import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tooltip } from "./Tooltip";
import { Button } from "./Button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  args: { content: "", children: null },
  parameters: { layout: "centered" },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placements: Story = {
  render: () => (
    <div className="flex gap-6">
      <Tooltip content="Tooltip on top" placement="top"><Button>Top</Button></Tooltip>
      <Tooltip content="Tooltip on bottom" placement="bottom"><Button>Bottom</Button></Tooltip>
      <Tooltip content="A helpful note" variant="note" placement="top"><Button>Note</Button></Tooltip>
      <Tooltip content="Something is wrong" variant="error" placement="top"><Button>Error</Button></Tooltip>
    </div>
  ),
};
