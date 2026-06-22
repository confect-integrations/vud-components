"use client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { fieldBase, fieldBorder } from "./formStyles";

export type ComboboxOption = { key: string | number; text: string };

const ClearX = () => (
  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const Chevron = ({ open }: { open: boolean }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`transition-transform ${open ? "rotate-180" : ""}`}
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export type ComboboxProps = {
  options: ComboboxOption[];
  placeholder?: string;
  label?: ReactNode;
  onInputChange?: (value: string) => void;
  onChooseItem?: (item: ComboboxOption) => void;
  noSuggestionLabel?: string;
  hasError?: boolean;
  disabled?: boolean;
  defaultValue?: ComboboxOption;
  dropdownAriaLabel?: string;
  clearAriaLabel?: string;
  id?: string;
  name?: string;
  className?: string;
};

/** Editable autocomplete: type to filter, click / arrow-keys to choose. */
export const Combobox = ({
  options,
  placeholder = "",
  label,
  onInputChange,
  onChooseItem,
  noSuggestionLabel = "No suggestion found",
  hasError = false,
  disabled = false,
  defaultValue,
  dropdownAriaLabel = "Expand dropdown",
  clearAriaLabel = "Clear selection",
  id,
  name,
  className,
}: ComboboxProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;
  const listId = `${inputId}-list`;
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(defaultValue?.text ?? "");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(-1);

  const filtered = useMemo(() => {
    const q = value.trim().toLowerCase();
    return q ? options.filter((o) => o.text.toLowerCase().includes(q)) : options;
  }, [options, value]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (opt: ComboboxOption) => {
    setValue(opt.text);
    onChooseItem?.(opt);
    onInputChange?.(opt.text);
    setOpen(false);
    setHighlight(-1);
  };

  const clear = () => {
    setValue("");
    onInputChange?.("");
    setHighlight(-1);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setHighlight((h) => Math.min(h + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      if (open && highlight >= 0 && filtered[highlight]) {
        e.preventDefault();
        choose(filtered[highlight]);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={["relative", className].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className="mb-1 block text-sm text-[#252626]">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={(e) => {
            setValue(e.target.value);
            onInputChange?.(e.target.value);
            setOpen(true);
            setHighlight(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className={`${fieldBase} ${fieldBorder(hasError)} h-8 pl-4 pr-16`}
        />
        {value && !disabled && (
          <button
            type="button"
            aria-label={clearAriaLabel}
            onClick={clear}
            className="absolute right-9 top-1/2 -translate-y-1/2 text-[#494a4a] hover:text-[#252626]"
          >
            <ClearX />
          </button>
        )}
        <button
          type="button"
          aria-label={dropdownAriaLabel}
          disabled={disabled}
          onClick={() => {
            setOpen((o) => !o);
            inputRef.current?.focus();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1482cc] disabled:text-[#8a8a8a]"
        >
          <Chevron open={open} />
        </button>
      </div>
      {open && !disabled && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-[4px] border border-[#dadada] bg-white py-1 font-normal shadow-[0_2px_4px_0_rgba(37,38,38,0.12)]"
        >
          {filtered.length === 0 ? (
            <li className="px-4 py-2 text-sm text-[#8a8a8a]">{noSuggestionLabel}</li>
          ) : (
            filtered.map((o, i) => (
              <li
                key={o.key}
                role="option"
                aria-selected={i === highlight}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(o);
                }}
                className={`cursor-pointer px-4 py-2 text-sm text-[#252626] ${
                  i === highlight ? "bg-[#d2eafa]" : ""
                }`}
              >
                {o.text}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};
