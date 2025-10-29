import React from "react";

interface Option {
  label: string;
  value: string;
}

type CheckRadioType = "checkbox" | "radio" | "switch";

interface CheckRadioProps {
  type?: CheckRadioType; // default = checkbox
  name?: string;
  options: Option[];
  selectedValues?: string[] | string;
  onChange?: (value: string | string[]) => void;
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
  switchBgColor?: string;
  textColor?: string;
  errorStyle?: React.CSSProperties;
}

export const CheckRadio: React.FC<CheckRadioProps> = ({
  type = "checkbox",
  name,
  options,
  selectedValues,
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
  iconCheckedBgColor = "#2563eb", // blue-600
  iconUncheckedBorderColor = "#9ca3af", // gray-400
  switchBgColor = "#d1d5db", // gray-300
  textColor = "#374151", // gray-700
  errorStyle,
}) => {
  const isCheckbox = type === "checkbox";
  const isRadio = type === "radio";
  const isSwitch = type === "switch";

  const handleChange = (value: string) => {
    if (!onChange) return;
    if (isCheckbox) {
      const updatedValues = Array.isArray(selectedValues)
        ? selectedValues.includes(value)
          ? selectedValues.filter((v) => v !== value)
          : [...selectedValues, value]
        : [value];
      onChange(updatedValues);
    } else {
      onChange(value);
    }
  };

  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        ...style,
      }}
      role={type}
      aria-disabled={disabled}
    >
      {options.map((option) => {
        const isChecked = isCheckbox
          ? Array.isArray(selectedValues) && selectedValues.includes(option.value)
          : selectedValues === option.value;

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
            {/* Label Text */}
            <span style={{ color: textColor, fontSize: 14 }}>{option.label}</span>

            {/* Hidden Input */}
            <input
              type={isSwitch ? "checkbox" : type}
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => handleChange(option.value)}
              style={{ display: "none" }}
            />

            {/* Icon or Switch */}
            {isSwitch ? (
              <span
                style={{
                  position: "relative",
                  width: iconSize * 2,
                  height: iconSize * 1.1,
                  borderRadius: 9999,
                  backgroundColor: isChecked ? iconCheckedBgColor : switchBgColor,
                  transition: "background 0.2s ease",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: 2,
                    left: isChecked ? iconSize : 2,
                    width: iconSize - 4,
                    height: iconSize - 4,
                    borderRadius: "50%",
                    backgroundColor: "#fff",
                    transition: "left 0.2s ease",
                  }}
                />
              </span>
            ) : customIcon ? (
              customIcon(isChecked)
            ) : (
              <span
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: iconSize,
                  height: iconSize,
                  borderRadius: isCheckbox ? 4 : "50%",
                  border: `2px solid ${
                    isChecked ? iconCheckedBgColor : iconUncheckedBorderColor
                  }`,
                  backgroundColor: isChecked ? iconCheckedBgColor : "transparent",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {isChecked && isRadio && (
                  <span
                    style={{
                      width: iconSize / 2,
                      height: iconSize / 2,
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  />
                )}
                {isChecked && isCheckbox && (
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

      {/* Error Message */}
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
