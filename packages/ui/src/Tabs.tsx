"use client";
import { createContext, useContext, useId, useState } from "react";
import type { ReactNode } from "react";

type TabsCtx = { value: string; setValue: (v: string) => void; idBase: string };
const TabsContext = createContext<TabsCtx | null>(null);
const useTabs = () => {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab/TabList/TabPanel must be used inside <Tabs>");
  return ctx;
};

export type TabsProps = {
  /** Initial selected tab (uncontrolled). */
  defaultValue?: string;
  /** Controlled selected tab. */
  value?: string;
  onValueChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
};

export const Tabs = ({ defaultValue = "", value, onValueChange, children, className }: TabsProps) => {
  const idBase = useId();
  const [internal, setInternal] = useState(defaultValue);
  const current = value ?? internal;
  const setValue = (v: string) => {
    onValueChange?.(v);
    if (value === undefined) setInternal(v);
  };
  return (
    <TabsContext.Provider value={{ value: current, setValue, idBase }}>
      <div className={["flex flex-col", className].filter(Boolean).join(" ")}>{children}</div>
    </TabsContext.Provider>
  );
};

export const TabList = ({ children, className }: { children?: ReactNode; className?: string }) => (
  <div role="tablist" className={["flex gap-1 border-b border-[#dadada]", className].filter(Boolean).join(" ")}>
    {children}
  </div>
);

export type TabProps = {
  value: string;
  disabled?: boolean;
  children?: ReactNode;
  className?: string;
};

export const Tab = ({ value, disabled = false, children, className }: TabProps) => {
  const ctx = useTabs();
  const active = ctx.value === value;
  return (
    <button
      type="button"
      role="tab"
      id={`${ctx.idBase}-tab-${value}`}
      aria-selected={active}
      aria-controls={`${ctx.idBase}-panel-${value}`}
      disabled={disabled}
      onClick={() => ctx.setValue(value)}
      className={[
        "-mb-px border-b-2 px-4 py-2.5 text-sm outline-none transition-colors",
        disabled
          ? "cursor-not-allowed border-transparent text-[#8a8a8a]"
          : active
            ? "border-[#1482cc] font-semibold text-[#252626]"
            : "border-transparent text-[#252626] hover:border-[#d2eafa] hover:text-[#1482cc]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </button>
  );
};

export type TabPanelProps = {
  value: string;
  children?: ReactNode;
  className?: string;
};

export const TabPanel = ({ value, children, className }: TabPanelProps) => {
  const ctx = useTabs();
  if (ctx.value !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${ctx.idBase}-panel-${value}`}
      aria-labelledby={`${ctx.idBase}-tab-${value}`}
      className={["pt-4 text-sm text-[#252626]", className].filter(Boolean).join(" ")}
    >
      {children}
    </div>
  );
};
