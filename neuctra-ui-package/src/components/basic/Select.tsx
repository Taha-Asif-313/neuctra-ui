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
  /** The label icon rendered before `label`. */
  labelIconClassName?: string;
  /** The wrapper around the search input, when `searchable` is set. */
  searchWrapperClassName?: string;
  /** The "No options available" empty state. */
  emptyClassName?: string;
  /** An option's label text. */
  itemLabelClassName?: string;
  /** An option's description text, when `showDescription` is set. */
  itemDescriptionClassName?: string;

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
    labelIconClassName,
    searchWrapperClassName,
    emptyClassName,
    itemLabelClassName,
    itemDescriptionClassName,

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
  const searchRef = useRef<HTMLInputElement>(null);

  // Size configuration. `triggerWithPrefix` has to reserve exactly
  // inset + icon width + gap, so it is defined per size alongside the icon it
  // makes room for rather than as one fixed `pl-9` for every size.
  const sizeConfig = {
    sm: {
      trigger: "px-2.5 py-1.5 text-xs",
      triggerWithPrefix: "pl-7 pr-2.5 py-1.5 text-xs",
      prefixInset: "left-2",
      item: "px-2.5 py-1.5 text-xs",
      icon: "w-3 h-3",
      checkIcon: "w-3 h-3",
      search: "px-2 py-1 text-xs",
      empty: "px-2.5 py-1.5 text-xs",
    },
    md: {
      trigger: "px-3 py-2 text-sm",
      triggerWithPrefix: "pl-9 pr-3 py-2 text-sm",
      prefixInset: "left-3",
      item: "px-3 py-2 text-sm",
      icon: "w-4 h-4",
      checkIcon: "w-4 h-4",
      search: "px-2 py-1.5 text-sm",
      empty: "px-3 py-2 text-sm",
    },
    lg: {
      trigger: "px-4 py-3 text-base",
      triggerWithPrefix: "pl-11 pr-4 py-3 text-base",
      prefixInset: "left-3.5",
      item: "px-4 py-3 text-base",
      icon: "w-5 h-5",
      checkIcon: "w-5 h-5",
      search: "px-2.5 py-2 text-base",
      empty: "px-4 py-3 text-base",
    },
  } as const;

  // Rebuilt every render if left inline, which re-fires the effects below that
  // depend on it — including the one that calls trigger.focus().
  const selectedValues: string[] = useMemo(
    () =>
      multiple
        ? Array.isArray(currentValue)
          ? currentValue
          : currentValue
            ? [currentValue]
            : []
        : currentValue
          ? [currentValue as string]
          : [],
    [multiple, currentValue],
  );

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

  // NOTE: a third effect used to live here that called triggerRef.focus() with
  // `selectedValues` in its deps. Because that array was rebuilt every render,
  // the effect re-ran on every render while open and continuously yanked focus
  // out of the search box, making `searchable` impossible to type in. The two
  // effects above already cover setting and clamping focusedIndex.

  // Move real focus into the search box when the menu opens, so typing works.
  useEffect(() => {
    if (!open || !searchable) return;
    const id = requestAnimationFrame(() => searchRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open, searchable]);

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
    // Shared by the trigger button and the search input.
    (e: React.KeyboardEvent<HTMLButtonElement | HTMLInputElement>) => {
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
  // Derived from useId, never from `name` — two <Select name="country" /> on one
  // page would otherwise emit duplicate DOM ids.
  const helperTextId =
    helperText || error ? `${generatedHelperTextId}-description` : undefined;
  const triggerId = `${generatedHelperTextId}-trigger`;
  const labelId = `${generatedHelperTextId}-label`;

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
          id={labelId}
          htmlFor={triggerId}
          className={clsx(
            "flex items-center gap-1.5 text-[13px] font-medium leading-none text-foreground",
            labelClassName,
          )}
        >
          {LabelIcon && (
            <LabelIcon
              className={clsx(sizeConfig[size].icon, "shrink-0", labelIconClassName)}
            />
          )}
          {label}
          {required && <span className="text-destructive">*</span>}
        </label>
      )}

      <div className="relative">
        {PrefixIcon && (
          <div
            className={clsx(
              "pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground",
              sizeConfig[size].prefixInset,
              iconClassName,
            )}
          >
            <PrefixIcon className={sizeConfig[size].icon} />
          </div>
        )}

        <button
          type="button"
          ref={triggerRef}
          id={triggerId}
          disabled={disabled}
          onClick={() => !disabled && setOpen((p) => !p)}
          onKeyDown={handleKeyDown}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-required={required}
          aria-invalid={hasError}
          aria-describedby={helperTextId}
          aria-labelledby={label ? labelId : undefined}
          className={clsx(
            "w-full flex items-center justify-between gap-2",
            "rounded-lg transition-all outline-none",
            "border border-border bg-input/30 text-foreground",
            "hover:bg-accent/10",
            // A ring color with no ring width renders nothing — set both.
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            disabled && "opacity-50 cursor-not-allowed",
            hasError &&
              "border-destructive focus-visible:ring-destructive/50",
            success && "border-success focus-visible:ring-success/50",
            PrefixIcon
              ? sizeConfig[size].triggerWithPrefix
              : sizeConfig[size].trigger,
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
                <div className={clsx("p-2 border-b border-border", searchWrapperClassName)}>
                  <input
                    ref={searchRef}
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setFocusedIndex(0);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={searchPlaceholder || "Search..."}
                    aria-label={searchPlaceholder || "Search options"}
                    className={clsx(
                      "w-full rounded-md outline-none",
                      "bg-background border border-border text-foreground",
                      "focus-visible:ring-2 focus-visible:ring-ring",
                      sizeConfig[size].search,
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
                  <li
                    role="option"
                    aria-disabled
                    aria-selected={false}
                    className={clsx(
                      "text-muted-foreground text-center",
                      sizeConfig[size].empty,
                      emptyClassName,
                    )}
                  >
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

                            <span className={clsx("font-medium", itemLabelClassName)}>
                              {opt.label}
                            </span>
                          </div>

                          {showDescription && opt.description && (
                            <span
                              className={clsx(
                                "text-xs text-muted-foreground mt-0.5",
                                itemDescriptionClassName,
                              )}
                            >
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
