"use client";
import { useContext } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { CardListContext, type CardVariant } from "./cardListContext";

type CardProps = {
  /** Element to render. "button"/"a" make the whole card clickable. */
  as?: "div" | "li" | "button" | "a";
  /** Optional heading rendered at the top of the card. */
  title?: ReactNode;
  /** Horizontal layout (content left, actions right) — VUD's default item layout. */
  row?: boolean;
  /** Hover affordance for a standalone (non-CardList) clickable card. */
  interactive?: boolean;
  /** Show the green accent bar for a selected item. */
  selected?: boolean;
  /** Override the CardList variant for this card. */
  variant?: CardVariant;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLElement>, "title">;

const SURFACE_BG: Record<CardVariant, string> = {
  default: "bg-[var(--vud-surface)]",
  secondary: "bg-[var(--vud-surface-sunk)]",
  primary: "bg-[var(--vud-surface)]",
};

// Literal shadow strings (Tailwind can't see runtime-concatenated values).
// border = 1px inset rule-strong; accent = 4px indicator bar for selected items.
const SHADOW = {
  border: "shadow-[inset_0_0_0_1px_var(--vud-rule-strong)]",
  borderSelected: "shadow-[inset_4px_0_0_0_var(--vud-indicator),inset_0_0_0_1px_var(--vud-rule-strong)]",
  none: "shadow-none",
  noneSelected: "shadow-[inset_4px_0_0_0_var(--vud-indicator)]",
};

export const Card = ({
  as = "div",
  title,
  row = false,
  interactive = false,
  selected = false,
  variant: variantProp,
  href,
  type,
  disabled,
  children,
  className,
  ...props
}: CardProps) => {
  const ctx = useContext(CardListContext);
  const variant = variantProp ?? ctx.variant;
  const Tag = as as ElementType;

  const clickable = as === "button" || as === "a";
  const showHover = ctx.hoverable || interactive || clickable;
  const hasBorder = variant !== "primary";

  const shadow = hasBorder
    ? selected
      ? SHADOW.borderSelected
      : SHADOW.border
    : selected
      ? SHADOW.noneSelected
      : SHADOW.none;

  const classes = [
    "vud-font w-full rounded-[var(--vud-radius-xl)] border-0 p-4 text-left text-base text-[var(--vud-ink)] no-underline",
    row
      ? "flex flex-row items-center justify-between gap-4"
      : "block",
    SURFACE_BG[variant],
    shadow,
    showHover &&
      "cursor-pointer transition-colors hover:bg-[var(--vud-surface-hover)] hover:shadow-[inset_0_0_0_1px_var(--vud-accent)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const elementProps =
    as === "a"
      ? { href }
      : as === "button"
        ? { type: type ?? "button", disabled }
        : {};

  return (
    <Tag className={classes} {...elementProps} {...props}>
      {title && <h3 className="mb-2 text-base font-bold">{title}</h3>}
      {children}
    </Tag>
  );
};

const cn = (...parts: Array<string | false | undefined>) => parts.filter(Boolean).join(" ");

/** Top row of a card: title/description on the left, an optional CardAction on the right. */
export const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-2 flex items-start justify-between gap-4", className)} {...props} />
);

export const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-base font-bold text-[var(--vud-ink)]", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-[var(--vud-ink-subtle)]", className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-base text-[var(--vud-ink)]", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4 flex items-center gap-2", className)} {...props} />
);

/** Right-aligned action area for use inside CardHeader (e.g. a menu button or link). */
export const CardAction = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
);
