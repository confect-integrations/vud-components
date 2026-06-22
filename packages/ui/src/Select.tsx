"use client";
import type { SelectHTMLAttributes } from "react";
import { fieldBase, fieldBorder } from "./formStyles";

export type SelectOption = { value: string; label: string; disabled?: boolean };

const Chevron = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#494a4a]"
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type SelectProps = {
  hasError?: boolean;
  /** Render options from data (or pass `<option>` children). */
  options?: SelectOption[];
  /** Shown as a disabled first option. */
  placeholder?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

/** Native single-select with a custom chevron. */
export const Select = ({
  hasError,
  options,
  placeholder,
  className,
  children,
  ...props
}: SelectProps) => (
  <div className="relative w-full">
    <select
      aria-invalid={hasError || undefined}
      className={[
        fieldBase,
        fieldBorder(hasError),
        "h-8 min-w-[160px] cursor-pointer appearance-none pl-4 pr-10",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options
        ? options.map((o) => (
            <option key={o.value} value={o.value} disabled={o.disabled}>
              {o.label}
            </option>
          ))
        : children}
    </select>
    <Chevron />
  </div>
);
