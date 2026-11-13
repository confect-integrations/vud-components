// Shared VUD form-field styling. Tailwind scans this file for the literal
// class strings, so they generate even though they're referenced indirectly.
export const fieldBase =
  "vud-font w-full rounded-[var(--vud-radius-sm)] bg-[var(--vud-surface)] text-sm font-normal text-[var(--vud-ink)] outline-none transition-colors placeholder:text-[var(--vud-ink-muted)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[var(--vud-surface-sunk)] disabled:text-[var(--vud-ink-faint)]";

export const fieldEnabledBorder =
  "border border-[var(--vud-rule-strong)] hover:border-[var(--vud-accent)] focus:border-[var(--vud-focus)] focus:shadow-[inset_0_0_0_1px_var(--vud-focus)]";

export const fieldErrorBorder =
  "border border-[var(--vud-danger)] hover:border-[var(--vud-danger)] focus:border-[var(--vud-danger)] focus:shadow-[inset_0_0_0_1px_var(--vud-danger)]";

export const fieldBorder = (hasError?: boolean) =>
  hasError ? fieldErrorBorder : fieldEnabledBorder;
