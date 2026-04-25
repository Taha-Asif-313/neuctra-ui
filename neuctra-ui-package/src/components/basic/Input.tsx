"use client";

import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

export interface InputFieldProps {
  label?: string;
  name?: string;
  id?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "url"
    | "tel"
    | "search"
    | "textarea";
  placeholder?: string;
  description?: string;

  value?: string;
  defaultValue?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onFocus?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;

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
  maxLength?: number;

  rows?: number;
  size?: "sm" | "md" | "lg";

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
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>(function InputField(props, ref) {
  const {
    label,
    name = "",
    id,
    type = "text",
    placeholder = "",
    description,
    value,
    defaultValue,
    onChange,
    onFocus,
    onBlur,
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
    maxLength,

    rows = 4,
    size = "md",

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (value === undefined) setLocalValue(e.target.value);
    onChange?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && e.key === "-" && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "py-1.5 px-3 text-xs";
      case "lg":
        return "py-2.5 px-4 text-base";
      case "md":
      default:
        return "py-2 px-4 text-sm";
    }
  };

  const getPadding = () => {
    const basePadding = getSizeClasses();
    if (!hasPrefix) return basePadding;
    if (hasPrefixIcon && hasPrefixText)
      return basePadding.replace("px-4", "pl-11 pr-4");
    if (hasPrefixText) return basePadding.replace("px-4", "pl-9 pr-4");
    if (hasPrefixIcon) return basePadding.replace("px-4", "pl-10 pr-4");
    return basePadding;
  };

  const baseInputStyles =
    "w-full min-w-0 rounded-lg border border-input bg-transparent " +
    "text-zinc-900 dark:text-white text-sm outline-none transition-colors " +
    "placeholder:text-muted-foreground " +
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 " +
    "dark:bg-input/30 dark:disabled:bg-input/80 " +
    "focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50";

  return (
    <div
      className={clsx("w-full space-y-1.5", wrapperClassName)}
      style={wrapperStyle}
    >
      {label && (
        <div className="flex items-baseline justify-between gap-2">
          <label
            htmlFor={id}
            className={clsx(
              "flex items-center gap-1.5 text-[13px] font-medium leading-none",
              labelClassName,
            )}
            style={labelStyle}
          >
            {LabelIcon && <LabelIcon size={16} strokeWidth={1.5} />}
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>

          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}

      <div className="relative">
        {hasPrefix && (
          <div
            className={clsx(
              "absolute inset-y-0 left-0 flex items-center gap-1.5 text-muted-foreground pointer-events-none pl-3",
              prefixClassName,
            )}
          >
            {PrefixIcon && <PrefixIcon size={16} strokeWidth={1.5} />}
            {hasPrefixText && (
              <span className="text-xs font-medium">{prefix}</span>
            )}
          </div>
        )}

        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={id}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            style={inputStyle}
            className={clsx(
              baseInputStyles,
              "px-4 py-2 resize-none",
              error && "border-destructive focus-visible:ring-destructive/50",
              success && "border-emerald-500 focus-visible:ring-emerald-500/50",
              textareaClassName,
            )}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={id}
            type={type === "password" ? (visible ? "text" : "password") : type}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            min={type === "number" ? (min ?? 0) : undefined}
            max={max}
            step={step}
            maxLength={maxLength}
            style={inputStyle}
            className={clsx(
              baseInputStyles,
              getPadding(),
              error && "border-destructive focus-visible:ring-destructive/50",
              success && "border-emerald-500 focus-visible:ring-emerald-500/50",
              inputClassName,
            )}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            disabled={disabled}
            className={clsx(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
              suffixClassName,
            )}
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {suffixIcon && type !== "password" && (
          <span
            className={clsx(
              "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground flex items-center",
              suffixClassName,
            )}
          >
            {suffixIcon}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <p
          role={error ? "alert" : undefined}
          className={clsx(
            "text-xs font-medium",
            error
              ? "text-destructive"
              : success
                ? "text-emerald-600"
                : "text-muted-foreground",
            helperTextClassName,
          )}
        >
          {error && typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
});
