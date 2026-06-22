"use client";
import { cloneElement, isValidElement, useEffect, useRef, useState } from "react";
import type { ButtonHTMLAttributes, MouseEvent, ReactElement, ReactNode } from "react";

export type DropdownProps = {
  /** The clickable element that toggles the menu. */
  trigger: ReactNode;
  /** Align the menu to the left or right edge of the trigger. */
  align?: "left" | "right";
  children?: ReactNode;
  className?: string;
};

/** Reusable click-to-open menu (outside-click + Escape to close). */
export const Dropdown = ({ trigger, align = "left", children, className }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: globalThis.MouseEvent) => {
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

  const triggerEl = isValidElement(trigger) ? (
    cloneElement(trigger as ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>, {
      onClick: (e: MouseEvent<HTMLButtonElement>) => {
        (trigger as ReactElement<ButtonHTMLAttributes<HTMLButtonElement>>).props.onClick?.(e);
        setOpen((o) => !o);
      },
      "aria-haspopup": "menu",
      "aria-expanded": open,
    })
  ) : (
    <button type="button" aria-haspopup="menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
      {trigger}
    </button>
  );

  return (
    <div ref={ref} className={["relative inline-block", className].filter(Boolean).join(" ")}>
      {triggerEl}
      {open && (
        <div
          role="menu"
          onClick={() => setOpen(false)}
          className={`absolute z-50 mt-1 min-w-[180px] rounded-[4px] border border-[#dadada] bg-white py-1 shadow-[0_2px_8px_0_rgba(37,38,38,0.16)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export type DropdownItemProps = {
  disabled?: boolean;
  /** Red, for destructive actions. */
  destructive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  className?: string;
};

export const DropdownItem = ({ disabled = false, destructive = false, onClick, children, className }: DropdownItemProps) => (
  <button
    type="button"
    role="menuitem"
    disabled={disabled}
    onClick={onClick}
    className={[
      "flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors",
      disabled
        ? "cursor-not-allowed text-[#8a8a8a]"
        : destructive
          ? "text-[#cc334c] hover:bg-[#ffedef]"
          : "text-[#252626] hover:bg-[#d2eafa]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {children}
  </button>
);

export const DropdownDivider = () => <div className="my-1 h-px bg-[#dadada]" role="separator" />;
