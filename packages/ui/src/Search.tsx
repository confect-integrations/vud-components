"use client";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { fieldBase, fieldBorder } from "./formStyles";

const Magnifier = ({ className = "" }: { className?: string }) => (
  <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ClearX = ({ className = "" }: { className?: string }) => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" className={className}>
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export type SearchProps = {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  hasError?: boolean;
  onInputChange?: (text: string) => void;
  onSearch?: (text: string) => void;
  /** Accessible name for the input when no visible label is used. */
  label?: ReactNode;
  ariaLabelClearSearch?: string;
  id?: string;
  name?: string;
  className?: string;
};

/** Pill-shaped search field with a leading magnifier and a clear button. */
export const Search = ({
  placeholder = "Search...",
  value,
  defaultValue,
  disabled = false,
  hasError = false,
  onInputChange,
  onSearch,
  label,
  ariaLabelClearSearch = "Clear search",
  id,
  name,
  className,
}: SearchProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = isControlled ? value : internal;

  const setVal = (v: string) => {
    if (!isControlled) setInternal(v);
    onInputChange?.(v);
  };

  return (
    <div className={["relative", className].filter(Boolean).join(" ")}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#494a4a]">
        <Magnifier />
      </span>
      <input
        id={inputId}
        name={name}
        type="text"
        role="searchbox"
        value={current}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={typeof label === "string" ? label : undefined}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch?.(current);
        }}
        className={`${fieldBase} ${fieldBorder(hasError)} h-8 rounded-full pl-10 pr-10`}
      />
      {current && !disabled && (
        <button
          type="button"
          aria-label={ariaLabelClearSearch}
          onClick={() => setVal("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#494a4a] hover:text-[#252626]"
        >
          <ClearX />
        </button>
      )}
    </div>
  );
};
