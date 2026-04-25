"use client";

import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

/* =========================
   Types
========================= */
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

interface CheckboxGroupProps {
  mode?: "single" | "group";

  name?: string;

  /* ---------- GROUP MODE ---------- */
  options?: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;

  /* ---------- SINGLE MODE ---------- */
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /* ---------- Styling ---------- */
  className?: string;
  containerClassName?: string;
  itemClassName?: string;
  labelClassName?: string;
  textClassName?: string;
  iconClassName?: string;
  errorClassName?: string;

  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
  errorStyle?: React.CSSProperties;

  /* ---------- Icon ---------- */
  customIcon?: (checked: boolean, option?: Option) => React.ReactNode;
  iconSize?: number;

  /* ---------- Advanced ---------- */
  renderItem?: (params: {
    option?: Option;
    checked: boolean;
    focused: boolean;
    toggle: () => void;
  }) => React.ReactNode;
}

/* =========================
   Component
========================= */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  mode = "group",

  name,

  options = [],
  selectedValues = [],
  onChange,

  label,
  checked = false,
  onCheckedChange,

  disabled = false,
  readOnly = false,
  required = false,
  error,

  className,
  containerClassName,
  itemClassName,
  labelClassName,
  textClassName,
  iconClassName,
  errorClassName,

  style,
  containerStyle,
  itemStyle,
  labelStyle,
  textStyle,
  iconStyle,
  errorStyle,

  customIcon,
  iconSize = 20,

  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  /* =========================
     Handlers
  ========================= */
  const handleGroupChange = (value: string) => {
    if (!onChange || disabled || readOnly) return;

    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(updated);
  };

  const handleSingleChange = () => {
    if (!onCheckedChange || disabled || readOnly) return;
    onCheckedChange(!checked);
  };

  /* =========================
     Keyboard Navigation (group only)
  ========================= */
  useEffect(() => {
    if (mode !== "group") return;

    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || focusedIndex === null) return;

      if (["ArrowDown", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        setFocusedIndex((prev) => (prev! + 1) % options.length);
      }

      if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
        e.preventDefault();
        setFocusedIndex((prev) => (prev! - 1 + options.length) % options.length);
      }

      if ([" ", "Enter"].includes(e.key)) {
        e.preventDefault();
        handleGroupChange(options[focusedIndex].value);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValues, disabled, mode]);

  /* =========================
     Default Icon
  ========================= */
  const DefaultIcon = (isChecked: boolean) => (
    <span
      className={clsx(
        "inline-flex items-center justify-center rounded border transition-colors",
        isChecked
          ? "border-primary bg-primary"
          : "border-border bg-transparent",
        iconClassName
      )}
      style={{
        width: iconSize,
        height: iconSize,
        ...iconStyle,
      }}
    >
      {isChecked && (
        <svg
          viewBox="0 0 24 24"
          className="text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          style={{ width: iconSize * 0.6, height: iconSize * 0.6 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );

  /* =========================
     Render Single
  ========================= */
  if (mode === "single") {
    const toggle = handleSingleChange;

    if (renderItem) {
      return (
        <div className={className} style={style}>
          {renderItem({
            checked,
            focused: false,
            toggle,
          })}
        </div>
      );
    }

    return (
      <div className={className} style={style}>
        <label
          className={clsx(
            "flex items-center justify-between cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed",
            itemClassName,
            labelClassName
          )}
          style={{ ...itemStyle, ...labelStyle }}
        >
          <span
            className={clsx("text-sm text-foreground", textClassName)}
            style={textStyle}
          >
            {label}
          </span>

          <input
            type="checkbox"
            hidden
            name={name}
            checked={checked}
            disabled={disabled || readOnly}
            required={required}
            onChange={toggle}
          />

          {customIcon ? customIcon(checked) : DefaultIcon(checked)}
        </label>

        {error && (
          <p
            className={clsx("text-sm text-destructive mt-1", errorClassName)}
            style={errorStyle}
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  /* =========================
     Render Group
  ========================= */
  return (
    <div
      ref={containerRef}
      role="group"
      tabIndex={0}
      className={clsx("flex flex-col gap-2", containerClassName || className)}
      style={containerStyle || style}
    >
      {options.map((option, index) => {
        const isChecked = selectedValues.includes(option.value);
        const focused = focusedIndex === index;

        const toggle = () => handleGroupChange(option.value);

        if (renderItem) {
          return (
            <React.Fragment key={option.value}>
              {renderItem({
                option,
                checked: isChecked,
                focused,
                toggle,
              })}
            </React.Fragment>
          );
        }

        return (
          <label
            key={option.value}
            onFocus={() => setFocusedIndex(index)}
            className={clsx(
              "flex items-center justify-between cursor-pointer",
              disabled && "opacity-50 cursor-not-allowed",
              itemClassName,
              labelClassName
            )}
            style={{ ...itemStyle, ...labelStyle }}
          >
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
              checked={isChecked}
              disabled={disabled || readOnly || option.disabled}
              required={required}
              onChange={toggle}
            />

            {customIcon
              ? customIcon(isChecked, option)
              : DefaultIcon(isChecked)}
          </label>
        );
      })}

      {error && (
        <p
          className={clsx("text-sm text-destructive mt-1", errorClassName)}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};