import type { Meta, StoryObj } from "@storybook/react-vite";
import { ErrorPage } from "./ErrorPage";

const meta = {
  title: "Components/ErrorPage",
  component: ErrorPage,
  argTypes: {
    type: {
      control: "select",
      options: [
        "not-found",
        "access-denied",
        "server-maintenance",
        "server-down",
        "server-error",
      ],
    },
    title: { control: "text" },
    buttonCaption: { control: "text" },
    redirectUrl: { control: "text" },
  },
  args: {
    type: "not-found",
    buttonCaption: "Go to home page",
    redirectUrl: "http://localhost",
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof ErrorPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PageNotFound: Story = {
  name: "Page not found",
  args: { type: "not-found" },
};

export const AccessDenied: Story = {
  name: "Access denied",
  args: { type: "access-denied" },
};

export const ServerMaintenance: Story = {
  name: "Server maintenance",
  args: { type: "server-maintenance" },
};

export const ServerDown: Story = {
  name: "Server down",
  args: { type: "server-down" },
};

export const ServerError: Story = {
  name: "Server error",
  args: { type: "server-error" },
};
