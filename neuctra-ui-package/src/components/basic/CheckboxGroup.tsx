"use client";
import React from "react";

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
  className = "",
  customIcon,
  style,
  labelStyle,
  iconSize = 20,
  iconCheckedBgColor = "#2563eb",
  iconUncheckedBorderColor = "#9ca3af",
  textColor = "#374151",
  errorStyle,
}) => {
  const handleChange = (value: string) => {
    if (!onChange) return;
    const updatedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onChange(updatedValues);
  };

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}
      role="group"
      aria-disabled={disabled}
    >
      {options.map((option) => {
        const isChecked = selectedValues.includes(option.value);

        return (
          <label
            key={option.value}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
              gap: 8,
              userSelect: "none",
              ...labelStyle,
            }}
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
