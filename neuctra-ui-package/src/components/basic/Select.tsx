"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
} from "react";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  label?: string;
  name?: string;

  /** 🔥 VALUE */
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

  /** 🔥 MODE */
  multiple?: boolean;

  labelIcon?: React.ElementType;
  prefixIcon?: React.ElementType;

  variant?: "dark" | "light";

  /** 🎨 THEME */
  primaryTheme?: boolean;
  primaryColor?: string;

  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  itemClassName?: string;

  className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (props, ref) => {
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

      variant = "dark",

      primaryTheme = true,
      primaryColor = "#3b82f6",

      containerClassName,
      labelClassName,
      triggerClassName,
      dropdownClassName,
      itemClassName,
      className,
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current!);

    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<
      string | string[] | undefined
    >(defaultValue);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    /** Normalize */
    const selectedValues = multiple
      ? (currentValue as string[]) || []
      : currentValue
      ? [currentValue as string]
      : [];

    /** Close outside */
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    /** Handle select */
    const handleSelect = (option: SelectOption) => {
      let newValue: string | string[];

      if (multiple) {
        const exists = selectedValues.includes(option.value);
        newValue = exists
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
      } else {
        newValue = option.value;
        setOpen(false);
      }

      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue, name);
    };

    /** Selected label */
    const selectedLabels = options
      .filter((o) => selectedValues.includes(o.value))
      .map((o) => o.label);

    /** Theme */
    const theme = {
      dark: {
        bg: "bg-zinc-900",
        text: "text-white",
        border: "border-zinc-800",
        dropdown: "bg-black border-zinc-800",
        item: "text-zinc-300 hover:bg-zinc-800",
      },
      light: {
        bg: "bg-white",
        text: "text-gray-900",
        border: "border-gray-300",
        dropdown: "bg-white border-gray-200",
        item: "text-gray-700 hover:bg-gray-100",
      },
    }[variant];

    const dynamicPrimary: CSSProperties = !primaryTheme
      ? { color: primaryColor }
      : {};

    const dynamicBorder: CSSProperties = !primaryTheme
      ? { borderColor: primaryColor }
      : {};

    const dynamicBgActive: CSSProperties = !primaryTheme
      ? { backgroundColor: `${primaryColor}20` }
      : {};

    const borderState = error
      ? "border-rose-500"
      : success
      ? "border-emerald-500"
      : theme.border;

    return (
      <div
        ref={containerRef}
        className={`w-full space-y-1 ${containerClassName} ${className}`}
      >
        {/* Label */}
        {label && (
          <label
            className={`flex items-center gap-2 text-[13px] font-medium ${labelClassName}`}
          >
            {LabelIcon && (
              <LabelIcon
                className="w-4 h-4"
                style={!primaryTheme ? dynamicPrimary : undefined}
              />
            )}
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div className="relative group">
          {/* Prefix */}
          {PrefixIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <PrefixIcon
                className="w-4 h-4 text-zinc-500"
                style={!primaryTheme ? dynamicPrimary : undefined}
              />
            </div>
          )}

          {/* Trigger */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((p) => !p)}
            style={!primaryTheme ? dynamicBorder : undefined}
            className={`
              w-full py-2.5 px-4 rounded-lg text-left text-sm
              border transition-all
              ${theme.bg} ${theme.text}
              ${borderState}
              ${triggerClassName}
            `}
          >
            <span className={!selectedLabels.length ? "text-zinc-500" : ""}>
              {selectedLabels.length
                ? multiple
                  ? selectedLabels.join(", ")
                  : selectedLabels[0]
                : placeholder}
            </span>

            <ChevronDown
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div
              className={`
                absolute z-50 mt-2 w-full rounded-xl border shadow-xl overflow-hidden
                ${theme.dropdown}
                ${dropdownClassName}
              `}
            >
              <ul className="max-h-60 overflow-y-auto">
                {options.map((opt) => {
                  const isActive = selectedValues.includes(opt.value);

                  return (
                    <li
                      key={opt.value}
                      onClick={() => handleSelect(opt)}
                      style={
                        !primaryTheme && isActive
                          ? dynamicBgActive
                          : undefined
                      }
                      className={`
                        px-4 py-3 cursor-pointer text-sm flex items-center justify-between
                        ${isActive ? "font-medium" : theme.item}
                        ${itemClassName}
                      `}
                    >
                      <div className="flex items-center gap-2">
                        {opt.icon && <span>{opt.icon}</span>}
                        {opt.label}
                      </div>

                      {multiple && isActive && (
                        <Check className="w-4 h-4" />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* Helper */}
        {(helperText || error) && (
          <p
            className={`text-xs ${
              error
                ? "text-rose-500"
                : success
                ? "text-emerald-500"
                : "text-zinc-500"
            }`}
          >
            {typeof error === "string" ? error : helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";