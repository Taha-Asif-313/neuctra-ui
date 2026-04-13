"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  name?: string;
  options: Option[];
  selectedValue?: string;
  onChange?: (value: string) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /** Root */
  className?: string;
  style?: React.CSSProperties;

  /** Item (label wrapper) */
  itemClassName?: string;
  itemStyle?: React.CSSProperties;

  /** Label text */
  labelClassName?: string;
  labelStyle?: React.CSSProperties;

  /** Radio icon wrapper */
  iconClassName?: string;
  iconStyle?: React.CSSProperties;

  /** Inner dot */
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;

  /** Error */
  errorClassName?: string;
  errorStyle?: React.CSSProperties;

  /** Sizes & colors (optional fallback) */
  iconSize?: number;
  iconCheckedBgColor?: string;
  iconUncheckedBorderColor?: string;

  /** 🔥 Render override (ultimate customization) */
  renderItem?: (params: {
    option: Option;
    checked: boolean;
    focused: boolean;
    disabled: boolean;
    onSelect: () => void;
  }) => React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,

  disabled = false,
  readOnly = false,
  required = false,
  error,

  className,
  style,

  itemClassName,
  itemStyle,

  labelClassName,
  labelStyle,

  iconClassName,
  iconStyle,

  indicatorClassName,
  indicatorStyle,

  errorClassName,
  errorStyle,

  iconSize = 20,
  iconCheckedBgColor,
  iconUncheckedBorderColor,

  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      const currentIndex =
        focusedIndex ??
        options.findIndex((o) => o.value === selectedValue) ??
        0;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        onChange?.(options[nextIndex].value);
        setFocusedIndex(nextIndex);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange?.(options[prevIndex].value);
        setFocusedIndex(prevIndex);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValue, onChange, disabled]);

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      tabIndex={0}
      aria-disabled={disabled}
      aria-invalid={!!error}
      className={clsx("flex flex-col gap-2 text-foreground", className)}
      style={style}
    >
      {options.map((option, index) => {
        const checked = selectedValue === option.value;
        const focused = focusedIndex === index;

        const onSelect = () => {
          if (disabled || readOnly) return;
          onChange?.(option.value);
          setFocusedIndex(index);
        };

        // 🔥 FULL CUSTOM RENDER
        if (renderItem) {
          return (
            <React.Fragment key={option.value}>
              {renderItem({
                option,
                checked,
                focused,
                disabled,
                onSelect,
              })}
            </React.Fragment>
          );
        }

        // Default UI (shadcn-like)
        return (
          <label
            key={option.value}
            className={clsx(
              "flex items-center justify-between gap-2 cursor-pointer select-none rounded-md px-2 py-1 transition-colors",
              "text-foreground hover:bg-accent",
              focused && "ring-2 ring-border",
              disabled && "opacity-50 cursor-not-allowed",
              itemClassName
            )}
            style={itemStyle}
            onClick={onSelect}
          >
            {/* Label */}
            <span
              className={clsx("text-sm text-foreground", labelClassName)}
              style={labelStyle}
            >
              {option.label}
            </span>

            {/* Hidden input */}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              disabled={disabled || readOnly}
              required={required}
              onChange={onSelect}
              className="hidden"
            />

            {/* Icon */}
            <span
              className={clsx(
                "inline-flex items-center justify-center rounded-full transition-all border border-border bg-background",
                iconClassName
              )}
              style={{
                width: iconSize,
                height: iconSize,
                borderColor: checked
                  ? "hsl(var(--primary))"
                  : "hsl(var(--border))",
                backgroundColor: checked
                  ? "hsl(var(--primary))"
                  : "transparent",
                ...iconStyle,
              }}
            >
              {checked && (
                <span
                  className={clsx(
                    "rounded-full bg-background",
                    indicatorClassName
                  )}
                  style={{
                    width: iconSize / 2,
                    height: iconSize / 2,
                    ...indicatorStyle,
                  }}
                />
              )}
            </span>
          </label>
        );
      })}

      {error && (
        <p
          role="alert"
          className={clsx(
            "text-xs text-destructive mt-1",
            errorClassName
          )}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};