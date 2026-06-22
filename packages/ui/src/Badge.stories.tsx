import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "info", "warning", "danger"],
    },
    pill: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "default",
    pill: true,
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { variant: "success", children: "Success" } };
export const Info: Story = { args: { variant: "info", children: "Info" } };
export const Warning: Story = { args: { variant: "warning", children: "Warning" } };
export const Danger: Story = { args: { variant: "danger", children: "Danger" } };
export const Squared: Story = { args: { pill: false, children: "No pill" } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
    </div>
  ),
};
