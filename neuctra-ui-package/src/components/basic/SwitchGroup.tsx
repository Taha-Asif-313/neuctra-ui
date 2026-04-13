"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface SwitchGroupProps {
  name?: string;
  options: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /** 🎨 Customization */
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  textClassName?: string;
  switchClassName?: string;
  thumbClassName?: string;
  errorClassName?: string;

  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  switchStyle?: React.CSSProperties;
  thumbStyle?: React.CSSProperties;
  errorStyle?: React.CSSProperties;

  /** ⚙️ Config */
  iconSize?: number;
}

export const SwitchGroup: React.FC<SwitchGroupProps> = ({
  name,
  options,
  selectedValues = [],
  onChange,

  disabled = false,
  readOnly = false,
  required = false,
  error,

  className,
  itemClassName,
  labelClassName,
  textClassName,
  switchClassName,
  thumbClassName,
  errorClassName,

  style,
  itemStyle,
  labelStyle,
  textStyle,
  switchStyle,
  thumbStyle,
  errorStyle,

  iconSize = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (value: string) => {
    if (!onChange || disabled || readOnly) return;

    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(updated);
  };

  /* =========================
     Keyboard Navigation
  ========================= */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || focusedIndex === null) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev! + 1) % options.length);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev! - 1 + options.length) % options.length);
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleChange(options[focusedIndex].value);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValues, disabled]);

  return (
    <div
      ref={containerRef}
      role="group"
      tabIndex={0}
      aria-disabled={disabled}
      aria-invalid={!!error}
      className={clsx("flex flex-col gap-2 text-foreground", className)}
      style={style}
    >
      {options.map((option, index) => {
        const checked = selectedValues.includes(option.value);
        const focused = focusedIndex === index;

        return (
          <label
            key={option.value}
            onFocus={() => setFocusedIndex(index)}
            className={clsx(
              "flex items-center justify-between cursor-pointer transition-colors",
              "text-foreground",
              "hover:bg-accent/40",
              disabled && "opacity-50 cursor-not-allowed",
              focused && "ring-2 ring-border",
              itemClassName,
              labelClassName
            )}
            style={{ ...itemStyle, ...labelStyle }}
          >
            {/* TEXT */}
            <span
              className={clsx("text-sm text-foreground", textClassName)}
              style={textStyle}
            >
              {option.label}
            </span>

            <input
              type="checkbox"
              hidden
              name={name}
              value={option.value}
              checked={checked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => handleChange(option.value)}
            />

            {/* SWITCH */}
            <span
              className={clsx(
                "relative inline-flex rounded-full transition-colors",
                checked ? "bg-primary" : "bg-muted",
                switchClassName
              )}
              style={{
                width: iconSize * 2,
                height: iconSize * 1.1,
                ...switchStyle,
              }}
            >
              {/* THUMB */}
              <span
                className={clsx(
                  "absolute top-1/2 -translate-y-1/2 rounded-full shadow",
                  "bg-background",
                  thumbClassName
                )}
                style={{
                  left: checked
                    ? `calc(100% - ${iconSize - 4}px - 2px)`
                    : "2px",
                  width: iconSize - 4,
                  height: iconSize - 4,
                  transition: "left 0.25s ease",
                  ...thumbStyle,
                }}
              />
            </span>
          </label>
        );
      })}

      {error && (
        <p
          role="alert"
          className={clsx("text-sm text-destructive", errorClassName)}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};