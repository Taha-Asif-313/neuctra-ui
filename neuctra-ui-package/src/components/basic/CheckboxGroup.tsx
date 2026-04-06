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
  name?: string;
  options: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /** 🌈 Customization */
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

  /** 🎨 Icon customization */
  customIcon?: (checked: boolean, option: Option) => React.ReactNode;
  iconSize?: number;

  /** 🎯 Colors */
  checkedColor?: string;
  uncheckedColor?: string;
  checkmarkColor?: string;
  textColor?: string;

  /** 🌙 Dark Mode */
  darkMode?: boolean;

  /** 🧠 Advanced render override */
  renderItem?: (params: {
    option: Option;
    checked: boolean;
    focused: boolean;
    toggle: () => void;
  }) => React.ReactNode;
}

/* =========================
   Component
========================= */
export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  options,
  selectedValues = [],
  onChange,

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

  checkedColor,
  uncheckedColor,
  checkmarkColor,
  textColor,

  darkMode = false,

  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const isDark = darkMode;

  /* =========================
     Theme Defaults
  ========================= */
  const colors = {
    checked: checkedColor || (isDark ? "#6366f1" : "var(--primary)"),
    unchecked: uncheckedColor || (isDark ? "#4b5563" : "#9ca3af"),
    text: textColor,
    checkmark: checkmarkColor || "#ffffff",
    error: "#dc2626",
  };

  /* =========================
     Toggle
  ========================= */
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
        setFocusedIndex(
          (prev) => (prev! - 1 + options.length) % options.length,
        );
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleChange(options[focusedIndex].value);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValues, disabled]);

  /* =========================
     Default Icon
  ========================= */
  const DefaultIcon = (checked: boolean) => (
    <span
      className={clsx("inline-flex items-center justify-center", iconClassName)}
      style={{
        width: iconSize,
        height: iconSize,
        borderRadius: 4,
        border: `2px solid ${checked ? colors.checked : colors.unchecked}`,
        background: checked ? colors.checked : "transparent",
        transition: "all 0.2s ease",
        ...iconStyle,
      }}
    >
      {checked && (
        <svg
          viewBox="0 0 24 24"
          stroke={colors.checkmark}
          fill="none"
          strokeWidth={3}
          style={{ width: iconSize * 0.6, height: iconSize * 0.6 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );

  /* =========================
     Render
  ========================= */
  return (
    <div
      ref={containerRef}
      role="group"
      tabIndex={0}
      aria-disabled={disabled}
      aria-invalid={!!error}
      className={clsx("flex flex-col gap-2", className, containerClassName)}
      style={{ ...style, ...containerStyle }}
    >
      {options.map((option, index) => {
        const checked = selectedValues.includes(option.value);
        const focused = focusedIndex === index;

        const toggle = () => handleChange(option.value);

        /* 🔥 Custom render override */
        if (renderItem) {
          return (
            <React.Fragment key={option.value}>
              {renderItem({ option, checked, focused, toggle })}
            </React.Fragment>
          );
        }

        return (
          <label
            key={option.value}
            onFocus={() => setFocusedIndex(index)}
            className={clsx(
              "flex items-center justify-between cursor-pointer transition",
              disabled && "opacity-50 cursor-not-allowed",
              focused && "ring-2 ring-blue-400",
              itemClassName,
              labelClassName,
            )}
            style={{ ...itemStyle, ...labelStyle }}
          >
            <span
              className={clsx("text-sm", textClassName)}
              style={{
                ...(textColor ? { color: textColor } : {}),
                ...textStyle,
              }}
            >
              {option.label}
            </span>

            <input
              type="checkbox"
              hidden
              name={name}
              value={option.value}
              checked={checked}
              disabled={disabled || readOnly || option.disabled}
              required={required}
              onChange={toggle}
            />

            {customIcon ? customIcon(checked, option) : DefaultIcon(checked)}
          </label>
        );
      })}

      {error && (
        <p
          role="alert"
          className={errorClassName}
          style={{
            color: colors.error,
            fontSize: 12,
            marginTop: 4,
            ...errorStyle,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
