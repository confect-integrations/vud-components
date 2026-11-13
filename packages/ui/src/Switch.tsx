"use client";
import { useId } from "react";
import type { ChangeEvent, ReactNode } from "react";

export type SwitchSize = "md" | "lg";

// Track / knob geometry + the checked knob travel, per size.
const SIZE: Record<SwitchSize, { track: string; knob: string; on: string }> = {
  md: { track: "h-4 w-8", knob: "left-0.5 h-3 w-3", on: "translate-x-4" },
  lg: { track: "h-6 w-12", knob: "left-1 h-4 w-4", on: "translate-x-6" },
};

export type SwitchProps = {
  label?: ReactNode;
  checked?: boolean;
  disabled?: boolean;
  size?: SwitchSize;
  onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
  id?: string;
  name?: string;
  className?: string;
  ariaLabel?: string;
};

/** On/off toggle switch — green when on. */
export const Switch = ({
  label,
  checked = false,
  disabled = false,
  size = "md",
  onChange,
  id,
  name,
  className,
  ariaLabel,
}: SwitchProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const s = SIZE[size];

  return (
    <label
      htmlFor={inputId}
      className={[
        "vud-font inline-flex select-none items-center gap-3 text-sm",
        disabled ? "cursor-not-allowed text-[var(--vud-ink-faint)]" : "cursor-pointer text-[var(--vud-ink)]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        name={name}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange?.(e, e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={[
          "relative inline-flex shrink-0 items-center rounded-full border transition-colors",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[var(--vud-focus)]",
          s.track,
          checked ? "border-[var(--vud-primary)] bg-[var(--vud-selected)]" : "border-[var(--vud-rule-strong)] bg-[var(--vud-surface)]",
          disabled && "opacity-50",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <span
          className={[
            "absolute rounded-full border bg-white transition-transform",
            s.knob,
            checked ? `${s.on} border-white` : "border-[var(--vud-rule-strong)]",
          ].join(" ")}
        />
      </span>
      {label != null && label !== "" && <span>{label}</span>}
    </label>
  );
};
