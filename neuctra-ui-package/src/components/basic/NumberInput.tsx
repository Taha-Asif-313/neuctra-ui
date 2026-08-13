"use client";

import React, { forwardRef, useId, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/cn";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size" | "type"
  > {
  value?: number | null;
  defaultValue?: number;
  /** Fired with the parsed number, or null when the field is empty. */
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  wrapperClassName?: string;
}

const SIZES = {
  sm: { input: "h-8 text-xs", button: "w-8 [&_svg]:h-3 [&_svg]:w-3" },
  md: { input: "h-10 text-sm", button: "w-10 [&_svg]:h-3.5 [&_svg]:w-3.5" },
  lg: { input: "h-12 text-base", button: "w-12 [&_svg]:h-4 [&_svg]:w-4" },
} as const;

const clamp = (n: number, min?: number, max?: number) => {
  if (min !== undefined && n < min) return min;
  if (max !== undefined && n > max) return max;
  return n;
};

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  function NumberInput(
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      label,
      error,
      helperText,
      size = "md",
      disabled,
      id,
      className,
      wrapperClassName,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const describedBy = helperText || error ? `${fieldId}-description` : undefined;
    const sizes = SIZES[size] ?? SIZES.md;

    // The raw string is kept so intermediate states ("-", "1.", "") don't get
    // eaten while typing; the parsed number is what consumers receive.
    const [raw, setRaw] = useState(
      defaultValue !== undefined ? String(defaultValue) : "",
    );
    const isControlled = value !== undefined;
    const displayed = isControlled ? (value === null ? "" : String(value)) : raw;
    const parsed = displayed === "" ? null : Number(displayed);

    const commit = (next: number | null) => {
      if (!isControlled) setRaw(next === null ? "" : String(next));
      onChange?.(next);
    };

    const nudge = (direction: 1 | -1) => {
      const base = parsed !== null && !Number.isNaN(parsed) ? parsed : min ?? 0;
      commit(clamp(base + direction * step, min, max));
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (!/^-?\d*\.?\d*$/.test(text)) return;
      if (!isControlled) setRaw(text);
      const n = text === "" || text === "-" ? null : Number(text);
      onChange?.(n !== null && Number.isNaN(n) ? null : n);
    };

    const handleBlur = () => {
      if (parsed === null || Number.isNaN(parsed)) return;
      const clamped = clamp(parsed, min, max);
      if (clamped !== parsed) commit(clamped);
    };

    const stepperButton =
      "flex shrink-0 items-center justify-center text-muted-foreground transition-colors " +
      "hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40 " +
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring";

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="mb-1.5 block text-[13px] font-medium leading-none text-foreground"
          >
            {label}
          </label>
        )}

        <div
          className={cn(
            "flex w-full items-stretch overflow-hidden rounded-lg border bg-transparent transition-colors",
            "dark:bg-input/30",
            error ? "border-destructive" : "border-input",
            "focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring",
            disabled && "opacity-50",
          )}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrease value"
            disabled={disabled || (parsed !== null && min !== undefined && parsed <= min)}
            onClick={() => nudge(-1)}
            className={cn(stepperButton, sizes.button, "border-r border-input")}
          >
            <Minus aria-hidden="true" />
          </button>

          <input
            ref={ref}
            id={fieldId}
            type="text"
            inputMode="decimal"
            role="spinbutton"
            aria-valuenow={parsed ?? undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            value={displayed}
            onChange={handleInput}
            onBlur={handleBlur}
            onKeyDown={(e) => {
              if (e.key === "ArrowUp") {
                e.preventDefault();
                nudge(1);
              } else if (e.key === "ArrowDown") {
                e.preventDefault();
                nudge(-1);
              }
            }}
            disabled={disabled}
            className={cn(
              "w-full min-w-0 flex-1 bg-transparent text-center text-foreground outline-none",
              "placeholder:text-muted-foreground disabled:cursor-not-allowed",
              sizes.input,
              className,
            )}
            {...rest}
          />

          <button
            type="button"
            tabIndex={-1}
            aria-label="Increase value"
            disabled={disabled || (parsed !== null && max !== undefined && parsed >= max)}
            onClick={() => nudge(1)}
            className={cn(stepperButton, sizes.button, "border-l border-input")}
          >
            <Plus aria-hidden="true" />
          </button>
        </div>

        {(helperText || error) && (
          <p
            id={describedBy}
            role={error ? "alert" : undefined}
            className={cn(
              "mt-1.5 text-xs font-medium",
              error ? "text-destructive" : "text-muted-foreground",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
