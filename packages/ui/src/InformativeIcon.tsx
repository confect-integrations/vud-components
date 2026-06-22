import type { SVGProps } from "react";

export type InformativeIconName = "info" | "success" | "warning" | "error" | "help";

// Self-contained VUD-style informative icons (coloured shape + white glyph),
// so icon-bearing components don't depend on the external icon CSS.
const COLOR: Record<InformativeIconName, string> = {
  info: "#1482cc",
  success: "#2d7048",
  warning: "#c26800",
  error: "#cc334c",
  help: "#6f7271",
};

export type InformativeIconProps = {
  name: InformativeIconName;
  /** Pixel size (square). */
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "name">;

export const InformativeIcon = ({ name, size = 16, className, ...props }: InformativeIconProps) => {
  const fill = COLOR[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      role="img"
      aria-label={name}
      className={["inline-block shrink-0 align-middle", className].filter(Boolean).join(" ")}
      {...props}
    >
      {name === "warning" ? (
        <path d="M8 1.2 15 13.6a1 1 0 0 1-.87 1.5H1.87A1 1 0 0 1 1 13.6L8 1.2Z" fill={fill} />
      ) : (
        <circle cx="8" cy="8" r="8" fill={fill} />
      )}

      {name === "success" && (
        <path
          d="M4.4 8.2 6.9 10.6 11.6 5.4"
          stroke="#fff"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {name === "help" && (
        <>
          <path
            d="M6.2 6.1a1.9 1.9 0 1 1 2.6 1.8c-.6.3-.9.7-.9 1.4v.3"
            stroke="#fff"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="8" cy="11.6" r="0.95" fill="#fff" />
        </>
      )}

      {(name === "info" || name === "error" || name === "warning") && (
        // "!" for warning/error, "i" for info — same stem, dot flips position.
        <>
          {name === "info" ? (
            <>
              <circle cx="8" cy="4.6" r="1" fill="#fff" />
              <rect x="7.05" y="6.7" width="1.9" height="5.1" rx="0.95" fill="#fff" />
            </>
          ) : (
            <>
              <rect
                x="7.05"
                y={name === "warning" ? "5.2" : "4.2"}
                width="1.9"
                height={name === "warning" ? "4.6" : "5"}
                rx="0.95"
                fill="#fff"
              />
              <circle cx="8" cy={name === "warning" ? "12" : "11.6"} r="0.95" fill="#fff" />
            </>
          )}
        </>
      )}
    </svg>
  );
};
