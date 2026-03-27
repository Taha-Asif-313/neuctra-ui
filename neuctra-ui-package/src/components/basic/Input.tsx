"use client";

import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
} from "react";
import { Eye, EyeOff } from "lucide-react";

export interface InputFieldProps {
  label?: string;
  name?: string;
  type?: "text" | "password" | "email" | "number" | "textarea";
  placeholder?: string;

  value?: string;
  defaultValue?: string;
  onChange?: (name: string, value: string) => void;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  error?: string | boolean;
  success?: boolean;
  helperText?: string;

  /** Icons */
  icon?: React.ElementType;
  prefix?: string;
  prefixIcon?: React.ElementType;
  suffixIcon?: React.ReactNode;

  /** Number props */
  min?: number;
  max?: number;
  step?: number;

  /** Textarea */
  rows?: number;

  /** Styling */
  className?: string;
}

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputFieldProps
>((props, ref) => {
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
    const val = e.target.value;
    setLocalValue(val);
    onChange?.(name, val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === "number" && e.key === "-") e.preventDefault();
  };

  /** Dynamic padding (same logic as your original) */
  const getPadding = () => {
    if (!hasPrefix) return "px-4";
    if (hasPrefixIcon && hasPrefixText) return "pl-20 pr-4";
    if (hasPrefixText) return "pl-14 pr-4";
    if (hasPrefixIcon) return "pl-10 pr-4";
    return "px-4";
  };

  const borderStyle = error
    ? "border-red-500"
    : success
    ? "border-emerald-500"
    : "border-zinc-300 dark:border-zinc-800";

  return (
    <div className={`w-full space-y-1 ${className}`}>
      {/* Label */}
      {label && (
        <label className="flex items-center gap-2 text-[12px] font-medium text-gray-700 dark:text-zinc-100">
          {LabelIcon && <LabelIcon size={16} className="text-primary" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Input Wrapper */}
      <div className="relative">
        {/* Prefix */}
        {hasPrefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 gap-2 text-sm text-zinc-400 pointer-events-none">
            {PrefixIcon && <PrefixIcon size={14} />}
            {hasPrefixText && (
              <>
                <span className="font-medium text-zinc-600 dark:text-zinc-200">
                  {prefix}
                </span>
                <span className="h-4 w-px bg-zinc-300 dark:bg-zinc-700" />
              </>
            )}
          </div>
        )}

        {/* Input / Textarea */}
        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            name={name}
            value={currentValue}
            onChange={handleChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            rows={rows}
            className={`
              w-full rounded-lg text-sm
              bg-white dark:bg-zinc-900 border
              text-gray-900 dark:text-white
              placeholder:text-zinc-400
              py-2.5 outline-none
              ${getPadding()}
              ${borderStyle}
            `}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type={
              type === "password"
                ? visible
                  ? "text"
                  : "password"
                : type
            }
            name={name}
            value={currentValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            min={type === "number" ? min ?? 0 : undefined}
            max={max}
            step={step}
            className={`
              w-full rounded-lg text-sm
              bg-white dark:bg-zinc-900 border
              text-gray-900 dark:text-white
              placeholder:text-zinc-400
              py-2.5 outline-none
              disabled:opacity-50 disabled:cursor-not-allowed
              ${getPadding()}
              ${borderStyle}
            `}
          />
        )}

        {/* Password toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400"
          >
            {visible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {/* Suffix Icon */}
        {suffixIcon && type !== "password" && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {suffixIcon}
          </span>
        )}
      </div>

      {/* Helper / Error */}
      {(helperText || error) && (
        <p
          className={`text-xs ${
            error
              ? "text-red-500"
              : success
              ? "text-emerald-500"
              : "text-zinc-500"
          }`}
        >
          {error && typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
});