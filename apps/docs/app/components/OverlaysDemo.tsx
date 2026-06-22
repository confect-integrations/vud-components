"use client";
import { Dropdown, DropdownItem, DropdownDivider } from "@confect-development/vud-components";
import { Tooltip } from "@confect-development/vud-components";
import { ToastProvider, useToast } from "@confect-development/vud-components";
import { Button } from "@confect-development/vud-components";

const ToastButtons = () => {
  const toast = useToast();
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button onClick={() => toast.info("Heads up — something happened.")}>Info toast</Button>
      <Button variant="primary" onClick={() => toast.success("Saved successfully!")}>
        Success toast
      </Button>
      <Button onClick={() => toast.warning("Your trial ends in 3 days.")}>Warning toast</Button>
      <Button onClick={() => toast.error("Could not save. Try again.")}>Error toast</Button>
    </div>
  );
};

/** Client showcase of the interactive overlay components. */
export const OverlaysDemo = () => (
  <ToastProvider>
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-6">
        <Dropdown trigger={<Button>Actions ▾</Button>}>
          <DropdownItem onClick={() => {}}>Edit</DropdownItem>
          <DropdownItem onClick={() => {}}>Duplicate</DropdownItem>
          <DropdownItem disabled>Move (unavailable)</DropdownItem>
          <DropdownDivider />
          <DropdownItem destructive onClick={() => {}}>Delete</DropdownItem>
        </Dropdown>

        <Tooltip content="Opens the editor in a new tab">
          <Button>Hover for tooltip</Button>
        </Tooltip>

        <Tooltip content="This needs your attention" variant="note">
          <Button>Note tooltip</Button>
        </Tooltip>
      </div>

      <ToastButtons />
    </div>
  </ToastProvider>
);
