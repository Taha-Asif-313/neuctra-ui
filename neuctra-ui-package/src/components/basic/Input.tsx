import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface InputProps {
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "url"
    | "textarea";
  placeholder?: string;
  label?: string;
  name?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (name: string, value: string) => void;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;
  success?: boolean;
  autoFocus?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  borderColor?: string;
  focusBorderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  errorColor?: string;
  successColor?: string;
  labelColor?: string;
  size?: "sm" | "md" | "lg";
  radius?: string;
  fontSize?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: boolean;
  showCharacterCount?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      type = "text",
      placeholder = "",
      label,
      value,
      defaultValue,
      onChange,
      name = "",
      disabled = false,
      readOnly = false,
      required = false,
      error,
      success = false,
      autoFocus = false,
      iconLeft,
      iconRight,
      borderColor = "#ccc",
      focusBorderColor = "#2563eb",
      hoverBorderColor = "#4b5563",
      backgroundColor = "#ffffff",
      textColor = "#111827",
      errorColor = "#dc2626",
      successColor = "#16a34a",
      labelColor = "#374151",
      size = "md",
      radius = "6px",
      fontSize = "14px",
      rows = 4,
      cols,
      maxLength,
      resize = true,
      showCharacterCount = true,
      className,
      style,
    },
    ref
  ) => {
    const internalRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = useState<string>(defaultValue || "");
    const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => internalRef.current!);

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (maxLength && e.target.value.length > maxLength) return;
      setInputValue(e.target.value);
      if (onChange) onChange(name, e.target.value);
    };

    const getPadding = () => {
      switch (size) {
        case "sm":
          return "6px 12px";
        case "lg":
          return "12px 20px";
        default:
          return "10px 16px";
      }
    };

    const getFontSize = () => {
      switch (size) {
        case "sm":
          return "13px";
        case "lg":
          return "16px";
        default:
          return fontSize;
      }
    };

    const currentBorderColor = error
      ? errorColor
      : success
      ? successColor
      : borderColor;

    const sharedStyle: React.CSSProperties = {
      width: "100%",
      padding: getPadding(),
      paddingLeft: iconLeft ? "40px" : getPadding().split(" ")[1],
      paddingRight:
        iconRight || type === "password" ? "40px" : getPadding().split(" ")[1],
      border: `1px solid ${currentBorderColor}`,
      borderRadius: radius,
      backgroundColor,
      color: textColor,
      fontSize: getFontSize(),
      outline: "none",
      resize: type === "textarea" && !resize ? "none" : undefined,
      ...style,
    };

    return (
      <div
        style={{ width: "100%", fontFamily: "sans-serif" }}
        className={className}
      >
        {label && (
          <label
            htmlFor={name}
            style={{
              display: "block",
              marginBottom: "6px",
              fontSize: "14px",
              fontWeight: 500,
              color: labelColor,
            }}
          >
            {label} {required && <span style={{ color: errorColor }}>*</span>}
          </label>
        )}

        <div style={{ position: "relative", width: "100%" }}>
          {/* Icon Left */}
          {iconLeft && (
            <span
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#6b7280",
              }}
            >
              {iconLeft}
            </span>
          )}

          {/* Input or Textarea */}
          {type === "textarea" ? (
            <textarea
              ref={internalRef as React.RefObject<HTMLTextAreaElement>}
              name={name}
              value={value ?? inputValue}
              onChange={handleChange}
              placeholder={placeholder}
              rows={rows}
              cols={cols}
              maxLength={maxLength}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              style={sharedStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = focusBorderColor;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = currentBorderColor;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = hoverBorderColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = currentBorderColor;
              }}
            />
          ) : (
            <input
              ref={internalRef as React.RefObject<HTMLInputElement>}
              id={name}
              name={name}
              type={
                type === "password"
                  ? isPasswordVisible
                    ? "text"
                    : "password"
                  : type
              }
              value={value ?? inputValue}
              onChange={handleChange}
              placeholder={placeholder}
              disabled={disabled}
              readOnly={readOnly}
              autoFocus={autoFocus}
              style={sharedStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = focusBorderColor;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = currentBorderColor;
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = hoverBorderColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = currentBorderColor;
              }}
            />
          )}

          {/* Right Icon / Loading / Suffix */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setPasswordVisible(!isPasswordVisible)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "transparent",
                border: "none",
                color: "#6b7280",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}

          {iconRight && type !== "password" && (
            <span
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#6b7280",
              }}
            >
              {iconRight}
            </span>
          )}
        </div>

        {/* Character Count */}
        {type === "textarea" && showCharacterCount && maxLength && (
          <div
            style={{
              textAlign: "right",
              fontSize: "12px",
              color: "#6b7280",
              marginTop: "4px",
            }}
          >
            {(value ?? inputValue).length}/{maxLength}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p
            style={{
              color: errorColor,
              fontSize: "12px",
              marginTop: "4px",
              lineHeight: "1.3",
            }}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);
