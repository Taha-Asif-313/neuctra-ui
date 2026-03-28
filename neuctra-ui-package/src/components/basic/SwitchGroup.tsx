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
  className?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  iconSize?: number;
  iconCheckedBgColor?: string;
  switchBgColor?: string;
  textColor?: string;
  errorStyle?: React.CSSProperties;
  darkMode?: boolean;
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
  style,
  labelStyle,
  iconSize = 20,
  iconCheckedBgColor = "#2563eb",
  switchBgColor = "#d1d5db",
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

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;

      if (focusedIndex === null) return;
      const currentIndex = focusedIndex;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        setFocusedIndex(nextIndex);
      }

      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        setFocusedIndex(prevIndex);
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

            {/* Switch */}
            <span
              className={clsx("relative inline-flex rounded-full transition-colors")}
              style={{
                width: iconSize * 2,
                height: iconSize * 1.1,
                backgroundColor: isChecked
                  ? iconCheckedBgColor
                  : switchBgColor,
                transition: "background-color 0.25s ease",
                borderRadius: 9999,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  left: isChecked
                    ? `calc(100% - ${iconSize - 4}px - 2px)`
                    : "2px",
                  transform: "translateY(-50%)",
                  width: iconSize - 4,
                  height: iconSize - 4,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
                  transition: "left 0.25s ease",
                }}
              />
            </span>
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