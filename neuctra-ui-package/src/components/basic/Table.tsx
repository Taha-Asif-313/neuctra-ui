import React, { ReactNode, CSSProperties } from "react";

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
    style={{
      overflowX: "auto",
      background: "#ffffff",
      borderRadius: 12,
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
      border: "1px solid #e5e7eb",
      ...style,
    }}
    className={className}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
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
    className={className}
    style={{
      backgroundColor: "#f3f4f6",
      color: "#111827",
      fontWeight: 600,
      ...style,
    }}
  >
    {children}
  </thead>
);

/* ---------------------------- Table Body ---------------------------- */
export const TBody: React.FC<TableSectionProps> = ({
  children,
  style,
  className,
}) => (
  <tbody
    className={className}
    style={{
      backgroundColor: "#ffffff",
      ...style,
    }}
  >
    {children}
  </tbody>
);

/* ---------------------------- Table Row ---------------------------- */
export const TRow: React.FC<TableSectionProps> = ({
  children,
  style,
  className,
}) => (
  <tr
    className={className}
    style={{
      borderBottom: "1px solid #e5e7eb",
      transition: "background 0.2s ease",
      cursor: "default",
      ...style,
    }}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = "#f9fafb")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "transparent")
    }
  >
    {children}
  </tr>
);

/* ---------------------------- Table Head Cell ---------------------------- */
export const TH: React.FC<TableCellProps> = ({ children, style, className }) => (
  <th
    className={className}
    style={{
      textAlign: "left",
      padding: "12px 16px",
      fontSize: "0.875rem",
      color: "#374151",
      borderBottom: "2px solid #e5e7eb",
      ...style,
    }}
  >
    {children}
  </th>
);

/* ---------------------------- Table Data Cell ---------------------------- */
export const TD: React.FC<TableCellProps> = ({ children, style, className }) => (
  <td
    className={className}
    style={{
      padding: "12px 16px",
      fontSize: "0.875rem",
      color: "#4b5563",
      ...style,
    }}
  >
    {children}
  </td>
);
