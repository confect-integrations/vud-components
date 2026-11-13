import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

export type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "link";
export type ButtonSize = "md" | "lg";

type ButtonProps = {
  /** Visual style. */
  variant?: ButtonVariant;
  /** Height/size: md = 32px (default), lg = 48px. */
  size?: ButtonSize;
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Show a spinner, disable interaction and keep the label (for async actions). */
  loading?: boolean;
  /** Render as an arrow-tab pointing left/right (for previous/next navigation). */
  direction?: "left" | "right";
  /** Optional icon (e.g. an <Icon />) rendered alongside the label. */
  icon?: ReactNode;
  /** Which side the icon sits on. */
  iconPosition?: "start" | "end";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/** VUD button palette (light theme defaults): text / background / border / shadow + hover/active. */
const VARIANTS: Record<ButtonVariant, string> = {
  default:
    "text-[var(--vud-ink)] bg-[var(--vud-surface)] border-[var(--vud-rule-strong)] shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] " +
    "hover:bg-[var(--vud-surface-hover)] hover:border-[var(--vud-accent)] active:bg-[var(--vud-surface-sunk)]",
  primary:
    "text-[var(--vud-primary-contrast)] bg-[var(--vud-primary)] border-[var(--vud-primary)] shadow-[0_2px_4px_0_rgba(49,98,69,0.16)] " +
    "hover:bg-[var(--vud-primary-hover)] hover:border-[var(--vud-primary-hover)] active:bg-[var(--vud-primary-active)]",
  secondary:
    "text-[var(--vud-ink)] bg-[var(--vud-secondary)] border-[var(--vud-secondary)] shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] " +
    "hover:bg-[var(--vud-secondary-hover)] hover:border-[var(--vud-secondary-hover)] active:bg-[var(--vud-secondary-active)]",
  danger:
    "text-white bg-[var(--vud-danger)] border-[var(--vud-danger)] shadow-[0_2px_4px_0_rgba(204,51,76,0.16)] " +
    "hover:bg-[var(--vud-danger-hover)] hover:border-[var(--vud-danger-hover)] active:bg-[var(--vud-danger-active)]",
  link: "text-[var(--vud-link)] bg-transparent border-transparent shadow-none hover:underline",
};

/** Flat colours for the clip-path direction shape (drawn via CSS custom properties). */
const DIRECTION_COLORS: Record<ButtonVariant, { surface: string; border: string; text: string }> = {
  default: { surface: "var(--vud-surface)", border: "var(--vud-rule-strong)", text: "var(--vud-ink)" },
  primary: { surface: "var(--vud-primary)", border: "var(--vud-primary)", text: "var(--vud-primary-contrast)" },
  secondary: { surface: "var(--vud-secondary)", border: "var(--vud-secondary)", text: "var(--vud-ink)" },
  danger: { surface: "var(--vud-danger)", border: "var(--vud-danger)", text: "white" },
  link: { surface: "transparent", border: "transparent", text: "var(--vud-link)" },
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-8 text-sm", // 32px
  lg: "h-12 text-base", // 48px
};

const COMMON =
  "vud-font items-center justify-center gap-2 select-none whitespace-nowrap align-middle font-normal leading-tight cursor-pointer transition-colors";

// Greyed-out look for the disabled state (omitted while loading, which keeps the
// variant colours). Wins over hover since it's a later variant in the cascade.
const DISABLED =
  "disabled:cursor-not-allowed disabled:text-[var(--vud-ink-faint)] disabled:bg-[var(--vud-surface)] disabled:border-[var(--vud-rule-disabled)] disabled:shadow-none";

/** Inline spinner that inherits the button's text colour; self-animating, no CSS dep. */
const ButtonSpinner = () => (
  <svg
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    role="status"
    aria-label="Loading"
    className="shrink-0"
  >
    <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <path
      d="M8 1.5a6.5 6.5 0 0 1 6.5 6.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        from="0 8 8"
        to="360 8 8"
        dur="0.7s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const Button = ({
  variant = "default",
  size = "md",
  block = false,
  loading = false,
  direction,
  icon,
  iconPosition = "start",
  children,
  className,
  type = "button",
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const styleVars: Record<string, string | undefined> = {
    // Lets a non-filled <Icon> inherit the button's text colour automatically.
    "--visma-icon-color": "currentColor",
  };

  const isDisabled = disabled || loading;

  const content = (
    <>
      {loading && <ButtonSpinner />}
      {icon && iconPosition === "start" && !loading && icon}
      {children}
      {icon && iconPosition === "end" && icon}
    </>
  );

  let classes: string;

  if (direction) {
    const c = DIRECTION_COLORS[variant];
    styleVars["--btn-surface"] = c.surface;
    styleVars["--btn-border"] = c.border;
    styleVars.color = c.text;
    classes = [
      "relative inline-flex min-w-[128px]",
      COMMON,
      SIZES[size],
      loading ? "cursor-progress" : "",
      // extra padding on the pointed side so the label clears the notch
      direction === "left" ? "pl-7 pr-4" : "pl-4 pr-7",
      "vud-btn-direction",
      direction === "right" ? "vud-btn-direction-right" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");
  } else {
    // padding + width differ: link is compact, block fills width, otherwise a 128px min-width.
    const shape =
      variant === "link"
        ? "inline-flex px-1"
        : block
          ? "flex w-full px-4"
          : "inline-flex min-w-[128px] px-4";

    classes = [
      COMMON,
      "rounded-[var(--vud-radius-lg)] border",
      // Loading keeps the variant colour (just a wait cursor); disabled greys out.
      loading ? "cursor-progress" : DISABLED,
      shape,
      SIZES[size],
      VARIANTS[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      style={{ ...styleVars, ...(style as object) } as CSSProperties}
      {...props}
    >
      {content}
    </button>
  );
};
