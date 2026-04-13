"use client";

import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps {
  label?: string;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "textarea";
  placeholder?: string;

  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  error?: string | boolean;
  success?: boolean;
  helperText?: string;

  icon?: React.ElementType;
  prefix?: string;
  prefixIcon?: React.ElementType;
  suffixIcon?: React.ReactNode;

  min?: number;
  max?: number;
  step?: number;

  rows?: number;

  primaryTheme?: boolean;
  primaryColor?: string;

  /** 🔥 Customization */
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  textareaClassName?: string;
  prefixClassName?: string;
  suffixClassName?: string;
  helperTextClassName?: string;

  wrapperStyle?: CSSProperties;
  inputStyle?: CSSProperties;
  labelStyle?: CSSProperties;

  className?: string; // fallback
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(function InputField(props, ref) {
  const {
    label,
    name = "",
    type = "text",
    placeholder = "",
    value,
    defaultValue,
    onChange,
    required,
    disabled,
    readOnly,

    error,
    success,
    helperText,

    icon: LabelIcon,
    prefix,
    prefixIcon: PrefixIcon,
    suffixIcon,

    min,
    max,
    step,

    rows = 4,

    primaryTheme = true,
    primaryColor = "#3b82f6",

    wrapperClassName = "",
    labelClassName = "",
    inputClassName = "",
    textareaClassName = "",
    prefixClassName = "",
    suffixClassName = "",
    helperTextClassName = "",

    wrapperStyle,
    inputStyle,
    labelStyle,

    className = "",
  } = props;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => inputRef.current!);

  const [localValue, setLocalValue] = useState(defaultValue || "");
  const [visible, setVisible] = useState(false);

  const hasPrefixIcon = Boolean(PrefixIcon);
  const hasPrefixText = Boolean(prefix);
  const hasPrefix = hasPrefixIcon || hasPrefixText;

  const currentValue = value !== undefined ? value : localValue;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (value === undefined) setLocalValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && e.key === "-") e.preventDefault();
  };

  const getPadding = () => {
    if (!hasPrefix) return "px-4";
    if (hasPrefixIcon && hasPrefixText) return "pl-20 pr-4";
    if (hasPrefixText) return "pl-14 pr-4";
    if (hasPrefixIcon) return "pl-10 pr-4";
    return "px-4";
  };

  const dynamicStyle: CSSProperties = !primaryTheme
    ? { borderColor: primaryColor, boxShadow: `0 0 0 1px ${primaryColor}` }
    : {};


  return (
    <div
      className={`w-full space-y-1 text-foreground ${wrapperClassName || className}`}
      style={wrapperStyle}
    >
      {label && (
        <label
          className={`flex items-center gap-2 text-sm font-medium text-foreground ${labelClassName}`}
          style={labelStyle}
        >
          {LabelIcon && <LabelIcon size={16} />}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        {hasPrefix && (
          <div
            className={`absolute inset-y-0 left-0 flex items-center pl-3 gap-2 text-sm text-muted-foreground pointer-events-none ${prefixClassName}`}
          >
            {PrefixIcon && <PrefixIcon size={14} />}
            {hasPrefixText && <span>{prefix}</span>}
          </div>
        )}

        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            style={{ ...dynamicStyle, ...inputStyle }}
            className={`
              w-full rounded-lg text-sm border border-border bg-background text-foreground outline-none py-2.5
              ${getPadding()}
              focus:ring-2 focus:ring-primary/20
              ${textareaClassName}
            `}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={type === "password" ? (visible ? "text" : "password") : type}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            min={type === "number" ? min ?? 0 : undefined}
            max={max}
            step={step}
            style={{ ...dynamicStyle, ...inputStyle }}
            className={`
              w-full rounded-lg text-sm border border-border bg-background text-foreground outline-none py-2.5
              ${getPadding()}
              focus:ring-2 focus:ring-primary/20
              ${inputClassName}
            `}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground ${suffixClassName}`}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {suffixIcon && type !== "password" && (
          <span
            className={`absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground ${suffixClassName}`}
          >
            {suffixIcon}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={`text-xs ${
            error
              ? "text-destructive"
              : success
              ? "text-primary"
              : "text-muted-foreground"
          } ${helperTextClassName}`}
        >
          {error && typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
});