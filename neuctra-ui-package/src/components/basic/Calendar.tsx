"use client";

import React, { forwardRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/cn";

export interface CalendarProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  /** Selected day. */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date) => void;
  /** Month shown first (defaults to the selected day or today). */
  defaultMonth?: Date;
  minDate?: Date;
  maxDate?: Date;
  /** Return true to disable a specific day. */
  isDateDisabled?: (date: Date) => boolean;
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  locale?: string;

  /** 🔥 Full Customization */
  headerClassName?: string;
  navButtonClassName?: string;
  monthLabelClassName?: string;
  weekdaysClassName?: string;
  weekdayClassName?: string;
  daysClassName?: string;
  dayClassName?: string;
}

const isSameDay = (a: Date | null | undefined, b: Date | null | undefined) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const stripTime = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  function Calendar(
    {
      value,
      defaultValue = null,
      onChange,
      defaultMonth,
      minDate,
      maxDate,
      isDateDisabled,
      weekStartsOn = 1,
      locale,
      className,
      headerClassName,
      navButtonClassName,
      monthLabelClassName,
      weekdaysClassName,
      weekdayClassName,
      daysClassName,
      dayClassName,
      ...rest
    },
    ref,
  ) {
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
    const selected = value !== undefined ? value : internalValue;

    const [viewMonth, setViewMonth] = useState<Date>(() => {
      const base = selected ?? defaultMonth ?? new Date();
      return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    const today = stripTime(new Date());
    const min = minDate ? stripTime(minDate) : null;
    const max = maxDate ? stripTime(maxDate) : null;

    const isDisabled = (date: Date) => {
      if (min && date < min) return true;
      if (max && date > max) return true;
      return isDateDisabled?.(date) ?? false;
    };

    const select = (date: Date) => {
      if (value === undefined) setInternalValue(date);
      onChange?.(date);
      // Selecting an adjacent-month day snaps the view to that month.
      if (date.getMonth() !== viewMonth.getMonth()) {
        setViewMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      }
    };

    const shiftMonth = (delta: number) =>
      setViewMonth(
        (m) => new Date(m.getFullYear(), m.getMonth() + delta, 1),
      );

    /* 42 cells: always six rows, so the panel height never jumps. */
    const firstOffset =
      (viewMonth.getDay() - weekStartsOn + 7) % 7;
    const cells = Array.from({ length: 42 }, (_, i) => {
      const d = new Date(
        viewMonth.getFullYear(),
        viewMonth.getMonth(),
        1 - firstOffset + i,
      );
      return stripTime(d);
    });

    // Localized weekday header, anchored on a known Sunday (2023-01-01).
    const weekdays = Array.from({ length: 7 }, (_, i) =>
      new Date(2023, 0, 1 + ((i + weekStartsOn) % 7)).toLocaleDateString(
        locale,
        { weekday: "narrow" },
      ),
    );

    const monthLabel = viewMonth.toLocaleDateString(locale, {
      month: "long",
      year: "numeric",
    });

    return (
      <div
        ref={ref}
        className={cn("w-64 select-none", className)}
        {...rest}
      >
        {/* Month header */}
        <div className={cn("mb-2 flex items-center justify-between", headerClassName)}>
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => shiftMonth(-1)}
            className={cn(
              "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              navButtonClassName,
            )}
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          </button>

          <span
            aria-live="polite"
            className={cn("text-sm font-semibold text-foreground", monthLabelClassName)}
          >
            {monthLabel}
          </span>

          <button
            type="button"
            aria-label="Next month"
            onClick={() => shiftMonth(1)}
            className={cn(
              "rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              navButtonClassName,
            )}
          >
            <ChevronRight aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>

        {/* Weekday header */}
        <div className={cn("grid grid-cols-7 text-center", weekdaysClassName)}>
          {weekdays.map((day, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={cn(
                "py-1 text-[11px] font-medium text-muted-foreground",
                weekdayClassName,
              )}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Day grid */}
        <div className={cn("grid grid-cols-7", daysClassName)}>
          {cells.map((date) => {
            const outside = date.getMonth() !== viewMonth.getMonth();
            const disabled = isDisabled(date);
            const isSelected = isSameDay(date, selected);
            const isToday = isSameDay(date, today);

            return (
              <button
                key={date.toISOString()}
                type="button"
                disabled={disabled}
                aria-label={date.toLocaleDateString(locale, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                aria-pressed={isSelected}
                aria-current={isToday ? "date" : undefined}
                onClick={() => select(date)}
                className={cn(
                  "m-0.5 flex h-8 items-center justify-center rounded-lg text-xs tabular-nums transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  "disabled:pointer-events-none disabled:opacity-30",
                  isSelected
                    ? "bg-primary font-semibold text-primary-foreground"
                    : cn(
                        "hover:bg-accent",
                        outside ? "text-muted-foreground/50" : "text-foreground",
                        isToday && "border border-primary/50 font-semibold text-primary",
                      ),
                  dayClassName,
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
