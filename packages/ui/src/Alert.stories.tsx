import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["info", "warning", "error"],
    },
    message: { control: "text" },
  },
  args: {
    message: "This is an alert message",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Info: Story = { args: { type: "info", message: "This is the info alert message" } };
export const Warning: Story = { args: { type: "warning", message: "This is the warning alert message" } };
export const Error: Story = { args: { type: "error", message: "This is the error alert message" } };

export const AllTypes: Story = {
  render: () => (
    <div>
      <Alert message="This is the default alert message" />
      <Alert type="info" message="This is the info alert message" />
      <Alert type="warning" message="This is the warning alert message" />
      <Alert type="error" message="This is the error alert message" />
    </div>
  ),
};
