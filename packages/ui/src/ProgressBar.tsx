import type { HTMLAttributes, ReactNode } from "react";

export type ProgressBarSize = "xs" | "sm" | "md";

// Track height + corner radius per size (VUD: 5 / 10 / 20px) — shared with
// the indeterminate HorizontalLoadingBar.
const TRACK_SIZE: Record<ProgressBarSize, string> = {
  xs: "h-[5px] rounded-[3px]",
  sm: "h-[10px] rounded-[5px]",
  md: "h-5 rounded-[10px]",
};

export type ProgressBarProps = {
  /** Current value. */
  value: number;
  /** Maximum value the bar fills to. */
  max?: number;
  /** Track thickness. */
  size?: ProgressBarSize;
  /** Caption shown beneath the bar (left-aligned). */
  label?: ReactNode;
  /** Show the right-aligned percentage. */
  showPercentage?: boolean;
} & Omit<HTMLAttributes<HTMLDivElement>, "children">;

/**
 * Determinate progress bar. The fill animates to `value / max`. When `value`
 * exceeds `max` it switches to the red "over-limit" style.
 */
export const ProgressBar = ({
  value,
  max = 100,
  size = "md",
  label,
  showPercentage = true,
  className,
  ...props
}: ProgressBarProps) => {
  const safeMax = max > 0 ? max : 100;
  const pct = (value / safeMax) * 100;
  const overLimit = value > safeMax;
  const fillWidth = Math.max(0, Math.min(pct, 100));

  const fillColor = overLimit ? "bg-[#cc334c]" : "bg-[#1482cc]";
  const textColor = overLimit ? "text-[#a12036]" : "text-[#494a4a]";
  const hasLabel = label != null && label !== "";
  const hasFooter = hasLabel || showPercentage;

  return (
    <div className={["w-full", className].filter(Boolean).join(" ")} {...props}>
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={typeof label === "string" && label ? label : "Progress"}
        className={`relative w-full overflow-hidden bg-[#bcbcbc] ${TRACK_SIZE[size]}`}
      >
        <div
          className={`h-full rounded-full transition-[width] duration-500 ease-out ${fillColor}`}
          style={{ width: `${fillWidth}%` }}
        />
      </div>
      {hasFooter && (
        <div
          className={`mt-2 flex items-center justify-between gap-4 text-base ${textColor}`}
        >
          <span className="min-w-0 truncate">{label}</span>
          {showPercentage && (
            <span className="shrink-0 tabular-nums">{Math.round(pct)}%</span>
          )}
        </div>
      )}
    </div>
  );
};
