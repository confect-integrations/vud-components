"use client";
import { createPortal } from "react-dom";
import { useContext, useEffect, useId, useRef, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { ModalContext } from "./modalContext";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export type ModalProps = {
  /** Controls visibility. The dialog fades/scales in and out as this toggles. */
  open: boolean;
  /** Fired by the ✕ button, the backdrop, and the Escape key. */
  onClose?: () => void;
  /** Dialog width preset. `full` fills the viewport. */
  size?: ModalSize;
  /** Close when the dimmed backdrop is clicked. */
  closeOnBackdrop?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

const CONSTRAIN = "max-h-[calc(100%-60px)] max-w-[calc(100%-60px)] min-h-[300px] rounded-[24px]";
const SIZE: Record<ModalSize, string> = {
  sm: `w-[480px] ${CONSTRAIN}`,
  md: `w-[600px] ${CONSTRAIN}`,
  lg: `w-[720px] ${CONSTRAIN}`,
  xl: `w-[1200px] ${CONSTRAIN}`,
  full: "h-screen w-screen max-h-full max-w-full rounded-none",
};

// Keep in sync with the `duration-300` classes below.
const TRANSITION_MS = 300;

export const Modal = ({
  open,
  onClose,
  size = "md",
  closeOnBackdrop = true,
  children,
  className,
  ...props
}: ModalProps) => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  useEffect(() => setPortalEl(document.body), []);

  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Paint the closed state first, then flip to entered next frame to animate in.
  useEffect(() => {
    if (!mounted || !open) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setEntered(true)));
    dialogRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, [mounted, open]);

  // Animate out, then unmount once the transition finishes.
  useEffect(() => {
    if (open || !mounted) return;
    setEntered(false);
    const t = setTimeout(() => setMounted(false), TRANSITION_MS + 50);
    return () => clearTimeout(t);
  }, [open, mounted]);

  // Escape to close + lock body scroll while open.
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [mounted, onClose]);

  if (!mounted || !portalEl) return null;

  const dialogClasses = [
    "relative flex flex-col border border-[#dadada] bg-white px-12 pb-10 pt-12 text-[#252626]",
    "shadow-[0_5px_10px_0_rgba(37,38,38,0.12)] transition-all duration-300 ease-out focus:outline-none",
    SIZE[size],
    entered ? "scale-100 opacity-100" : "scale-95 opacity-0",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return createPortal(
    <ModalContext.Provider value={{ onClose, titleId }}>
      <div className="fixed inset-0 z-[1050] flex items-center justify-center">
        <div
          className={`absolute inset-0 bg-[rgba(37,38,38,0.5)] transition-opacity duration-300 ${
            entered ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
          onClick={() => closeOnBackdrop && onClose?.()}
        />
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={dialogClasses}
          {...props}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 inline-flex size-6 items-center justify-center rounded transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1482cc]"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1.5 1.5l11 11m0-11l-11 11" stroke="#494A4A" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
          {children}
        </div>
      </div>
    </ModalContext.Provider>,
    portalEl,
  );
};

type SectionProps = HTMLAttributes<HTMLElement>;

/** Bold title area; headings inside render at the modal title style. */
export const ModalHeader = ({ children, className, ...props }: SectionProps) => {
  const { titleId } = useContext(ModalContext);
  return (
    <header
      id={titleId}
      className={[
        "mb-4 shrink-0 pr-8 text-xl font-bold leading-snug text-[#252626] [&_:is(h1,h2,h3,h4,h5,h6)]:m-0 [&_:is(h1,h2,h3,h4,h5,h6)]:text-xl [&_:is(h1,h2,h3,h4,h5,h6)]:font-bold",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </header>
  );
};

/** Scrollable content region between the header and footer. */
export const ModalBody = ({ children, className, ...props }: SectionProps) => (
  <div
    className={[
      "min-h-0 flex-1 overflow-y-auto text-base leading-relaxed [&>p]:mb-4 [&>p:last-child]:mb-0",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </div>
);

/** Right-aligned action bar pinned to the bottom of the dialog. */
export const ModalFooter = ({ children, className, ...props }: SectionProps) => (
  <footer
    className={[
      "mt-6 flex shrink-0 flex-wrap items-center justify-end gap-2",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </footer>
);
