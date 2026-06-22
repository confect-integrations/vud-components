"use client";
import { createContext } from "react";

export type DrawerContextValue = {
  /** Called by the built-in close (✕) button and on backdrop / Escape. */
  onClose?: () => void;
  /** Id of the header element, wired to the dialog's aria-labelledby. */
  titleId: string;
};

export const DrawerContext = createContext<DrawerContextValue>({
  titleId: "",
});
