"use client";

import React, { forwardRef, useMemo } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Pagination } from "./Pagination";
import { Checkbox } from "./Checkbox";

/** Column definition for {@link DataTable}. */
export interface DataTableColumn {
  /** Key read from each row and used to identify the column. */
  key: string;
  /** Header content rendered in the table head. */
  header: React.ReactNode;
  /** Custom cell renderer. Defaults to the row value at `key`. */
  cell?: (row: Record<string, unknown>, rowIndex: number) => React.ReactNode;
  /** Allows sorting this column. Requires the table's `sortable` prop unless set to `true`. */
  sortable?: boolean;
  /** Column width; numbers are treated as pixels. */
  width?: string | number;
  /** Minimum column width; numbers are treated as pixels. Keeps the column readable when the table scrolls horizontally on narrow screens. */
  minWidth?: string | number;
  /** Lets cell text wrap onto multiple lines. By default cells stay on one line and the table scrolls horizontally inside its container instead of squeezing text. */
  wrap?: boolean;
  /** Horizontal alignment of the header and cells. Use `"right"` for numbers and currency. */
  align?: "left" | "center" | "right";
  /** Extra classes applied to this column's header and body cells. */
  className?: string;
}

/** Active sort direction and column key. */
export interface DataTableSort {
  /** Key of the sorted column. */
  key: string;
  /** Current sort direction. */
  direction: "asc" | "desc";
}

export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Column definitions, rendered in order. */
  columns: DataTableColumn[];
  /** Rows to display. */
  data: T[];
  /** Returns a stable id for a row; defaults to its `id` field or its index. */
  getRowId?: (row: T, index: number) => string;
  /** Enables header sorting for columns whose `sortable` is not `false`. */
  sortable?: boolean;
  /** Controlled sort state. Pass `null` for unsorted. */
  sort?: DataTableSort | null;
  /** Initial sort state in uncontrolled mode. */
  defaultSort?: DataTableSort | null;
  /** Fired with the next sort state when a sortable header is clicked. */
  onSort?: (sort: DataTableSort) => void;
  /** Skips client-side sorting, for when `data` is already sorted by the server. */
  manualSort?: boolean;
  /** Shows a leading selection checkbox column. */
  selectable?: boolean;
  /** Controlled selected row ids. Omit for internal selection state. */
  selectedIds?: string[];
  /** Initial selected row ids in uncontrolled mode. */
  defaultSelectedIds?: string[];
  /** Fired with the full selection whenever it changes. */
  onSelectedIdsChange?: (ids: string[]) => void;
  /** Page controls shown below the table when provided. */
  pagination?: {
    /** Current page, 1-based. */
    page: number;
    /** Total number of pages. */
    totalPages: number;
    /** Fired with the requested page. */
    onPageChange: (page: number) => void;
  };
  /** Replaces the body with placeholder rows while true. */
  loading?: boolean;
  /** Number of placeholder rows shown while loading. */
  loadingRows?: number;
  /** Content shown when `data` is empty. */
  emptyState?: React.ReactNode;
  /** Fired when a body row is activated by click, Enter, or Space. */
  onRowClick?: (row: T, index: number) => void;
  /** Cell padding and text size. */
  size?: "sm" | "md" | "lg";
  /** Tints every other body row. */
  striped?: boolean;
  /** Keeps the header visible while the body scrolls. Combine with `maxHeight`. */
  stickyHeader?: boolean;
  /** Maximum height of the scroll area; numbers are treated as pixels. */
  maxHeight?: string | number;
  /** Accessible table caption. Rendered visually hidden. */
  caption?: string;
  /** Accessible label for a row's selection checkbox. Defaults to "Select row N". */
  getRowLabel?: (row: T, index: number) => string;
  /** Additional classes for the `<table>` element. */
  tableClassName?: string;
  /** Additional classes for the `<thead>` element. */
  headerClassName?: string;
  /** Additional classes for every header cell. */
  headerCellClassName?: string;
  /** Additional classes for every body row, or a function returning them per row. */
  rowClassName?: string | ((row: T, index: number) => string | undefined);
  /** Additional classes for every body cell. */
  cellClassName?: string;
  /** Additional classes for the empty-state cell. */
  emptyClassName?: string;
  /** Additional classes for the pagination footer. */
  footerClassName?: string;
}

const sizeConfig = {
  sm: { cell: "px-3 py-2", text: "text-xs", check: "w-9" },
  md: { cell: "px-4 py-3", text: "text-sm", check: "w-10" },
  lg: { cell: "px-5 py-4", text: "text-sm", check: "w-12" },
} as const;

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

const SKELETON_WIDTHS = ["w-24", "w-32", "w-20", "w-28", "w-16"];

const toRow = (value: unknown): Record<string, unknown> =>
  value && typeof value === "object"
    ? (value as Record<string, unknown>)
    : { value };

const compareValues = (a: unknown, b: unknown) => {
  // Empty values always sink to the end of an ascending sort.
  const aEmpty = a === null || a === undefined || a === "";
  const bEmpty = b === null || b === undefined || b === "";
  if (aEmpty || bEmpty) return aEmpty === bEmpty ? 0 : aEmpty ? 1 : -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === "boolean" && typeof b === "boolean") return Number(a) - Number(b);
  return String(a).localeCompare(String(b), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

const CHECKBOX_SIZE = { sm: 14, md: 16, lg: 16 } as const;

/** Stops a click/keypress on the selection cell from also activating the row. */
const stop = (event: React.SyntheticEvent) => event.stopPropagation();

const toCss = (value: string | number | undefined) =>
  value === undefined ? undefined : typeof value === "number" ? `${value}px` : value;

function DataTableInner<T>(
  {
    columns,
    data,
    getRowId,
    sortable = false,
    sort: sortProp,
    defaultSort = null,
    onSort,
    manualSort = false,
    selectable = false,
    selectedIds,
    defaultSelectedIds = [],
    onSelectedIdsChange,
    pagination,
    loading = false,
    loadingRows = 5,
    emptyState = "No data available",
    onRowClick,
    size = "md",
    striped = false,
    stickyHeader = false,
    maxHeight,
    caption,
    getRowLabel,
    className,
    style,
    tableClassName,
    headerClassName,
    headerCellClassName,
    rowClassName,
    cellClassName,
    emptyClassName,
    footerClassName,
    ...rest
  }: DataTableProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const s = sizeConfig[size] ?? sizeConfig.md;

  // `null` is a valid controlled value (unsorted): useControllableState only
  // treats `undefined` as uncontrolled, so `sort={null}` stays controlled.
  const [sort, setSort] = useControllableState<DataTableSort | null>({
    value: sortProp,
    defaultValue: defaultSort,
  });

  const [selection, setSelection] = useControllableState<string[]>({
    value: selectedIds,
    defaultValue: defaultSelectedIds,
    onChange: onSelectedIdsChange,
  });

  const rowId = (row: T, index: number) =>
    getRowId?.(row, index) ?? String(toRow(row).id ?? index);

  const sortedData = useMemo(() => {
    if (!sort || manualSort) return data;
    const factor = sort.direction === "asc" ? 1 : -1;
    // Stable sort over a copy; ties keep their original order.
    return data
      .map((row, i) => ({ row, i }))
      .sort((a, b) => {
        const result = compareValues(toRow(a.row)[sort.key], toRow(b.row)[sort.key]);
        return result !== 0 ? result * factor : a.i - b.i;
      })
      .map(({ row }) => row);
  }, [data, sort, manualSort]);

  const toggleSort = (column: DataTableColumn) => {
    const direction: DataTableSort["direction"] =
      sort?.key === column.key && sort.direction === "asc" ? "desc" : "asc";
    const next = { key: column.key, direction };
    setSort(next);
    onSort?.(next);
  };

  const selectedSet = useMemo(() => new Set(selection), [selection]);
  const allIds = sortedData.map((row, index) => rowId(row, index));
  const selectedOnPage = allIds.filter((id) => selectedSet.has(id)).length;
  const allSelected = allIds.length > 0 && selectedOnPage === allIds.length;
  const someSelected = selectedOnPage > 0 && !allSelected;

  // Only add/remove the visible rows, so ids selected on other pages survive.
  const toggleAll = () => {
    const visible = new Set(allIds);
    setSelection(
      allSelected
        ? selection.filter((id) => !visible.has(id))
        : [...selection, ...allIds.filter((id) => !selectedSet.has(id))],
    );
  };

  const toggleRow = (id: string) =>
    setSelection(
      selectedSet.has(id)
        ? selection.filter((value) => value !== id)
        : [...selection, id],
    );

  const colSpan = columns.length + (selectable ? 1 : 0);

  return (
    <div
      ref={ref}
      className={cn(
        "w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
        className,
      )}
      style={style}
      {...rest}
    >
      <div
        className="w-full overflow-auto"
        style={maxHeight === undefined ? undefined : { maxHeight }}
      >
        <table
          aria-busy={loading || undefined}
          className={cn("w-full border-collapse", s.text, tableClassName)}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead
            className={cn(
              "border-b border-border bg-accent/40 text-left",
              stickyHeader && "sticky top-0 z-10 bg-card [&_th]:bg-accent/40",
              headerClassName,
            )}
          >
            <tr>
              {selectable && (
                <th scope="col" className={cn(s.cell, s.check, headerCellClassName)}>
                  <Checkbox
                    aria-label="Select all rows"
                    checked={allSelected}
                    indeterminate={someSelected}
                    onCheckedChange={toggleAll}
                    disabled={loading || allIds.length === 0}
                    iconSize={CHECKBOX_SIZE[size] ?? 16}
                    className="flex"
                  />
                </th>
              )}
              {columns.map((column) => {
                const canSort =
                  column.sortable === true ||
                  (sortable && column.sortable !== false);
                const active = sort?.key === column.key;
                const align = column.align ?? "left";
                return (
                  <th
                    key={column.key}
                    scope="col"
                    aria-sort={
                      canSort
                        ? active
                          ? sort?.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                    style={
                      column.width === undefined && column.minWidth === undefined
                        ? undefined
                        : { width: toCss(column.width), minWidth: toCss(column.minWidth) }
                    }
                    className={cn(
                      "whitespace-nowrap text-xs font-medium text-muted-foreground",
                      s.cell,
                      alignClass[align],
                      headerCellClassName,
                      column.className,
                    )}
                  >
                    {canSort ? (
                      <button
                        type="button"
                        onClick={() => toggleSort(column)}
                        className={cn(
                          "-mx-1.5 inline-flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-accent hover:text-accent-foreground",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          align === "right" && "flex-row-reverse",
                          active && "text-foreground",
                        )}
                      >
                        {column.header}
                        {active ? (
                          sort?.direction === "asc" ? (
                            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" />
                          ) : (
                            <ArrowDown aria-hidden="true" className="h-3.5 w-3.5" />
                          )
                        ) : (
                          <ArrowUpDown aria-hidden="true" className="h-3.5 w-3.5 opacity-50" />
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? (
              Array.from({ length: Math.max(1, loadingRows) }, (_, rowIndex) => (
                <tr key={rowIndex} aria-hidden="true">
                  {Array.from({ length: colSpan }, (_, cellIndex) => (
                    <td key={cellIndex} className={s.cell}>
                      <span
                        className={cn(
                          "block h-4 animate-pulse rounded bg-muted motion-reduce:animate-none",
                          selectable && cellIndex === 0
                            ? "w-4"
                            : SKELETON_WIDTHS[(rowIndex + cellIndex) % SKELETON_WIDTHS.length],
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))
            ) : sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className={cn(
                    "px-4 py-12 text-center text-sm text-muted-foreground",
                    emptyClassName,
                  )}
                >
                  {emptyState}
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => {
                const id = allIds[index];
                const record = toRow(row);
                const isSelected = selectedSet.has(id);
                return (
                  <tr
                    key={id}
                    aria-selected={selectable ? isSelected : undefined}
                    onClick={onRowClick ? () => onRowClick(row, index) : undefined}
                    onKeyDown={
                      onRowClick
                        ? (event) => {
                            if (event.target !== event.currentTarget) return;
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              onRowClick(row, index);
                            }
                          }
                        : undefined
                    }
                    tabIndex={onRowClick ? 0 : undefined}
                    className={cn(
                      "transition-colors hover:bg-accent/60",
                      striped && index % 2 === 1 && "bg-accent/20",
                      onRowClick &&
                        "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                      isSelected && "bg-primary/10 hover:bg-primary/10",
                      typeof rowClassName === "function"
                        ? rowClassName(row, index)
                        : rowClassName,
                    )}
                  >
                    {selectable && (
                      <td
                        className={cn(s.cell, s.check, cellClassName)}
                        onClick={stop}
                        onKeyDown={stop}
                      >
                        <Checkbox
                          aria-label={getRowLabel?.(row, index) ?? `Select row ${index + 1}`}
                          checked={isSelected}
                          onCheckedChange={() => toggleRow(id)}
                          iconSize={CHECKBOX_SIZE[size] ?? 16}
                          className="flex"
                        />
                      </td>
                    )}
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={cn(
                          "text-foreground",
                          !column.wrap && "whitespace-nowrap",
                          s.cell,
                          alignClass[column.align ?? "left"],
                          column.align === "right" && "tabular-nums",
                          cellClassName,
                          column.className,
                        )}
                      >
                        {column.cell
                          ? column.cell(record, index)
                          : String(record[column.key] ?? "")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3",
            footerClassName,
          )}
        >
          <span className="text-xs tabular-nums text-muted-foreground">
            Page {pagination.page} of {Math.max(1, pagination.totalPages)}
          </span>
          <Pagination
            size="sm"
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={pagination.onPageChange}
          />
        </div>
      )}
    </div>
  );
}

/** A dependency-free, semantic data table with sorting, selection, loading and pagination. */
export const DataTable = forwardRef(DataTableInner) as unknown as (<T>(
  props: DataTableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null) & { displayName?: string };

DataTable.displayName = "DataTable";
