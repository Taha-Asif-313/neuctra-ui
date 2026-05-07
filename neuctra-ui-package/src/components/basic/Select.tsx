"use client";

import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
  useId,
  useLayoutEffect,
} from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface SelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
  description?: string;
  onClick?: (option: SelectOption, event: React.MouseEvent) => void;
}

export interface SelectProps {
  label?: string;
  name?: string;
  value?: string | string[];
  showDescription?: boolean;
  showCheckIcon?: boolean;
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

  /** Configuration */
  size?: "sm" | "md" | "lg";
  maxDropdownHeight?: string | number;

  searchable?: boolean;
  searchPlaceholder?: string;
  searchClassName?: string;
  searchStyle?: React.CSSProperties;

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

  /** Item Icon Styling */
  itemIconClassName?: string;
  itemIconStyle?: React.CSSProperties;

  /** Check Icon Styling */
  checkIconClassName?: string;
  checkIconStyle?: React.CSSProperties;

  style?: React.CSSProperties;
  triggerStyle?: React.CSSProperties;
  dropdownStyle?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
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
    showDescription = false,
    showCheckIcon = true,

    labelIcon: LabelIcon,
    prefixIcon: PrefixIcon,
    dropdownIcon: DropdownIcon = ChevronDown,

    searchClassName,
    searchStyle,
    searchPlaceholder,
    searchable = false,

    size = "md",
    maxDropdownHeight = "240px",

    className,
    containerClassName,
    labelClassName,
    triggerClassName,
    valueClassName,
    dropdownClassName,
    itemClassName,
    iconClassName,
    helperClassName,

    itemIconClassName,
    itemIconStyle,

    checkIconClassName,
    checkIconStyle,

    style,
    triggerStyle,
    dropdownStyle,
    itemStyle,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => containerRef.current!);
  const generatedHelperTextId = useId();
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });
  const [position, setPosition] = useState<"top" | "bottom">("bottom");

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [internalValue, setInternalValue] = useState<
    string | string[] | undefined
  >(defaultValue);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Size configuration
  const sizeConfig = {
    sm: {
      trigger: "px-2.5 py-1.5 text-xs",
      item: "px-2.5 py-1.5 text-xs",
      icon: "w-3 h-3",
      checkIcon: "w-3 h-3",
    },
    md: {
      trigger: "px-3 py-2 text-sm",
      item: "px-3 py-2 text-sm",
      icon: "w-4 h-4",
      checkIcon: "w-4 h-4",
    },
    lg: {
      trigger: "px-4 py-3 text-base",
      item: "px-4 py-3 text-base",
      icon: "w-5 h-5",
      checkIcon: "w-5 h-5",
    },
  };

  const selectedValues: string[] = multiple
    ? Array.isArray(currentValue)
      ? currentValue
      : currentValue
        ? [currentValue]
        : []
    : currentValue
      ? [currentValue as string]
      : [];

  const filteredOptions = useMemo(
    () =>
      options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase()),
      ),
    [options, search],
  );

  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !listRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current!.getBoundingClientRect();
      const menuHeight = listRef.current!.offsetHeight || 240;

      const spaceBottom = window.innerHeight - rect.bottom;
      const spaceTop = rect.top;

      const shouldOpenTop =
        spaceBottom < menuHeight + 10 && spaceTop > menuHeight;

      const top = shouldOpenTop ? rect.top - menuHeight - 8 : rect.bottom + 8;

      const left = rect.left;

      const width = rect.width;

      setPosition(shouldOpenTop ? "top" : "bottom");

      setCoords({
        top,
        left,
        width,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

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

  useEffect(() => {
    if (!open) return;

    const selectedIndex = filteredOptions.findIndex((opt) =>
      selectedValues.includes(opt.value),
    );

    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);

    requestAnimationFrame(() => {
      const el = listRef.current?.children?.[
        selectedIndex >= 0 ? selectedIndex : 0
      ] as HTMLElement;

      el?.scrollIntoView({ block: "nearest" });
    });
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (filteredOptions.length === 0) {
      setFocusedIndex(-1);
      return;
    }

    setFocusedIndex((prev) => {
      if (prev < 0) return 0;
      return prev >= filteredOptions.length ? filteredOptions.length - 1 : prev;
    });
  }, [filteredOptions, open]);

  useEffect(() => {
    if (!open) return;

    // Focus trigger first (good accessibility baseline)
    triggerRef.current?.focus();

    // Then optionally move "logical focus" to first item
    setFocusedIndex((prev) => {
      if (filteredOptions.length === 0) return -1;

      const selectedIndex = filteredOptions.findIndex((opt) =>
        selectedValues.includes(opt.value),
      );

      return selectedIndex >= 0 ? selectedIndex : 0;
    });
  }, [open, filteredOptions, selectedValues]);

  const handleSelect = useCallback(
    (opt: SelectOption, e?: React.MouseEvent) => {
      if (disabled) return;

      opt.onClick?.(opt, e!);

      let newValue: string | string[];

      if (multiple) {
        const exists = selectedValues.includes(opt.value);
        newValue = exists
          ? selectedValues.filter((v) => v !== opt.value)
          : [...selectedValues, opt.value];
      } else {
        newValue = opt.value;
        setOpen(false);
        setFocusedIndex(-1);
      }

      if (!isControlled) setInternalValue(newValue);
      onValueChange?.(newValue, name);
    },
    [disabled, selectedValues, multiple, isControlled, name, onValueChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          if (!disabled) {
            setOpen(true);
            setFocusedIndex(0);
          }
        }
        return;
      }

      // Handle navigation when dropdown is open
      if (filteredOptions.length === 0) {
        if (e.key === "Escape") {
          e.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
        }
        return;
      }

      switch (e.key) {
        case "Escape":
          e.preventDefault();
          setOpen(false);
          setFocusedIndex(-1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusedIndex >= 0 && focusedIndex < filteredOptions.length) {
            handleSelect(filteredOptions[focusedIndex]);
          }
          break;
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Home":
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case "End":
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
          break;
        case "PageUp":
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(0, prev - 5));
          break;
        case "PageDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            Math.min(filteredOptions.length - 1, prev + 5),
          );
          break;
      }
    },
    [open, disabled, focusedIndex, filteredOptions, handleSelect],
  );

  const selectedLabels = useMemo(
    () =>
      options
        .filter((o) => selectedValues.includes(o.value))
        .map((o) => o.label),
    [options, selectedValues],
  );

  const hasError = Boolean(error);
  const hasValue = selectedLabels.length > 0;
  const helperTextId =
    helperText || error ? name || generatedHelperTextId : undefined;

  const dropdownListStyle = useMemo(() => {
    if (typeof maxDropdownHeight === "number") {
      return { maxHeight: `${maxDropdownHeight}px` };
    }
    return { maxHeight: maxDropdownHeight };
  }, [maxDropdownHeight]);

  return (
    <div
      ref={containerRef}
      className={clsx("w-full space-y-1.5", className, containerClassName)}
      style={style}
    >
      {label && (
        <label
          className={clsx(
            "flex items-center gap-1.5 text-[13px] font-medium leading-none text-foreground",
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
            <PrefixIcon className={sizeConfig[size].icon} />
          </div>
        )}

        <button
          type="button"
          ref={triggerRef}
          disabled={disabled}
          onClick={() => !disabled && setOpen((p) => !p)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={helperTextId}
          className={clsx(
            "w-full flex items-center justify-between gap-2",
            "rounded-lg transition-all outline-none",
            "border border-border bg-input/30 text-foreground",
            "hover:bg-accent/10",
            PrefixIcon && "pl-9",
            disabled && "opacity-50 cursor-not-allowed pointer-events-none",
            hasError && "border-destructive focus:ring-destructive",
            success && "border-success focus:ring-success",
            sizeConfig[size].trigger,
            triggerClassName,
          )}
          style={{
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
              "transition-transform text-muted-foreground",
              open && "rotate-180",
              sizeConfig[size].icon,
              iconClassName,
            )}
          />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: position === "bottom" ? -6 : 6,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: position === "bottom" ? -6 : 6,
                scale: 0.98,
              }}
              transition={{ duration: 0.12 }}
              className={clsx(
                dropdownClassName,
                "fixed z-[9999] rounded-lg p-[5px] overflow-hidden",
                "bg-background border border-border",
              )}
              style={{
                top: coords.top,
                left: coords.left,
                width: coords.width,
                ...dropdownStyle,
              }}
              role="listbox"
              aria-label="Options"
            >
              {searchable && (
                <div className="p-2 border-b border-border">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setFocusedIndex(0);
                    }}
                    placeholder={searchPlaceholder || "Search..."}
                    className={clsx(
                      "w-full px-2 py-1.5 text-sm rounded-md outline-none",
                      "bg-background border border-border text-foreground",
                      searchClassName,
                    )}
                    style={searchStyle}
                  />
                </div>
              )}

              <ul
                ref={listRef}
                className="overflow-y-auto"
                style={dropdownListStyle}
              >
                {filteredOptions.length === 0 ? (
                  <li className="px-3 py-2.5 text-sm text-muted-foreground text-center">
                    No options available
                  </li>
                ) : (
                  filteredOptions.map((opt, index) => {
                    const active = selectedValues.includes(opt.value);

                    return (
                      <li
                        key={opt.value}
                        onClick={(e) => handleSelect(opt, e)}
                        role="option"
                        aria-selected={active}
                        className={clsx(
                          itemClassName,
                          "flex items-center justify-between rounded-md cursor-pointer transition-all relative hover:bg-accent",
                          sizeConfig[size].item,
                          active && "bg-accent",
                        )}
                        style={{
                          ...itemStyle,
                        }}
                      >
                        <div className="flex flex-col truncate">
                          <div className="flex items-center gap-2">
                            {opt.icon && (
                              <span
                                className={clsx(
                                  sizeConfig[size].icon,
                                  itemIconClassName,
                                )}
                                style={itemIconStyle}
                              >
                                {opt.icon}
                              </span>
                            )}

                            <span className="font-medium">{opt.label}</span>
                          </div>

                          {showDescription && opt.description && (
                            <span className="text-xs text-muted-foreground mt-0.5">
                              {opt.description}
                            </span>
                          )}
                        </div>

                        {showCheckIcon && active && (
                          <div>
                            <Check
                              className={clsx(
                                sizeConfig[size].checkIcon,
                                checkIconClassName,
                                "text-primary",
                              )}
                              style={{
                                ...checkIconStyle,
                              }}
                            />
                          </div>
                        )}
                      </li>
                    );
                  })
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {(helperText || error) && (
        <p
          id={helperTextId}
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
