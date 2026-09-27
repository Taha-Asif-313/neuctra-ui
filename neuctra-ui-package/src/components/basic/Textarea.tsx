"use client";

import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  CSSProperties,
} from "react";
import { cn } from "../../lib/cn";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text rendered above the textarea. */
  label?: string;
  /** Icon rendered next to the label. */
  icon?: React.ElementType;
  /** Applies error styling (destructive border/ring). */
  error?: boolean;
  /** Applies success styling (primary border). */
  success?: boolean;
  /** Helper or validation message rendered below the textarea. */
  helperText?: string;
  /** Maximum character length; also shows a live character counter when set. */
  maxLength?: number;

  // Auto resize
  /** Grows the textarea to fit its content, between `minRows` and `maxRows`. */
  autoResize?: boolean;
  /** Minimum number of rows to render when `autoResize` is enabled. */
  minRows?: number;
  /** Maximum number of rows before the textarea becomes scrollable. */
  maxRows?: number;

  // Chat-like behavior
  /** When true, Enter submits (calling `onSubmit`) and Shift+Enter inserts a newline. */
  submitOnEnter?: boolean; // Enter submits
  /** Called when the user submits via Enter while `submitOnEnter` is set. */
  onSubmit?: () => void;

  // Customization
  /** Additional classes for the textarea element. */
  className?: string;
  /** Additional classes for the outer wrapper. */
  containerClassName?: string;
  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the label icon. */
  iconClassName?: string;
  /** Additional classes for the helper/validation text. */
  helperClassName?: string;
  /** Additional classes for the character counter. */
  countClassName?: string;

  /** Inline styles for the textarea element. */
  style?: CSSProperties;
  /** Inline styles for the outer wrapper. */
  containerStyle?: CSSProperties;
  /** Inline styles for the label. */
  labelStyle?: CSSProperties;
  /** Inline styles for the helper/validation text. */
  helperStyle?: CSSProperties;
  /** Inline styles for the character counter. */
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
      iconClassName = "",
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
            {Icon && <Icon size={14} className={iconClassName || undefined} />}
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
            className={cn(
              "w-full px-4 py-3 text-sm rounded-lg",
              // Reserve room for the character counter so typed text never
              // runs underneath it.
              showCount && "pb-8",
              "resize-none transition-all duration-200 ease-out",
              "outline-none border",
              "bg-input/30 text-foreground",
              "placeholder:text-muted-foreground",
              "border-border",
              // A 1px ring in the border color was invisible — use the shared
              // focus treatment so keyboard focus is actually indicated.
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring",
              "hover:border-muted-foreground/40",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error &&
                "border-destructive focus-visible:ring-destructive/50",
              success && "border-success",
              className,
            )}
            style={{
              ...style,
            }}
            {...props}
          />

          {showCount && (
            <span
              // pointer-events-none: the counter must not block click-to-place
              // in the corner of the field.
              className={cn(
                "pointer-events-none absolute bottom-2.5 right-3 text-[11px] tabular-nums text-muted-foreground",
                countClassName,
              )}
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
