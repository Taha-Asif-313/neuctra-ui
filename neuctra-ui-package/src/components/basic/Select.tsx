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

    primaryColor = "var(--primary)",
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);

  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<
    string | string[] | undefined
  >(defaultValue);

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (!disabled) setOpen((p) => !p);
      }
    },
    [disabled],
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

  const ringColor = hasError
    ? "var(--destructive)"
    : success
      ? "var(--success)"
      : "var(--border)";

  return (
    <div
      ref={containerRef}
      className={clsx("w-full space-y-1.5", className, containerClassName)}
      style={style}
    >
      {label && (
        <label
          className={clsx(
            "flex items-center gap-1.5 text-sm font-medium text-foreground",
            labelClassName,
          )}
        >
          {LabelIcon && <LabelIcon className="w-4 h-4 shrink-0" />}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        {PrefixIcon && (
          <div
            className={clsx(
              "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground",
              iconClassName,
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
          className={clsx(
            "w-full flex items-center justify-between gap-2",
            "rounded-lg text-sm px-3 py-2 transition-all outline-none",
            "border border-border bg-background text-foreground",
            "hover:bg-accent/10",
            PrefixIcon && "pl-9",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            triggerClassName,
          )}
          style={{
            ["--tw-ring-color" as string]: primaryColor,
            ...triggerStyle,
          }}
        >
          <span
            className={clsx(
              "truncate flex-1 text-left",
              hasValue ? "text-foreground" : "text-muted-foreground",
              valueClassName,
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
              "w-4 h-4 transition-transform text-muted-foreground",
              open && "rotate-180",
              iconClassName,
            )}
          />
        </button>

        {open && (
          <div
            className={clsx(
              "absolute z-50 mt-1.5 w-full rounded-xl overflow-hidden",
              "bg-background border border-border shadow-lg",
              dropdownClassName,
            )}
            style={dropdownStyle}
          >
            <ul className="max-h-60 overflow-y-auto">
              {options.length === 0 ? (
                <li className="px-3 py-2.5 text-sm text-muted-foreground text-center">
                  No options available
                </li>
              ) : (
                options.map((opt) => {
                  const active = selectedValues.includes(opt.value);

                  return (
                    <li
                      key={opt.value}
                      onClick={() => handleSelect(opt)}
                      className={clsx(
                        "flex items-center justify-between px-3 py-2 text-sm cursor-pointer transition-colors",
                        "text-foreground hover:bg-accent/10",
                        itemClassName,
                      )}
                      style={{
                        backgroundColor: active
                          ? `${primaryColor}20`
                          : undefined,
                        ...itemStyle,
                      }}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {opt.icon && <span>{opt.icon}</span>}
                        <span>{opt.label}</span>
                      </div>

                      {active && (
                        <Check
                          className="w-4 h-4 ml-2"
                          style={{ color: primaryColor }}
                        />
                      )}
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
            "text-xs",
            hasError
              ? "text-destructive"
              : success
                ? "text-primary"
                : "text-muted-foreground",
            helperClassName,
          )}
        >
          {typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";
