"use client";
import { createContext } from "react";

export type ModalContextValue = {
  /** Called by the built-in close (✕) button. */
  onClose?: () => void;
  /** Id of the header element, wired to the dialog's aria-labelledby. */
  titleId: string;
};

export const ModalContext = createContext<ModalContextValue>({ titleId: "" });
