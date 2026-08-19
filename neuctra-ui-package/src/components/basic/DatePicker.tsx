"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Calendar, type CalendarProps } from "./Calendar";

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  /** Format the displayed date; defaults to the locale date string. */
  formatDate?: (date: Date) => string;
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Show an inline clear button while a date is selected. */
  clearable?: boolean;
  /** Forwarded to the inner <Calendar />. */
  calendarProps?: Omit<
    CalendarProps,
    "value" | "defaultValue" | "onChange" | "className"
  >;
  id?: string;
  className?: string;
  wrapperClassName?: string;

  /** 🔥 Full Customization */
  labelClassName?: string;
  iconClassName?: string;
  textClassName?: string;
  clearButtonClassName?: string;
  clearIconClassName?: string;
  panelClassName?: string;
  helperClassName?: string;
}

const SIZES = {
  sm: "h-8 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-10 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 px-4 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  function DatePicker(
    {
      value,
      defaultValue = null,
      onChange,
      placeholder = "Pick a date",
      formatDate,
      label,
      error,
      helperText,
      size = "md",
      disabled = false,
      clearable = false,
      calendarProps,
      id,
      className,
      wrapperClassName,
      labelClassName,
      iconClassName,
      textClassName,
      clearButtonClassName,
      clearIconClassName,
      panelClassName,
      helperClassName,
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const panelId = `${generatedId}-panel`;
    const describedBy = helperText || error ? `${fieldId}-description` : undefined;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState<Date | null>(defaultValue);
    const selected = value !== undefined ? value : internal;

    const commit = (next: Date | null) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    // Outside-click + Escape, attached only while open.
    useEffect(() => {
      if (!open) return;
      const onMouseDown = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open]);

    const display = selected
      ? formatDate
        ? formatDate(selected)
        : selected.toLocaleDateString()
      : null;

    return (
      <div ref={rootRef} className={cn("relative w-full", wrapperClassName)}>
        {label && (
          <label
            htmlFor={fieldId}
            className={cn(
              "mb-1.5 block text-[13px] font-medium leading-none text-foreground",
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div className="relative">
          <button
            ref={ref}
            id={fieldId}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            onClick={() => setOpen((p) => !p)}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg border bg-transparent text-left transition-colors",
              "dark:bg-input/30",
              error ? "border-destructive" : "border-input",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring",
              disabled && "cursor-not-allowed opacity-50",
              SIZES[size] ?? SIZES.md,
              // Reserve room for the clear button.
              clearable && selected && "pr-9",
              className,
            )}
          >
            <CalendarIcon
              aria-hidden="true"
              className={cn("shrink-0 text-muted-foreground", iconClassName)}
            />
            <span
              className={cn(
                "truncate",
                display ? "text-foreground" : "text-muted-foreground",
                textClassName,
              )}
            >
              {display ?? placeholder}
            </span>
          </button>

          {clearable && selected && !disabled && (
            <button
              type="button"
              aria-label="Clear date"
              onClick={() => commit(null)}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                clearButtonClassName,
              )}
            >
              <X aria-hidden="true" className={cn("h-3.5 w-3.5", clearIconClassName)} />
            </button>
          )}
        </div>

        {open && (
          <div
            id={panelId}
            role="dialog"
            aria-label="Choose date"
            className={cn(
              "absolute left-0 z-50 mt-2 rounded-xl border border-border bg-popover p-3 shadow-xl",
              "animate-in fade-in",
              panelClassName,
            )}
          >
            <Calendar
              {...calendarProps}
              value={selected}
              onChange={(date) => {
                commit(date);
                setOpen(false);
              }}
            />
          </div>
        )}

        {(helperText || error) && (
          <p
            id={describedBy}
            role={error ? "alert" : undefined}
            className={cn(
              "mt-1.5 text-xs font-medium",
              error ? "text-destructive" : "text-muted-foreground",
              helperClassName,
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
