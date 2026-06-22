"use client";
import { Children, cloneElement, isValidElement, useId } from "react";
import type { ChangeEvent, ReactElement, ReactNode } from "react";

export type RadioProps = {
  label?: ReactNode;
  value?: string;
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  className?: string;
  ariaLabel?: string;
};

/** A single radio button. Usually rendered inside a `RadioGroup`. */
export const Radio = ({
  label,
  value,
  checked = false,
  disabled = false,
  name,
  onChange,
  id,
  className,
  ariaLabel,
}: RadioProps) => {
  const autoId = useId();
  const inputId = id ?? autoId;

  const boxColor = disabled
    ? "border-[#8a8a8a] bg-[#f2f2f2]"
    : checked
      ? "border-[#1482cc] bg-[#1482cc]"
      : "border-[#8a8a8a] bg-white";
  const dotColor = disabled ? "bg-[#8a8a8a]" : "bg-white";

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
        id={inputId}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-label={ariaLabel}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        className={[
          "relative mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#1482cc]",
          boxColor,
        ].join(" ")}
      >
        {checked && <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />}
      </span>
      {label != null && label !== "" && <span className="leading-5">{label}</span>}
    </label>
  );
};

export type RadioOption = { value: string; label: ReactNode; disabled?: boolean };

export type RadioGroupProps = {
  /** Shared name; auto-generated if omitted. */
  name?: string;
  /** Selected value (controlled). */
  value?: string;
  onChange?: (value: string) => void;
  /** Render radios from data, or pass `Radio` children. */
  options?: RadioOption[];
  /** Disable the whole group. */
  disabled?: boolean;
  orientation?: "vertical" | "horizontal";
  children?: ReactNode;
  className?: string;
};

/** Groups radios under one name and manages the selected value. */
export const RadioGroup = ({
  name,
  value,
  onChange,
  options,
  disabled = false,
  orientation = "vertical",
  children,
  className,
}: RadioGroupProps) => {
  const autoName = useId();
  const groupName = name ?? autoName;

  const layout = orientation === "vertical" ? "flex flex-col gap-2" : "flex flex-wrap gap-x-6 gap-y-2";

  return (
    <div role="radiogroup" className={[layout, className].filter(Boolean).join(" ")}>
      {options
        ? options.map((opt) => (
            <Radio
              key={opt.value}
              name={groupName}
              value={opt.value}
              label={opt.label}
              checked={value === opt.value}
              disabled={disabled || opt.disabled}
              onChange={() => onChange?.(opt.value)}
            />
          ))
        : Children.map(children, (child) =>
            isValidElement<RadioProps>(child)
              ? cloneElement(child, {
                  name: groupName,
                  checked: value === child.props.value,
                  disabled: disabled || child.props.disabled,
                  onChange: () => onChange?.(child.props.value ?? ""),
                })
              : child,
          )}
    </div>
  );
};
