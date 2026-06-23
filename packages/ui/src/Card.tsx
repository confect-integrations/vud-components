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
  default: "bg-white",
  secondary: "bg-[#f2f2f2]",
  primary: "bg-white",
};

// Literal shadow strings (Tailwind can't see runtime-concatenated values).
// border = 1px inset #8a8a8a; accent = 4px green left bar for selected items.
const SHADOW = {
  border: "shadow-[inset_0_0_0_1px_#8a8a8a]",
  borderSelected: "shadow-[inset_4px_0_0_0_#4e9c54,inset_0_0_0_1px_#8a8a8a]",
  none: "shadow-none",
  noneSelected: "shadow-[inset_4px_0_0_0_#4e9c54]",
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
    "w-full rounded-xl border-0 p-4 text-left text-base text-[#252626] no-underline",
    row
      ? "flex flex-row items-center justify-between gap-4"
      : "block",
    SURFACE_BG[variant],
    shadow,
    showHover &&
      "cursor-pointer transition-colors hover:bg-[#d2eafa] hover:shadow-[inset_0_0_0_1px_#1482cc]",
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
  <h3 className={cn("text-base font-bold text-[#252626]", className)} {...props} />
);

export const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-[#6f7271]", className)} {...props} />
);

export const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("text-base text-[#252626]", className)} {...props} />
);

export const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4 flex items-center gap-2", className)} {...props} />
);

/** Right-aligned action area for use inside CardHeader (e.g. a menu button or link). */
export const CardAction = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex shrink-0 items-center gap-2", className)} {...props} />
);
