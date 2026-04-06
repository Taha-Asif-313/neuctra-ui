"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  CSSProperties,
} from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
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

    // Detect system dark mode
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

    // Theme tokens
    const theme = finalDarkMode
      ? {
          containerBg: "bg-zinc-900/80",
          border: "border-zinc-700",
          text: "text-white",
          placeholder: "placeholder-zinc-500",
          label: "text-zinc-300",
          helper: "text-zinc-400",
          count: "text-zinc-500",
          focusRing: "focus:ring-primary/30",
        }
      : {
          containerBg: "bg-white/80",
          border: "border-gray-300",
          text: "text-gray-900",
          placeholder: "placeholder-gray-400",
          label: "text-gray-700",
          helper: "text-gray-500",
          count: "text-gray-500",
          focusRing: "focus:ring-primary/30",
        };

    return (
      <div
        className={`w-full space-y-1.5 ${containerClassName}`}
        style={containerStyle}
      >
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className={`flex items-center gap-2 text-[13px] font-medium ${theme.label} ${labelClassName}`}
            style={labelStyle}
          >
            {Icon && <Icon size={16} className="text-primary" />}
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}

        {/* Textarea */}
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
              focus:outline-none ${theme.focusRing}
              disabled:opacity-50 disabled:cursor-not-allowed
              ${theme.containerBg} ${theme.border} ${theme.text} ${theme.placeholder}
              ${error ? "border-red-500/40 focus:border-red-500" : ""}
              ${success ? "border-emerald-500/40 focus:border-emerald-500" : ""}
              ${className}
            `}
            style={style}
            {...props}
          />

          {/* Character Count */}
          {showCount && typeof value === "string" && (
            <span
              className={`absolute bottom-2 right-3 text-[11px] ${theme.count} ${countClassName}`}
              style={countStyle}
            >
              {value.length}/{maxLength}
            </span>
          )}
        </div>

        {/* Helper / Error Text */}
        {helperText && (
          <p
            className={`text-xs ${
              error ? "text-red-400" : success ? "text-emerald-400" : theme.helper
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