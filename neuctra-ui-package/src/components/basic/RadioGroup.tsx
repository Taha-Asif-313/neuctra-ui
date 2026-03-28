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
  className?: string;
  style?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  iconSize?: number;
  iconCheckedBgColor?: string;
  iconUncheckedBorderColor?: string;
  textColor?: string;
  errorStyle?: React.CSSProperties;
  darkMode?: boolean;
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
  labelStyle,
  iconSize = 20,
  iconCheckedBgColor = "#2563eb",
  iconUncheckedBorderColor = "#9ca3af",
  textColor = "#374151",
  errorStyle,
  darkMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  // Keyboard navigation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled) return;
      const currentIndex = focusedIndex ?? options.findIndex((o) => o.value === selectedValue) ?? 0;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        const nextIndex = (currentIndex + 1) % options.length;
        onChange && onChange(options[nextIndex].value);
        setFocusedIndex(nextIndex);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        const prevIndex = (currentIndex - 1 + options.length) % options.length;
        onChange && onChange(options[prevIndex].value);
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
      aria-disabled={disabled}
      aria-invalid={!!error}
      className={clsx("flex flex-col gap-2", className)}
      style={{ ...style }}
      tabIndex={0} // allow keyboard focus
    >
      {options.map((option, index) => {
        const isChecked = selectedValue === option.value;
        const isFocused = focusedIndex === index;

        return (
          <label
            key={option.value}
            className={clsx(
              "flex items-center justify-between cursor-pointer select-none gap-2",
              disabled ? "opacity-50 cursor-not-allowed" : "opacity-100",
              isFocused ? "ring-2 ring-blue-400" : "",
            )}
            style={{ ...labelStyle }}
          >
            <span style={{ color: textColor, fontSize: 14 }}>{option.label}</span>

            <input
              type="radio"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => onChange && onChange(option.value)}
              style={{ display: "none" }}
            />

            <span
              className={clsx("inline-flex items-center justify-center rounded-full transition-all")}
              style={{
                width: iconSize,
                height: iconSize,
                border: `2px solid ${isChecked ? iconCheckedBgColor : iconUncheckedBorderColor}`,
                backgroundColor: isChecked ? iconCheckedBgColor : "transparent",
                transition: "all 0.2s ease",
              }}
            >
              {isChecked && (
                <span
                  style={{
                    width: iconSize / 2,
                    height: iconSize / 2,
                    borderRadius: "50%",
                    backgroundColor: darkMode ? "#fff" : "#fff",
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