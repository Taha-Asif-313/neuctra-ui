"use client";
import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* ---------------------------- Types ---------------------------- */
interface TableProps {
  children: ReactNode;

  /** Root wrapper */
  className?: string;
  style?: CSSProperties;

  /** Table */
  tableClassName?: string;
  tableStyle?: CSSProperties;

  /** Responsive */
  responsive?: boolean;
}

interface TableSectionProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

interface TRowProps extends TableSectionProps {
  onClick?: () => void;

  /** Styling */
  hoverClassName?: string;
  hoverStyle?: CSSProperties;
}

/* ---------------------------- Table ---------------------------- */
export const Table: React.FC<TableProps> = ({
  children,
  className,
  style,
  tableClassName,
  tableStyle,
  responsive = true,
}) => {
  return (
    <div
      className={clsx(
        "w-full rounded-lg border",
        "border-gray-200 dark:border-zinc-800",
        responsive && "overflow-x-auto",
        className
      )}
      style={{
        background: "var(--table-bg, transparent)",
        ...style,
      }}
    >
      <table
        className={clsx(
          "w-full border-collapse text-sm",
          "min-w-[600px]", // responsive fallback
          tableClassName
        )}
        style={{
          borderSpacing: 0,
          ...tableStyle,
        }}
      >
        {children}
      </table>
    </div>
  );
};

/* ---------------------------- Head ---------------------------- */
export const THead: React.FC<TableSectionProps> = ({
  children,
  className,
  style,
}) => (
  <thead
    className={clsx(
      "bg-gray-100 text-gray-900",
      "dark:bg-zinc-900 dark:text-gray-100",
      className
    )}
    style={style}
  >
    {children}
  </thead>
);

/* ---------------------------- Body ---------------------------- */
export const TBody: React.FC<TableSectionProps> = ({
  children,
  className,
  style,
}) => (
  <tbody
    className={clsx(
      "bg-white dark:bg-zinc-950",
      className
    )}
    style={style}
  >
    {children}
  </tbody>
);

/* ---------------------------- Row ---------------------------- */
export const TRow: React.FC<TRowProps> = ({
  children,
  className,
  style,
  onClick,
  hoverClassName,
  hoverStyle,
}) => (
  <tr
    onClick={onClick}
    className={clsx(
      "transition-colors duration-200",
      "border-b border-gray-200 dark:border-zinc-800",
      onClick && "cursor-pointer",
      "hover:bg-gray-50 dark:hover:bg-zinc-900",
      hoverClassName,
      className
    )}
    style={hoverStyle ? { ...style } : style}
  >
    {children}
  </tr>
);

/* ---------------------------- TH ---------------------------- */
export const TH: React.FC<TableCellProps> = ({
  children,
  className,
  style,
}) => (
  <th
    className={clsx(
      "text-left px-4 py-3 font-medium",
      "text-gray-700 dark:text-gray-300",
      "border-b border-gray-200 dark:border-zinc-800",
      className
    )}
    style={style}
  >
    {children}
  </th>
);

/* ---------------------------- TD ---------------------------- */
export const TD: React.FC<TableCellProps> = ({
  children,
  className,
  style,
}) => (
  <td
    className={clsx(
      "px-4 py-3",
      "text-gray-600 dark:text-gray-400",
      className
    )}
    style={style}
  >
    {children}
  </td>
);