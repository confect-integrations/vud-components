import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, type ModalProps } from "./Modal";
import { Button } from "./Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl", "full"] },
    closeOnBackdrop: { control: "boolean" },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  // Placeholders — each demo drives open/onClose from its own state.
  args: { size: "md", closeOnBackdrop: true, open: false, onClose: () => {} },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const ModalDemo = (args: Partial<ModalProps>) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Delete invoice?</ModalHeader>
        <ModalBody>
          <p>
            You are about to permanently delete invoice <strong>#1042</strong>. This
            action cannot be undone.
          </p>
          <p>Are you sure you want to continue?</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Delete
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => <ModalDemo {...args} />,
};

export const Full: Story = {
  args: { size: "full" },
  render: (args) => <ModalDemo {...args} />,
};
