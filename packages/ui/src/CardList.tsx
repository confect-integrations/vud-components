"use client";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { CardListContext, type CardVariant } from "./cardListContext";

type CardListProps = {
  /** Wrapper element. Use "ul" for a semantic list (pair with `as="li"` cards). */
  as?: "div" | "ul";
  /** Surface style applied to the items: bordered white / grey fill / borderless. */
  variant?: CardVariant;
  /** "list" stacks items in a column; "grid" flows them into `columns` columns. */
  orientation?: "list" | "grid";
  /** Number of columns when orientation is "grid". */
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Give every item hover affordance (highlight on hover). */
  hoverable?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "children">;

// Literal class strings so Tailwind's scanner picks them up.
const COLUMNS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

export const CardList = ({
  as = "div",
  variant = "default",
  orientation = "list",
  columns = 3,
  hoverable = false,
  children,
  className,
  ...props
}: CardListProps) => {
  const Tag = as as ElementType;
  const layout =
    orientation === "grid"
      ? `grid gap-4 ${COLUMNS[columns]}`
      : "flex flex-col gap-2";

  const classes = [layout, as === "ul" ? "m-0 list-none p-0" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <CardListContext.Provider value={{ variant, hoverable }}>
      <Tag className={classes} {...props}>
        {children}
      </Tag>
    </CardListContext.Provider>
  );
};
