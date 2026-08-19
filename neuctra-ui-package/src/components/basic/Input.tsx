"use client";

import React, {
  forwardRef,
  useState,
  useId,
  useImperativeHandle,
  useRef,
  CSSProperties,
} from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Per-size layout values. The prefix/suffix slots are absolutely positioned, so
 * the input's horizontal padding has to reserve exactly the space the icon
 * occupies at that size — inset + icon width + gap. Keeping all of it in one
 * table is what stops padding and icon size from drifting apart.
 *
 * Every class here is a complete literal so Tailwind's scanner still sees it.
 */
const SIZE_CONFIG = {
  sm: {
    base: "py-1.5 text-xs",
    padLeft: { none: "pl-3", icon: "pl-8", text: "pl-8", both: "pl-12" },
    padRight: { none: "pr-3", suffix: "pr-8" },
    iconSize: 14,
    prefixInset: "left-2.5",
    suffixInset: "right-2.5",
    gap: "gap-1",
    labelIconSize: 14,
    textSize: "text-[11px]",
  },
  md: {
    base: "py-2 text-sm",
    padLeft: { none: "pl-4", icon: "pl-10", text: "pl-9", both: "pl-14" },
    padRight: { none: "pr-4", suffix: "pr-10" },
    iconSize: 16,
    prefixInset: "left-3",
    suffixInset: "right-3",
    gap: "gap-1.5",
    labelIconSize: 16,
    textSize: "text-xs",
  },
  lg: {
    base: "py-2.5 text-base",
    padLeft: { none: "pl-4", icon: "pl-11", text: "pl-10", both: "pl-16" },
    padRight: { none: "pr-4", suffix: "pr-11" },
    iconSize: 20,
    prefixInset: "left-3.5",
    suffixInset: "right-3.5",
    gap: "gap-2",
    labelIconSize: 18,
    textSize: "text-sm",
  },
} as const;

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
  descriptionClassName?: string;

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
    descriptionClassName = "",

    wrapperStyle,
    inputStyle,
    labelStyle,
  } = props;

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => inputRef.current as any);

  // `id` is optional, but without one `htmlFor` points at nothing and clicking
  // the label does nothing. Fall back to a generated id.
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const describedBy = helperText || error ? `${fieldId}-description` : undefined;

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

  const sizes = SIZE_CONFIG[size];

  const hasSuffix = Boolean(suffixIcon) || type === "password";

  // Every value that has to scale together lives in SIZE_CONFIG, so a size can
  // never scale its padding without also scaling the icon it makes room for.
  const getPadding = () => {
    const left = !hasPrefix
      ? sizes.padLeft.none
      : hasPrefixIcon && hasPrefixText
        ? sizes.padLeft.both
        : hasPrefixText
          ? sizes.padLeft.text
          : sizes.padLeft.icon;
    const right = hasSuffix ? sizes.padRight.suffix : sizes.padRight.none;
    return `${sizes.base} ${left} ${right}`;
  };

  const baseInputStyles =
    "w-full min-w-0 rounded-lg border border-input bg-transparent " +
    "text-foreground outline-none transition-colors " +
    "placeholder:text-muted-foreground " +
    "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 " +
    "dark:bg-input/30 dark:disabled:bg-input/80 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring";

  return (
    <div
      className={cn("w-full space-y-1.5", wrapperClassName)}
      style={wrapperStyle}
    >
      {label && (
        <div className="flex items-baseline justify-between gap-2">
          <label
            htmlFor={fieldId}
            className={cn(
              "flex items-center gap-1.5 text-[13px] font-medium leading-none",
              labelClassName,
            )}
            style={labelStyle}
          >
            {LabelIcon && (
              <LabelIcon size={sizes.labelIconSize} strokeWidth={1.5} />
            )}
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </label>

          {description && (
            <span className={cn("text-xs text-muted-foreground", descriptionClassName)}>
              {description}
            </span>
          )}
        </div>
      )}

      <div className="relative">
        {hasPrefix && (
          <div
            className={cn(
              "absolute inset-y-0 flex items-center text-muted-foreground pointer-events-none",
              sizes.prefixInset,
              sizes.gap,
              prefixClassName,
            )}
          >
            {PrefixIcon && (
              <PrefixIcon size={sizes.iconSize} strokeWidth={1.5} />
            )}
            {hasPrefixText && (
              <span className={cn("font-medium", sizes.textSize)}>{prefix}</span>
            )}
          </div>
        )}

        {type === "textarea" ? (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            id={fieldId}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            rows={rows}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            style={inputStyle}
            className={cn(
              baseInputStyles,
              getPadding(),
              "resize-none",
              error && "border-destructive focus-visible:ring-destructive/50",
              success && "border-success focus-visible:ring-success/50",
              textareaClassName,
            )}
          />
        ) : (
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            id={fieldId}
            type={type === "password" ? (visible ? "text" : "password") : type}
            name={name}
            value={currentValue}
            onChange={handleChange}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            min={type === "number" ? min : undefined}
            max={type === "number" ? max : undefined}
            step={type === "number" ? step : undefined}
            maxLength={maxLength}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            style={inputStyle}
            className={cn(
              baseInputStyles,
              getPadding(),
              error && "border-destructive focus-visible:ring-destructive/50",
              success && "border-success focus-visible:ring-success/50",
              inputClassName,
            )}
          />
        )}

        {type === "password" && (
          <button
            type="button"
            aria-label={visible ? "Hide password" : "Show password"}
            aria-pressed={visible}
            onClick={() => setVisible(!visible)}
            disabled={disabled}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded text-muted-foreground transition-colors",
              "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
              sizes.suffixInset,
              suffixClassName,
            )}
          >
            {visible ? (
              <EyeOff size={sizes.iconSize} />
            ) : (
              <Eye size={sizes.iconSize} />
            )}
          </button>
        )}

        {suffixIcon && type !== "password" && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 flex items-center text-muted-foreground pointer-events-none",
              sizes.suffixInset,
              suffixClassName,
            )}
          >
            {suffixIcon}
          </span>
        )}
      </div>

      {(helperText || error) && (
        <p
          id={describedBy}
          role={error ? "alert" : undefined}
          className={cn(
            "text-xs font-medium",
            error
              ? "text-destructive"
              : success
                ? "text-success"
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
