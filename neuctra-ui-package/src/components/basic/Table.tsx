"use client";

import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* =========================
   Table Root
========================= */
export interface TableProps {
  /** THead/TBody sections (and any other content) rendered inside the table. Each direct child is cloned with striped/hoverable/bordered/dense. */
  children: ReactNode;

  // Wrapper
  /** Classes for the outer wrapper div. */
  className?: string;
  /** Inline styles for the outer wrapper div. */
  style?: CSSProperties;

  // Table
  /** Classes for the inner <table> element. */
  tableClassName?: string;
  /** Inline styles for the inner <table> element. */
  tableStyle?: CSSProperties;

  // Behavior
  /** Wraps the table in a horizontally scrollable container for narrow screens. */
  responsive?: boolean;
  /** Alternates row background colors in the body; forwarded down to TBody/TRow. */
  striped?: boolean;
  /** Applies hover background styling to rows; forwarded down to TBody/TRow. */
  hoverable?: boolean;
  /** Adds border separators; forwarded down to THead/TBody/TRow, but not automatically to TH/TD cells. */
  bordered?: boolean;
  /** Uses smaller text in the table; does not by itself change TH/TD cell padding — set dense on individual cells for that. */
  dense?: boolean;
}

export function Table({
  children,
  className,
  style,
  tableClassName,
  tableStyle,
  responsive = true,
  striped = false,
  hoverable = true,
  bordered = false,
  dense = false,
}: TableProps) {
  return (
    <div
      className={clsx(
        "w-full rounded-2xl border bg-background text-foreground shadow-sm",
        "border-border",
        responsive && "overflow-x-auto",
        className,
      )}
      style={style}
    >
      <table
        className={clsx(
          "w-full border-collapse text-sm",
          dense ? "text-xs" : "text-sm",
          tableClassName,
        )}
        style={{
          borderSpacing: 0,
          ...tableStyle,
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as any, {
                striped,
                hoverable,
                bordered,
                dense,
              })
            : child,
        )}
      </table>
    </div>
  );
}

/* =========================
   Head
========================= */
export interface TableSectionProps {
  /** Rows (or other content) rendered inside this section. */
  children: ReactNode;
  /** Classes for the section element (thead/tbody). */
  className?: string;
  /** Inline styles for the section element (thead/tbody). */
  style?: CSSProperties;

  /** Forwarded striped state, used by TBody to pass alternating backgrounds down to its TRow children. */
  striped?: boolean;
  /** Forwarded hoverable state, used by TBody to pass hover styling down to its TRow children. */
  hoverable?: boolean;
  /** Forwarded bordered state, used by THead/TBody to pass border styling down to their TRow children. */
  bordered?: boolean;
  /** Accepted for API symmetry with Table/TH/TD; not read by THead or TBody themselves. */
  dense?: boolean;
}

export function THead({
  children,
  className,
  style,
  bordered,
}: TableSectionProps) {
  return (
    <thead
      className={clsx(
        "bg-accent text-foreground",
        className,
      )}
      style={style}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, { bordered })
          : child,
      )}
    </thead>
  );
}

/* =========================
   Body
========================= */
export function TBody({
  children,
  className,
  style,
  striped,
  hoverable,
  bordered,
}: TableSectionProps) {
  return (
    <tbody className={clsx("bg-background", className)} style={style}>
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as any, {
              striped,
              hoverable,
              bordered,
              index,
            })
          : child,
      )}
    </tbody>
  );
}

/* =========================
   Row
========================= */
export interface TRowProps extends TableSectionProps {
  /** Click handler for the row; also adds cursor-pointer styling when set. */
  onClick?: () => void;
  /** Row index, used to determine which rows get the striped background (even indexes). Set automatically by TBody. */
  index?: number;
}

export function TRow({
  children,
  className,
  style,
  onClick,
  striped,
  hoverable,
  bordered,
  index = 0,
}: TRowProps) {
  return (
    <tr
      onClick={onClick}
      className={clsx(
        className,
        bordered && "border-b border-border",
        striped && index % 2 === 0 && "bg-accent/30",
        hoverable && "hover:bg-accent/60",
        onClick && "cursor-pointer",
        "transition-all duration-200",
      )}
      style={style}
    >
      {children}
    </tr>
  );
}

/* =========================
   Header Cell
========================= */
export interface TableCellProps {
  /** Cell content. */
  children: ReactNode;
  /** Classes for the cell element. */
  className?: string;
  /** Inline styles for the cell element. */
  style?: CSSProperties;

  /** Adds a bottom border to the cell. Read by TH; not read by TD. */
  bordered?: boolean;
  /** Uses smaller cell padding for a compact layout. Must be set per cell — it is not cascaded automatically from Table's own dense prop. */
  dense?: boolean;
}

export function TH({
  children,
  className,
  style,
  bordered,
  dense,
}: TableCellProps) {
  return (
    <th
      className={clsx(
        className,
        "text-left font-medium text-foreground",
        dense ? "px-3 py-2" : "px-5 py-3",
        bordered && "border-b border-border",
      )}
      style={style}
    >
      {children}
    </th>
  );
}

/* =========================
   Data Cell
========================= */
export function TD({ children, className, style, dense }: TableCellProps) {
  return (
    <td
      className={clsx(
        className,
        "text-accent-foreground",
        dense ? "px-3 py-2" : "px-5 py-3",
      )}
      style={style}
    >
      {children}
    </td>
  );
}
