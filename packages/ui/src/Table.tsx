import type { HTMLAttributes, ReactNode, TableHTMLAttributes } from "react";

export type TableProps = {
  /** Make rows clickable (pointer cursor + hover highlight + selectable). */
  active?: boolean;
  /** Highlight rows on hover. */
  hover?: boolean;
  /** Compact row height. */
  condensed?: boolean;
  /** Wrap in a horizontally scrollable container. */
  responsive?: boolean;
  children?: ReactNode;
} & TableHTMLAttributes<HTMLTableElement>;

/**
 * VUD table. Compose with native `<thead>`/`<tbody>`/`<tr>`/`<th>`/`<td>`;
 * use `<TableRow>` for rows that need an active/hover state.
 */
export const Table = ({
  active = false,
  hover = false,
  condensed = false,
  responsive = false,
  className,
  children,
  ...props
}: TableProps) => {
  const table = (
    <table
      className={[
        "vud-table",
        active && "vud-table-active",
        hover && "vud-table-hover",
        condensed && "vud-table-condensed",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </table>
  );

  return responsive ? <div className={"vud-table-responsive"}>{table}</div> : table;
};

export type TableRowProps = {
  /** Persistent selected styling. */
  active?: boolean;
  /** Highlight this row on hover. */
  hover?: boolean;
  children?: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;

/** A `<tr>` that can carry an active (selected) or hover state. */
export const TableRow = ({
  active = false,
  hover = false,
  className,
  children,
  ...props
}: TableRowProps) => (
  <tr
    className={[active && "vud-table-row-active", hover && "vud-table-row-hover", className]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    {children}
  </tr>
);
