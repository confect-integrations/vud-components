"use client";
import { Children, cloneElement, isValidElement, useId } from "react";
import type { ReactElement, ReactNode } from "react";

export type FormGroupProps = {
  /** Field label. */
  label?: ReactNode;
  /** Show a red required asterisk. */
  required?: boolean;
  /** Hint shown below the field. */
  helperText?: ReactNode;
  /** Error message (replaces the hint and turns the field red). */
  error?: ReactNode;
  /** Override the generated id used to link label ⇄ field. */
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

/** Labels, hints and validation messaging around a single form field. */
export const FormGroup = ({
  label,
  required = false,
  helperText,
  error,
  htmlFor,
  children,
  className,
}: FormGroupProps) => {
  const autoId = useId();
  const fieldId = htmlFor ?? autoId;
  const descId = `${fieldId}-desc`;
  const hasError = error != null && error !== "";
  const hasHelp = helperText != null && helperText !== "";
  const describe = hasError || hasHelp;

  // Auto-wire a single field child: id, description, and error state.
  const arr = Children.toArray(children);
  const only = arr.length === 1 && isValidElement(arr[0]) ? (arr[0] as ReactElement<Record<string, unknown>>) : null;
  const field = only
    ? cloneElement(only, {
        id: (only.props.id as string | undefined) ?? fieldId,
        "aria-describedby": describe
          ? descId
          : (only.props["aria-describedby"] as string | undefined),
        ...(hasError ? { hasError: true, "aria-invalid": true } : {}),
      })
    : children;

  return (
    <div className={["flex flex-col gap-1", className].filter(Boolean).join(" ")}>
      {label != null && label !== "" && (
        <label htmlFor={fieldId} className="text-sm font-semibold text-[#252626]">
          {label}
          {required && <span className="ml-0.5 text-[#a12036]">*</span>}
        </label>
      )}
      {field}
      {describe && (
        <span id={descId} className={`text-xs ${hasError ? "text-[#a12036]" : "text-[#6f7271]"}`}>
          {hasError ? error : helperText}
        </span>
      )}
    </div>
  );
};
