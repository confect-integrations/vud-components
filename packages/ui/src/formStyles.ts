// Shared VUD form-field styling. Tailwind scans this file for the literal
// class strings, so they generate even though they're referenced indirectly.
export const fieldBase =
  "w-full rounded-[4px] bg-white text-sm font-normal text-[#252626] outline-none transition-colors placeholder:text-[#494a4a] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-[#f2f2f2] disabled:text-[#8a8a8a]";

export const fieldEnabledBorder =
  "border border-[#8a8a8a] hover:border-[#1482cc] focus:border-[#1482cc] focus:shadow-[inset_0_0_0_1px_#1482cc]";

export const fieldErrorBorder =
  "border border-[#cc334c] hover:border-[#cc334c] focus:border-[#cc334c] focus:shadow-[inset_0_0_0_1px_#cc334c]";

export const fieldBorder = (hasError?: boolean) =>
  hasError ? fieldErrorBorder : fieldEnabledBorder;
