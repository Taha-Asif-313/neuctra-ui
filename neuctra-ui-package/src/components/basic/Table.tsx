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
        "w-full rounded-lg border border-border bg-background text-foreground",
        responsive && "overflow-x-auto",
        className
      )}
      style={{
        ...style,
      }}
    >
      <table
        className={clsx(
          "w-full border-collapse text-sm min-w-[600px]",
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
      "bg-muted text-foreground",
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
      "bg-background text-foreground",
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
      "transition-colors duration-200 border-b border-border",
      onClick && "cursor-pointer",
      "hover:bg-accent",
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
      "text-left px-4 py-3 font-medium text-foreground border-b border-border",
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
      "px-4 py-3 text-muted-foreground",
      className
    )}
    style={style}
  >
    {children}
  </td>
);