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
  info: { container: "bg-[var(--vud-info-surface)] border-[var(--vud-info)] text-[var(--vud-info-ink)]", icon: "info" },
  success: { container: "bg-[var(--vud-alert-success-surface)] border-[var(--vud-success)] text-[var(--vud-success-ink)]", icon: "success" },
  warning: { container: "bg-[var(--vud-alert-warning-surface)] border-[var(--vud-warning)] text-[var(--vud-alert-warning-ink)]", icon: "warning" },
  error: { container: "bg-[var(--vud-alert-danger-surface)] border-[var(--vud-danger)] text-[var(--vud-alert-danger-ink)]", icon: "error" },
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
      className={["vud-font flex items-start gap-3 rounded-[var(--vud-radius-lg)] border p-4", s.container, className]
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
