import type { HTMLAttributes, ReactNode } from "react";

export type ProgressCircleSize = "xs" | "sm" | "md" | "lg";

// Outer diameter / ring thickness / percentage font per size (px).
const SIZE: Record<ProgressCircleSize, { d: number; stroke: number; font: string }> = {
  xs: { d: 64, stroke: 6, font: "text-sm" },
  sm: { d: 96, stroke: 8, font: "text-base" },
  md: { d: 128, stroke: 10, font: "text-lg" },
  lg: { d: 160, stroke: 12, font: "text-2xl" },
};

export type ProgressCircleProps = {
  /** Current percentage (0–100). */
  percentage: number;
  /** Diameter / ring thickness preset. */
  size?: ProgressCircleSize;
  /** Accessible name announced for the circle. */
  title?: ReactNode;
  /** Accessible description announced for the circle. */
  circleDescription?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

/**
 * Determinate circular progress. A blue arc fills clockwise from the top to
 * `percentage`, animating via stroke-dashoffset (mirrors VUD's progress-circle).
 */
export const ProgressCircle = ({
  percentage,
  size = "md",
  title,
  circleDescription,
  className,
  ...props
}: ProgressCircleProps) => {
  const { d, stroke, font } = SIZE[size];
  const pct = Math.max(0, Math.min(percentage, 100));
  const r = (d - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference * (1 - pct / 100);
  const center = d / 2;

  const ariaLabel = [
    typeof title === "string" && title ? title : null,
    `${Math.round(pct)}%`,
    typeof circleDescription === "string" && circleDescription
      ? circleDescription
      : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={["relative inline-flex shrink-0", className]
        .filter(Boolean)
        .join(" ")}
      style={{ width: d, height: d }}
      {...props}
    >
      <svg width={d} height={d} viewBox={`0 0 ${d} ${d}`} className="-rotate-90" aria-hidden="true">
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="#bcbcbc"
          strokeWidth={stroke}
        />
        <circle
          cx={center}
          cy={center}
          r={r}
          fill="none"
          stroke="#1482cc"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-1000 ease-in-out"
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center font-medium text-[#252626] ${font}`}
      >
        {Math.round(pct)}%
      </span>
    </div>
  );
};
