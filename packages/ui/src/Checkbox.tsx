"use client";
import { useEffect, useId, useRef } from "react";
import type { ChangeEvent, ReactNode } from "react";

export type CheckboxProps = {
  label?: ReactNode;
  checked?: boolean;
  /** Indeterminate ("mixed") state — shows a dash. */
  isMixed?: boolean;
  disabled?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
  id?: string;
  name?: string;
  className?: string;
  ariaLabel?: string;
};

const CheckIcon = ({ color }: { color: string }) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2 6.2 4.7 9 10 3.2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const DashIcon = ({ color }: { color: string }) => (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
    <path d="M2.5 6h7" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const Checkbox = ({
  label,
  checked = false,
  isMixed = false,
  disabled = false,
  onChange,
  id,
  name,
  className,
  ariaLabel,
}: CheckboxProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const inputId = id ?? autoId;

  // `indeterminate` is a property, not an attribute — set it imperatively.
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = isMixed;
  }, [isMixed]);

  const filled = (checked || isMixed) && !disabled;
  const boxColor = disabled
    ? "border-[#8a8a8a] bg-[#f2f2f2]"
    : filled
      ? "border-[#1482cc] bg-[#1482cc]"
      : "border-[#8a8a8a] bg-white";
  const markColor = disabled ? "#8a8a8a" : "#ffffff";

  return (
    <label
      htmlFor={inputId}
      className={[
        "inline-flex select-none items-start gap-2 text-sm",
        disabled ? "cursor-not-allowed text-[#8a8a8a]" : "cursor-pointer text-[#252626]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <input
        ref={ref}
        id={inputId}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={(e) => onChange?.(e, e.target.checked)}
        className="peer sr-only"
      />
      <span
        className={[
          "relative mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1482cc]",
          boxColor,
        ].join(" ")}
      >
        {isMixed ? <DashIcon color={markColor} /> : checked ? <CheckIcon color={markColor} /> : null}
      </span>
      {label != null && label !== "" && <span className="leading-5">{label}</span>}
    </label>
  );
};
