"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "../../lib/cn";
import { useControllableState } from "../../lib/useControllableState";

export interface RangeSliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled [minimum, maximum] pair. */
  value?: [number, number];
  /** Initial pair in uncontrolled mode. */
  defaultValue?: [number, number];
  /** Fired with the next pair as either handle moves. */
  onChange?: (value: [number, number]) => void;
  /** Fired once when the user releases a handle (pointer up or key up). */
  onChangeEnd?: (value: [number, number]) => void;
  /** Lowest selectable value. */
  min?: number;
  /** Highest selectable value. */
  max?: number;
  /** Increment between values. */
  step?: number;
  /** Smallest allowed gap between the two handles. */
  minDistance?: number;
  /** Formats the value labels and the handles' aria-valuetext. */
  formatValue?: (value: number) => string;
  /** Values marked with a label below the track. */
  marks?: number[];
  /** Accessible label for the lower handle. */
  minLabel?: string;
  /** Accessible label for the upper handle. */
  maxLabel?: string;
  /** Label rendered above the track. When set, the values show at the right of the label row. */
  label?: string;
  /** Shows the formatted values above the track. */
  showValues?: boolean;
  /** Track and handle scale. */
  size?: "sm" | "md" | "lg";
  /** Disables both handles. */
  disabled?: boolean;
  /** Form field names for the lower and upper values. */
  name?: [string, string];
  /** Additional classes for the label row. */
  labelRowClassName?: string;
  /** Additional classes for the label text. */
  labelClassName?: string;
  /** Additional classes for the value text. */
  valueClassName?: string;
  /** Additional classes for the background track. */
  trackClassName?: string;
  /** Additional classes for the filled range between the handles. */
  rangeClassName?: string;
  /** Additional classes for both native range inputs (style handles with `[&::-webkit-slider-thumb]:` variants). */
  thumbClassName?: string;
  /** Additional classes for the marks row. */
  marksClassName?: string;
  /** Additional classes for each mark. */
  markClassName?: string;
}

const sizeConfig = {
  sm: {
    thumbPx: 14,
    height: "h-3.5",
    track: "h-1",
    thumb:
      "[&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5",
  },
  md: {
    thumbPx: 16,
    height: "h-4",
    track: "h-1.5",
    thumb:
      "[&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
  },
  lg: {
    thumbPx: 20,
    height: "h-5",
    track: "h-2",
    thumb:
      "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
  },
} as const;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
  function RangeSlider(
    {
      value,
      defaultValue,
      onChange,
      onChangeEnd,
      min = 0,
      max = 100,
      step = 1,
      minDistance = 0,
      formatValue = String,
      marks,
      minLabel = "Minimum value",
      maxLabel = "Maximum value",
      label,
      showValues = true,
      size = "md",
      disabled = false,
      name,
      className,
      style,
      labelRowClassName,
      labelClassName,
      valueClassName,
      trackClassName,
      rangeClassName,
      thumbClassName,
      marksClassName,
      markClassName,
      ...rest
    },
    ref,
  ) {
    const id = useId();
    const labelId = `${id}-label`;
    const config = sizeConfig[size] ?? sizeConfig.md;

    const [range, setRange] = useControllableState<[number, number]>({
      value,
      defaultValue: defaultValue ?? [min, max],
      onChange,
    });

    const lower = clamp(Math.min(range[0], range[1]), min, max);
    const upper = clamp(Math.max(range[0], range[1]), min, max);
    const span = max - min || 1;
    const gap = Math.max(0, minDistance);
    const percent = (input: number) => ((input - min) / span) * 100;

    const setLower = (next: number) =>
      setRange([clamp(Math.min(next, upper - gap), min, max), upper]);
    const setUpper = (next: number) =>
      setRange([lower, clamp(Math.max(next, lower + gap), min, max)]);

    // When both handles meet, the one that can still move must be on top:
    // in the upper half that is the lower handle (it can only go left).
    const lowerOnTop = lower >= upper - gap && lower > min + span / 2;

    // The native thumb centre travels from thumb/2 to (width - thumb/2), so
    // the fill is offset by the same amount to stay under the handles.
    const half = config.thumbPx / 2;
    const position = (p: number) =>
      `calc(${half}px + (100% - ${config.thumbPx}px) * ${p / 100})`;

    const inputClasses = cn(
      "pointer-events-none absolute inset-0 w-full appearance-none bg-transparent outline-none",
      config.height,
      "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent",
      "[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
      "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary [&::-webkit-slider-thumb]:bg-background",
      "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
      "[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2",
      "[&::-moz-range-thumb]:border-primary [&::-moz-range-thumb]:bg-background",
      "focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-ring",
      "focus-visible:[&::-moz-range-thumb]:ring-2 focus-visible:[&::-moz-range-thumb]:ring-ring",
      "motion-reduce:[&::-webkit-slider-thumb]:transition-none",
      disabled
        ? "[&::-webkit-slider-thumb]:cursor-not-allowed [&::-moz-range-thumb]:cursor-not-allowed"
        : "[&::-webkit-slider-thumb]:cursor-grab [&::-moz-range-thumb]:cursor-grab",
      config.thumb,
      thumbClassName,
    );

    const release = () => onChangeEnd?.([lower, upper]);

    const valuesText = (
      <span
        className={cn(
          "text-xs font-medium tabular-nums text-muted-foreground",
          valueClassName,
        )}
      >
        {formatValue(lower)} - {formatValue(upper)}
      </span>
    );

    return (
      <div
        ref={ref}
        role="group"
        aria-labelledby={label ? labelId : undefined}
        aria-disabled={disabled || undefined}
        className={cn(
          "w-full select-none",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={style}
        {...rest}
      >
        {label ? (
          <div
            className={cn(
              "mb-2 flex items-baseline justify-between gap-2",
              labelRowClassName,
            )}
          >
            <span
              id={labelId}
              className={cn(
                "text-[13px] font-medium leading-none text-foreground",
                labelClassName,
              )}
            >
              {label}
            </span>
            {showValues && valuesText}
          </div>
        ) : (
          showValues && (
            <div
              className={cn(
                "mb-2 flex items-center justify-between text-sm tabular-nums",
                labelRowClassName,
              )}
            >
              <span className={cn("font-medium text-foreground", valueClassName)}>
                {formatValue(lower)}
              </span>
              <span className={cn("font-medium text-foreground", valueClassName)}>
                {formatValue(upper)}
              </span>
            </div>
          )
        )}

        <div className={cn("relative w-full", config.height)}>
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-x-0 top-1/2 -translate-y-1/2 rounded-full bg-muted",
              config.track,
              trackClassName,
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full bg-primary",
              config.track,
              rangeClassName,
            )}
            style={{
              left: position(percent(lower)),
              width: `calc((100% - ${config.thumbPx}px) * ${(upper - lower) / span})`,
            }}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={lower}
            name={name?.[0]}
            disabled={disabled}
            aria-label={minLabel}
            aria-valuetext={formatValue(lower)}
            onChange={(event) => setLower(Number(event.target.value))}
            onPointerUp={release}
            onKeyUp={release}
            className={cn(inputClasses, lowerOnTop ? "z-20" : "z-10")}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={upper}
            name={name?.[1]}
            disabled={disabled}
            aria-label={maxLabel}
            aria-valuetext={formatValue(upper)}
            onChange={(event) => setUpper(Number(event.target.value))}
            onPointerUp={release}
            onKeyUp={release}
            className={cn(inputClasses, lowerOnTop ? "z-10" : "z-20")}
          />
        </div>

        {marks && marks.length > 0 && (
          <div
            className={cn(
              "relative mt-2 h-4 w-full text-[11px] text-muted-foreground",
              marksClassName,
            )}
          >
            {marks.map((mark) => {
              const markPercent = percent(clamp(mark, min, max));
              return (
                <span
                  key={mark}
                  className={cn(
                    "absolute whitespace-nowrap",
                    markPercent <= 0
                      ? "translate-x-0"
                      : markPercent >= 100
                        ? "-translate-x-full"
                        : "-translate-x-1/2",
                    markClassName,
                  )}
                  style={{
                    left:
                      markPercent <= 0
                        ? 0
                        : markPercent >= 100
                          ? "100%"
                          : position(markPercent),
                  }}
                >
                  {formatValue(mark)}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

RangeSlider.displayName = "RangeSlider";
