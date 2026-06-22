import type { SVGProps } from "react";

export type SpinnerType = "default" | "primary" | "secondary";
export type SpinnerColor = "blue" | "green" | "grey";
export type SpinnerSize = "xs" | "sm" | "md";

const COLORS: Record<SpinnerColor, { arc: string; track: string; snake: string }> = {
  blue: { arc: "#116FAE", track: "#99CBEC", snake: "#116FAE" },
  green: { arc: "#2D7048", track: "#AFD4AF", snake: "#2D7048" },
  grey: { arc: "#494A4A", track: "#C0C0C0", snake: "#959799" },
};

// VUD spinner box sizes (rendered from the 48-unit source art).
const SIZE_PX: Record<SpinnerSize, number> = { xs: 16, sm: 24, md: 48 };

// The tapered arc shared by the "default" (doughnut) and "secondary" (snake)
// spinners, and the full ring used as the doughnut's static track.
const ARC_PATH =
  "M43.1,33.9c-0.4,0-0.8-0.1-1.2-0.2c-2.1-0.7-3.3-2.9-2.6-5c0.5-1.5,0.7-3.1,0.7-4.8c0-8.8-7.2-16-16-16c-0.9,0-1.8,0.1-2.6,0.2c-2.2,0.4-4.2-1.1-4.6-3.3c-0.4-2.2,1.1-4.2,3.3-4.6C21.4,0.1,22.7,0,24,0c13.2,0,24,10.8,24,24c0,2.4-0.4,4.8-1.1,7.1C46.4,32.8,44.8,33.9,43.1,33.9z";
const RING_PATH =
  "M24,0C10.7,0,0,10.7,0,24s10.7,24,24,24s24-10.7,24-24S37.3,0,24,0z M24,40c-8.8,0-16-7.2-16-16S15.2,8,24,8s16,7.2,16,16S32.8,40,24,40z";

// 8 dots around the ring; each fades opacity 1→0 over 1s, staggered so the
// bright point chases around the circle.
const DOTS: { d: string; begin: string }[] = [
  { d: "M24.9,7.9a3.9,3.9,0,0,1-4.8-3,3.9,3.9,0,0,1,3-4.8,4,4,0,0,1,4.8,3A3.9,3.9,0,0,1,24.9,7.9Z", begin: "0s" },
  { d: "M6.4,11.8a4,4,0,1,1,5.5,1.5A4.1,4.1,0,0,1,6.4,11.8Z", begin: "0.875s" },
  { d: "M2.8,27.8a3.9,3.9,0,0,1-2.6-5,3.9,3.9,0,0,1,5-2.6,3.9,3.9,0,0,1,2.6,5A3.9,3.9,0,0,1,2.8,27.8Z", begin: "0.75s" },
  { d: "M5.9,38.6a4.1,4.1,0,0,1,3.5-4.5,4,4,0,1,1,1,8A4.1,4.1,0,0,1,5.9,38.6Z", begin: "0.625s" },
  { d: "M25.2,47.8a4,4,0,1,1,2.6-5,3.8,3.8,0,0,1-.4,3.3A4.1,4.1,0,0,1,25.2,47.8Z", begin: "0.5s" },
  { d: "M34.2,39A4,4,0,1,1,39,42,4,4,0,0,1,34.2,39Z", begin: "0.375s" },
  { d: "M44,20a4.1,4.1,0,0,0-3.5,6.1A4.3,4.3,0,0,0,44,28a4.1,4.1,0,0,0,3.5-6.1A4.3,4.3,0,0,0,44,20Z", begin: "0.25s" },
  { d: "M34.3,11.1a4,4,0,1,1,5.1,2.5A4.1,4.1,0,0,1,34.3,11.1Z", begin: "0.125s" },
];

const Rotate = () => (
  <animateTransform
    attributeName="transform"
    type="rotate"
    dur="1s"
    keyTimes="0;1"
    values="0 24 24;360 24 24"
    repeatCount="indefinite"
  />
);

export type SpinnerProps = {
  /** Visual style: doughnut / dotted / snake arc. */
  type?: SpinnerType;
  /** Tint. */
  color?: SpinnerColor;
  /** Box size. */
  size?: SpinnerSize;
} & Omit<SVGProps<SVGSVGElement>, "type" | "color">;

/**
 * Animated loading spinner — a faithful inline-SVG recreation of VUD's three
 * spinner styles (self-animating via SMIL, no client JS).
 */
export const Spinner = ({
  type = "default",
  color = "blue",
  size = "md",
  className,
  ...rest
}: SpinnerProps) => {
  const px = SIZE_PX[size];
  const c = COLORS[color];
  const common = {
    width: px,
    height: px,
    viewBox: "0 0 48 48",
    role: "status" as const,
    "aria-label": "Loading",
    className: ["inline-block", className].filter(Boolean).join(" "),
  };

  if (type === "primary") {
    return (
      <svg {...common} {...rest}>
        {DOTS.map((dot) => (
          <path key={dot.begin} d={dot.d} fill={c.arc} opacity={0}>
            <animate
              attributeName="opacity"
              from="1"
              to="0"
              dur="1s"
              begin={dot.begin}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </svg>
    );
  }

  if (type === "secondary") {
    const gradId = `vud-spinner-snake-${color}`;
    return (
      <svg {...common} {...rest}>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1="16.72"
          y1="16.97"
          x2="48"
          y2="16.97"
        >
          <stop offset="0" stopColor={c.snake} stopOpacity={0} />
          <stop offset="1" stopColor={c.snake} stopOpacity={1} />
        </linearGradient>
        <path d={ARC_PATH} fill={`url(#${gradId})`}>
          <Rotate />
        </path>
      </svg>
    );
  }

  // default — doughnut: static track ring + rotating solid arc.
  return (
    <svg {...common} {...rest}>
      <path d={RING_PATH} fill={c.track} opacity={0.75} />
      <path d={ARC_PATH} fill={c.arc}>
        <Rotate />
      </path>
    </svg>
  );
};
