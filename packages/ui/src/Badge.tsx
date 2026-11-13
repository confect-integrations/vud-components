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
  default: "text-[var(--vud-ink)] bg-[var(--vud-surface)] border-[var(--vud-rule-strong)]",
  success: "text-white bg-[var(--vud-success)] border-[var(--vud-success)]",
  info: "text-white bg-[var(--vud-info-strong)] border-[var(--vud-info-strong)]",
  warning: "text-white bg-[var(--vud-warning)] border-[var(--vud-warning)]",
  danger: "text-white bg-[var(--vud-danger)] border-[var(--vud-danger)]",
};

export const Badge = ({
  variant = "default",
  pill = true,
  children,
  className,
}: BadgeProps) => {
  const classes = [
    // VUD metrics: 13px bold text, 16px line, 2px/8px padding, 1px border, 30px min-width
    "vud-font inline-block min-w-[30px] border px-2 py-0.5 text-center align-middle text-[13px] font-bold leading-4",
    pill ? "rounded-full" : "rounded",
    VARIANTS[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <span className={classes}>{children}</span>;
};
