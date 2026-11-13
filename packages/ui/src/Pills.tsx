import { Children, cloneElement, isValidElement } from "react";
import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";

export type PillsType = "default" | "primary";
export type PillsSize = "sm" | "md" | "lg";
export type PillsState = "normal" | "active" | "disabled";

const SIZE: Record<PillsSize, string> = {
  sm: "h-7 min-w-[96px] px-3 text-sm",
  md: "h-8 min-w-[128px] px-4 text-sm",
  lg: "h-10 min-w-[160px] px-5 text-base",
};

export type PillsItemProps = {
  /** Visual state of this pill. */
  state?: PillsState;
  /** @internal injected by Pills */
  __type?: PillsType;
  /** @internal injected by Pills */
  __size?: PillsSize;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PillsItem = ({
  state = "normal",
  __type = "default",
  __size = "md",
  type = "button",
  className,
  children,
  ...props
}: PillsItemProps) => {
  const isActive = state === "active";
  const isDisabled = state === "disabled";

  const stateClasses = isDisabled
    ? "cursor-not-allowed border-[var(--vud-rule-disabled)] bg-[var(--vud-surface)] text-[var(--vud-ink-faint)] shadow-none"
    : isActive
      ? __type === "primary"
        ? "cursor-default border-[var(--vud-selected)] bg-[var(--vud-selected)] text-white shadow-[0_2px_4px_0_rgba(49,98,69,0.16)]"
        : "cursor-default border-[var(--vud-rule-strong)] bg-[var(--vud-surface-sunk)] text-[var(--vud-ink)] shadow-none"
      : "border-[var(--vud-rule-strong)] bg-[var(--vud-surface)] text-[var(--vud-ink)] shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] hover:border-[var(--vud-accent)] hover:bg-[var(--vud-surface-hover)] focus-visible:border-[var(--vud-focus)] focus-visible:shadow-[inset_0_0_0_1px_var(--vud-focus)]";

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-pressed={isActive}
      className={[
        "vud-font inline-flex items-center justify-center rounded-full border font-normal outline-none transition-colors",
        SIZE[__size],
        stateClasses,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export type PillsProps = {
  /** `primary` makes the active pill green. */
  type?: PillsType;
  /** Pill height / min-width preset. */
  size?: PillsSize;
  children?: ReactNode;
  className?: string;
};

/** A row of pill-shaped tab buttons. */
export const Pills = ({ type = "default", size = "md", children, className }: PillsProps) => {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<PillsItemProps>[];
  return (
    <div role="group" className={["flex flex-wrap gap-4", className].filter(Boolean).join(" ")}>
      {items.map((child, i) =>
        cloneElement(child, { key: i, __type: type, __size: size }),
      )}
    </div>
  );
};
