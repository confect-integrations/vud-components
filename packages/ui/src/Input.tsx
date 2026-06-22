"use client";
import type { InputHTMLAttributes } from "react";
import { fieldBase, fieldBorder } from "./formStyles";

export type InputProps = {
  /** Show the error (red) border. */
  hasError?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

/** Single-line text field (text / password / email / number / …). */
export const Input = ({ hasError, type = "text", className, ...props }: InputProps) => (
  <input
    type={type}
    aria-invalid={hasError || undefined}
    className={[fieldBase, fieldBorder(hasError), "h-8 px-4", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  />
);
