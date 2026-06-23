import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";
import { Button } from "./Button";

const meta = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    type: {
      control: "select",
      options: ["info", "success", "warning", "error"],
    },
    title: { control: "text" },
    children: { control: "text" },
    hideIcon: { control: "boolean" },
  },
  args: {
    type: "info",
    children: "This is an alert message",
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Info: Story = { args: { type: "info", children: "This is the info alert message" } };
export const Success: Story = {
  args: { type: "success", children: "Your changes have been saved." },
};
export const Warning: Story = {
  args: { type: "warning", children: "This is the warning alert message" },
};
export const Error: Story = { args: { type: "error", children: "This is the error alert message" } };

export const WithTitleAndBody: Story = {
  args: {
    type: "warning",
    title: "Wrong tenant detected",
    children:
      "You are signed in to a different tenant than the one this link points to. Switch tenants to continue, or return to your dashboard.",
  },
};

export const Dismissible: Story = {
  args: {
    type: "info",
    title: "Heads up",
    children: "This alert can be dismissed with the × button.",
    onClose: () => {},
  },
};

export const WithAction: Story = {
  args: {
    type: "error",
    title: "Couldn't save changes",
    children: "The server rejected the request. You can retry now.",
    action: (
      <>
        <Button size="md" variant="danger">
          Retry
        </Button>
        <Button size="md" variant="link">
          Dismiss
        </Button>
      </>
    ),
  },
};

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <Alert type="info">This is the info alert message</Alert>
      <Alert type="success">This is the success alert message</Alert>
      <Alert type="warning">This is the warning alert message</Alert>
      <Alert type="error">This is the error alert message</Alert>
    </div>
  ),
};
