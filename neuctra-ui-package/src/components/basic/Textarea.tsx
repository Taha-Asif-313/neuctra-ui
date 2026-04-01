"use client";

import React, { forwardRef } from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ElementType;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  maxLength?: number;
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
      className = "",
      maxLength,
      ...props
    },
    ref
  ) => {
    const showCount = typeof value === "string" && maxLength;

    return (
      <div className="w-full space-y-1.5">
        {/* Label */}
        {label && (
          <label
            htmlFor={name}
            className="flex items-center gap-2 text-[13px] font-medium text-zinc-300"
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
              bg-zinc-900/80 backdrop-blur-sm
              border text-white placeholder-zinc-500
              resize-none transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-primary/30
              disabled:opacity-50 disabled:cursor-not-allowed

              ${
                error
                  ? "border-red-500/40 focus:border-red-500"
                  : success
                  ? "border-emerald-500/40 focus:border-emerald-500"
                  : "border-white/10 focus:border-primary"
              }

              ${className}
            `}
            {...props}
          />

          {/* Character Count */}
          {showCount && typeof value === "string" && (
            <span className="absolute bottom-2 right-3 text-[11px] text-zinc-500">
              {value.length}/{maxLength}
            </span>
          )}
        </div>

        {/* Helper / Error Text */}
        {helperText && (
          <p
            className={`text-xs ${
              error
                ? "text-red-400"
                : success
                ? "text-emerald-400"
                : "text-zinc-400"
            }`}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

// Helpful for debugging in React DevTools
Textarea.displayName = "Textarea";