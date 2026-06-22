"use client";
import { createContext } from "react";

export type CardVariant = "default" | "secondary" | "primary";

export type CardListContextValue = {
  variant: CardVariant;
  /** When true, every item in the list gets hover affordance. */
  hoverable: boolean;
};

export const CardListContext = createContext<CardListContextValue>({
  variant: "default",
  hoverable: false,
});
