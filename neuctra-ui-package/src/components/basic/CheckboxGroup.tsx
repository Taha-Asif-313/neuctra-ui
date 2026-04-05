"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
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
  className?: string;
  customIcon?: (checked: boolean) => React.ReactNode;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  iconSize?: number;
  iconCheckedBgColor?: string;
  iconUncheckedBorderColor?: string;
  textColor?: string;
  errorStyle?: React.CSSProperties;
  darkMode?: boolean;
}

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
  customIcon,
  style,
  labelStyle,
  iconSize = 20,
  iconCheckedBgColor = "var(--primary)",
  iconUncheckedBorderColor = "#9ca3af",
  textColor = "#374151",
  errorStyle,
  darkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const handleChange = (value: string) => {
    if (!onChange || disabled || readOnly) return;
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  // Keyboard navigation (space/enter toggle)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      if (focusedIndex === null) return;

      const currentIndex = focusedIndex;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((currentIndex + 1) % options.length);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex((currentIndex - 1 + options.length) % options.length);
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleChange(options[currentIndex].value);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValues, disabled]);

  return (
    <div
      ref={containerRef}
      role="group"
      aria-disabled={disabled}
      aria-invalid={!!error}
      tabIndex={0}
      className={clsx("flex flex-col gap-2", className)}
      style={{ ...style }}
    >
      {options.map((option, index) => {
        const isChecked = selectedValues.includes(option.value);
        const isFocused = focusedIndex === index;

        return (
          <label
            key={option.value}
            className={clsx(
              "flex items-center justify-between cursor-pointer select-none transition-opacity",
              disabled ? "opacity-50 cursor-not-allowed" : "opacity-100",
              isFocused ? "ring-2 ring-blue-400" : ""
            )}
            style={{ ...labelStyle }}
            onFocus={() => setFocusedIndex(index)}
          >
            <span style={{ color: textColor, fontSize: 14 }}>{option.label}</span>

            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => handleChange(option.value)}
              style={{ display: "none" }}
            />

            {/* Custom or default icon */}
            {customIcon ? (
              customIcon(isChecked)
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: iconSize,
                  height: iconSize,
                  borderRadius: 4,
                  border: `2px solid ${
                    isChecked ? iconCheckedBgColor : iconUncheckedBorderColor
                  }`,
                  backgroundColor: isChecked ? iconCheckedBgColor : "transparent",
                  transition: "all 0.25s ease",
                }}
              >
                {isChecked && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: iconSize * 0.6, height: iconSize * 0.6 }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
            )}
          </label>
        );
      })}

      {error && (
        <p
          role="alert"
          style={{
            color: "#dc2626",
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