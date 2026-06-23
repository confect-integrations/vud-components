import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

export type TopNavVariant = "primary" | "default" | "subtle";

// Theme tokens consumed by the bar AND its items, set as CSS variables on the
// nav so items adapt to the variant without a React context (keeps the whole
// component server-renderable). `subtle` is a toned-down, light "sub menu" bar
// for when the nav sits under a host application's own (dark) top bar.
const VARIANT_VARS: Record<TopNavVariant, CSSProperties> = {
  primary: {
    "--tn-bg": "#252626",
    "--tn-fg": "#ffffff",
    "--tn-active-fg": "#ffffff",
    "--tn-border": "rgba(255,255,255,0.10)",
    "--tn-hover": "rgba(255,255,255,0.08)",
    "--tn-active": "rgba(255,255,255,0.08)",
    "--tn-indicator": "#ffffff",
  } as CSSProperties,
  default: {
    "--tn-bg": "#0d5788",
    "--tn-fg": "#ffffff",
    "--tn-active-fg": "#ffffff",
    "--tn-border": "rgba(255,255,255,0.10)",
    "--tn-hover": "rgba(255,255,255,0.08)",
    "--tn-active": "rgba(255,255,255,0.08)",
    "--tn-indicator": "#ffffff",
  } as CSSProperties,
  subtle: {
    "--tn-bg": "#ffffff",
    "--tn-fg": "#494a4a",
    "--tn-active-fg": "#1482cc",
    "--tn-border": "#e3e6ea",
    "--tn-hover": "#f2f2f2",
    "--tn-active": "transparent",
    "--tn-indicator": "#1482cc",
  } as CSSProperties,
};

export type TopNavigationProps = {
  /** Bar style: `primary` (dark), `default` (Visma blue), or `subtle` (light
   *  sub-menu bar for use under a host app's own top bar). */
  variant?: TopNavVariant;
  /** Brand / logo area shown on the left. */
  brand?: ReactNode;
  /** Right-aligned actions (search, user menu, …). */
  actions?: ReactNode;
  /** `TopNavigationItem`s. */
  children?: ReactNode;
  className?: string;
};

/** VUD top navigation bar. */
export const TopNavigation = ({
  variant = "primary",
  brand,
  actions,
  children,
  className,
}: TopNavigationProps) => (
  <nav
    aria-label="Main"
    style={VARIANT_VARS[variant]}
    className={[
      "flex w-full items-stretch bg-[var(--tn-bg)] text-[var(--tn-fg)]",
      // Toned-down bar reads as a sub menu: shorter, a hairline border (no shadow).
      variant === "subtle"
        ? "h-12 border-b border-[var(--tn-border)]"
        : "h-16 shadow-[0_2px_4px_0_rgba(37,38,38,0.16)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {brand && (
      <div className="flex h-full min-w-[200px] items-center gap-3 border-r border-[var(--tn-border)] px-4 text-base font-medium">
        {brand}
      </div>
    )}
    <ul className="flex h-full items-stretch">{children}</ul>
    {actions && (
      <div className="ml-auto flex h-full items-center gap-1 pr-4">{actions}</div>
    )}
  </nav>
);

export type TopNavigationItemProps = {
  /** Marks the current page (shows the underline indicator). */
  active?: boolean;
  disabled?: boolean;
  /** Render as a link. Otherwise a button. */
  href?: string;
  target?: string;
  onClick?: MouseEventHandler;
  children?: ReactNode;
  className?: string;
};

export const TopNavigationItem = ({
  active = false,
  disabled = false,
  href,
  target,
  onClick,
  children,
  className,
}: TopNavigationItemProps) => {
  const classes = [
    "relative flex h-full items-center px-4 text-sm outline-none transition-colors",
    disabled
      ? "pointer-events-none opacity-40"
      : "hover:bg-[var(--tn-hover)] focus-visible:bg-[var(--tn-hover)]",
    active
      ? "bg-[var(--tn-active)] font-medium text-[var(--tn-active-fg)]"
      : "font-normal text-[var(--tn-fg)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {active && (
        <span
          className="absolute inset-x-0 bottom-0 h-[3px] bg-[var(--tn-indicator)]"
          aria-hidden="true"
        />
      )}
    </>
  );

  return (
    <li className="flex">
      {href && !disabled ? (
        <a
          href={href}
          target={target}
          onClick={onClick}
          aria-current={active ? "page" : undefined}
          className={classes}
        >
          {content}
        </a>
      ) : (
        <button
          type="button"
          disabled={disabled}
          onClick={onClick}
          aria-current={active ? "page" : undefined}
          className={classes}
        >
          {content}
        </button>
      )}
    </li>
  );
};
