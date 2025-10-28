import React from "react";

interface Option {
  label: string;
  value: string;
}

interface CheckRadioProps {
  type: "checkbox" | "radio";
  name?: string; // required for radio groups
  options: Option[];
  selectedValues?: string[] | string;
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  className?: string; // optional wrapper styles (string for now)
  customIcon?: (checked: boolean) => React.ReactNode; // custom icon renderer
  style?: React.CSSProperties; // container inline style override
  labelStyle?: React.CSSProperties; // label inline style override
  iconSize?: number; // size in px, default 20
  iconCheckedBgColor?: string; // default blue
  iconUncheckedBorderColor?: string; // default gray
  textColor?: string; // label text color
  errorStyle?: React.CSSProperties; // error text style override
}

export const CheckRadio: React.FC<CheckRadioProps> = ({
  type,
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
  textColor = "#374151", // gray-700
  errorStyle,
}) => {
  const isCheckbox = type === "checkbox";

  const handleChange = (value: string) => {
    if (onChange) {
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
    }
  };

  return (
    <div
      className={className}
      style={{ display: "flex", flexDirection: "column", gap: 8, ...style }}
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
              cursor: disabled ? "not-allowed" : "pointer",
              opacity: disabled ? 0.6 : 1,
              gap: 8,
              userSelect: "none",
              ...labelStyle,
            }}
          >
            {/* Hidden Input */}
            <input
              type={type}
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={disabled || readOnly}
              required={required}
              onChange={() => handleChange(option.value)}
              style={{ display: "none" }}
            />

            {/* Custom or Default Icon */}
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
                  borderRadius: isCheckbox ? 4 : "50%",
                  border: `2px solid ${
                    isChecked ? iconCheckedBgColor : iconUncheckedBorderColor
                  }`,
                  backgroundColor: isChecked ? iconCheckedBgColor : "transparent",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {isChecked && !isCheckbox && (
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

            {/* Label Text */}
            <span style={{ color: textColor, fontSize: 14 }}>{option.label}</span>
          </label>
        );
      })}

      {/* Error Message */}
      {error && (
        <p
          role="alert"
          style={{
            color: "#dc2626", // red-600
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
