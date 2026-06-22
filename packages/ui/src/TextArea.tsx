"use client";
import type { TextareaHTMLAttributes } from "react";
import { fieldBase, fieldBorder } from "./formStyles";

export type TextAreaProps = {
  /** Show the error (red) border. */
  hasError?: boolean;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

/** Multi-line text field. */
export const TextArea = ({ hasError, className, rows = 3, ...props }: TextAreaProps) => (
  <textarea
    rows={rows}
    aria-invalid={hasError || undefined}
    className={[
      fieldBase,
      fieldBorder(hasError),
      "min-h-[64px] resize-y px-4 py-2 leading-5",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
);
