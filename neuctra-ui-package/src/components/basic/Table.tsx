"use client";
import React, { ReactNode, CSSProperties } from "react";
import clsx from "clsx";

/* ---------------------------- Types ---------------------------- */
interface TableProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

interface TableSectionProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/* ---------------------------- Table Container ---------------------------- */
export const Table: React.FC<TableProps> = ({ children, style, className }) => (
  <div
    className={clsx("overflow-x-auto rounded-lg shadow-sm border border-gray-200", className)}
    style={{
      background: "#ffffff",
      ...style,
    }}
  >
    <table
      className="w-full border-collapse"
      style={{
        borderSpacing: 0,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {children}
    </table>
  </div>
);

/* ---------------------------- Table Head ---------------------------- */
export const THead: React.FC<TableSectionProps> = ({
  children,
  style,
  className,
}) => (
  <thead
    className={clsx("bg-gray-100 text-gray-900 font-semibold", className)}
    style={{
      ...style,
    }}
  >
    {children}
  </thead>
);

/* ---------------------------- Table Body ---------------------------- */
export const TBody: React.FC<TableSectionProps> = ({ children, style, className }) => (
  <tbody className={clsx("bg-white", className)} style={{ ...style }}>
    {children}
  </tbody>
);

/* ---------------------------- Table Row ---------------------------- */
interface TRowProps extends TableSectionProps {
  onClick?: () => void;
  hoverBgColor?: string;
  darkMode?: boolean;
}

export const TRow: React.FC<TRowProps> = ({
  children,
  style,
  className,
  onClick,
  hoverBgColor = "#f9fafb",
  darkMode = false,
}) => (
  <tr
    className={clsx(
      "transition-colors duration-200 cursor-default",
      onClick ? "hover:cursor-pointer" : "",
      className
    )}
    style={{ borderBottom: "1px solid #e5e7eb", ...style }}
    onClick={onClick}
    onMouseEnter={(e) => {
      if (!darkMode) e.currentTarget.style.backgroundColor = hoverBgColor;
      else e.currentTarget.style.backgroundColor = "#1f2937";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
    }}
  >
    {children}
  </tr>
);

/* ---------------------------- Table Head Cell ---------------------------- */
export const TH: React.FC<TableCellProps> = ({ children, style, className }) => (
  <th
    className={clsx("text-left px-4 py-3 text-sm text-gray-700 border-b-2 border-gray-200", className)}
    style={{ ...style }}
  >
    {children}
  </th>
);

/* ---------------------------- Table Data Cell ---------------------------- */
export const TD: React.FC<TableCellProps> = ({ children, style, className }) => (
  <td
    className={clsx("px-4 py-3 text-sm text-gray-600", className)}
    style={{ ...style }}
  >
    {children}
  </td>
);