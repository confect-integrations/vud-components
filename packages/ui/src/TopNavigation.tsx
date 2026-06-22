import type { MouseEventHandler, ReactNode } from "react";

export type TopNavVariant = "primary" | "default";

// primary/inverted = dark; default = Visma blue.
const BAR_BG: Record<TopNavVariant, string> = {
  primary: "bg-[#252626]",
  default: "bg-[#0d5788]",
};

export type TopNavigationProps = {
  /** Bar colour: `primary` (dark) or `default` (Visma blue). */
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
    className={[
      "flex h-16 w-full items-stretch text-white shadow-[0_2px_4px_0_rgba(37,38,38,0.16)]",
      BAR_BG[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {brand && (
      <div className="flex h-full min-w-[200px] items-center gap-3 border-r border-white/10 px-4 text-base font-medium">
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
    "relative flex h-full items-center px-4 text-sm font-normal text-white outline-none transition-colors",
    disabled
      ? "pointer-events-none text-white/40"
      : "hover:bg-white/[0.08] focus-visible:bg-white/[0.08]",
    active && "bg-white/[0.08]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {active && (
        <span className="absolute inset-x-0 bottom-0 h-[3px] bg-white" aria-hidden="true" />
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
