"use client";

import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* =========================
   Table Root
========================= */
interface TableProps {
  children: ReactNode;

  /** Wrapper */
  className?: string;
  style?: CSSProperties;

  /** Table */
  tableClassName?: string;
  tableStyle?: CSSProperties;

  /** Behavior */
  responsive?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
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
interface TableSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;

  striped?: boolean;
  hoverable?: boolean;
  bordered?: boolean;
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
interface TRowProps extends TableSectionProps {
  onClick?: () => void;
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
interface TableCellProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;

  bordered?: boolean;
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
