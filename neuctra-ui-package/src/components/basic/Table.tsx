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

export const Table: React.FC<TableProps> = ({ children, style, className }) => (
  <table
    className={className}
    style={{
      width: "100%",
      borderCollapse: "collapse",
      borderSpacing: 0,
      ...style,
    }}
  >
    {children}
  </table>
);

export const THead: React.FC<TableSectionProps> = ({ children, style, className }) => (
  <thead
    className={className}
    style={{
      backgroundColor: "#f9fafb",
      borderBottom: "2px solid #e5e7eb",
      ...style,
    }}
  >
    {children}
  </thead>
);

export const TBody: React.FC<TableSectionProps> = ({ children, style, className }) => (
  <tbody className={className} style={style}>
    {children}
  </tbody>
);

export const TRow: React.FC<TableSectionProps> = ({ children, style, className }) => (
  <tr
    className={className}
    style={{
      borderBottom: "1px solid #e5e7eb",
      transition: "background 0.2s ease",
      ...style,
    }}
  >
    {children}
  </tr>
);

export const TH: React.FC<TableCellProps> = ({ children, style, className }) => (
  <th
    className={className}
    style={{
      textAlign: "left",
      padding: "12px 16px",
      fontWeight: 600,
      fontSize: "0.875rem",
      color: "#374151",
      ...style,
    }}
  >
    {children}
  </th>
);

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
