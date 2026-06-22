import type { CSSProperties } from "react";

export type IconSize = "sm" | "md" | "lg";

type IconProps = {
  /** VUD icon name without the `vismaicon-` prefix (e.g. "info", "warning", "settings"). */
  name: string;
  /** Box size, rendered at a fixed pixel size so it's unaffected by the root font-size. */
  size?: IconSize;
  /** Filled variant. Required by the informative icons: info, success, warning, error, help. */
  filled?: boolean;
  /** Multi-tone "dynamic" variant, where the icon provides one. */
  dynamic?: boolean;
  /** Override the icon colour. Ignored by filled informative icons, which carry their own. */
  color?: string;
  /** Accessible name. Provide for meaningful icons; omit for decorative ones (then it's hidden from AT). */
  label?: string;
  className?: string;
};

/** Pixel box size paired with the VUD modifier that ships the matching-resolution SVG. */
const SIZE: Record<IconSize, { className: string; px: string }> = {
  sm: { className: "vismaicon-sm", px: "16px" },
  md: { className: "", px: "24px" },
  lg: { className: "vismaicon-lg", px: "32px" },
};

export const Icon = ({
  name,
  size = "md",
  filled = false,
  dynamic = false,
  color,
  label,
  className,
}: IconProps) => {
  const { className: sizeClass, px } = SIZE[size];

  const classes = [
    "vud-icon",
    "vismaicon",
    filled && "vismaicon-filled",
    dynamic && "vismaicon-dynamic",
    sizeClass,
    `vismaicon-${name}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--icon-size": px,
    ...(color ? { "--visma-icon-color": color } : {}),
  } as CSSProperties;

  return (
    <span
      className={classes}
      style={style}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
};
