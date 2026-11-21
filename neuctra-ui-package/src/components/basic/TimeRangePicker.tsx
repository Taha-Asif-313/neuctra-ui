"use client";

import React, { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { TimePicker } from "./TimePicker";

/** A time range expressed as 24-hour "HH:mm" strings. */
export interface TimeRange {
  /** Start time in "HH:mm" form. */
  start?: string;
  /** End time in "HH:mm" form. */
  end?: string;
}

export interface TimeRangePickerProps {
  /** Controlled range. */
  value?: TimeRange;
  /** Initial range when uncontrolled. */
  defaultValue?: TimeRange;
  /** Called with the next validated range. */
  onChange?: (value: TimeRange) => void;
  /** Minute granularity of both time lists. */
  step?: number;
  /** Earliest selectable time in "HH:mm" form. */
  min?: string;
  /** Latest selectable time in "HH:mm" form. */
  max?: string;
  /** Separator shown between the two fields. */
  separator?: string;
  /** Shows times on a 12-hour clock (values stay "HH:mm"). */
  hour12?: boolean;
  /** Label rendered above both fields. */
  label?: string;
  /** Helper text rendered below the fields. */
  helperText?: string;
  /** Error state. A string is rendered as the message; `true` only toggles error styling. */
  error?: string | boolean;
  /** Marks the field as required and shows a `*` next to the label. */
  required?: boolean;
  /** Disables both fields. */
  disabled?: boolean;
  /** Field size. Matches Select and Input heights. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Placeholder of the start field. */
  startPlaceholder?: string;
  /** Placeholder of the end field. */
  endPlaceholder?: string;
  /** Accessible label of the start field. */
  startLabel?: string;
  /** Accessible label of the end field. */
  endLabel?: string;
  /** Form field name for the start time (submitted as "HH:mm"). */
  startName?: string;
  /** Form field name for the end time (submitted as "HH:mm"). */
  endName?: string;
  /** Additional classes for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for both TimePicker trigger buttons. */
  selectClassName?: string;
  /** Additional classes for both TimePicker popover panels. */
  panelClassName?: string;
  /** Additional classes for the separator text. */
  separatorClassName?: string;
  /** Additional classes for the helper/error text. */
  helperClassName?: string;
}

const pad = (value: number) => String(value).padStart(2, "0");
const toMinutes = (time?: string) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};
const toTime = (date: Date) => `${pad(date.getHours())}:${pad(date.getMinutes())}`;
/** "HH:mm" -> a Date on a fixed reference day (TimePicker only reads h/m). */
const toDate = (time?: string) => {
  const minutes = toMinutes(time);
  return minutes === null
    ? null
    : new Date(2000, 0, 1, Math.floor(minutes / 60), minutes % 60, 0, 0);
};
const dateMinutes = (date: Date) => date.getHours() * 60 + date.getMinutes();

export const TimeRangePicker = forwardRef<
  HTMLDivElement,
  TimeRangePickerProps
>(function TimeRangePicker(
  {
    value,
    defaultValue,
    onChange,
    step = 30,
    min = "00:00",
    max = "23:59",
    separator = "to",
    hour12 = false,
    label,
    helperText,
    error,
    required = false,
    disabled = false,
    size = "md",
    startPlaceholder = "Start",
    endPlaceholder = "End",
    startLabel = "Start time",
    endLabel = "End time",
    startName,
    endName,
    className,
    style,
    labelClassName,
    selectClassName,
    panelClassName,
    separatorClassName,
    helperClassName,
  },
  ref,
) {
  const id = useId();
  const labelId = `${id}-label`;
  const helperId = `${id}-helper`;

  const [range, setRange] = useControllableState<TimeRange>({
    value,
    defaultValue: defaultValue ?? {},
    onChange,
  });
  const [validationError, setValidationError] = useState<string | null>(null);

  const startMinutes = toMinutes(range.start);
  const endMinutes = toMinutes(range.end);

  const commit = (next: TimeRange) => {
    const start = toMinutes(next.start);
    const end = toMinutes(next.end);
    if (start !== null && end !== null && end <= start) {
      setValidationError("End time must be after start time.");
      return;
    }
    setValidationError(null);
    setRange(next);
  };

  const externalError = typeof error === "string" ? error : undefined;
  const message = validationError ?? externalError ?? helperText;
  const hasError = Boolean(error) || Boolean(validationError);

  const renderField = (which: "start" | "end") => {
    const isStart = which === "start";
    return (
      <div className="min-w-0 flex-1">
        <TimePicker
          ariaLabel={isStart ? startLabel : endLabel}
          value={toDate(isStart ? range.start : range.end)}
          onChange={(date) =>
            commit({ ...range, [which]: date ? toTime(date) : undefined })
          }
          placeholder={isStart ? startPlaceholder : endPlaceholder}
          step={step}
          minTime={min}
          maxTime={max}
          hour12={hour12}
          // Options that would produce an invalid range are disabled up front.
          isTimeDisabled={(time) =>
            isStart
              ? endMinutes !== null && dateMinutes(time) >= endMinutes
              : startMinutes !== null && dateMinutes(time) <= startMinutes
          }
          size={size}
          disabled={disabled}
          required={required}
          error={hasError}
          name={isStart ? startName : endName}
          className={selectClassName}
          panelClassName={panelClassName}
        />
      </div>
    );
  };

  return (
    <div
      ref={ref}
      style={style}
      className={cn("w-full space-y-1.5", className)}
    >
      {label && (
        <span
          id={labelId}
          className={cn(
            "flex items-center gap-1.5 font-medium text-foreground",
            size === "xs" ? "text-[10px]" : "text-[13px]",
            // After the text size: tailwind-merge drops a leading-* that precedes text-*.
            "leading-none",
            labelClassName,
          )}
        >
          {label}
          {required && <span className="text-destructive">*</span>}
        </span>
      )}
      <div
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-label={label ? undefined : "Time range"}
        aria-describedby={message ? helperId : undefined}
        className="flex items-center gap-2"
      >
        {renderField("start")}
        <span
          aria-hidden="true"
          className={cn("shrink-0 text-xs text-muted-foreground", separatorClassName)}
        >
          {separator}
        </span>
        {renderField("end")}
      </div>
      {message && (
        <p
          id={helperId}
          role={validationError ? "alert" : undefined}
          className={cn(
            "text-xs",
            hasError ? "text-destructive" : "text-muted-foreground",
            helperClassName,
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
});

TimeRangePicker.displayName = "TimeRangePicker";
