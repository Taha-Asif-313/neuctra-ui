"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  CSSProperties,
} from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ElementType;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  maxLength?: number;

  /** Customization */
  className?: string; // textarea
  containerClassName?: string; // outer div
  labelClassName?: string;
  helperClassName?: string;
  countClassName?: string;

  style?: CSSProperties; // textarea inline style
  containerStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  helperStyle?: CSSProperties;
  countStyle?: CSSProperties;

  /** Theme control */
  darkMode?: boolean; // force dark or light, otherwise system
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      name,
      icon: Icon,
      value,
      onChange,
      placeholder,
      required,
      disabled,
      error,
      success,
      rows = 3,
      helperText,
      maxLength,

      className = "",
      containerClassName = "",
      labelClassName = "",
      helperClassName = "",
      countClassName = "",

      style,
      containerStyle,
      labelStyle,
      helperStyle,
      countStyle,

      darkMode,
      ...props
    },
    ref
  ) => {
    const [systemDarkMode, setSystemDarkMode] = useState(false);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setSystemDarkMode(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setSystemDarkMode(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }, []);

    const finalDarkMode = darkMode !== undefined ? darkMode : systemDarkMode;
    const showCount = typeof value === "string" && maxLength;

    return (
      <div
        className={`w-full space-y-1 ${containerClassName}`}
        style={containerStyle}
      >
        {label && (
          <label
            htmlFor={name}
            className={`flex items-center gap-2 text-[13px] font-medium text-foreground ${labelClassName}`}
            style={labelStyle}
          >
            {Icon && <Icon size={16} className="text-primary" />}
            {label}
            {required && (
              <span className="text-destructive">*</span>
            )}
          </label>
        )}

        <div className="relative">
          <textarea
            ref={ref}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            rows={rows}
            maxLength={maxLength}
            className={`
              w-full px-4 py-2.5 text-sm rounded-xl
              resize-none transition-all duration-200
              outline-none border
              bg-background text-foreground placeholder:text-muted-foreground
              border-border
              focus:bg-accent
              focus:border-border
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? "border-destructive focus:border-destructive" : ""}
              ${success ? "border-primary focus:border-primary" : ""}
              ${className}
            `}
            style={style}
            {...props}
          />

          {showCount && typeof value === "string" && (
            <span
              className={`absolute bottom-2 right-3 text-[11px] text-muted-foreground ${countClassName}`}
              style={countStyle}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>

        {helperText && (
          <p
            className={`text-xs ${
              error
                ? "text-destructive"
                : success
                ? "text-primary"
                : "text-muted-foreground"
            } ${helperClassName}`}
            style={helperStyle}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";