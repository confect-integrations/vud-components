import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "./Button";

const Demo = () => {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={() => toast.info("Heads up — something happened.")}>Info</Button>
      <Button variant="primary" onClick={() => toast.success("Saved successfully!")}>
        Success
      </Button>
      <Button onClick={() => toast.warning("Your trial ends in 3 days.")}>Warning</Button>
      <Button onClick={() => toast.error("Could not save. Try again.")}>Error</Button>
    </div>
  );
};

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  parameters: { layout: "padded" },
} satisfies Meta<typeof ToastProvider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
