"use client";
import { useId, useState } from "react";
import type { HTMLAttributes, ReactNode } from "react";

type CollapsibleProps = {
  /** Header label for the group / item. */
  title: ReactNode;
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Controlled open state. Pair with `onOpenChange`. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "title">;

// Small uncontrolled/controlled disclosure helper shared by group + item.
function useDisclosure(
  defaultOpen: boolean,
  controlled: boolean | undefined,
  onOpenChange?: (open: boolean) => void,
) {
  const [internal, setInternal] = useState(defaultOpen);
  const open = controlled ?? internal;
  const toggle = () => {
    const next = !open;
    onOpenChange?.(next);
    if (controlled === undefined) setInternal(next);
  };
  return [open, toggle] as const;
}

// Chevron points down when open, rotates to point right when collapsed.
const Chevron = ({ open, className = "" }: { open: boolean; className?: string }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`shrink-0 transition-transform duration-200 ${open ? "" : "-rotate-90"} ${className}`}
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Animated height collapse via the grid-rows 0fr→1fr trick (no JS measuring).
const Collapse = ({ open, id, children }: { open: boolean; id: string; children: ReactNode }) => (
  <div
    id={id}
    className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
      open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
    }`}
  >
    <div className="min-h-0 overflow-hidden">{children}</div>
  </div>
);

/** Outer card that wraps one or more `ListGroup`s. */
export const ListContainer = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={[
      "overflow-hidden rounded-md border border-[#dadada] bg-white px-8 py-4 shadow-[0_2px_4px_0_rgba(37,38,38,0.08)]",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </div>
);

/** A titled, collapsible group (blue header) holding `ListGroupItem`s. */
export const ListGroup = ({
  title,
  defaultOpen = true,
  open: openProp,
  onOpenChange,
  children,
  className,
  ...props
}: CollapsibleProps) => {
  const id = useId();
  const [open, toggle] = useDisclosure(defaultOpen, openProp, onOpenChange);
  return (
    <div className={["py-2", className].filter(Boolean).join(" ")} {...props}>
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex items-center gap-2 py-2 text-base font-semibold text-[#116fae]"
      >
        <span>{title}</span>
        <Chevron open={open} />
      </button>
      <Collapse open={open} id={id}>
        {children}
      </Collapse>
    </div>
  );
};

/** A collapsible item (dark header) that reveals its body when open. */
export const ListGroupItem = ({
  title,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  children,
  className,
  ...props
}: CollapsibleProps) => {
  const id = useId();
  const [open, toggle] = useDisclosure(defaultOpen, openProp, onOpenChange);
  return (
    <div
      className={[
        // -mx-8/px-8 lets the open surface bleed to the ListContainer edges.
        "relative -mx-8 px-8 transition-colors",
        open
          ? "bg-[#f2f2f2] before:absolute before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-[#4e9c54] before:content-['']"
          : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center gap-2 py-3 text-left text-base text-[#252626]"
      >
        <Chevron open={open} />
        <span>{title}</span>
      </button>
      <Collapse open={open} id={id}>
        <div className="pb-3 pl-5 text-sm text-[#252626]">{children}</div>
      </Collapse>
    </div>
  );
};
