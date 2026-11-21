"use client";

import React, { forwardRef, useEffect, useLayoutEffect, useMemo, useRef } from "react";

import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* Tokens                                                                     */
/* -------------------------------------------------------------------------- */

/*
 * Intensity ramps built only from semantic tokens. Level 0 (no activity) uses
 * the muted track fill; levels 1-4 step through the tone with Tailwind opacity
 * modifiers (compiled to color-mix), so the ramp follows the active theme.
 */
const SCALES = {
  primary: ["bg-muted", "bg-primary/25", "bg-primary/50", "bg-primary/75", "bg-primary"],
  success: ["bg-muted", "bg-success/25", "bg-success/50", "bg-success/75", "bg-success"],
  info: ["bg-muted", "bg-info/25", "bg-info/50", "bg-info/75", "bg-info"],
} as const;

/* Legacy opacity ramp, only used when a custom `colorClassName` is supplied. */
const LEVEL_OPACITY = [0.1, 0.3, 0.55, 0.8, 1] as const;

const sizeConfig = {
  sm: { cell: "h-2.5 w-2.5 rounded-xs", gap: "gap-0.5", label: "h-2.5 text-[10px]" },
  md: { cell: "h-3 w-3 rounded-sm", gap: "gap-1", label: "h-3 text-[10px]" },
  lg: { cell: "h-4 w-4 rounded-sm", gap: "gap-1", label: "h-4 text-xs" },
} as const;

type HeatmapSize = keyof typeof sizeConfig;
type HeatmapScale = keyof typeof SCALES;

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * Parses a date without the UTC shift that `new Date("2024-03-05")` applies to
 * date-only ISO strings (which would land on the previous day west of UTC).
 */
function toLocalDate(value: string | Date): Date {
  if (value instanceof Date) {
    return new Date(value.getFullYear(), value.getMonth(), value.getDate());
  }
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) return new Date(+match[1], +match[2] - 1, +match[3]);
  const parsed = new Date(value);
  return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate());
}

function dayKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}

function addDays(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);
}

function defaultLabel(day: { date: Date; count: number }) {
  const formatted = day.date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatted}`;
}

/* -------------------------------------------------------------------------- */
/* HeatmapDay                                                                 */
/* -------------------------------------------------------------------------- */

export interface HeatmapDayProps {
  /** Calendar date for the cell. */
  date: string | Date;
  /** Activity count used in the accessible label. */
  count: number;
  /** Precomputed intensity level from 0 to 4. */
  level?: number;
  /** Semantic token family used for the fill. Ignored when `colorClassName` is set. */
  colorScale?: HeatmapScale;
  /** Custom background class; when set, intensity is applied with opacity instead of the token ramp. */
  colorClassName?: string;
  /** Cell size preset. */
  size?: HeatmapSize;
  /** Accessible label and tooltip text; defaults to "N contributions on <date>". */
  label?: string;
  /** Called when the cell is activated; without it the cell renders as a non-interactive element. */
  onDayClick?: (day: { date: string | Date; count: number }) => void;
  /** Additional classes for the cell. */
  className?: string;
  /** Inline styles for the cell. */
  style?: React.CSSProperties;
}

/** A single day cell of an {@link ActivityHeatmap}. */
export const HeatmapDay = forwardRef<HTMLElement, HeatmapDayProps>(
  function HeatmapDay(
    {
      date,
      count,
      level = 0,
      colorScale = "primary",
      colorClassName,
      size = "md",
      label,
      onDayClick,
      className,
      style,
    },
    ref,
  ) {
    const safeLevel = Math.min(4, Math.max(0, Math.round(level)));
    const text = label ?? defaultLabel({ date: toLocalDate(date), count });
    const fill = colorClassName ?? (SCALES[colorScale] ?? SCALES.primary)[safeLevel];
    const fillStyle: React.CSSProperties | undefined = colorClassName
      ? { opacity: LEVEL_OPACITY[safeLevel] }
      : undefined;

    const shared = cn(
      "block shrink-0",
      sizeConfig[size].cell,
      fill,
      className,
    );

    if (!onDayClick) {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          role="img"
          aria-label={text}
          title={text}
          className={shared}
          style={{ ...fillStyle, ...style }}
        />
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        onClick={() => onDayClick({ date, count })}
        title={text}
        aria-label={text}
        className={cn(
          shared,
          "cursor-pointer transition-transform hover:scale-125 motion-reduce:transition-none motion-reduce:hover:scale-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        )}
        style={{ ...fillStyle, ...style }}
      />
    );
  },
);
HeatmapDay.displayName = "HeatmapDay";

/* -------------------------------------------------------------------------- */
/* ActivityHeatmap                                                            */
/* -------------------------------------------------------------------------- */

export interface ActivityHeatmapProps {
  /** Daily activity records; dates may be ISO strings ("2024-03-05") or Date objects. Missing days count as 0. */
  data: { date: string | Date; count: number }[];
  /** Number of trailing weeks to display, ending at the latest date; defaults to the full data range. */
  weeks?: number;
  /** Last day shown in the grid; defaults to the latest date in `data`. */
  endDate?: string | Date;
  /** Semantic token family used for the intensity ramp. */
  colorScale?: HeatmapScale;
  /** Cell size preset. */
  size?: HeatmapSize;
  /** Shows the "Less / More" legend under the grid. */
  showLegend?: boolean;
  /** Shows Mon / Wed / Fri labels beside the grid. */
  showWeekdayLabels?: boolean;
  /** Shows month labels above the grid. */
  showMonthLabels?: boolean;
  /** Builds the accessible label and tooltip for each day. */
  formatLabel?: (day: { date: Date; count: number }) => string;
  /** Accessible name for the whole heatmap. */
  ariaLabel?: string;
  /** Called when a day cell is clicked; makes every cell a focusable button. */
  onDayClick?: (day: { date: string | Date; count: number }) => void;
  /** Additional classes for the heatmap root. */
  className?: string;
  /** Inline styles for the heatmap root. */
  style?: React.CSSProperties;
  /** Styles the scrollable grid wrapper (labels + columns). */
  gridClassName?: string;
  /** Styles every day cell. */
  cellClassName?: string;
  /** Styles the month and weekday labels. */
  labelClassName?: string;
  /** Styles the legend row. */
  legendClassName?: string;
}

type Cell = { date: Date; count: number; inRange: boolean };

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export const ActivityHeatmap = forwardRef<HTMLDivElement, ActivityHeatmapProps>(
  function ActivityHeatmap(
    {
      data,
      weeks,
      endDate,
      colorScale = "primary",
      size = "md",
      showLegend = true,
      showWeekdayLabels = false,
      showMonthLabels = false,
      formatLabel = defaultLabel,
      ariaLabel = "Activity heatmap",
      onDayClick,
      className,
      style,
      gridClassName,
      cellClassName,
      labelClassName,
      legendClassName,
    },
    ref,
  ) {
    const scale = SCALES[colorScale] ?? SCALES.primary;
    const sizes = sizeConfig[size] ?? sizeConfig.md;
    const gridRef = useRef<HTMLDivElement | null>(null);

    const { columns, max } = useMemo(() => {
      // Sum counts per calendar day so duplicate entries don't overwrite.
      const counts = new Map<string, number>();
      let first: Date | null = null;
      let last: Date | null = null;
      for (const entry of data) {
        const date = toLocalDate(entry.date);
        if (Number.isNaN(date.getTime())) continue;
        const key = dayKey(date);
        counts.set(key, (counts.get(key) ?? 0) + (entry.count || 0));
        if (!first || date < first) first = date;
        if (!last || date > last) last = date;
      }

      const end = endDate ? toLocalDate(endDate) : last;
      if (!end || Number.isNaN(end.getTime())) return { columns: [] as Cell[][], max: 0 };

      let start =
        typeof weeks === "number" && weeks > 0
          ? addDays(end, -(weeks * 7 - 1))
          : (first ?? end);
      if (start > end) start = end;

      // Align the grid to whole weeks (Sunday to Saturday) so every row is
      // one weekday, regardless of gaps in the data.
      const gridStart = addDays(start, -start.getDay());
      const gridEnd = addDays(end, 6 - end.getDay());

      const result: Cell[][] = [];
      let peak = 0;
      for (let cursor = gridStart; cursor <= gridEnd; cursor = addDays(cursor, 7)) {
        const column: Cell[] = [];
        for (let d = 0; d < 7; d += 1) {
          const date = addDays(cursor, d);
          const inRange = date >= start && date <= end;
          const count = inRange ? (counts.get(dayKey(date)) ?? 0) : 0;
          if (inRange) peak = Math.max(peak, count);
          column.push({ date, count, inRange });
        }
        result.push(column);
      }
      return { columns: result, max: peak };
    }, [data, weeks, endDate]);

    const levelFor = (count: number) => {
      if (count <= 0 || max <= 0) return 0;
      return Math.min(4, Math.max(1, Math.ceil((count / max) * 4)));
    };

    // A label needs about three columns of room; drop one that would collide
    // with the next label or spill past the last column.
    const rawLabels = columns.map((column, index) => {
      const firstInRange = column.find((cell) => cell.inRange);
      if (!firstInRange) return null;
      const month = column[0].date.getMonth();
      const prev = index > 0 ? columns[index - 1][0].date.getMonth() : null;
      if (index !== 0 && month === prev) return null;
      return column[0].date.toLocaleDateString(undefined, { month: "short" });
    });
    const monthLabels = rawLabels.map((label, index) => {
      if (!label) return null;
      const nextIndex = rawLabels.findIndex((other, i) => i > index && other);
      const room = (nextIndex === -1 ? columns.length : nextIndex) - index;
      return room >= 3 ? label : null;
    });

    // When the grid is wider than its container, start scrolled to the newest
    // weeks (the right edge), which is what readers look for first.
    useIsoLayoutEffect(() => {
      const node = gridRef.current;
      if (node && node.scrollWidth > node.clientWidth) node.scrollLeft = node.scrollWidth;
    }, [columns.length]);

    return (
      <div
        ref={ref}
        role="group"
        aria-label={ariaLabel}
        className={cn("inline-flex max-w-full flex-col gap-2", className)}
        style={style}
      >
        <div
          ref={gridRef}
          className={cn("flex max-w-full overflow-x-auto pb-1", sizes.gap, gridClassName)}
        >
          {showWeekdayLabels && (
            <div
              aria-hidden="true"
              className={cn("flex shrink-0 flex-col pr-1", sizes.gap)}
            >
              {showMonthLabels && <span className="h-4 shrink-0" />}
              {WEEKDAY_LABELS.map((day, index) => (
                <span
                  key={day}
                  className={cn(
                    "flex items-center leading-none text-muted-foreground",
                    sizes.label,
                    labelClassName,
                  )}
                >
                  {index % 2 === 1 ? day : ""}
                </span>
              ))}
            </div>
          )}

          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className={cn("flex shrink-0 flex-col", sizes.gap)}>
              {showMonthLabels && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-4 overflow-visible whitespace-nowrap text-[10px] leading-4 text-muted-foreground",
                    labelClassName,
                  )}
                >
                  {monthLabels[columnIndex] ?? ""}
                </span>
              )}
              {column.map((cell) =>
                cell.inRange ? (
                  <HeatmapDay
                    key={dayKey(cell.date)}
                    date={cell.date}
                    count={cell.count}
                    level={levelFor(cell.count)}
                    colorScale={colorScale}
                    size={size}
                    label={formatLabel({ date: cell.date, count: cell.count })}
                    onDayClick={onDayClick}
                    className={cellClassName}
                  />
                ) : (
                  <span
                    key={dayKey(cell.date)}
                    aria-hidden="true"
                    className={cn("block shrink-0", sizes.cell)}
                  />
                ),
              )}
            </div>
          ))}
        </div>

        {showLegend && (
          <div
            aria-hidden="true"
            className={cn(
              "flex items-center justify-end gap-1 text-xs text-muted-foreground",
              legendClassName,
            )}
          >
            <span className="mr-1">Less</span>
            {scale.map((fill) => (
              <span key={fill} className={cn("block shrink-0", sizes.cell, fill)} />
            ))}
            <span className="ml-1">More</span>
          </div>
        )}
      </div>
    );
  },
);
ActivityHeatmap.displayName = "ActivityHeatmap";
