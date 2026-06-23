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
    "text-[#252626] bg-white border-[#8a8a8a] shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] " +
    "hover:bg-[#d2eafa] hover:border-[#1482cc] active:bg-[#f2f2f2]",
  primary:
    "text-white bg-[#2d7048] border-[#2d7048] shadow-[0_2px_4px_0_rgba(49,98,69,0.16)] " +
    "hover:bg-[#28633f] hover:border-[#28633f] active:bg-[#254934]",
  secondary:
    "text-[#252626] bg-[#f2f2f2] border-[#f2f2f2] shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] " +
    "hover:bg-[#e3e6ea] hover:border-[#e3e6ea] active:bg-[#d6dade]",
  danger:
    "text-white bg-[#cc334c] border-[#cc334c] shadow-[0_2px_4px_0_rgba(204,51,76,0.16)] " +
    "hover:bg-[#b32d43] hover:border-[#b32d43] active:bg-[#99263a]",
  link: "text-[#116fae] bg-transparent border-transparent shadow-none hover:underline",
};

/** Flat colours for the clip-path direction shape (drawn via CSS custom properties). */
const DIRECTION_COLORS: Record<ButtonVariant, { surface: string; border: string; text: string }> = {
  default: { surface: "#ffffff", border: "#8a8a8a", text: "#252626" },
  primary: { surface: "#2d7048", border: "#2d7048", text: "#ffffff" },
  secondary: { surface: "#f2f2f2", border: "#f2f2f2", text: "#252626" },
  danger: { surface: "#cc334c", border: "#cc334c", text: "#ffffff" },
  link: { surface: "transparent", border: "transparent", text: "#116fae" },
};

const SIZES: Record<ButtonSize, string> = {
  md: "h-8 text-sm", // 32px
  lg: "h-12 text-base", // 48px
};

const COMMON =
  "items-center justify-center gap-2 select-none whitespace-nowrap align-middle font-normal leading-tight cursor-pointer transition-colors";

// Greyed-out look for the disabled state (omitted while loading, which keeps the
// variant colours). Wins over hover since it's a later variant in the cascade.
const DISABLED =
  "disabled:cursor-not-allowed disabled:text-[#8a8a8a] disabled:bg-white disabled:border-[#c0c0c0] disabled:shadow-none";

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
      "rounded-lg border",
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
