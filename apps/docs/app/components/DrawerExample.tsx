"use client";
import { useState } from "react";
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "@confect-development/vud-components";
import { Button } from "@confect-development/vud-components";

/** Client-side trigger + drawer, for the server-rendered home showcase. */
export const DrawerExample = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Show Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <h4>Title for this Drawer</h4>
        </DrawerHeader>
        <DrawerBody>
          <p>Text for Drawer</p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Save
          </Button>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  );
};
