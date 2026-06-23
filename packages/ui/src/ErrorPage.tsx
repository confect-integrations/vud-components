import type { ReactNode } from "react";

export type ErrorType =
  | "not-found"
  | "access-denied"
  | "server-maintenance"
  | "server-down"
  | "server-error";

// Per-type default copy (overridable via props/children).
const CONFIG: Record<ErrorType, { title: string; text: string }> = {
  "not-found": {
    title: "Page not found",
    text: "We're sorry, the page you were looking for could not be found. It may have moved or the address may be mistyped. Follow home page link below.",
  },
  "access-denied": {
    title: "Access denied",
    text: "You are trying to view a page you are not allowed to see. If you are not logged in, log in. Otherwise, check that your account should be able to view it.",
  },
  "server-maintenance": {
    title: "Server maintenance",
    text: "The server is undergoing scheduled maintenance. Check back later.",
  },
  "server-down": {
    title: "Server down",
    text: "The application has run into problems and is not working as it should at the moment. We are aware of the error and will do our best to get it working again.",
  },
  "server-error": {
    title: "Server error",
    text: "We're sorry, an unexpected error has occurred and it has been logged. We will try to fix it as soon as possible.",
  },
};

export type ErrorPageProps = {
  /** Which error illustration + default copy to show. */
  type: ErrorType;
  /** Heading (defaults to the type's standard title). */
  title?: ReactNode;
  /** Call-to-action button text. */
  buttonCaption?: ReactNode;
  /** URL the button links to. */
  redirectUrl?: string;
  /** Body copy (defaults to the type's standard text). */
  children?: ReactNode;
  className?: string;
};

/** Centered error page: a heading, message and call-to-action button. */
export const ErrorPage = ({
  type,
  title,
  buttonCaption = "Go to home page",
  redirectUrl = "/",
  children,
  className,
}: ErrorPageProps) => {
  const cfg = CONFIG[type];
  return (
    <div
      className={[
        "rounded-[15px] bg-white p-12 shadow-[0_2px_4px_0_rgba(37,38,38,0.08)] sm:p-16",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto max-w-lg text-center">
        <h1 className="mb-8 text-[32px] font-normal leading-none text-[#252626]">
          {title ?? cfg.title}
        </h1>
        <div className="mb-8 leading-[1.8] text-[#252626]">{children ?? cfg.text}</div>
        {buttonCaption && (
          <a
            href={redirectUrl}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[#2d7048] bg-[#2d7048] px-4 text-sm text-white shadow-[0_2px_4px_0_rgba(49,98,69,0.16)] transition-colors hover:border-[#28633f] hover:bg-[#28633f]"
          >
            {buttonCaption}
          </a>
        )}
      </div>
    </div>
  );
};
