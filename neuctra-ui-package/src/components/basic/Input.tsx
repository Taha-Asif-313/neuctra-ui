import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff } from "lucide-react";

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

  /** 🎨 Style customization */
  borderColor?: string;
  focusBorderColor?: string;
  hoverBorderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  errorColor?: string;
  successColor?: string;
  labelColor?: string;

  /** 🧩 Layout customization */
  size?: "sm" | "md" | "lg";
  radius?: string;
  fontSize?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: boolean;
  showCharacterCount?: boolean;

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

    borderColor = "#d1d5db",
    focusBorderColor = "#2563eb",
    hoverBorderColor = "#9ca3af",
    backgroundColor = "#fff",
    textColor = "#111827",
    errorColor = "#dc2626",
    successColor = "#16a34a",
    labelColor = "#374151",

    size = "md",
    radius = "8px",
    fontSize = "14px",
    rows = 4,
    cols,
    maxLength,
    resize = true,
    showCharacterCount = true,

    className,
    style,
  } = props;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [localValue, setLocalValue] = useState(defaultValue || "");
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => inputRef.current!);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newVal = e.target.value;
    if (maxLength && newVal.length > maxLength) return;
    setLocalValue(newVal);
    onChange?.(name, newVal);
  };

  const currentValue = value ?? localValue;
  const currentBorderColor = error
    ? errorColor
    : success
    ? successColor
    : borderColor;

  const sizeTokens = {
    sm: { padding: "6px 10px", font: "13px" },
    md: { padding: "10px 14px", font: "14px" },
    lg: { padding: "14px 18px", font: "16px" },
  }[size];

  const baseInputStyle: CSSProperties = {
    width: "100%",
    border: `1px solid ${currentBorderColor}`,
    borderRadius: radius,
    backgroundColor,
    color: textColor,
    fontSize: fontSize || sizeTokens.font,
    padding: sizeTokens.padding,
    paddingLeft: iconLeft ? "40px" : sizeTokens.padding.split(" ")[1],
    paddingRight:
      iconRight || type === "password" ? "40px" : sizeTokens.padding.split(" ")[1],
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
    resize: type === "textarea" && !resize ? "none" : undefined,
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
    ...style,
  };

  const applyDynamicBorder = (el: HTMLInputElement | HTMLTextAreaElement, color: string) => {
    if (el) el.style.borderColor = color;
  };

  const commonEvents = {
    onFocus: (e: any) => applyDynamicBorder(e.currentTarget, focusBorderColor),
    onBlur: (e: any) => applyDynamicBorder(e.currentTarget, currentBorderColor),
    onMouseEnter: (e: any) => applyDynamicBorder(e.currentTarget, hoverBorderColor),
    onMouseLeave: (e: any) => applyDynamicBorder(e.currentTarget, currentBorderColor),
  };

  return (
    <div
      className={className}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
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
              color: "#6b7280",
              pointerEvents: "none",
            }}
          >
            {iconLeft}
          </span>
        )}

        {/* Input / Textarea */}
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
            style={baseInputStyle}
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
            style={baseInputStyle}
            onChange={handleChange}
            {...commonEvents}
          />
        )}

        {/* Password toggle */}
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
              color: "#6b7280",
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
              color: "#6b7280",
              pointerEvents: "none",
            }}
          >
            {iconRight}
          </span>
        )}
      </div>

      {/* Character Counter */}
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

      {/* Error */}
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
