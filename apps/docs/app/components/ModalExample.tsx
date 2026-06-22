"use client";
import { useState } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@confect-development/vud-components";
import { Button } from "@confect-development/vud-components";

/** Client-side trigger + modal, for the server-rendered home showcase. */
export const ModalExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalHeader>Modal title</ModalHeader>
        <ModalBody>
          <p>
            This is the modal body. It scrolls when the content is taller than the
            dialog, while the title and footer stay put.
          </p>
          <p>Press Escape, click the backdrop, or use a button to close.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
