import type { ReactNode } from "react";
import { InformativeIcon, type InformativeIconName } from "./InformativeIcon";

export type AlertType = "info" | "success" | "warning" | "error";

export type AlertProps = {
  /** Severity — drives the icon and colours. */
  type?: AlertType;
  /** Bold heading shown above the body. */
  title?: ReactNode;
  /** Body content (any node). */
  children?: ReactNode;
  /** @deprecated Use `children`. Simple string body, kept for back-compat. */
  message?: ReactNode;
  /** When provided, renders a dismiss (×) button that calls this. */
  onClose?: () => void;
  /** Trailing slot for actions (e.g. a Button or link). */
  action?: ReactNode;
  /** Hide the leading status icon. */
  hideIcon?: boolean;
  className?: string;
};

// VUD-aligned tints: soft background, accent border, readable text — one per severity.
const STYLES: Record<AlertType, { container: string; icon: InformativeIconName }> = {
  info: { container: "bg-[#e7f2f9] border-[#1482cc] text-[#11537f]", icon: "info" },
  success: { container: "bg-[#e7f4ec] border-[#2d7048] text-[#1e4d31]", icon: "success" },
  warning: { container: "bg-[#fbf0e2] border-[#c26800] text-[#7a4100]", icon: "warning" },
  error: { container: "bg-[#fbeaed] border-[#cc334c] text-[#8f2333]", icon: "error" },
};

/**
 * Inline alert / notification. Supports a heading, rich body content, an optional
 * dismiss button and a trailing action slot. Ships no outer margin or shadow, so
 * spacing is entirely up to the caller.
 */
export const Alert = ({
  type = "info",
  title,
  children,
  message,
  onClose,
  action,
  hideIcon = false,
  className,
}: AlertProps) => {
  const s = STYLES[type];
  const body = children ?? message;

  return (
    <div
      role="alert"
      className={["flex items-start gap-3 rounded-lg border p-4", s.container, className]
        .filter(Boolean)
        .join(" ")}
    >
      {!hideIcon && (
        <InformativeIcon name={s.icon} size="md" className="mt-px shrink-0" aria-hidden />
      )}

      <div className="min-w-0 flex-1">
        {title && <div className="font-semibold">{title}</div>}
        {body && <div className={`text-sm ${title ? "mt-1" : ""}`}>{body}</div>}
        {action && <div className="mt-3 flex flex-wrap gap-2">{action}</div>}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="-m-1 shrink-0 rounded p-1 text-current opacity-70 transition-opacity hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4 4l8 8M12 4l-8 8"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
};
