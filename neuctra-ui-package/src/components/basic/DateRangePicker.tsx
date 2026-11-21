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
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";
import { IconButton } from "./IconButton";

/** A selectable date range with an optional start and end date. */
export interface DateRange {
  /** Start of the range. */
  from?: Date;
  /** End of the range. */
  to?: Date;
}

/** A shortcut shown in the picker panel. */
export interface DateRangePreset {
  /** Text shown on the preset button. */
  label: string;
  /** Range applied when the preset is chosen. */
  value: DateRange;
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled range. Omit to let the picker own its value. */
  value?: DateRange;
  /** Initial range in uncontrolled mode. */
  defaultValue?: DateRange;
  /** Fired with the next range whenever a day or preset is chosen. */
  onChange?: (range: DateRange) => void;
  /** Number of month grids shown side by side. */
  months?: number;
  /** Shortcuts rendered next to the month grids. */
  presets?: DateRangePreset[];
  /** Earliest selectable date. */
  minDate?: Date;
  /** Latest selectable date. */
  maxDate?: Date;
  /** Return true to disable a specific day. */
  isDateDisabled?: (date: Date) => boolean;
  /** Trigger text while no dates are selected. */
  placeholder?: string;
  /** Formats a date in the trigger. */
  formatDate?: (date: Date) => string;
  /** Locale used for weekday, month and accessible day labels. */
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
  /** Disables the trigger and prevents opening the panel. */
  disabled?: boolean;
  /** Trigger size. Matches Select and Input heights. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Shows a clear button while a range is selected. */
  clearable?: boolean;
  /** Closes the panel once both ends of the range are picked. */
  closeOnSelect?: boolean;

  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the trigger button. */
  triggerClassName?: string;
  /** Additional classes for the calendar icon in the trigger. */
  iconClassName?: string;
  /** Additional classes for the floating panel. */
  panelClassName?: string;
  /** Additional classes for each preset button. */
  presetClassName?: string;
  /** Additional classes for each day button. */
  dayClassName?: string;
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

const stripTime = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const dayKey = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const sameDay = (a: Date | undefined, b: Date | undefined) =>
  Boolean(a && b && stripTime(a).getTime() === stripTime(b).getTime());

function buildMonth(view: Date, weekStartsOn: 0 | 1) {
  const offset = (view.getDay() - weekStartsOn + 7) % 7;
  return Array.from({ length: 42 }, (_, index) =>
    stripTime(new Date(view.getFullYear(), view.getMonth(), 1 - offset + index)),
  );
}

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

export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  function DateRangePicker(
    {
      value,
      defaultValue,
      onChange,
      months = 1,
      presets,
      minDate,
      maxDate,
      isDateDisabled,
      placeholder = "Select date range",
      formatDate,
      locale,
      weekStartsOn = 1,
      label,
      helperText,
      error,
      success = false,
      required = false,
      disabled = false,
      size = "md",
      clearable = true,
      closeOnSelect = true,
      className,
      style,
      labelClassName,
      triggerClassName,
      iconClassName,
      panelClassName,
      presetClassName,
      dayClassName,
      helperClassName,
      triggerStyle,
      panelStyle,
      ...rest
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

    const [range, setRange] = useControllableState<DateRange>({
      value,
      defaultValue: defaultValue ?? {},
      onChange,
    });
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState<Date | null>(null);
    const [view, setView] = useState<Date>(() => {
      const base = range.from ?? new Date();
      return new Date(base.getFullYear(), base.getMonth(), 1);
    });

    const rootRef = useRef<HTMLDivElement | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const coords = useAnchoredPanel(open, triggerRef, panelRef);

    const format = useCallback(
      (date: Date) =>
        formatDate ? formatDate(date) : date.toLocaleDateString(locale),
      [formatDate, locale],
    );

    const monthCount = Math.max(1, Math.round(months));
    const visibleMonths = useMemo(
      () =>
        Array.from({ length: monthCount }, (_, index) =>
          new Date(view.getFullYear(), view.getMonth() + index, 1),
        ),
      [view, monthCount],
    );

    const weekdays = useMemo(
      () =>
        Array.from({ length: 7 }, (_, index) => {
          const date = new Date(2023, 0, 1 + ((index + weekStartsOn) % 7));
          return {
            short: date.toLocaleDateString(locale, { weekday: "narrow" }),
            long: date.toLocaleDateString(locale, { weekday: "long" }),
          };
        }),
      [locale, weekStartsOn],
    );

    const min = minDate ? stripTime(minDate) : null;
    const max = maxDate ? stripTime(maxDate) : null;
    const isDisabled = (date: Date) =>
      Boolean(
        (min && date < min) || (max && date > max) || isDateDisabled?.(date),
      );
    const today = stripTime(new Date());

    const closePanel = useCallback((restoreFocus: boolean) => {
      setOpen(false);
      setHovered(null);
      if (restoreFocus) triggerRef.current?.focus();
    }, []);

    // Re-center the view on the current start date every time the panel opens.
    useEffect(() => {
      if (!open) return;
      const base = range.from ?? new Date();
      setView(new Date(base.getFullYear(), base.getMonth(), 1));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

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

    const selectDay = (date: Date) => {
      if (isDisabled(date)) return;
      if (!range.from || range.to || date < range.from) {
        setRange({ from: date, to: undefined });
        return;
      }
      setRange({ from: range.from, to: date });
      setHovered(null);
      if (closeOnSelect) closePanel(true);
    };

    const focusDay = (date: Date) => {
      const first = visibleMonths[0];
      const last = visibleMonths[visibleMonths.length - 1];
      const lastDay = new Date(last.getFullYear(), last.getMonth() + 1, 0);
      if (date < first) {
        setView(new Date(date.getFullYear(), date.getMonth(), 1));
      } else if (date > lastDay) {
        setView(
          new Date(date.getFullYear(), date.getMonth() - (monthCount - 1), 1),
        );
      }
      requestAnimationFrame(() => {
        panelRef.current
          ?.querySelector<HTMLButtonElement>(`[data-day="${dayKey(date)}"]`)
          ?.focus();
      });
    };

    const onDayKeyDown = (event: React.KeyboardEvent, date: Date) => {
      const offsets: Record<string, number> = {
        ArrowLeft: -1,
        ArrowRight: 1,
        ArrowUp: -7,
        ArrowDown: 7,
      };
      let target: Date | null = null;
      if (event.key in offsets) {
        target = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + offsets[event.key],
        );
      } else if (event.key === "PageUp" || event.key === "PageDown") {
        const delta = event.key === "PageUp" ? -1 : 1;
        target = new Date(date.getFullYear(), date.getMonth() + delta, date.getDate());
      } else if (event.key === "Home" || event.key === "End") {
        const offset = (date.getDay() - weekStartsOn + 7) % 7;
        target = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + (event.key === "Home" ? -offset : 6 - offset),
        );
      }
      if (target) {
        event.preventDefault();
        if (range.from && !range.to) setHovered(target);
        focusDay(target);
      }
    };

    // Preview end while choosing: the hovered/focused day stands in for `to`.
    const previewEnd =
      range.from && !range.to && hovered && hovered >= range.from
        ? hovered
        : range.to;

    const hasValue = Boolean(range.from || range.to);
    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const bottomText = errorMessage ?? helperText;
    const display = range.from
      ? `${format(range.from)} - ${range.to ? format(range.to) : "..."}`
      : placeholder;

    const presetActive = (preset: DateRangePreset) =>
      sameDay(preset.value.from, range.from) && sameDay(preset.value.to, range.to);

    // Exactly one day is in the tab order: the start date, else today, else
    // the first day of the first visible month.
    const focusTarget = (() => {
      const first = visibleMonths[0];
      const last = visibleMonths[visibleMonths.length - 1];
      const end = new Date(last.getFullYear(), last.getMonth() + 1, 0);
      const inView = (date?: Date) =>
        Boolean(date && stripTime(date) >= first && stripTime(date) <= end);
      if (range.from && inView(range.from)) return stripTime(range.from);
      if (inView(today)) return today;
      return first;
    })();

    const navButton =
      "text-muted-foreground hover:text-foreground focus-visible:ring-offset-popover disabled:pointer-events-none disabled:opacity-30";

    const canGoBack = !min || new Date(view.getFullYear(), view.getMonth(), 0) >= min;
    const lastVisible = visibleMonths[visibleMonths.length - 1];
    const canGoForward =
      !max ||
      new Date(lastVisible.getFullYear(), lastVisible.getMonth() + 1, 1) <= max;

    return (
      <div
        ref={(element) => {
          rootRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={cn("w-full space-y-1.5", className)}
        style={style}
        {...rest}
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
          <CalendarDays
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
              clearable && hasValue && !disabled && config.withClear,
              triggerClassName,
            )}
            style={triggerStyle}
          >
            <span
              className={cn(
                "flex-1 truncate tabular-nums",
                range.from ? "text-foreground" : "text-muted-foreground",
              )}
            >
              {display}
            </span>
          </button>

          {clearable && hasValue && !disabled && (
            <button
              type="button"
              aria-label="Clear date range"
              onClick={() => {
                setRange({});
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
              aria-label={label ? `${label}: choose dates` : "Choose date range"}
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
                "fixed z-50 max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] overflow-auto rounded-xl border border-border bg-popover p-3 text-popover-foreground shadow-xl",
                !coords && "invisible",
                panelClassName,
              )}
              style={{ top: coords?.top ?? 0, left: coords?.left ?? 0, ...panelStyle }}
            >
              <div className="flex flex-col gap-3 sm:flex-row">
                {presets && presets.length > 0 && (
                  <div
                    role="group"
                    aria-label="Presets"
                    className="flex flex-wrap gap-1 border-b border-border pb-3 sm:w-36 sm:flex-col sm:flex-nowrap sm:border-b-0 sm:border-r sm:pb-0 sm:pr-3"
                  >
                    {presets.map((preset) => {
                      const active = presetActive(preset);
                      return (
                        <button
                          key={preset.label}
                          type="button"
                          aria-pressed={active}
                          onClick={() => {
                            setRange(preset.value);
                            if (preset.value.from) {
                              setView(
                                new Date(
                                  preset.value.from.getFullYear(),
                                  preset.value.from.getMonth(),
                                  1,
                                ),
                              );
                            }
                            if (closeOnSelect) closePanel(true);
                          }}
                          className={cn(
                            "rounded-md px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-accent",
                            presetClassName,
                          )}
                        >
                          {preset.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                <div className="min-w-0">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <IconButton
                      variant="ghost"
                      size="xs"
                      aria-label="Previous month"
                      disabled={!canGoBack}
                      icon={<ChevronLeft />}
                      onClick={() =>
                        setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
                      }
                      className={navButton}
                    />
                    <div
                      aria-live="polite"
                      className="flex flex-1 justify-around gap-4 text-sm font-semibold text-foreground"
                    >
                      {visibleMonths.map((month) => (
                        <span key={month.getTime()}>
                          {month.toLocaleDateString(locale, {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      ))}
                    </div>
                    <IconButton
                      variant="ghost"
                      size="xs"
                      aria-label="Next month"
                      disabled={!canGoForward}
                      icon={<ChevronRight />}
                      onClick={() =>
                        setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
                      }
                      className={navButton}
                    />
                  </div>

                  <div className="flex flex-wrap gap-4 sm:flex-nowrap">
                    {visibleMonths.map((month) => (
                      <div
                        key={month.getTime()}
                        role="group"
                        aria-label={month.toLocaleDateString(locale, {
                          month: "long",
                          year: "numeric",
                        })}
                        className="w-64 max-w-full select-none"
                        onMouseLeave={() => setHovered(null)}
                      >
                        <div aria-hidden="true" className="grid grid-cols-7 text-center">
                          {weekdays.map((weekday, index) => (
                            <span
                              key={index}
                              title={weekday.long}
                              className="py-1 text-[11px] font-medium text-muted-foreground"
                            >
                              {weekday.short}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-7 gap-y-0.5">
                          {buildMonth(month, weekStartsOn).map((day) => {
                            if (day.getMonth() !== month.getMonth()) {
                              return <span key={day.getTime()} aria-hidden="true" className="h-8" />;
                            }
                            const isStart = sameDay(day, range.from);
                            const isEnd = sameDay(day, previewEnd);
                            const inRange = Boolean(
                              range.from && previewEnd && day > range.from && day < previewEnd,
                            );
                            const isPreview = !range.to && Boolean(hovered);
                            const unavailable = isDisabled(day);
                            const isToday = day.getTime() === today.getTime();
                            const isFocusTarget = day.getTime() === focusTarget.getTime();
                            return (
                              <button
                                key={day.getTime()}
                                type="button"
                                data-day={dayKey(day)}
                                tabIndex={isFocusTarget ? 0 : -1}
                                disabled={unavailable}
                                aria-pressed={isStart || isEnd}
                                aria-current={isToday ? "date" : undefined}
                                aria-label={`${day.toLocaleDateString(locale, {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}${isStart ? ", range start" : ""}${isEnd && range.to ? ", range end" : ""}`}
                                onClick={() => selectDay(day)}
                                onMouseEnter={() => range.from && !range.to && setHovered(day)}
                                onKeyDown={(event) => onDayKeyDown(event, day)}
                                className={cn(
                                  "flex h-8 w-full items-center justify-center text-xs tabular-nums transition-colors",
                                  "focus-visible:relative focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                  "disabled:pointer-events-none disabled:opacity-30",
                                  isStart || isEnd
                                    ? "rounded-lg bg-primary font-semibold text-primary-foreground"
                                    : inRange
                                      ? cn(
                                          "rounded-none text-accent-foreground",
                                          isPreview ? "bg-accent/60" : "bg-accent",
                                        )
                                      : cn(
                                          "rounded-lg text-foreground hover:bg-accent",
                                          isToday && "border border-primary/50 font-semibold text-primary",
                                        ),
                                  dayClassName,
                                )}
                              >
                                {day.getDate()}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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

DateRangePicker.displayName = "DateRangePicker";
