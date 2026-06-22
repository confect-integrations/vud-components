import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import {
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  type DrawerProps,
} from "./Drawer";
import { Button } from "./Button";

const meta = {
  title: "Components/Drawer",
  component: Drawer,
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    dimmed: { control: "boolean" },
    open: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  // `open`/`onClose` are placeholders — each demo drives them from its own
  // useState; supplying them here satisfies the required-prop type.
  args: { size: "md", dimmed: false, open: false, onClose: () => {} },
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerDemo = (args: Partial<DrawerProps>) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Show Drawer</Button>
      <Drawer {...args} open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <h4>Title for this Drawer</h4>
        </DrawerHeader>
        <DrawerBody>Text for Drawer</DrawerBody>
        <DrawerFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
};

export const Dimmed: Story = {
  args: { dimmed: true },
  render: (args) => <DrawerDemo {...args} />,
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => <DrawerDemo {...args} />,
};

// A taller body to show the content region scrolling between a fixed
// header and footer.
const ScrollDemo = (args: Partial<DrawerProps>) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="p-6">
      <Button onClick={() => setOpen(true)}>Show Drawer</Button>
      <Drawer {...args} open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <h4>Scrollable content</h4>
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 24 }, (_, i) => (
            <p key={i} className="mb-4">
              Paragraph {i + 1} — the header and footer stay put while this
              region scrolls.
            </p>
          ))}
        </DrawerBody>
        <DrawerFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export const Scrollable: Story = {
  render: (args) => <ScrollDemo {...args} />,
};
