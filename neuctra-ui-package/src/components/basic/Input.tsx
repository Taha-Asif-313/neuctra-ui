"use client";
import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps {
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "search"
    | "tel"
    | "url"
    | "textarea";
  label?: string;
  placeholder?: string;
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

  /** 🎨 Full Customization Options */
  labelColor?: string;
  placeholderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  hoverBorderColor?: string;
  focusBorderColor?: string;
  errorColor?: string;
  successColor?: string;
  iconColor?: string;
  shadow?: string;

  /** 🧩 Layout + Style Customization */
  fontSize?: string;
  fontFamily?: string;
  radius?: string;
  size?: "sm" | "md" | "lg";
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: boolean;
  showCharacterCount?: boolean;
  paddingX?: string;
  paddingY?: string;

  /** 🧱 External customization */
  className?: string;
  style?: CSSProperties;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>((props, ref) => {
  const {
    type = "text",
    label,
    placeholder = "",
    name = "",
    value,
    defaultValue,
    onChange,
    disabled = false,
    readOnly = false,
    required = false,
    error,
    success = false,
    autoFocus = false,

    iconLeft,
    iconRight,

    /** 🎨 Styling props */
    labelColor = "#374151",
    placeholderColor = "#9ca3af",
    backgroundColor = "#ffffff",
    textColor = "#111827",
    borderColor = "#d1d5db",
    hoverBorderColor = "#9ca3af",
    focusBorderColor = "#2563eb",
    errorColor = "#dc2626",
    successColor = "#16a34a",
    iconColor = "#6b7280",
    shadow = "0 1px 2px rgba(0,0,0,0.05)",

    /** 📏 Layout + size */
    size = "md",
    fontSize = "14px",
    fontFamily = "Inter, system-ui, sans-serif",
    radius = "8px",
    rows = 4,
    cols,
    maxLength,
    resize = true,
    showCharacterCount = true,
    paddingX,
    paddingY,

    className,
    style,
  } = props;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [localValue, setLocalValue] = useState(defaultValue || "");
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => inputRef.current!);

  /** ✅ Make it controlled properly */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.value;
    if (maxLength && newValue.length > maxLength) return;
    setLocalValue(newValue);
    if (onChange) onChange(name, newValue);
  };

  const currentValue = value !== undefined ? value : localValue;

  /** 🎯 Dynamic border colors */
  const currentBorderColor = error
    ? errorColor
    : success
    ? successColor
    : borderColor;

  /** 🧠 Size tokens */
  const sizes = {
    sm: { paddingY: "6px", paddingX: "10px", font: "13px" },
    md: { paddingY: "10px", paddingX: "14px", font: "14px" },
    lg: { paddingY: "14px", paddingX: "18px", font: "16px" },
  }[size];

  const px = paddingX || sizes.paddingX;
  const py = paddingY || sizes.paddingY;

  /** 💅 Base input styles */
  const baseInputStyle: CSSProperties = {
    width: "100%",
    border: `1px solid ${currentBorderColor}`,
    borderRadius: radius,
    backgroundColor,
    color: textColor,
    fontFamily,
    fontSize,
    padding: `${py} ${px}`,
    paddingLeft: iconLeft ? "40px" : px,
    paddingRight:
      iconRight || type === "password" ? "40px" : px,
    outline: "none",
    transition: "border-color 0.25s ease, box-shadow 0.25s ease",
    resize: type === "textarea" && !resize ? "none" : undefined,
    boxShadow: shadow,
    ...style,
  };

  /** 🧠 Placeholder dynamic color */
  const dynamicPlaceholder = {
    "::placeholder": {
      color: placeholderColor,
      opacity: 1,
    },
  } as any;

  /** 🎨 Dynamic border behavior */
  const applyDynamicBorder = (
    el: HTMLInputElement | HTMLTextAreaElement,
    color: string
  ) => {
    if (el) el.style.borderColor = color;
  };

  const commonEvents = {
    onFocus: (e: any) => applyDynamicBorder(e.currentTarget, focusBorderColor),
    onBlur: (e: any) => applyDynamicBorder(e.currentTarget, currentBorderColor),
    onMouseEnter: (e: any) =>
      applyDynamicBorder(e.currentTarget, hoverBorderColor),
    onMouseLeave: (e: any) =>
      applyDynamicBorder(e.currentTarget, currentBorderColor),
  };

  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily,
      }}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          style={{
            marginBottom: 6,
            color: labelColor,
            fontWeight: 500,
            fontSize: "14px",
          }}
        >
          {label}
          {required && <span style={{ color: errorColor }}> *</span>}
        </label>
      )}

      <div style={{ position: "relative", width: "100%" }}>
        {/* Left icon */}
        {iconLeft && (
          <span
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: iconColor,
              pointerEvents: "none",
            }}
          >
            {iconLeft}
          </span>
        )}

        {/* Input or Textarea */}
        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            cols={cols}
            maxLength={maxLength}
            autoFocus={autoFocus}
            style={{ ...baseInputStyle, ...dynamicPlaceholder }}
            onChange={handleChange}
            {...commonEvents}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={name}
            type={
              type === "password"
                ? visible
                  ? "text"
                  : "password"
                : type
            }
            name={name}
            value={currentValue}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            autoFocus={autoFocus}
            style={{ ...baseInputStyle, ...dynamicPlaceholder }}
            onChange={handleChange}
            {...commonEvents}
          />
        )}

        {/* Password visibility toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            style={{
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: iconColor,
              padding: 0,
            }}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Right icon */}
        {iconRight && type !== "password" && (
          <span
            style={{
              position: "absolute",
              right: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: iconColor,
              pointerEvents: "none",
            }}
          >
            {iconRight}
          </span>
        )}
      </div>

      {/* Character counter */}
      {type === "textarea" && showCharacterCount && maxLength && (
        <div
          style={{
            textAlign: "right",
            fontSize: "12px",
            color: "#6b7280",
            marginTop: 4,
          }}
        >
          {currentValue.length}/{maxLength}
        </div>
      )}

      {/* Error text */}
      {error && (
        <div
          style={{
            color: errorColor,
            fontSize: "12px",
            marginTop: 4,
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
});
