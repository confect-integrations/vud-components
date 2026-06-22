"use client";
import { createPortal } from "react-dom";
import {
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { HTMLAttributes, ReactNode } from "react";
import { DrawerContext } from "./drawerContext";

export type DrawerSize = "sm" | "md" | "lg";

export type DrawerProps = {
  /** Controls visibility. The panel slides in/out when this toggles. */
  open: boolean;
  /** Fired by the ✕ button, the backdrop, and the Escape key. */
  onClose?: () => void;
  /** Panel width. Mirrors VUD's drawer-sm / -md / -lg. */
  size?: DrawerSize;
  /** Show a translucent overlay behind the panel (VUD leaves it clear). */
  dimmed?: boolean;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

// VUD widths (50% / 75% capped, sm is a fixed-ish rail).
const SIZE: Record<DrawerSize, string> = {
  sm: "w-1/4 min-w-[480px]",
  md: "w-1/2 max-w-[960px]",
  lg: "w-3/4 max-w-[1440px]",
};

// How long the slide lasts — kept in sync with `duration-300` below.
const TRANSITION_MS = 300;

export const Drawer = ({
  open,
  onClose,
  size = "md",
  dimmed = false,
  children,
  className,
  ...props
}: DrawerProps) => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  // `mounted` keeps the panel in the tree through its exit animation;
  // `entered` drives the slide (off-canvas → flush right).
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);
  const [portalEl, setPortalEl] = useState<Element | null>(null);

  // Portal lives on document.body; resolve it client-side only.
  useEffect(() => setPortalEl(document.body), []);

  // Mount as soon as we're asked to open.
  useEffect(() => {
    if (open) setMounted(true);
  }, [open]);

  // Once mounted (and still open), flip to the entered position next frame
  // so the browser paints the off-canvas state first and animates the change.
  useEffect(() => {
    if (!mounted || !open) return;
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true)),
    );
    panelRef.current?.focus();
    return () => cancelAnimationFrame(raf);
  }, [mounted, open]);

  // Closing: slide out, then drop from the tree after the animation.
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

  const panelClasses = [
    "fixed inset-y-0 right-0 z-[1030] flex flex-col overflow-hidden",
    "rounded-l-[24px] border border-[#DADADA] bg-white pt-8",
    "shadow-[0_5px_10px_0_rgba(37,38,38,0.12)]",
    "transition-transform duration-300 ease-in-out will-change-transform",
    "focus:outline-none",
    SIZE[size],
    entered ? "translate-x-0" : "translate-x-full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const backdropClasses = [
    "fixed inset-0 z-[1029] transition-opacity duration-300",
    entered ? "opacity-100" : "opacity-0",
    dimmed ? "bg-black/30" : "bg-transparent",
  ].join(" ");

  return createPortal(
    <DrawerContext.Provider value={{ onClose, titleId }}>
      <div className={backdropClasses} aria-hidden="true" onClick={onClose} />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={panelClasses}
        {...props}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-[48px] top-8 z-10 inline-flex size-6 items-center justify-center rounded transition-colors hover:bg-black/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1482cc]"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1.5 1.5l11 11m0-11l-11 11"
              stroke="#494A4A"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </button>
        {children}
      </div>
    </DrawerContext.Provider>,
    portalEl,
  );
};

type SectionProps = HTMLAttributes<HTMLElement>;

/** Title area. Headings inside render at VUD's 16px / 600. */
export const DrawerHeader = ({ children, className, ...props }: SectionProps) => {
  const { titleId } = useContext(DrawerContext);
  return (
    <header
      id={titleId}
      className={[
        "shrink-0 px-12 pb-4 pt-12 text-base font-semibold text-[#252626]",
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
export const DrawerBody = ({ children, className, ...props }: SectionProps) => (
  <div
    className={[
      "min-h-0 flex-1 overflow-y-auto px-12 pb-12 pt-4 text-base text-[#252626] [&>*:first-child]:mt-0",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </div>
);

/** Bottom action bar with a top divider; actions align right. */
export const DrawerFooter = ({ children, className, ...props }: SectionProps) => (
  <footer
    className={[
      "flex shrink-0 items-center justify-end gap-2 border-t border-[#DADADA] px-12 py-8",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </footer>
);
