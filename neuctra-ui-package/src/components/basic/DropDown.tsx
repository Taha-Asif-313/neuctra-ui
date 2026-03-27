"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  CSSProperties,
} from "react";
import { ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export interface DropdownProps {
  label?: string;
  name?: string;

  value?: string;
  defaultValue?: string;
  onChange?: (name: string, value: string) => void;

  options?: SelectOption[];

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;

  error?: string | boolean;
  success?: boolean;
  helperText?: string;

  labelIcon?: React.ElementType;
  prefixIcon?: React.ElementType;

  variant?: "dark" | "light";

  /** 🎨 NEW: primary color override */
  primaryColor?: string;

  containerClassName?: string;
  labelClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;

  className?: string;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (props, ref) => {
    const {
      label,
      name = "",
      value,
      defaultValue,
      onChange,
      options = [],
      placeholder = "Select an option",
      required,
      disabled,
      error,
      success,
      helperText,

      labelIcon: LabelIcon,
      prefixIcon: PrefixIcon,

      variant = "dark",
      primaryColor,

      containerClassName = "",
      labelClassName = "",
      triggerClassName = "",
      dropdownClassName = "",
      optionClassName = "",

      className = "",
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => containerRef.current!);

    const [open, setOpen] = useState(false);
    const [localValue, setLocalValue] = useState(defaultValue || "");

    const currentValue = value !== undefined ? value : localValue;
    const selectedOption = options.find((o) => o.value === currentValue);

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

    const handleSelect = (option: SelectOption) => {
      setLocalValue(option.value);
      onChange?.(name, option.value);
      setOpen(false);
    };

    /** 🎨 Theme */
    const theme = {
      dark: {
        bg: "bg-zinc-900",
        text: "text-white",
        border: "border-zinc-800",
        dropdown: "bg-black border-zinc-800",
        option: "text-zinc-300 hover:bg-zinc-800",
      },
      light: {
        bg: "bg-white",
        text: "text-gray-900",
        border: "border-gray-300",
        dropdown: "bg-white border-gray-200",
        option: "text-gray-700 hover:bg-gray-100",
      },
    }[variant];

    /** 🎨 Dynamic primary color style */
    const primaryStyle: CSSProperties = primaryColor
      ? {
          "--primary": primaryColor,
        } as React.CSSProperties
      : {};

    /** Border state */
    const borderState = error
      ? "border-rose-500"
      : success
      ? "border-emerald-500"
      : theme.border;

    const paddingLeft = PrefixIcon ? "pl-12 pr-10" : "px-4";

    return (
      <div
        ref={containerRef}
        style={primaryStyle}
        className={`w-full space-y-1 ${containerClassName} ${className}`}
      >
        {/* Label */}
        {label && (
          <label
            className={`flex items-center gap-2 text-[13px] font-medium ${labelClassName}`}
          >
            {LabelIcon && (
              <LabelIcon className="w-4 h-4 text-primary" />
            )}
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        )}

        <div className="relative group">
          {/* Prefix Icon */}
          {PrefixIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
              <PrefixIcon className="w-4 h-4 text-zinc-500 group-focus-within:text-primary" />
            </div>
          )}

          {/* Trigger */}
          <button
            type="button"
            disabled={disabled}
            onClick={() => setOpen((p) => !p)}
            className={`
              w-full py-2.5 rounded-lg text-left text-sm
              border transition-all duration-200
              ${theme.bg} ${theme.text}
              ${paddingLeft}
              ${borderState}
              focus:ring-2 focus:ring-primary/30 focus:border-primary
              disabled:opacity-50 disabled:cursor-not-allowed
              ${triggerClassName}
            `}
          >
            <span className={selectedOption ? theme.text : "text-zinc-500"}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            <ChevronDown
              className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 transition-transform ${
                open ? "rotate-180" : ""
              } text-zinc-400`}
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
                {options.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => handleSelect(opt)}
                    className={`
                      px-4 py-3 cursor-pointer text-sm flex items-center gap-2
                      ${
                        currentValue === opt.value
                          ? "bg-primary/15 text-primary"
                          : theme.option
                      }
                      ${optionClassName}
                    `}
                  >
                    {opt.icon && <span>{opt.icon}</span>}
                    {opt.label}
                  </li>
                ))}
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

Dropdown.displayName = "Dropdown";