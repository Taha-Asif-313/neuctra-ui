"use client";

import React, {
  forwardRef,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Clock, X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface TimePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  /** Fired with a Date carrying the picked hour/minute. If `value` (or the
   * uncontrolled internal value) is already set, only its hours/minutes are
   * replaced — the rest of the date is preserved, so pairing this with a
   * DatePicker's value works without extra glue code. */
  onChange?: (date: Date | null) => void;
  placeholder?: string;
  /** Format the displayed time; defaults to a locale "HH:MM" string. */
  formatTime?: (date: Date) => string;
  /** Minutes between each selectable option in the list. */
  step?: number;
  /** Earliest selectable hour, 0-23. */
  minHour?: number;
  /** Latest selectable hour, 0-23 (inclusive). */
  maxHour?: number;
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  /** Show an inline clear button while a time is selected. */
  clearable?: boolean;
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
  optionClassName?: string;
  activeOptionClassName?: string;
  helperClassName?: string;
}

const SIZES = {
  sm: "h-8 px-2.5 text-xs [&_svg]:h-3.5 [&_svg]:w-3.5",
  md: "h-10 px-3 text-sm [&_svg]:h-4 [&_svg]:w-4",
  lg: "h-12 px-4 text-base [&_svg]:h-5 [&_svg]:w-5",
} as const;

// Gap between the field and the panel, and the minimum distance the panel
// is kept from the viewport edge (see the positioning effect below — same
// technique as Tooltip.tsx/Popover.tsx/DatePicker.tsx).
const GAP = 8;
const VIEWPORT_MARGIN = 8;

const defaultFormatTime = (date: Date) =>
  date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

// A fixed reference day, not "today" — only the hour/minute of each option
// is ever read, so anchoring to a real day would just risk DST edge cases
// for no benefit.
function buildTimeOptions(minHour: number, maxHour: number, step: number) {
  const options: Date[] = [];
  for (let h = minHour; h <= maxHour; h++) {
    for (let m = 0; m < 60; m += step) {
      options.push(new Date(2000, 0, 1, h, m, 0, 0));
    }
  }
  return options;
}

export const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(
  function TimePicker(
    {
      value,
      defaultValue = null,
      onChange,
      placeholder = "Pick a time",
      formatTime = defaultFormatTime,
      step = 30,
      minHour = 0,
      maxHour = 23,
      label,
      error,
      helperText,
      size = "md",
      disabled = false,
      clearable = false,
      id,
      className,
      wrapperClassName,
      labelClassName,
      iconClassName,
      textClassName,
      clearButtonClassName,
      clearIconClassName,
      panelClassName,
      optionClassName,
      activeOptionClassName,
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
    const activeOptionRef = useRef<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState<Date | null>(defaultValue);
    const [coords, setCoords] = useState<{ top: number; left: number } | null>(
      null,
    );
    const selected = value !== undefined ? value : internal;

    const options = useMemo(
      () => buildTimeOptions(minHour, maxHour, step),
      [minHour, maxHour, step],
    );

    const commit = (next: Date | null) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const selectOption = (option: Date) => {
      const base = selected ? new Date(selected) : new Date();
      base.setHours(option.getHours(), option.getMinutes(), 0, 0);
      commit(base);
      setOpen(false);
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

    // Position the panel with measured, viewport-clamped fixed coordinates
    // instead of a CSS-only absolute offset (see Tooltip.tsx / Popover.tsx /
    // DatePicker.tsx for the same technique) — keeps the panel on-screen
    // regardless of where the field sits.
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

    // Keep the selected (or first) option in view when the panel opens,
    // rather than always starting scrolled to the top of the list.
    useEffect(() => {
      if (!open) return;
      activeOptionRef.current?.scrollIntoView({ block: "center" });
    }, [open]);

    const display = selected ? formatTime(selected) : null;

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
            <Clock
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
              aria-label="Clear time"
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
            aria-label="Choose time"
            className={cn(
              "fixed z-50 max-h-60 w-40 overflow-y-auto rounded-xl border border-border bg-popover p-1.5 shadow-xl",
              "animate-in fade-in",
              !coords && "invisible",
              panelClassName,
            )}
            style={coords ? { top: coords.top, left: coords.left } : undefined}
          >
            {options.map((option) => {
              const active =
                selected != null &&
                selected.getHours() === option.getHours() &&
                selected.getMinutes() === option.getMinutes();

              return (
                <button
                  key={option.getTime()}
                  ref={active ? activeOptionRef : undefined}
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "block w-full rounded-lg px-3 py-1.5 text-left text-sm transition-colors",
                    "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? cn("bg-primary/10 font-medium text-primary", activeOptionClassName)
                      : "text-foreground",
                    optionClassName,
                  )}
                >
                  {formatTime(option)}
                </button>
              );
            })}
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

TimePicker.displayName = "TimePicker";
