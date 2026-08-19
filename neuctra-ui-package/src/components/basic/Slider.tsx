"use client";

import React, { forwardRef, useId, useState } from "react";
import { cn } from "../../lib/cn";

export interface SliderProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size" | "type"
  > {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  /** Show the current value at the right edge of the label row. */
  showValue?: boolean;
  /** Format the displayed value (e.g. v => `${v}%`). */
  formatValue?: (value: number) => React.ReactNode;
  /** Tick labels rendered under the track. */
  marks?: { value: number; label?: React.ReactNode }[];
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
  /** Row wrapping the label and the current-value text. */
  labelRowClassName?: string;
  labelClassName?: string;
  valueClassName?: string;
  /** Wrapper around the tick marks rendered under the track. */
  marksClassName?: string;
  /** Applied to each individual tick mark. */
  markClassName?: string;
}

const TRACK = {
  sm: "h-1 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:w-3.5 [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:w-3.5",
  md: "h-1.5 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4",
  lg: "h-2 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5",
} as const;

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  function Slider(
    {
      value,
      defaultValue,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      showValue = false,
      formatValue,
      marks,
      size = "md",
      disabled,
      id,
      className,
      wrapperClassName,
      labelRowClassName,
      labelClassName,
      valueClassName,
      marksClassName,
      markClassName,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const sliderId = id ?? generatedId;

    const [internal, setInternal] = useState(defaultValue ?? min);
    const current = value !== undefined ? value : internal;
    const percent = max === min ? 0 : ((current - min) / (max - min)) * 100;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {(label || showValue) && (
          <div
            className={cn(
              "mb-2 flex items-baseline justify-between gap-2",
              labelRowClassName,
            )}
          >
            {label && (
              <label
                htmlFor={sliderId}
                className={cn(
                  "text-[13px] font-medium leading-none text-foreground",
                  labelClassName,
                )}
              >
                {label}
              </label>
            )}
            {showValue && (
              <span
                className={cn(
                  "text-xs font-medium tabular-nums text-muted-foreground",
                  valueClassName,
                )}
              >
                {formatValue ? formatValue(current) : current}
              </span>
            )}
          </div>
        )}

        <input
          ref={ref}
          id={sliderId}
          type="range"
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
          disabled={disabled}
          // The filled part of the track is painted with a two-stop gradient;
          // native range tracks can't otherwise show progress cross-browser.
          style={{
            background: `linear-gradient(to right, var(--primary) ${percent}%, var(--muted) ${percent}%)`,
          }}
          className={cn(
            "w-full cursor-pointer appearance-none rounded-full outline-none transition-opacity",
            TRACK[size] ?? TRACK.md,
            // Thumb (WebKit + Firefox)
            "[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-primary",
            "[&::-webkit-slider-thumb]:bg-background [&::-webkit-slider-thumb]:shadow",
            "[&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110",
            "[&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full",
            "[&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-primary",
            "[&::-moz-range-thumb]:bg-background [&::-moz-range-thumb]:shadow",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            disabled && "cursor-not-allowed opacity-50",
            className,
          )}
          {...rest}
        />

        {marks && marks.length > 0 && (
          <div
            className={cn(
              "relative mt-1.5 h-4 text-[10px] text-muted-foreground",
              marksClassName,
            )}
          >
            {marks.map((mark) => {
              const markPercent =
                max === min ? 0 : ((mark.value - min) / (max - min)) * 100;
              return (
                <span
                  key={mark.value}
                  className={cn(
                    "absolute whitespace-nowrap",
                    // Edge marks align inward so they aren't half-clipped
                    // outside the track.
                    markPercent <= 0
                      ? "translate-x-0"
                      : markPercent >= 100
                        ? "-translate-x-full"
                        : "-translate-x-1/2",
                    markClassName,
                  )}
                  style={{ left: `${markPercent}%` }}
                >
                  {mark.label ?? mark.value}
                </span>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

Slider.displayName = "Slider";
