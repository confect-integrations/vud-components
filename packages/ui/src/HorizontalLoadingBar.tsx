import type { HTMLAttributes, ReactNode } from "react";

export type LoadingBarSize = "xs" | "sm" | "md";

// Track height + corner radius per size (VUD: 5 / 10 / 20px).
const SIZE: Record<LoadingBarSize, { track: string; labelMt: string }> = {
  xs: { track: "h-[5px] rounded-[3px]", labelMt: "mt-1" },
  sm: { track: "h-[10px] rounded-[5px]", labelMt: "mt-1.5" },
  md: { track: "h-5 rounded-[10px]", labelMt: "mt-2" },
};

export type HorizontalLoadingBarProps = {
  /** Track thickness. */
  size?: LoadingBarSize;
  /** Optional caption shown beneath the bar. */
  label?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Indeterminate horizontal loading bar — a blue segment sweeps across a grey
 * track on a continuous loop. Pure CSS animation (no client JS).
 */
export const HorizontalLoadingBar = ({
  size = "md",
  label,
  className,
  ...props
}: HorizontalLoadingBarProps) => {
  const s = SIZE[size];
  const hasLabel = label != null && label !== "";
  return (
    <div className={["w-full", className].filter(Boolean).join(" ")} {...props}>
      <div
        role="progressbar"
        aria-busy="true"
        aria-label={typeof label === "string" && label ? label : "Loading"}
        className={`relative w-full overflow-hidden bg-[#bcbcbc] ${s.track}`}
      >
        <span className={"vud-hlb-bar"} />
      </div>
      {hasLabel && (
        <span className={`block truncate text-sm text-[#494a4a] ${s.labelMt}`}>
          {label}
        </span>
      )}
    </div>
  );
};
