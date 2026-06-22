"use client";
import { useId, useState } from "react";
import type { ReactNode } from "react";

export type TooltipPlacement = "top" | "bottom" | "left" | "right";
export type TooltipVariant = "default" | "note" | "error";

const VARIANT: Record<TooltipVariant, string> = {
  default: "border-[#8a8a8a] bg-white text-[#252626]",
  note: "border-[#c26800] bg-[#fcf2dc] text-[#803b00]",
  error: "border-[#cc334c] bg-[#ffedef] text-[#a12036]",
};

const PLACEMENT: Record<TooltipPlacement, string> = {
  top: "bottom-full left-1/2 mb-2 -translate-x-1/2",
  bottom: "top-full left-1/2 mt-2 -translate-x-1/2",
  left: "right-full top-1/2 mr-2 -translate-y-1/2",
  right: "left-full top-1/2 ml-2 -translate-y-1/2",
};

export type TooltipProps = {
  /** Tooltip content shown on hover / focus. */
  content: ReactNode;
  placement?: TooltipPlacement;
  variant?: TooltipVariant;
  /** The trigger element. */
  children: ReactNode;
  className?: string;
};

/** Shows a small bubble on hover / focus of its child. */
export const Tooltip = ({
  content,
  placement = "top",
  variant = "default",
  children,
  className,
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>
      {open && (
        <span
          role="tooltip"
          id={id}
          className={[
            "pointer-events-none absolute z-[1070] w-max max-w-[260px] rounded-md border px-3 py-2 text-xs leading-snug shadow-[0_5px_10px_0_rgba(37,38,38,0.12)]",
            VARIANT[variant],
            PLACEMENT[placement],
            className,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {content}
        </span>
      )}
    </span>
  );
};
