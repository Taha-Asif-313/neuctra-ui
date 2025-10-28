import React, { useState, ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  icon?: ReactNode;
  width?: string | number; // Custom column width
  align?: "left" | "center" | "right"; // Column-specific alignment
  headerClassName?: string; // Custom class for header cell
  cellClassName?: string; // Custom class for body cells
  render?: (value: any, row: Record<string, any>) => ReactNode; // Custom cell renderer
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  className?: string;
  pagination?: boolean;
  rowsPerPage?: number;
  colors?: {
    headerBg?: string;
    headerText?: string;
    rowBg?: string;
    rowText?: string;
    borderColor?: string;
    hoverBg?: string;
    paginationBg?: string;
    paginationText?: string;
    evenRowBg?: string; // Alternate row color
    selectedRowBg?: string; // Selected row color
  };
  borderRadius?: {
    table?: string;
    header?: string;
    pagination?: string;
  };
  sortable?: boolean;
  defaultSort?: {
    column: string;
    direction: "asc" | "desc";
  };
  bodyAlign?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  rowSelection?: {
    enabled?: boolean;
    onSelect?: (selectedRows: Record<string, any>[]) => void;
    selectionColumnWidth?: string;
    selectionColumnHeader?: ReactNode;
  };
  emptyState?: ReactNode;
  onRowClick?: (row: Record<string, any>, index: number) => void;
  rowClassName?: (row: Record<string, any>, index: number) => string;
  cellPadding?: string;
  headerCellPadding?: string;
  stickyHeader?: boolean;
  maxHeight?: string;
  scrollShadow?: boolean;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  className = "",
  pagination = true,
  rowsPerPage = 5,
  colors = {
    headerBg: "#3b82f6",
    headerText: "#ffffff",
    rowBg: "#ffffff",
    rowText: "#000000",
    borderColor: "#d1d5db",
    hoverBg: "#e5e7eb",
    paginationBg: "#d1d5db",
    paginationText: "#000000",
    evenRowBg: "#f9fafb",
    selectedRowBg: "#e0f2fe",
  },
  borderRadius = {
    table: "8px",
    header: "8px",
    pagination: "6px",
  },
  sortable = true,
  defaultSort,
  bodyAlign = "left",
  headerAlign = "left",
  rowSelection = { enabled: false },
  emptyState = <div style={{ padding: "20px", textAlign: "center" }}>No data available</div>,
  onRowClick,
  rowClassName,
  cellPadding = "12px",
  headerCellPadding = "12px",
  stickyHeader = false,
  maxHeight,
  scrollShadow = false,
}) => {
  const [sortColumn, setSortColumn] = useState<string | null>(defaultSort?.column || null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(defaultSort?.direction || "asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [hoverRowIndex, setHoverRowIndex] = useState<number | null>(null);
  const [selectedRows, setSelectedRows] = useState<Record<string, any>[]>([]);

  const handleSort = (key: string, colSortable?: boolean) => {
    if (!sortable || !colSortable) return;
    if (sortColumn === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(key);
      setSortOrder("asc");
    }
    setCurrentPage(1);
  };

  const handleRowSelect = (row: Record<string, any>) => {
    const isSelected = selectedRows.some(
      (selectedRow) => selectedRow.id === row.id
    );
    let newSelectedRows: Record<string, any>[];
    
    if (isSelected) {
      newSelectedRows = selectedRows.filter(
        (selectedRow) => selectedRow.id !== row.id
      );
    } else {
      newSelectedRows = [...selectedRows, row];
    }
    
    setSelectedRows(newSelectedRows);
    rowSelection.onSelect?.(newSelectedRows);
  };

  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
      rowSelection.onSelect?.([]);
    } else {
      setSelectedRows([...paginatedData]);
      rowSelection.onSelect?.([...paginatedData]);
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn) return [...data];

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortOrder === "asc" ? -1 : 1;
      if (bValue == null) return sortOrder === "asc" ? 1 : -1;

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortOrder === "asc"
          ? aValue.getTime() - bValue.getTime()
          : bValue.getTime() - aValue.getTime();
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (aStr === bStr) return 0;
      return sortOrder === "asc"
        ? aStr > bStr
          ? 1
          : -1
        : aStr < bStr
        ? 1
        : -1;
    });
  }, [data, sortColumn, sortOrder]);

  const paginatedData = pagination
    ? sortedData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      )
    : sortedData;

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const isRowSelected = (row: Record<string, any>) => {
    return selectedRows.some((selectedRow) => selectedRow.id === row.id);
  };

  // Sorting icons
  const arrowUpIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height="15px"
      width="15px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0zm0 128c-17.7 0-32 14.3-32 32s14.3 32 32 32l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-224 0z"></path>
    </svg>
  );

  const arrowDownIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 576 512"
      height="15px"
      width="15px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M151.6 42.4C145.5 35.8 137 32 128 32s-17.5 3.8-23.6 10.4l-88 96c-11.9 13-11.1 33.3 2 45.2s33.3 11.1 45.2-2L96 146.3 96 448c0 17.7 14.3 32 32 32s32-14.3 32-32l0-301.7 32.4 35.4c11.9 13 32.2 13.9 45.2 2s13.9-32.2 2-45.2l-88-96zM320 480l32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0c-17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-160 0c17.7 0-32 14.3-32 32s14.3 32 32 32zm0-128l224 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32z"></path>
    </svg>
  );

  const defaultSortIcon = (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 320 512"
      height="15px"
      width="15px"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M182.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L128 109.3l0 293.5L86.6 361.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0l96-96c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 402.7l0-293.5 41.4 41.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-96-96z"></path>
    </svg>
  );

  const checkboxIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <path d="M9 12l2 2 4-4"></path>
    </svg>
  );

  const indeterminateCheckboxIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg>
  );

  const allSelected = selectedRows.length === paginatedData.length && paginatedData.length > 0;
  const someSelected = selectedRows.length > 0 && !allSelected;

  return (
    <div 
      style={{ 
        overflowX: "auto", 
        width: "100%",
        maxHeight: maxHeight,
        position: "relative",
        boxShadow: scrollShadow ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
      }} 
      className={className}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          border: `1px solid ${colors.borderColor}`,
          tableLayout: "auto",
          minWidth: "400px",
          borderRadius: borderRadius.table,
          borderSpacing: 0,
          overflow: "hidden"
        }}
      >
        <thead>
          <tr>
            {rowSelection.enabled && (
              <th
                style={{
                  width: rowSelection.selectionColumnWidth || "40px",
                  padding: headerCellPadding,
                  backgroundColor: colors.headerBg,
                  color: colors.headerText,
                  border: `1px solid ${colors.borderColor}`,
                  position: stickyHeader ? "sticky" : undefined,
                  top: stickyHeader ? 0 : undefined,
                  zIndex: stickyHeader ? 1 : undefined,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer"
                  }}
                  onClick={handleSelectAll}
                >
                  {someSelected ? indeterminateCheckboxIcon : allSelected ? checkboxIcon : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                    </svg>
                  )}
                </div>
              </th>
            )}
            {columns.map(({ key, label, sortable: colSortable, icon, width, align, headerClassName }, i) => (
              <th
                key={key}
                onClick={() => handleSort(key, colSortable)}
                style={{
                  width,
                  padding: headerCellPadding,
                  border: `1px solid ${colors.borderColor}`,
                  cursor: sortable && colSortable ? "pointer" : "default",
                  backgroundColor: colors.headerBg,
                  color: colors.headerText,
                  userSelect: "none",
                  borderTopLeftRadius: i === 0 && !rowSelection.enabled ? borderRadius.header : undefined,
                  borderTopRightRadius: i === columns.length - 1 ? borderRadius.header : undefined,
                  textAlign: align || headerAlign,
                  whiteSpace: "nowrap",
                  position: stickyHeader ? "sticky" : undefined,
                  top: stickyHeader ? 0 : undefined,
                  zIndex: stickyHeader ? 1 : undefined,
                }}
                className={headerClassName}
                aria-sort={
                  sortColumn === key
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                role={sortable && colSortable ? "button" : undefined}
                tabIndex={sortable && colSortable ? 0 : undefined}
                onKeyDown={(e) => {
                  if (sortable && colSortable && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    handleSort(key, colSortable);
                  }
                }}
              >
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    justifyContent: align === "right" ? "flex-end" : align === "center" ? "center" : "flex-start",
                  }}
                >
                  {icon && <span>{icon}</span>}
                  <span>{label}</span>
                  {sortable && colSortable &&
                    (sortColumn === key
                      ? sortOrder === "asc"
                        ? arrowUpIcon
                        : arrowDownIcon
                      : defaultSortIcon)}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => {
              const isSelected = isRowSelected(row);
              const isEven = rowIndex % 2 === 0;
              
              return (
                <tr
                  key={rowIndex}
                  style={{
                    backgroundColor: isSelected
                      ? colors.selectedRowBg
                      : isEven
                      ? colors.evenRowBg || colors.rowBg
                      : colors.rowBg,
                    color: colors.rowText,
                    transition: "background-color 0.2s ease-in-out",
                    cursor: onRowClick ? "pointer" : "default",
                  }}
                  onMouseEnter={() => setHoverRowIndex(rowIndex)}
                  onMouseLeave={() => setHoverRowIndex(null)}
                  onClick={() => onRowClick?.(row, rowIndex)}
                  className={rowClassName?.(row, rowIndex)}
                >
                  {rowSelection.enabled && (
                    <td
                      style={{
                        padding: cellPadding,
                        border: `1px solid ${colors.borderColor}`,
                        textAlign: "center",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowSelect(row);
                      }}
                    >
                      {isSelected ? checkboxIcon : (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        </svg>
                      )}
                    </td>
                  )}
                  {columns.map(({ key, align, render, cellClassName }) => (
                    <td
                      key={key}
                      style={{
                        padding: cellPadding,
                        border: `1px solid ${colors.borderColor}`,
                        whiteSpace: "nowrap",
                        textAlign: align || bodyAlign,
                      }}
                      className={cellClassName}
                    >
                      {render ? render(row[key], row) : row[key]}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td 
                colSpan={columns.length + (rowSelection.enabled ? 1 : 0)}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  border: `1px solid ${colors.borderColor}`,
                }}
              >
                {emptyState}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "12px",
            padding: "8px",
            userSelect: "none",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              backgroundColor: colors.paginationBg,
              color: colors.paginationText,
              borderRadius: borderRadius.pagination,
              border: "none",
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
            }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            aria-label="Previous page"
            type="button"
          >
            <ChevronLeft size={16} />
            Prev
          </button>
          
          <div style={{ display: "flex", gap: "4px" }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: currentPage === pageNum ? colors.headerBg : colors.paginationBg,
                    color: currentPage === pageNum ? colors.headerText : colors.paginationText,
                    borderRadius: borderRadius.pagination,
                    border: "none",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    minWidth: "36px",
                  }}
                  onClick={() => setCurrentPage(pageNum)}
                  aria-label={`Page ${pageNum}`}
                  type="button"
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "6px 12px",
              backgroundColor: colors.paginationBg,
              color: colors.paginationText,
              borderRadius: borderRadius.pagination,
              border: "none",
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
            }}
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            aria-label="Next page"
            type="button"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};