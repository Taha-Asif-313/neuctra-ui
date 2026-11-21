"use client";

import React, {
  forwardRef,
  useCallback,
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
  /** Controlled selected time; pass null to represent no selection. */
  value?: Date | null;
  /** Initial selected time when uncontrolled. */
  defaultValue?: Date | null;
  /** Fired with a Date carrying the picked hour/minute. If `value` (or the
   * uncontrolled internal value) is already set, only its hours/minutes are
   * replaced: the rest of the date is preserved, so pairing this with a
   * DatePicker's value works without extra glue code. */
  onChange?: (date: Date | null) => void;
  /** Trigger text shown while no time is selected. */
  placeholder?: string;
  /** Format the displayed time. Defaults to a locale "HH:MM" string, or to
   * `hour12` when that prop is set. */
  formatTime?: (date: Date) => string;
  /** Forces a 12-hour (`true`, e.g. "9:30 AM") or 24-hour (`false`, e.g.
   * "09:30") display when no `formatTime` is given. Leave unset to follow the
   * user's locale. */
  hour12?: boolean;
  /** Minutes between each selectable option in the list. */
  step?: number;
  /** Earliest selectable hour, 0-23. */
  minHour?: number;
  /** Latest selectable hour, 0-23 (inclusive). */
  maxHour?: number;
  /** Earliest time offered, in 24-hour "HH:mm" form (inclusive). Narrows `minHour` to the minute. */
  minTime?: string;
  /** Latest time offered, in 24-hour "HH:mm" form (inclusive). Narrows `maxHour` to the minute. */
  maxTime?: string;
  /** Return true to render an option disabled (shown but not selectable),
   * e.g. to keep an end time after a start time. Receives the option's time
   * on a fixed reference day; only its hours and minutes are meaningful. */
  isTimeDisabled?: (time: Date) => boolean;
  /** Label rendered above the trigger. */
  label?: string;
  /** Accessible name for the trigger when there is no visible `label`. */
  ariaLabel?: string;
  /** Error state. A string paints the border and replaces helperText below
   * the trigger; `true` only applies the error styling. */
  error?: string | boolean;
  /** Helper text shown below the trigger when there is no error message. */
  helperText?: string;
  /** Marks the field as required: shows a `*` next to the label and sets aria-required. */
  required?: boolean;
  /** Form field name. When set, a hidden input submits the time as "HH:mm". */
  name?: string;
  /** Trigger size. Matches the Select and Input size scale. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Disables the trigger and prevents opening the time list. */
  disabled?: boolean;
  /** Show an inline clear button while a time is selected. */
  clearable?: boolean;
  /** Id applied to the trigger button. */
  id?: string;
  /** Additional classes for the trigger button. */
  className?: string;
  /** Additional classes for the outermost wrapper. */
  wrapperClassName?: string;

  // Full customization
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the clock icon in the trigger. */
  iconClassName?: string;
  /** Additional classes for the displayed time text. */
  textClassName?: string;
  /** Additional classes for the clear button. */
  clearButtonClassName?: string;
  /** Additional classes for the icon inside the clear button. */
  clearIconClassName?: string;
  /** Additional classes for the popover panel containing the time list. */
  panelClassName?: string;
  /** Additional classes for every time option button. */
  optionClassName?: string;
  /** Additional classes for the currently selected time option, on top of its active styling. */
  activeOptionClassName?: string;
  /** Additional classes for the helper/error text below the trigger. */
  helperClassName?: string;
}

// Same padding/text scale as Select.tsx and Input.tsx, so a TimePicker in a
// row with those fields shares their height at every size.
const sizeConfig = {
  xs: {
    trigger: "px-2 py-1 text-[11px]",
    withClear: "pr-7",
    option: "px-2 py-1 text-[11px]",
    icon: "h-3 w-3",
    clearInset: "right-1.5",
    labelText: "text-[10px]",
  },
  sm: {
    trigger: "px-2.5 py-1.5 text-xs",
    withClear: "pr-8",
    option: "px-2.5 py-1.5 text-xs",
    icon: "h-3 w-3",
    clearInset: "right-1.5",
    labelText: "text-[13px]",
  },
  md: {
    trigger: "px-3 py-2 text-sm",
    withClear: "pr-9",
    option: "px-3 py-1.5 text-sm",
    icon: "h-4 w-4",
    clearInset: "right-2",
    labelText: "text-[13px]",
  },
  lg: {
    trigger: "px-4 py-3 text-base",
    withClear: "pr-11",
    option: "px-4 py-2 text-base",
    icon: "h-5 w-5",
    clearInset: "right-2.5",
    labelText: "text-[13px]",
  },
} as const;

// Gap between the field and the panel, and the minimum distance the panel
// is kept from the viewport edge.
const GAP = 8;
const VIEWPORT_MARGIN = 8;
const MIN_PANEL_WIDTH = 160;

const pad = (n: number) => String(n).padStart(2, "0");

const toMinutes = (time?: string) => {
  if (!time) return null;
  const [h, m] = time.split(":").map(Number);
  if (!Number.isFinite(h) || !Number.isFinite(m)) return null;
  return h * 60 + m;
};

const makeFormatter = (hour12?: boolean) => (date: Date) =>
  hour12 === undefined
    ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    : hour12
      ? date.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      : `${pad(date.getHours())}:${pad(date.getMinutes())}`;

// A fixed reference day, not "today": only the hour/minute of each option
// is ever read, so anchoring to a real day would just risk DST edge cases
// for no benefit.
function buildTimeOptions(
  minHour: number,
  maxHour: number,
  step: number,
  minTime: number | null,
  maxTime: number | null,
) {
  const options: Date[] = [];
  const increment = Math.max(1, Math.round(step));
  for (let h = Math.max(0, minHour); h <= Math.min(23, maxHour); h++) {
    for (let m = 0; m < 60; m += increment) {
      const total = h * 60 + m;
      if (minTime !== null && total < minTime) continue;
      if (maxTime !== null && total > maxTime) continue;
      options.push(new Date(2000, 0, 1, h, m, 0, 0));
    }
  }
  return options;
}

type Coords = { top: number; left: number; width: number };

export const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(
  function TimePicker(
    {
      value,
      defaultValue = null,
      onChange,
      placeholder = "Pick a time",
      formatTime,
      hour12,
      step = 30,
      minHour = 0,
      maxHour = 23,
      minTime,
      maxTime,
      isTimeDisabled,
      label,
      ariaLabel,
      error,
      helperText,
      required = false,
      name,
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
    const labelId = `${generatedId}-label`;
    const config = sizeConfig[size] ?? sizeConfig.md;
    const format = formatTime ?? makeFormatter(hour12);

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const bottomText = errorMessage ?? helperText;
    const describedBy = bottomText ? `${fieldId}-description` : undefined;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fieldRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [open, setOpen] = useState(false);
    const [internal, setInternal] = useState<Date | null>(defaultValue);
    const [coords, setCoords] = useState<Coords | null>(null);
    const selected = value !== undefined ? value : internal;

    const minTimeMinutes = toMinutes(minTime);
    const maxTimeMinutes = toMinutes(maxTime);
    const options = useMemo(
      () =>
        buildTimeOptions(minHour, maxHour, step, minTimeMinutes, maxTimeMinutes),
      [minHour, maxHour, step, minTimeMinutes, maxTimeMinutes],
    );

    const commit = (next: Date | null) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const close = useCallback((restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) fieldRef.current?.focus();
    }, []);

    const selectOption = (option: Date) => {
      const base = selected ? new Date(selected) : new Date();
      base.setHours(option.getHours(), option.getMinutes(), 0, 0);
      commit(base);
      close(true);
    };

    // Outside-click + Escape, attached only while open. Escape listens in the
    // capture phase and stops propagation, so a TimePicker nested inside
    // another overlay (a DateTimePicker panel, a Modal) closes only itself.
    // Outside clicks are tested against this component's own DOM, which
    // includes the panel, so clicks inside the list never reach an outer
    // overlay as "outside" either.
    useEffect(() => {
      if (!open) return;
      const onMouseDown = (e: MouseEvent) => {
        if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
          close(false);
        }
      };
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key !== "Escape") return;
        e.preventDefault();
        e.stopPropagation();
        close(true);
      };
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("keydown", onKeyDown, true);
      return () => {
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("keydown", onKeyDown, true);
      };
    }, [open, close]);

    // Measured, viewport-clamped fixed coordinates that follow scroll and
    // resize, flipping above the field when there is no room below.
    useLayoutEffect(() => {
      if (!open) {
        setCoords(null);
        return;
      }
      const update = () => {
        const field = fieldRef.current;
        const panel = panelRef.current;
        if (!field || !panel) return;
        const rect = field.getBoundingClientRect();
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const width = Math.min(
          Math.max(rect.width, MIN_PANEL_WIDTH),
          vw - VIEWPORT_MARGIN * 2,
        );
        const height = panel.offsetHeight;
        const spaceBelow = vh - rect.bottom - GAP - VIEWPORT_MARGIN;
        const spaceAbove = rect.top - GAP - VIEWPORT_MARGIN;
        const above = spaceBelow < height && spaceAbove > spaceBelow;
        const rawTop = above ? rect.top - height - GAP : rect.bottom + GAP;
        setCoords({
          width,
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
      return () => {
        window.removeEventListener("scroll", update, true);
        window.removeEventListener("resize", update);
      };
    }, [open]);

    const enabledOptions = () =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLButtonElement>(
          '[role="option"]:not(:disabled)',
        ) ?? [],
      );

    // On open, scroll the selected (or first enabled) option to the middle
    // of the list and move focus to it so arrow keys work immediately.
    useEffect(() => {
      if (!open) return;
      const frame = requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const target =
          panel.querySelector<HTMLButtonElement>(
            '[aria-selected="true"]:not(:disabled)',
          ) ?? enabledOptions()[0];
        if (!target) return;
        target.scrollIntoView({ block: "center" });
        target.focus({ preventScroll: true });
      });
      return () => cancelAnimationFrame(frame);
    }, [open]);

    const onListKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const items = enabledOptions();
      if (items.length === 0) return;
      const index = items.indexOf(document.activeElement as HTMLButtonElement);
      let next: number | null = null;
      if (e.key === "ArrowDown") next = index < 0 ? 0 : Math.min(index + 1, items.length - 1);
      else if (e.key === "ArrowUp") next = index < 0 ? items.length - 1 : Math.max(index - 1, 0);
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = items.length - 1;
      else if (e.key === "Tab") {
        close(false);
        return;
      }
      if (next === null) return;
      e.preventDefault();
      items[next].focus();
      items[next].scrollIntoView({ block: "nearest" });
    };

    const display = selected ? format(selected) : null;
    const hiddenValue = selected
      ? `${pad(selected.getHours())}:${pad(selected.getMinutes())}`
      : "";

    return (
      <div
        ref={rootRef}
        className={cn("relative w-full space-y-1.5", wrapperClassName)}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={fieldId}
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
          <button
            ref={(el) => {
              fieldRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            id={fieldId}
            type="button"
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? panelId : undefined}
            aria-label={label ? undefined : ariaLabel}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-describedby={describedBy}
            onClick={() => (open ? close(false) : setOpen(true))}
            onKeyDown={(e) => {
              if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
                e.preventDefault();
                setOpen(true);
              }
            }}
            className={cn(
              "flex w-full items-center gap-2 rounded-lg text-left outline-none transition-all",
              "border border-border bg-input/30 text-foreground hover:bg-accent/10",
              "focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
              hasError && "border-destructive focus-visible:ring-destructive/50",
              disabled && "cursor-not-allowed opacity-50",
              config.trigger,
              // Reserve room for the clear button.
              clearable && selected && !disabled && config.withClear,
              className,
            )}
          >
            <Clock
              aria-hidden="true"
              className={cn("shrink-0 text-muted-foreground", config.icon, iconClassName)}
            />
            <span
              className={cn(
                "min-w-0 flex-1 truncate tabular-nums",
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
              onClick={() => {
                commit(null);
                fieldRef.current?.focus();
              }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                config.clearInset,
                clearButtonClassName,
              )}
            >
              <X aria-hidden="true" className={cn(config.icon, clearIconClassName)} />
            </button>
          )}

          {name && <input type="hidden" name={name} value={hiddenValue} />}

          {open && (
          <div
            ref={panelRef}
            id={panelId}
            role="listbox"
            aria-label={label ? `${label}: choose time` : (ariaLabel ?? "Choose time")}
            onKeyDown={onListKeyDown}
            className={cn(
              "fixed z-50 max-h-60 overflow-y-auto overscroll-contain rounded-xl border border-border bg-popover p-1.5 text-popover-foreground shadow-xl",
              "animate-in fade-in",
              !coords && "invisible",
              panelClassName,
            )}
            style={
              coords
                ? { top: coords.top, left: coords.left, width: coords.width }
                : { top: 0, left: 0, width: MIN_PANEL_WIDTH }
            }
          >
            {options.length === 0 && (
              <p className={cn("text-center text-muted-foreground", config.option)}>
                No times available
              </p>
            )}
            {options.map((option) => {
              const active =
                selected != null &&
                selected.getHours() === option.getHours() &&
                selected.getMinutes() === option.getMinutes();
              const optionDisabled = isTimeDisabled?.(option) ?? false;

              return (
                <button
                  key={option.getTime()}
                  type="button"
                  role="option"
                  tabIndex={-1}
                  aria-selected={active}
                  aria-disabled={optionDisabled || undefined}
                  disabled={optionDisabled}
                  onClick={() => selectOption(option)}
                  className={cn(
                    "block w-full rounded-lg text-left tabular-nums transition-colors",
                    "hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                    "disabled:pointer-events-none disabled:opacity-40",
                    config.option,
                    active
                      ? cn("bg-primary/10 font-medium text-primary", activeOptionClassName)
                      : "text-foreground",
                    optionClassName,
                  )}
                >
                  {format(option)}
                </button>
              );
            })}
          </div>
        )}
        </div>

        {bottomText && (
          <p
            id={describedBy}
            role={errorMessage ? "alert" : undefined}
            className={cn(
              "text-xs font-medium",
              hasError ? "text-destructive" : "text-muted-foreground",
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

TimePicker.displayName = "TimePicker";
