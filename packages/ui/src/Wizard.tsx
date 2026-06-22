"use client";
import { useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

export type WizardState = "normal" | "active" | "visited" | "disabled";

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={"vud-wizard-check"}>
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DotsIcon = () => (
  <svg width="20" height="6" viewBox="0 0 20 6" fill="currentColor" aria-hidden="true">
    <circle cx="3" cy="3" r="1.6" />
    <circle cx="10" cy="3" r="1.6" />
    <circle cx="17" cy="3" r="1.6" />
  </svg>
);

export type WizardItemProps = {
  /** Step state. */
  state?: WizardState;
  /** Pass "menuitem" to render inside a `WizardDropdownItem`. */
  role?: string;
  /** Hide this step (adds the `hidden` class). */
  isHidden?: boolean;
  ariaButtonLabelActive?: string;
  ariaButtonLabelVisited?: string;
  ariaButtonLabelDisabled?: string;
  ariaButtonLabelNormal?: string;
  children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "role">;

export const WizardItem = ({
  state = "normal",
  role,
  isHidden = false,
  ariaButtonLabelActive,
  ariaButtonLabelVisited,
  ariaButtonLabelDisabled,
  ariaButtonLabelNormal,
  children,
  className,
  ...props
}: WizardItemProps) => {
  const isDisabled = state === "disabled";
  const isVisited = state === "visited";
  const ariaLabel =
    state === "active"
      ? ariaButtonLabelActive
      : isVisited
        ? ariaButtonLabelVisited
        : isDisabled
          ? ariaButtonLabelDisabled
          : ariaButtonLabelNormal;

  // Rendered as a flat entry inside the dropdown menu.
  if (role === "menuitem") {
    return (
      <li role="none">
        <button
          type="button"
          role="menuitem"
          disabled={isDisabled}
          aria-label={ariaLabel}
          className={["vud-wizard-menu-item", isDisabled && "vud-wizard-menu-disabled", className]
            .filter(Boolean)
            .join(" ")}
          {...props}
        >
          <span className={"vud-wizard-label"}>{children}</span>
          {isVisited && <CheckIcon />}
        </button>
      </li>
    );
  }

  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-current={state === "active" ? "step" : undefined}
      aria-label={ariaLabel}
      className={[
        "vud-wizard-item",
        state === "active" && "vud-wizard-active",
        isVisited && "vud-wizard-visited",
        isDisabled && "vud-wizard-disabled",
        isHidden && "vud-wizard-hidden",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <span className={"vud-wizard-label"}>{children}</span>
      {isVisited && <CheckIcon />}
    </button>
  );
};

export type WizardDropdownItemProps = {
  /** Accessible label for the "⋯" trigger. */
  ariaLabel?: string;
  /** `WizardItem`s with `role="menuitem"`. */
  children?: ReactNode;
  className?: string;
};

/** The "⋯" overflow step that opens a dropdown of further steps. */
export const WizardDropdownItem = ({
  ariaLabel = "More steps",
  children,
  className,
}: WizardDropdownItemProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className={["vud-wizard-item", "vud-wizard-dropdown", className].filter(Boolean).join(" ")}
      style={open ? { zIndex: 50 } : undefined}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        className="flex h-full w-full items-center justify-center text-[#252626]"
      >
        <DotsIcon />
      </button>
      {open && (
        <ul role="menu" className={"vud-wizard-menu"}>
          {children}
        </ul>
      )}
    </div>
  );
};

export type WizardProps = {
  children?: ReactNode;
  className?: string;
};

/** Container for the arrow-tab steps. */
export const Wizard = ({ children, className }: WizardProps) => (
  <nav className={["vud-wizard", className].filter(Boolean).join(" ")} aria-label="Progress">
    {children}
  </nav>
);
