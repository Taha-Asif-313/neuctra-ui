"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  CSSProperties,
} from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  icon?: React.ElementType;
  error?: boolean;
  success?: boolean;
  helperText?: string;
  maxLength?: number;

  /** Auto resize */
  autoResize?: boolean;
  minRows?: number;
  maxRows?: number;

  /** Chat-like behavior */
  submitOnEnter?: boolean; // Enter submits
  onSubmit?: () => void;

  /** Customization */
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  helperClassName?: string;
  countClassName?: string;

  style?: CSSProperties;
  containerStyle?: CSSProperties;
  labelStyle?: CSSProperties;
  helperStyle?: CSSProperties;
  countStyle?: CSSProperties;
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
      helperText,
      maxLength,

      autoResize = true,
      minRows = 3,
      maxRows = 6,

      submitOnEnter,
      onSubmit,

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

      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLTextAreaElement | null>(null);

    // Merge refs
    const setRefs = (el: HTMLTextAreaElement) => {
      innerRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as any).current = el;
    };

    /** 🔥 Auto resize logic */
    const resizeTextarea = () => {
      const el = innerRef.current;
      if (!el || !autoResize) return;

      el.style.height = "auto";

      const lineHeight = 24; // approx
      const minHeight = minRows * lineHeight;
      const maxHeight = maxRows * lineHeight;

      const newHeight = Math.min(
        Math.max(el.scrollHeight, minHeight),
        maxHeight,
      );

      el.style.height = newHeight + "px";
      el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
    };

    useEffect(() => {
      resizeTextarea();
    }, [value]);

    /** ⌨️ ChatGPT-like enter behavior */
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (submitOnEnter && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit?.();
      }
    };

    const currentLength =
      typeof value === "string"
        ? value.length
        : innerRef.current?.value?.length || 0;

    const showCount = typeof maxLength === "number" && maxLength > 0;

    return (
      <div
        className={`w-full space-y-1.5 ${containerClassName}`}
        style={containerStyle}
      >
        {label && (
          <label
            htmlFor={name}
            className={`flex items-center gap-2 text-[13px] leading-none font-medium ${labelClassName}`}
            style={labelStyle}
          >
            {Icon && <Icon size={14} />}
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div className="relative group">
          <textarea
            ref={setRefs}
            id={name}
            name={name}
            value={value}
            onChange={(e) => {
              onChange?.(e);
              resizeTextarea();
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            maxLength={maxLength}
            rows={minRows}
            className={`
              w-full px-4 py-3 text-sm rounded-lg
              resize-none transition-all duration-200 ease-out
              outline-none border

              bg-input/30 text-foreground
              placeholder:text-muted-foreground

              border-border
              focus:ring-1 focus:ring-border

              group-hover:border-muted-foreground/40

              disabled:opacity-50 disabled:cursor-not-allowed

              ${error ? "border-destructive focus:ring-destructive/20" : ""}
              ${success ? "border-primary" : ""}

              ${className}
            `}
            style={{
              ...style,
            }}
            {...props}
          />

          {showCount && (
            <span
              className={`absolute bottom-3 right-3 text-[11px] text-accent-foreground ${countClassName}`}
              style={countStyle}
            >
              {currentLength}/{maxLength}
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
  },
);

Textarea.displayName = "Textarea";
