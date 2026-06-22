import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "info"
  | "warning"
  | "danger";

type BadgeProps = {
  /** Colour/semantic variant. */
  variant?: BadgeVariant;
  /** Fully rounded "pill" shape (default). Set false for squared corners. */
  pill?: boolean;
  children: ReactNode;
  className?: string;
};

/** VUD badge palette (light theme defaults), keyed by variant: text / background / border. */
const VARIANTS: Record<BadgeVariant, string> = {
  default: "text-[#252626] bg-white border-[#8a8a8a]",
  success: "text-white bg-[#2d7048] border-[#2d7048]",
  info: "text-white bg-[#0d5788] border-[#0d5788]",
  warning: "text-white bg-[#c26800] border-[#c26800]",
  danger: "text-white bg-[#cc334c] border-[#cc334c]",
};

export const Badge = ({
  variant = "default",
  pill = true,
  children,
  className,
}: BadgeProps) => {
  const classes = [
    // VUD metrics: 13px bold text, 16px line, 2px/8px padding, 1px border, 30px min-width
    "inline-block min-w-[30px] border px-2 py-0.5 text-center align-middle text-[13px] font-bold leading-4",
    pill ? "rounded-full" : "rounded",
    VARIANTS[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
