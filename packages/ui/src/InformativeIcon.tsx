import type { SVGProps } from "react";

export type InformativeIconName = "info" | "success" | "warning" | "error" | "help";
export type InformativeIconSize = "sm" | "md" | "lg";

// Self-contained VUD-style informative icons (coloured shape + white glyph),
// so icon-bearing components don't depend on the external icon CSS.
const COLOR: Record<InformativeIconName, string> = {
  info: "var(--vud-info)",
  success: "var(--vud-success)",
  warning: "var(--vud-warning)",
  error: "var(--vud-danger)",
  help: "var(--vud-ink-subtle)",
};

// Token sizes, consistent with the rest of the library (sm/md/lg). A raw number
// is still accepted as an escape hatch.
const SIZE_PX: Record<InformativeIconSize, number> = { sm: 16, md: 20, lg: 24 };

export type InformativeIconProps = {
  name: InformativeIconName;
  /** Box size: "sm" (16) | "md" (20) | "lg" (24), or a pixel number. */
  size?: InformativeIconSize | number;
} & Omit<SVGProps<SVGSVGElement>, "name">;

export const InformativeIcon = ({
  name,
  size = "sm",
  className,
  "aria-hidden": ariaHidden,
  ...props
}: InformativeIconProps) => {
  const fill = COLOR[name];
  const px = typeof size === "number" ? size : SIZE_PX[size];
  // Decorative (aria-hidden) callers skip the implicit role/label.
  const a11y = ariaHidden
    ? { "aria-hidden": true as const }
    : { role: "img", "aria-label": name };

  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 16 16"
      fill="none"
      {...a11y}
      className={["inline-block shrink-0 align-middle", className].filter(Boolean).join(" ")}
      {...props}
    >
      {name === "warning" ? (
        <path d="M8 1.2 15 13.6a1 1 0 0 1-.87 1.5H1.87A1 1 0 0 1 1 13.6L8 1.2Z" style={{ fill }} />
      ) : (
        <circle cx="8" cy="8" r="8" style={{ fill }} />
      )}

      {name === "success" && (
        <path
          d="M4.4 8.2 6.9 10.6 11.6 5.4"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {name === "help" && (
        <>
          <path
            d="M6.2 6.1a1.9 1.9 0 1 1 2.6 1.8c-.6.3-.9.7-.9 1.4v.3"
            stroke="white"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="8" cy="11.6" r="0.95" fill="white" />
        </>
      )}

      {(name === "info" || name === "error" || name === "warning") && (
        // "!" for warning/error, "i" for info — same stem, dot flips position.
        <>
          {name === "info" ? (
            <>
              <circle cx="8" cy="4.6" r="1" fill="white" />
              <rect x="7.05" y="6.7" width="1.9" height="5.1" rx="0.95" fill="white" />
            </>
          ) : (
            <>
              <rect
                x="7.05"
                y={name === "warning" ? "5.2" : "4.2"}
                width="1.9"
                height={name === "warning" ? "4.6" : "5"}
                rx="0.95"
                fill="white"
              />
              <circle cx="8" cy={name === "warning" ? "12" : "11.6"} r="0.95" fill="white" />
            </>
          )}
        </>
      )}
    </svg>
  );
};
