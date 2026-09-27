"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Calendar, type CalendarProps } from "./Calendar";

export interface DatePickerProps {
  /** Controlled selected date; pass null to represent no selection. */
  value?: Date | null;
  /** Initial selected date when uncontrolled. */
  defaultValue?: Date | null;
  /** Fired with the newly selected date, or null when cleared. */
  onChange?: (date: Date | null) => void;
  /** Trigger text shown while no date is selected. */
  placeholder?: string;
  /** Format the displayed date; defaults to the locale date string. */
  formatDate?: (date: Date) => string;
  /** Label rendered above the trigger. */
  label?: string;
  /** Error message; paints the border and replaces helperText below the trigger. */
  error?: string;
  /** Helper text shown below the trigger when there is no error. */
  helperText?: string;
  /** Trigger height. */
  size?: "sm" | "md" | "lg";
  /** Disables the trigger and prevents opening the calendar. */
  disabled?: boolean;
  /** Show an inline clear button while a date is selected. */
  clearable?: boolean;
  /** Forwarded to the inner <Calendar />. */
  calendarProps?: Omit<
    CalendarProps,
    "value" | "defaultValue" | "onChange" | "className"
  >;
  /** Id applied to the trigger button. */
  id?: string;
  /** Additional classes for the trigger button. */
  className?: string;
  /** Additional classes for the outermost wrapper. */
  wrapperClassName?: string;

  // 🔥 Full Customization
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the calendar icon in the trigger. */
  iconClassName?: string;
  /** Additional classes for the displayed date text. */
  textClassName?: string;
  /** Additional classes for the clear button. */
  clearButtonClassName?: string;
  /** Additional classes for the icon inside the clear button. */
  clearIconClassName?: string;
  /** Additional classes for the popover panel containing the calendar. */
  panelClassName?: string;
  /** Additional classes for the helper/error text below the trigger. */
  helperClassName?: string;
}

const SIZES = {
  sm: "h-8 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-10 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 px-4 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

// Gap between the field and the calendar panel, and the minimum distance
// the panel is kept from the viewport edge (see the positioning effect
// below — same technique as Tooltip.tsx/Popover.tsx).
const GAP = 8;
const VIEWPORT_MARGIN = 8;

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
    const fieldRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState<Date | null>(defaultValue);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(
      null,
    );
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

    // Position the calendar panel with measured, viewport-clamped fixed
    // coordinates instead of a CSS-only absolute offset (see Tooltip.tsx /
    // Popover.tsx for the same technique). A field near the edge of a
    // narrow/max-width container would otherwise let the calendar's real
    // 7-column grid extend past the viewport edge; nothing clips that
    // overflow, so it grew the page's scrollWidth and produced a spurious
    // horizontal scrollbar (or clipped the calendar off-screen). Clamping
    // here makes that structurally impossible.
    useLayoutEffect(() => {
      if (!open) {
        setCoords(null);
        return;
      }
      const field = fieldRef.current;
      const panel = panelRef.current;
      if (!field || !panel) return;

      const fieldRect = field.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      let top = fieldRect.bottom + GAP;
      let left = fieldRect.left;

      left = Math.min(
        Math.max(left, VIEWPORT_MARGIN),
        vw - panelRect.width - VIEWPORT_MARGIN,
      );
      top = Math.min(
        Math.max(top, VIEWPORT_MARGIN),
        vh - panelRect.height - VIEWPORT_MARGIN,
      );

      setCoords({ top, left });
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
            ref={(el) => {
              fieldRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
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
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-label="Choose date"
            className={cn(
              "fixed z-50 rounded-xl border border-border bg-popover p-3 shadow-xl",
              "animate-in fade-in",
              !coords && "invisible",
              panelClassName,
            )}
            style={coords ? { top: coords.top, left: coords.left } : undefined}
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
