"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarClock, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { Calendar } from "./Calendar";
import { Button } from "./Button";
import { TimePicker } from "./TimePicker";

export interface DateTimePickerProps {
  /** Controlled date and time; null means no selection. */
  value?: Date | null;
  /** Initial date and time when uncontrolled. */
  defaultValue?: Date | null;
  /** Called with the next date/time or null. */
  onChange?: (value: Date | null) => void;
  /** Minutes between each option in the time list. */
  minuteStep?: number;
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** Return true to disable a specific day. */
  isDateDisabled?: (date: Date) => boolean;
  /** Trigger text shown when no value is selected. */
  placeholder?: string;
  /** Disables the trigger. */
  disabled?: boolean;
  /** Formats the value shown in the trigger. Defaults to the locale date plus HH:mm. */
  formatValue?: (date: Date) => string;
  /** Shows a 12-hour clock (e.g. "9:30 AM") instead of 24-hour, in the time list and the default trigger format. */
  hour12?: boolean;
  /** Locale used for the calendar and the default trigger format. */
  locale?: string;
  /** Which day starts the week: 0 for Sunday, 1 for Monday. */
  weekStartsOn?: 0 | 1;
  /** Label rendered above the trigger. */
  label?: string;
  /** Helper text rendered below the trigger. */
  helperText?: string;
  /** Error state. A string is rendered as the message; `true` only toggles error styling. */
  error?: string | boolean;
  /** Applies success styling to the trigger. */
  success?: boolean;
  /** Marks the field as required and shows a `*` next to the label. */
  required?: boolean;
  /** Trigger size. Matches Select and Input heights. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Shows a clear button while a value is selected. */
  clearable?: boolean;
  /** Text of the button that closes the panel. */
  doneLabel?: string;
  /** Additional classes for the root element. */
  className?: string;
  /** Inline styles for the root element. */
  style?: React.CSSProperties;
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the trigger button. */
  triggerClassName?: string;
  /** Additional classes for the icon in the trigger. */
  iconClassName?: string;
  /** Additional classes for the floating panel. */
  panelClassName?: string;
  /** Additional classes for the time field (the inner TimePicker trigger). */
  timeSelectClassName?: string;
  /** Additional classes for the helper/error text. */
  helperClassName?: string;
  /** Inline styles for the trigger button. */
  triggerStyle?: React.CSSProperties;
  /** Inline styles for the floating panel. */
  panelStyle?: React.CSSProperties;
}

const sizeConfig = {
  xs: {
    trigger: "pl-6 pr-2 py-1 text-[11px]",
    withClear: "pr-7",
    inset: "left-2",
    clearInset: "right-1.5",
    icon: "h-3 w-3",
    labelText: "text-[10px]",
  },
  sm: {
    trigger: "pl-7 pr-2.5 py-1.5 text-xs",
    withClear: "pr-8",
    inset: "left-2",
    clearInset: "right-1.5",
    icon: "h-3 w-3",
    labelText: "text-[13px]",
  },
  md: {
    trigger: "pl-9 pr-3 py-2 text-sm",
    withClear: "pr-9",
    inset: "left-3",
    clearInset: "right-2",
    icon: "h-4 w-4",
    labelText: "text-[13px]",
  },
  lg: {
    trigger: "pl-11 pr-4 py-3 text-base",
    withClear: "pr-11",
    inset: "left-3.5",
    clearInset: "right-2.5",
    icon: "h-5 w-5",
    labelText: "text-[13px]",
  },
} as const;

const GAP = 8;
const VIEWPORT_MARGIN = 8;

const pad = (value: number) => String(value).padStart(2, "0");

/** Fixed, viewport-clamped positioning that follows scroll and resize. */
function useAnchoredPanel(
  open: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>,
) {
  const [coords, setCoords] = useState<{
    top: number;
    left: number;
    side: "top" | "bottom";
  } | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    const update = () => {
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!anchor || !panel) return;
      const rect = anchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = panel.offsetWidth;
      const height = panel.offsetHeight;
      const spaceBelow = vh - rect.bottom - GAP - VIEWPORT_MARGIN;
      const spaceAbove = rect.top - GAP - VIEWPORT_MARGIN;
      const side = spaceBelow < height && spaceAbove > spaceBelow ? "top" : "bottom";
      const rawTop = side === "bottom" ? rect.bottom + GAP : rect.top - height - GAP;
      setCoords({
        side,
        top: Math.min(
          Math.max(rawTop, VIEWPORT_MARGIN),
          Math.max(VIEWPORT_MARGIN, vh - height - VIEWPORT_MARGIN),
        ),
        left: Math.min(
          Math.max(rect.left, VIEWPORT_MARGIN),
          Math.max(VIEWPORT_MARGIN, vw - width - VIEWPORT_MARGIN),
        ),
      });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (observer && panelRef.current) observer.observe(panelRef.current);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [open, anchorRef, panelRef]);

  return coords;
}

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  function DateTimePicker(
    {
      value,
      defaultValue = null,
      onChange,
      minuteStep = 15,
      minDate,
      maxDate,
      isDateDisabled,
      placeholder = "Pick date and time",
      disabled = false,
      formatValue,
      hour12 = false,
      locale,
      weekStartsOn = 1,
      label,
      helperText,
      error,
      success = false,
      required = false,
      size = "md",
      clearable = false,
      doneLabel = "Done",
      className,
      style,
      labelClassName,
      triggerClassName,
      iconClassName,
      panelClassName,
      timeSelectClassName,
      helperClassName,
      triggerStyle,
      panelStyle,
    },
    ref,
  ) {
    const id = useId();
    const triggerId = `${id}-trigger`;
    const labelId = `${id}-label`;
    const panelId = `${id}-panel`;
    const helperId = `${id}-helper`;
    const reduceMotion = useReducedMotion();
    const config = sizeConfig[size] ?? sizeConfig.md;

    const [selected, setSelected] = useControllableState<Date | null>({
      value,
      defaultValue,
      onChange,
    });
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const coords = useAnchoredPanel(open, triggerRef, panelRef);

    const step = Math.min(60, Math.max(1, Math.round(minuteStep)));
    const closePanel = useCallback((restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) triggerRef.current?.focus();
    }, []);

    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: MouseEvent) => {
        if (!rootRef.current?.contains(event.target as Node)) closePanel(false);
      };
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          event.preventDefault();
          closePanel(true);
        }
      };
      document.addEventListener("mousedown", onPointerDown);
      document.addEventListener("keydown", onKeyDown);
      return () => {
        document.removeEventListener("mousedown", onPointerDown);
        document.removeEventListener("keydown", onKeyDown);
      };
    }, [open, closePanel]);

    // Move focus into the panel (the selected or first focusable day) on open.
    useEffect(() => {
      if (!open) return;
      const frame = requestAnimationFrame(() => {
        const panel = panelRef.current;
        const target =
          panel?.querySelector<HTMLButtonElement>('[aria-pressed="true"]') ??
          panel?.querySelector<HTMLButtonElement>('[aria-current="date"]:not(:disabled)') ??
          panel?.querySelector<HTMLButtonElement>("button:not(:disabled)");
        target?.focus();
      });
      return () => cancelAnimationFrame(frame);
    }, [open]);

    // Picking a day keeps the current time (or 09:00 for a fresh value).
    const selectDay = (day: Date) => {
      const hours = selected ? selected.getHours() : 9;
      const mins = selected ? selected.getMinutes() : 0;
      setSelected(
        new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, mins),
      );
    };

    const selectTime = (hours: number, mins: number) => {
      const base = selected ?? new Date();
      const next = new Date(base);
      next.setHours(hours, mins, 0, 0);
      setSelected(next);
    };

    const display = selected
      ? formatValue
        ? formatValue(selected)
        : `${selected.toLocaleDateString(locale)}, ${
            hour12
              ? `${selected.getHours() % 12 || 12}:${pad(selected.getMinutes())} ${
                  selected.getHours() >= 12 ? "PM" : "AM"
                }`
              : `${pad(selected.getHours())}:${pad(selected.getMinutes())}`
          }`
      : placeholder;

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const bottomText = errorMessage ?? helperText;

    return (
      <div
        ref={(node) => {
          rootRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        style={style}
        className={cn("w-full space-y-1.5", className)}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={triggerId}
            className={cn(
              "flex items-center gap-1.5 font-medium text-foreground",
              config.labelText,
              // After the text size: tailwind-merge drops a leading-* that precedes text-*.
              "leading-none",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative">
          <CalendarClock
            aria-hidden="true"
            className={cn(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
              config.inset,
              config.icon,
              iconClassName,
            )}
          />
          <button
            ref={triggerRef}
            id={triggerId}
            type="button"
            disabled={disabled}
            aria-haspopup="dialog"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
            aria-describedby={bottomText ? helperId : undefined}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            onClick={() => (open ? closePanel(false) : setOpen(true))}
            className={cn(
              "flex w-full items-center rounded-lg text-left outline-none transition-all",
              "border border-border bg-input/30 text-foreground hover:bg-accent/10",
              "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
              hasError && "border-destructive focus-visible:ring-destructive/50",
              success && !hasError && "border-success focus-visible:ring-success/50",
              disabled && "cursor-not-allowed opacity-50",
              config.trigger,
              clearable && selected && !disabled && config.withClear,
              triggerClassName,
            )}
            style={triggerStyle}
          >
            <span
              className={cn(
                "flex-1 truncate tabular-nums",
                selected ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {display}
            </span>
          </button>

          {clearable && selected && !disabled && (
            <button
              type="button"
              aria-label="Clear date and time"
              onClick={() => {
                setSelected(null);
                triggerRef.current?.focus();
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors",
                "hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                config.clearInset,
              )}
            >
              <X aria-hidden="true" className={config.icon} />
            </button>
          )}
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              id={panelId}
              role="dialog"
              aria-label={label ? `${label}: choose date and time` : "Choose date and time"}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: coords?.side === "top" ? 4 : -4, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: coords?.side === "top" ? 4 : -4, scale: 0.98 }
              }
              transition={{ duration: 0.12 }}
              className={cn(
                "fixed z-50 max-w-[calc(100vw-2rem)] rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-xl",
                !coords && "invisible",
                panelClassName,
              )}
              style={{ top: coords?.top ?? 0, left: coords?.left ?? 0, ...panelStyle }}
            >
              <Calendar
                value={selected}
                onChange={selectDay}
                minDate={minDate}
                maxDate={maxDate}
                isDateDisabled={isDateDisabled}
                locale={locale}
                weekStartsOn={weekStartsOn}
                className="max-w-full"
              />

              <div className="mt-3 flex items-center gap-3 border-t border-border pt-3">
                <span
                  aria-hidden="true"
                  className="shrink-0 text-xs font-medium text-muted-foreground"
                >
                  Time
                </span>
                <TimePicker
                  ariaLabel="Time"
                  value={selected}
                  onChange={(next) => {
                    if (next) selectTime(next.getHours(), next.getMinutes());
                  }}
                  step={step}
                  hour12={hour12}
                  size="sm"
                  wrapperClassName="min-w-0 flex-1"
                  className={timeSelectClassName}
                />
              </div>

              <Button
                type="button"
                size="sm"
                fullWidth
                className="mt-3"
                onClick={() => closePanel(true)}
              >
                {doneLabel}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {bottomText && (
          <p
            id={helperId}
            className={cn(
              "text-xs",
              hasError
                ? "text-destructive"
                : success
                  ? "text-success"
                  : "text-muted-foreground",
              helperClassName,
            )}
          >
            {bottomText}
          </p>
        )}
      </div>
    );
  },
);

DateTimePicker.displayName = "DateTimePicker";
