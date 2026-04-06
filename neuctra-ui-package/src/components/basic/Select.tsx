"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from "react";
import clsx from "clsx";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  label?: string;
  name?: string;
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[], name?: string) => void;
  options?: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string | boolean;
  success?: boolean;
  helperText?: string;
  multiple?: boolean;

  /** Icons */
  labelIcon?: React.ElementType;
  prefixIcon?: React.ElementType;
  dropdownIcon?: React.ElementType;

  /** Customization */
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  valueClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;
  iconClassName?: string;
  helperClassName?: string;

  style?: React.CSSProperties;
  triggerStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;

  /** Dark Mode */
  darkMode?: boolean;

  /** Theme */
  primaryColor?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    label,
    name,
    value,
    defaultValue,
    onValueChange,
    options = [],
    placeholder = "Select...",
    required,
    disabled,
    error,
    success,
    helperText,
    multiple = false,

    labelIcon: LabelIcon,
    prefixIcon: PrefixIcon,
    dropdownIcon: DropdownIcon = ChevronDown,

    className,
    containerClassName,
    labelClassName,
    triggerClassName,
    valueClassName,
    dropdownClassName,
    itemClassName,
    iconClassName,
    helperClassName,

    style,
    triggerStyle,
    dropdownStyle,
    itemStyle,

    darkMode,
    primaryColor = "var(--primary)",
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  const [systemDarkMode, setSystemDarkMode] = useState(false);
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(
    defaultValue
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const selectedValues: string[] = multiple
    ? Array.isArray(currentValue)
      ? currentValue
      : currentValue
        ? [currentValue]
        : []
    : currentValue
      ? [currentValue as string]
      : [];

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Detect system theme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setSystemDarkMode(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Resolve final dark mode
  const finalDarkMode = darkMode !== undefined ? darkMode : systemDarkMode;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) setOpen((p) => !p);
      }
    },
    [disabled]
  );

  const handleSelect = (opt: SelectOption) => {
    if (disabled) return;

    let newValue: string | string[];
    if (multiple) {
      const exists = selectedValues.includes(opt.value);
      newValue = exists
        ? selectedValues.filter((v) => v !== opt.value)
        : [...selectedValues, opt.value];
    } else {
      newValue = opt.value;
      setOpen(false);
    }

    if (!isControlled) setInternalValue(newValue);
    onValueChange?.(newValue, name);
  };

  const selectedLabels = options
    .filter((o) => selectedValues.includes(o.value))
    .map((o) => o.label);

  const hasError = Boolean(error);
  const hasValue = selectedLabels.length > 0;

  // Theme tokens
  const theme = finalDarkMode
    ? {
        bg: "bg-zinc-900",
        text: "text-zinc-100",
        border: "ring-zinc-700",
        triggerBg: "bg-zinc-800",
        triggerText: "text-zinc-100",
        triggerHover: "hover:bg-zinc-700",
        triggerFocus: "focus-visible:ring-2 focus-visible:ring-offset-zinc-900",
        placeholder: "text-zinc-500",
        dropdownBg: "bg-zinc-800",
        dropdownBorder: "ring-1 ring-zinc-700",
        dropdownShadow: "shadow-2xl",
        itemText: "text-zinc-100",
        itemHover: "hover:bg-zinc-700",
        helperMuted: "text-zinc-500",
        labelText: "text-zinc-300",
        scrollbar: "[&::-webkit-scrollbar-track]:bg-zinc-800",
      }
    : {
        bg: "bg-white",
        text: "text-gray-900",
        border: "ring-gray-200",
        triggerBg: "bg-white",
        triggerText: "text-gray-900",
        triggerHover: "hover:bg-gray-50",
        triggerFocus: "focus-visible:ring-2 focus-visible:ring-offset-white",
        placeholder: "text-gray-400",
        dropdownBg: "bg-white",
        dropdownBorder: "ring-1 ring-gray-200",
        dropdownShadow: "shadow-xl",
        itemText: "text-gray-800",
        itemHover: "hover:bg-gray-50",
        helperMuted: "text-gray-400",
        labelText: "text-gray-700",
        scrollbar: "[&::-webkit-scrollbar-track]:bg-gray-50",
      };

  const ringColor = hasError
    ? "#ef4444"
    : success
      ? "#22c55e"
      : finalDarkMode
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.1)";

  return (
    <div
      ref={containerRef}
      className={clsx("w-full space-y-1.5", className, containerClassName)}
      style={style}
    >
      {label && (
        <label
          className={clsx(
            "flex items-center gap-1.5 text-sm font-medium select-none",
            theme.labelText,
            labelClassName
          )}
        >
          {LabelIcon && <LabelIcon className="w-4 h-4 shrink-0" />}
          {label}
          {required && <span className="text-red-500 leading-none">*</span>}
        </label>
      )}

      <div className="relative">
        {PrefixIcon && (
          <div
            className={clsx(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2",
              finalDarkMode ? "text-zinc-400" : "text-gray-400",
              iconClassName
            )}
          >
            <PrefixIcon className="w-4 h-4" />
          </div>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setOpen((p) => !p)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled}
          aria-required={required}
          aria-invalid={hasError}
          className={clsx(
            "w-full flex items-center justify-between gap-2",
            "rounded-xl text-sm transition-all duration-150 outline-none px-3 py-2.5",
            PrefixIcon && "pl-9",
            theme.triggerBg,
            theme.triggerText,
            !disabled && theme.triggerHover,
            theme.triggerFocus,
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            triggerClassName
          )}
          style={{
            boxShadow: `0 0 0 1.5px ${ringColor}`,
            ["--tw-ring-color" as string]: primaryColor,
            ...triggerStyle,
          }}
        >
          <span
            className={clsx(
              "truncate text-left flex-1",
              hasValue ? theme.triggerText : theme.placeholder,
              valueClassName
            )}
          >
            {hasValue
              ? multiple
                ? selectedLabels.join(", ")
                : selectedLabels[0]
              : placeholder}
          </span>

          <DropdownIcon
            className={clsx(
              "w-4 h-4 shrink-0 transition-transform duration-200",
              open && "rotate-180",
              finalDarkMode ? "text-zinc-400" : "text-gray-400",
              iconClassName
            )}
          />
        </button>

        {open && (
          <div
            role="listbox"
            aria-multiselectable={multiple}
            className={clsx(
              "absolute z-50 mt-1.5 w-full rounded-xl overflow-hidden",
              theme.dropdownBg,
              theme.dropdownBorder,
              theme.dropdownShadow,
              dropdownClassName
            )}
            style={dropdownStyle}
          >
            <ul className={clsx("max-h-60 overflow-y-auto", theme.scrollbar)}>
              {options.length === 0 ? (
                <li
                  className={clsx(
                    "px-3 py-2.5 text-sm select-none text-center",
                    theme.placeholder
                  )}
                >
                  No options available
                </li>
              ) : (
                options.map((opt) => {
                  const active = selectedValues.includes(opt.value);
                  return (
                    <li
                      key={opt.value}
                      role="option"
                      aria-selected={active}
                      onClick={() => handleSelect(opt)}
                      className={clsx(
                        "flex items-center justify-between px-3 py-2.5 text-sm cursor-pointer transition-colors duration-100 select-none",
                        theme.itemText,
                        !active && theme.itemHover,
                        itemClassName
                      )}
                      style={{
                        backgroundColor: active
                          ? `color-mix(in srgb, ${primaryColor} 15%, transparent)`
                          : undefined,
                        color: active ? primaryColor : undefined,
                        ...itemStyle,
                      }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                        <span className="truncate">{opt.label}</span>
                      </div>

                      {active && <Check className="w-4 h-4 shrink-0 ml-2" style={{ color: primaryColor }} />}
                    </li>
                  );
                })
              )}
            </ul>
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={clsx(
            "text-xs leading-snug",
            hasError ? "text-red-500" : success ? "text-green-500" : theme.helperMuted,
            helperClassName
          )}
          role={hasError ? "alert" : undefined}
        >
          {typeof error === "string" && error.length > 0 ? error : helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";