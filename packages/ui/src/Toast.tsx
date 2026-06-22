"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import type { ReactNode } from "react";

export type ToastVariant = "info" | "success" | "warning" | "error";
export type ToastPosition = "top-right" | "top-center" | "bottom-right" | "bottom-center";

type ToastItem = { id: number; variant: ToastVariant; message: ReactNode; duration: number };
type ShowOptions = { variant?: ToastVariant; duration?: number };

type ToastApi = {
  show: (message: ReactNode, opts?: ShowOptions) => void;
  info: (message: ReactNode, opts?: ShowOptions) => void;
  success: (message: ReactNode, opts?: ShowOptions) => void;
  warning: (message: ReactNode, opts?: ShowOptions) => void;
  error: (message: ReactNode, opts?: ShowOptions) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

export const useToast = (): ToastApi => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

const VARIANT: Record<ToastVariant, string> = {
  info: "border-l-[#116fae] bg-[#e7f2f9]",
  success: "border-l-[#2d7048] bg-[#eaf4ea]",
  warning: "border-l-[#c26800] bg-[#fcf2dc]",
  error: "border-l-[#cc334c] bg-[#ffedef]",
};

const POSITION: Record<ToastPosition, string> = {
  "top-right": "top-4 right-4 items-end",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
};

const ToastCard = ({ toast, onDismiss }: { toast: ToastItem; onDismiss: (id: number) => void }) => {
  useEffect(() => {
    if (toast.duration <= 0) return;
    const t = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  return (
    <div
      role="status"
      className={`pointer-events-auto flex w-[360px] max-w-[calc(100vw-2rem)] items-start gap-3 rounded-md border border-l-4 border-[#dadada] px-4 py-3 text-sm text-[#252626] shadow-[0_5px_10px_0_rgba(37,38,38,0.12)] ${VARIANT[toast.variant]}`}
    >
      <div className="flex-1">{toast.message}</div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className="-mr-1 shrink-0 rounded p-0.5 text-[#494a4a] transition-colors hover:bg-black/5"
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

const ToastViewport = ({
  toasts,
  onDismiss,
  position,
}: {
  toasts: ToastItem[];
  onDismiss: (id: number) => void;
  position: ToastPosition;
}) => {
  const [el, setEl] = useState<Element | null>(null);
  useEffect(() => setEl(document.body), []);
  if (!el) return null;
  return createPortal(
    <div className={`pointer-events-none fixed z-[1100] flex flex-col gap-2 ${POSITION[position]}`}>
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} onDismiss={onDismiss} />
      ))}
    </div>,
    el,
  );
};

export type ToastProviderProps = {
  children?: ReactNode;
  position?: ToastPosition;
  /** Default auto-dismiss in ms (0 = sticky). */
  duration?: number;
};

export const ToastProvider = ({ children, position = "top-right", duration = 4000 }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
  }, []);

  const api = useMemo<ToastApi>(() => {
    const show = (message: ReactNode, opts: ShowOptions = {}) => {
      const id = (idRef.current += 1);
      setToasts((list) => [
        ...list,
        { id, message, variant: opts.variant ?? "info", duration: opts.duration ?? duration },
      ]);
    };
    return {
      show,
      info: (m, o) => show(m, { ...o, variant: "info" }),
      success: (m, o) => show(m, { ...o, variant: "success" }),
      warning: (m, o) => show(m, { ...o, variant: "warning" }),
      error: (m, o) => show(m, { ...o, variant: "error" }),
    };
  }, [duration]);

  return (
    <ToastContext.Provider value={api}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} position={position} />
    </ToastContext.Provider>
  );
};
