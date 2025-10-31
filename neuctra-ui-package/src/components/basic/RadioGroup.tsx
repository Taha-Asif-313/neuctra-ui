"use client";
import React from "react";

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
  className = "",
  style,
  labelStyle,
  iconSize = 20,
  iconCheckedBgColor = "#2563eb",
  iconUncheckedBorderColor = "#9ca3af",
  textColor = "#374151",
  errorStyle,
}) => {
  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}
      role="radiogroup"
      aria-disabled={disabled}
    >
      {options.map((option) => {
        const isChecked = selectedValue === option.value;
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
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                width: iconSize,
                height: iconSize,
                borderRadius: "50%",
                border: `2px solid ${
                  isChecked ? iconCheckedBgColor : iconUncheckedBorderColor
                }`,
                backgroundColor: isChecked ? iconCheckedBgColor : "transparent",
                transition: "all 0.25s ease",
              }}
            >
              {isChecked && (
                <span
                  style={{
                    width: iconSize / 2,
                    height: iconSize / 2,
                    borderRadius: "50%",
                    backgroundColor: "white",
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
