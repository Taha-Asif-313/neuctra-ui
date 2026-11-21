"use client";

import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ChevronDown, Plus, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Chip } from "./Chip";
import { Spinner } from "./Spinner";
import { useControllableState } from "../../lib/useControllableState";

/** A single option in a {@link Combobox}. */
export interface ComboboxOption {
  /** Unique value returned by `onChange`. */
  value: string;
  /** Visible label. */
  label: string;
  /** Optional group label. Options are grouped by it automatically, or by `groupBy` when set. */
  group?: string;
  /** Secondary text shown under the label. */
  description?: string;
  /** Prevents selection. */
  disabled?: boolean;
}

export interface ComboboxProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "defaultValue"
  > {
  /** Controlled value: a string, or an array in multiple mode. */
  value?: string | string[];
  /** Initial value in uncontrolled mode. */
  defaultValue?: string | string[];
  /** Fired with the next value whenever the selection changes. */
  onChange?: (value: string | string[]) => void;
  /** Static option list. Use either this or `loadOptions`. */
  options?: ComboboxOption[];
  /** Async option loader, called (debounced) whenever the search query changes while open. */
  loadOptions?: (query: string) => Promise<ComboboxOption[]>;
  /** Delay in ms before `loadOptions` is called after typing. */
  loadDebounce?: number;
  /** Allows more than one selected option. */
  multiple?: boolean;
  /** Shows a "Create ..." row for queries without an exact match. */
  creatable?: boolean;
  /** Fired when a new value is created; `onChange` also receives it. */
  onCreate?: (value: string) => void;
  /** Filters options by the typed query. */
  searchable?: boolean;
  /** Groups options by the string returned from this function. Falls back to `option.group`. */
  groupBy?: (option: ComboboxOption) => string;
  /** Placeholder shown in the search input. */
  placeholder?: string;
  /** Label rendered above the field. */
  label?: string;
  /** Helper text rendered below the field. */
  helperText?: string;
  /** Error state. A string is rendered as the message; `true` only toggles error styling. */
  error?: string | boolean;
  /** Applies success styling to the field. */
  success?: boolean;
  /** Marks the field as required and shows a `*` next to the label. */
  required?: boolean;
  /** Disables the field and prevents opening the list. */
  disabled?: boolean;
  /** Field size. Matches Select and Input heights. */
  size?: "xs" | "sm" | "md" | "lg";
  /** Shows a clear button while something is selected. */
  clearable?: boolean;
  /** Name for hidden form inputs, one per selected value. */
  name?: string;
  /** Text shown when no option matches. */
  emptyMessage?: string;
  /** Text shown while `loadOptions` is pending and nothing is loaded yet. */
  loadingMessage?: string;
  /** Maximum height of the option list. Numbers are pixels. */
  maxDropdownHeight?: string | number;

  /** Additional classes for the label. */
  labelClassName?: string;
  /** Additional classes for the bordered field that wraps chips and the input. */
  fieldClassName?: string;
  /** Additional classes for the text input. */
  inputClassName?: string;
  /** Additional classes for the floating option list. */
  dropdownClassName?: string;
  /** Additional classes for each option row. */
  optionClassName?: string;
  /** Additional classes for group headings. */
  groupLabelClassName?: string;
  /** Additional classes for each selected-value chip in multiple mode. */
  chipClassName?: string;
  /** Additional classes for the empty and loading messages. */
  emptyClassName?: string;
  /** Additional classes for the helper/error text. */
  helperClassName?: string;
  /** Inline styles for the bordered field. */
  fieldStyle?: React.CSSProperties;
  /** Inline styles for the floating option list. */
  dropdownStyle?: React.CSSProperties;
}

const sizeConfig = {
  xs: {
    field: "px-2 py-1 text-[11px]",
    fieldWithChips: "px-1 py-0.5 text-[11px]",
    option: "px-2 py-1 text-[11px]",
    icon: "h-3 w-3",
    spinner: "xs",
    labelText: "text-[10px]",
  },
  sm: {
    field: "px-2.5 py-1.5 text-xs",
    fieldWithChips: "px-1.5 py-1 text-xs",
    option: "px-2.5 py-1.5 text-xs",
    icon: "h-3 w-3",
    spinner: "xs",
    labelText: "text-[13px]",
  },
  md: {
    field: "px-3 py-2 text-sm",
    fieldWithChips: "px-1.5 py-1.5 text-sm",
    option: "px-3 py-2 text-sm",
    icon: "h-4 w-4",
    spinner: "sm",
    labelText: "text-[13px]",
  },
  lg: {
    field: "px-4 py-3 text-base",
    fieldWithChips: "px-2 py-2.5 text-base",
    option: "px-4 py-3 text-base",
    icon: "h-5 w-5",
    spinner: "sm",
    labelText: "text-[13px]",
  },
} as const;

const GAP = 8;
const VIEWPORT_MARGIN = 8;

type PanelCoords = {
  top: number;
  left: number;
  width: number;
  side: "top" | "bottom";
};

/** Fixed, viewport-clamped positioning that follows scroll and resize. */
function useAnchoredPanel(
  open: boolean,
  anchorRef: React.RefObject<HTMLElement | null>,
  panelRef: React.RefObject<HTMLElement | null>,
) {
  const [coords, setCoords] = useState<PanelCoords | null>(null);

  useLayoutEffect(() => {
    if (!open) {
      setCoords(null);
      return;
    }
    const update = () => {
      const anchor = anchorRef.current;
      const panel = panelRef.current;
      if (!anchor || !panel) return;
      const rect = anchor.getBoundingClientRect();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const width = Math.min(rect.width, vw - VIEWPORT_MARGIN * 2);
      const height = panel.offsetHeight;
      const spaceBelow = vh - rect.bottom - GAP - VIEWPORT_MARGIN;
      const spaceAbove = rect.top - GAP - VIEWPORT_MARGIN;
      const side = spaceBelow < height && spaceAbove > spaceBelow ? "top" : "bottom";
      const rawTop = side === "bottom" ? rect.bottom + GAP : rect.top - height - GAP;
      const top = Math.min(
        Math.max(rawTop, VIEWPORT_MARGIN),
        Math.max(VIEWPORT_MARGIN, vh - height - VIEWPORT_MARGIN),
      );
      const left = Math.min(
        Math.max(rect.left, VIEWPORT_MARGIN),
        Math.max(VIEWPORT_MARGIN, vw - width - VIEWPORT_MARGIN),
      );
      setCoords({ top, left, width, side });
    };

    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    if (observer && panelRef.current) observer.observe(panelRef.current);
    if (observer && anchorRef.current) observer.observe(anchorRef.current);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, [open, anchorRef, panelRef]);

  return coords;
}

type Row =
  | { kind: "option"; option: ComboboxOption }
  | { kind: "create"; value: string };

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  function Combobox(
    {
      value,
      defaultValue,
      onChange,
      options = [],
      loadOptions,
      loadDebounce = 250,
      multiple = false,
      creatable = false,
      onCreate,
      searchable = true,
      groupBy,
      placeholder = "Search...",
      label,
      helperText,
      error,
      success = false,
      required = false,
      disabled = false,
      size = "md",
      clearable = false,
      name,
      emptyMessage = "No options found",
      loadingMessage = "Loading...",
      maxDropdownHeight = 240,
      className,
      style,
      labelClassName,
      fieldClassName,
      inputClassName,
      dropdownClassName,
      optionClassName,
      groupLabelClassName,
      chipClassName,
      emptyClassName,
      helperClassName,
      fieldStyle,
      dropdownStyle,
      ...rest
    },
    ref,
  ) {
    const id = useId();
    const inputId = `${id}-input`;
    const labelId = `${id}-label`;
    const listboxId = `${id}-listbox`;
    const helperId = `${id}-helper`;
    const reduceMotion = useReducedMotion();
    const config = sizeConfig[size] ?? sizeConfig.md;

    const [selected, setSelected] = useControllableState<string | string[]>({
      value,
      defaultValue: defaultValue ?? (multiple ? [] : ""),
      onChange,
    });
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const [loadedOptions, setLoadedOptions] = useState<ComboboxOption[]>([]);

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fieldRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const listRef = useRef<HTMLDivElement | null>(null);
    const coords = useAnchoredPanel(open, fieldRef, panelRef);

    // Labels of every option ever seen, so chips/inputs keep their text when
    // async results change or a created value is not part of `options`.
    const knownOptions = useRef(new Map<string, ComboboxOption>());

    // Stored in a ref so an inline `loadOptions={(q) => ...}` (new identity
    // every render) does not retrigger the effect in an endless loop.
    const loadOptionsRef = useRef(loadOptions);
    loadOptionsRef.current = loadOptions;
    const isAsync = Boolean(loadOptions);

    useEffect(() => {
      if (!isAsync || !open) return;
      let cancelled = false;
      setLoading(true);
      const timer = window.setTimeout(() => {
        loadOptionsRef.current?.(query)
          .then((next) => {
            if (!cancelled) setLoadedOptions(next);
          })
          .catch(() => {
            if (!cancelled) setLoadedOptions([]);
          })
          .finally(() => {
            if (!cancelled) setLoading(false);
          });
      }, query ? loadDebounce : 0);
      return () => {
        cancelled = true;
        window.clearTimeout(timer);
      };
    }, [isAsync, open, query, loadDebounce]);

    const source = isAsync ? loadedOptions : options;
    source.forEach((option) => knownOptions.current.set(option.value, option));

    const selectedValues = useMemo(
      () =>
        Array.isArray(selected) ? selected : selected ? [selected] : [],
      [selected],
    );
    const selectedOptions = selectedValues.map(
      (entry) =>
        knownOptions.current.get(entry) ?? { value: entry, label: entry },
    );

    const normalizedQuery = query.trim().toLowerCase();
    const filtered = useMemo(() => {
      if (!searchable || !normalizedQuery || isAsync) return source;
      return source.filter(
        (option) =>
          option.label.toLowerCase().includes(normalizedQuery) ||
          option.value.toLowerCase().includes(normalizedQuery),
      );
    }, [source, searchable, normalizedQuery, isAsync]);

    const canCreate =
      creatable &&
      normalizedQuery.length > 0 &&
      !source.some(
        (option) =>
          option.label.toLowerCase() === normalizedQuery ||
          option.value.toLowerCase() === normalizedQuery,
      );

    const resolveGroup = useMemo(() => {
      if (groupBy) return groupBy;
      if (source.some((option) => option.group)) {
        return (option: ComboboxOption) => option.group ?? "";
      }
      return null;
    }, [groupBy, source]);

    // Group first, then flatten, so keyboard order always equals render order.
    const groups = useMemo(() => {
      if (!resolveGroup) return [["", filtered] as [string, ComboboxOption[]]];
      const map = new Map<string, ComboboxOption[]>();
      filtered.forEach((option) => {
        const key = resolveGroup(option) ?? "";
        map.set(key, [...(map.get(key) ?? []), option]);
      });
      return Array.from(map);
    }, [filtered, resolveGroup]);

    const rows: Row[] = useMemo(() => {
      const list: Row[] = [];
      groups.forEach(([, entries]) =>
        entries.forEach((option) => list.push({ kind: "option", option })),
      );
      if (canCreate) list.push({ kind: "create", value: query.trim() });
      return list;
    }, [groups, canCreate, query]);

    const isRowDisabled = useCallback(
      (index: number) => {
        const row = rows[index];
        return !row || (row.kind === "option" && Boolean(row.option.disabled));
      },
      [rows],
    );

    const findEnabled = useCallback(
      (from: number, direction: 1 | -1) => {
        for (let step = 0; step < rows.length; step += 1) {
          const index = from + step * direction;
          if (index < 0 || index >= rows.length) return -1;
          if (!isRowDisabled(index)) return index;
        }
        return -1;
      },
      [rows.length, isRowDisabled],
    );

    // Keep the active row valid as results change.
    useEffect(() => {
      if (!open) return;
      setActiveIndex((current) => {
        if (current >= 0 && current < rows.length && !isRowDisabled(current)) {
          return current;
        }
        const firstSelected = rows.findIndex(
          (row) =>
            row.kind === "option" &&
            selectedValues.includes(row.option.value) &&
            !row.option.disabled,
        );
        return firstSelected >= 0 ? firstSelected : findEnabled(0, 1);
      });
    }, [open, rows, isRowDisabled, findEnabled, selectedValues]);

    useEffect(() => {
      if (!open || activeIndex < 0) return;
      const node = listRef.current?.querySelector<HTMLElement>(
        `[data-index="${activeIndex}"]`,
      );
      node?.scrollIntoView({ block: "nearest" });
    }, [open, activeIndex]);

    const close = useCallback(() => {
      setOpen(false);
      setQuery("");
      setActiveIndex(-1);
    }, []);

    // Outside click closes without stealing focus.
    useEffect(() => {
      if (!open) return;
      const onPointerDown = (event: MouseEvent) => {
        const target = event.target as Node;
        if (
          !rootRef.current?.contains(target) &&
          !panelRef.current?.contains(target)
        ) {
          close();
        }
      };
      document.addEventListener("mousedown", onPointerDown);
      return () => document.removeEventListener("mousedown", onPointerDown);
    }, [open, close]);

    const openList = () => {
      if (disabled) return;
      setOpen(true);
    };

    const commit = (optionValue: string, created = false) => {
      if (multiple) {
        const next = selectedValues.includes(optionValue)
          ? selectedValues.filter((entry) => entry !== optionValue)
          : [...selectedValues, optionValue];
        setSelected(next);
        setQuery("");
      } else {
        setSelected(optionValue);
        close();
      }
      if (created) {
        knownOptions.current.set(optionValue, {
          value: optionValue,
          label: optionValue,
        });
        onCreate?.(optionValue);
      }
      inputRef.current?.focus();
    };

    const commitRow = (index: number) => {
      const row = rows[index];
      if (!row || isRowDisabled(index)) return;
      if (row.kind === "create") commit(row.value, true);
      else commit(row.option.value);
    };

    const clearAll = () => {
      setSelected(multiple ? [] : "");
      setQuery("");
      inputRef.current?.focus();
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      switch (event.key) {
        case "ArrowDown": {
          event.preventDefault();
          if (!open) {
            openList();
            return;
          }
          const next = findEnabled(activeIndex + 1, 1);
          if (next >= 0) setActiveIndex(next);
          break;
        }
        case "ArrowUp": {
          event.preventDefault();
          if (!open) {
            openList();
            return;
          }
          const next = findEnabled(activeIndex - 1, -1);
          if (next >= 0) setActiveIndex(next);
          break;
        }
        case "Home":
          if (open) {
            event.preventDefault();
            setActiveIndex(findEnabled(0, 1));
          }
          break;
        case "End":
          if (open) {
            event.preventDefault();
            setActiveIndex(findEnabled(rows.length - 1, -1));
          }
          break;
        case "Enter":
          if (!open) {
            openList();
            event.preventDefault();
            return;
          }
          event.preventDefault();
          commitRow(activeIndex);
          break;
        case "Escape":
          if (open) {
            event.preventDefault();
            close();
          } else if (query) {
            setQuery("");
          }
          break;
        case "Tab":
          if (open) close();
          break;
        case "Backspace":
          if (multiple && !query && selectedValues.length > 0) {
            setSelected(selectedValues.slice(0, -1));
          }
          break;
      }
    };

    const hasError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;
    const bottomText = errorMessage ?? helperText;
    const singleLabel =
      !multiple && selectedOptions[0] ? selectedOptions[0].label : "";
    const showChips = multiple && selectedOptions.length > 0;
    const inputValue = multiple || open || query ? query : singleLabel;
    const inputPlaceholder =
      !multiple && open && singleLabel
        ? singleLabel
        : showChips
          ? ""
          : placeholder;
    const activeId =
      open && activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined;
    const listMaxHeight =
      typeof maxDropdownHeight === "number"
        ? `${maxDropdownHeight}px`
        : maxDropdownHeight;

    let rowIndex = -1;

    const renderOption = (option: ComboboxOption) => {
      rowIndex += 1;
      const index = rowIndex;
      const isSelected = selectedValues.includes(option.value);
      const isActive = activeIndex === index;
      return (
        <div
          key={option.value}
          id={`${id}-option-${index}`}
          data-index={index}
          role="option"
          aria-selected={isSelected}
          aria-disabled={option.disabled || undefined}
          onMouseDown={(event) => event.preventDefault()}
          onMouseMove={() => {
            if (!option.disabled && activeIndex !== index) setActiveIndex(index);
          }}
          onClick={() => commitRow(index)}
          className={cn(
            "flex w-full cursor-pointer items-start gap-2 rounded-md text-left text-foreground transition-colors",
            config.option,
            isActive && "bg-accent text-accent-foreground",
            option.disabled && "cursor-not-allowed opacity-50",
            optionClassName,
          )}
        >
          <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">{option.label}</span>
            {option.description && (
              <span className="mt-0.5 block truncate text-xs text-muted-foreground">
                {option.description}
              </span>
            )}
          </span>
          <Check
            aria-hidden="true"
            className={cn(
              "mt-0.5 shrink-0 text-primary",
              config.icon,
              isSelected ? "opacity-100" : "opacity-0",
            )}
          />
        </div>
      );
    };

    return (
      <div
        ref={(element) => {
          rootRef.current = element;
          if (typeof ref === "function") ref(element);
          else if (ref) ref.current = element;
        }}
        className={cn("relative w-full space-y-1.5", className)}
        style={style}
        {...rest}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={inputId}
            className={cn(
              "flex items-center gap-1.5 font-medium text-foreground",
              config.labelText,
              // After the text size: tailwind-merge drops a leading-* that precedes text-*.
              "leading-none",
              labelClassName,
            )}
          >
            {label}
            {required && <span className="text-destructive">*</span>}
          </label>
        )}

        <div
          ref={fieldRef}
          onMouseDown={(event) => {
            // Clicking anywhere on the field (padding, chip gaps) focuses the input.
            if (disabled) return;
            if (event.target !== inputRef.current) {
              event.preventDefault();
              inputRef.current?.focus();
            }
            setOpen((current) =>
              event.target === inputRef.current ? true : !current,
            );
          }}
          className={cn(
            "flex w-full cursor-text flex-wrap items-center gap-1 rounded-lg transition-all",
            "border border-border bg-input/30 text-foreground hover:bg-accent/10",
            "focus-within:border-ring focus-within:ring-2 focus-within:ring-ring",
            hasError && "border-destructive focus-within:ring-destructive/50",
            success && !hasError && "border-success focus-within:ring-success/50",
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
            showChips ? config.fieldWithChips : config.field,
            fieldClassName,
          )}
          style={fieldStyle}
        >
          {showChips &&
            selectedOptions.map((option) => (
              <Chip
                key={option.value}
                size="sm"
                label={option.label}
                disabled={disabled}
                onRemove={() => commit(option.value)}
                onMouseDown={(event) => event.stopPropagation()}
                className={cn("max-w-full", chipClassName)}
              />
            ))}

          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            autoComplete="off"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-haspopup="listbox"
            aria-controls={open ? listboxId : undefined}
            aria-activedescendant={activeId}
            aria-labelledby={label ? labelId : undefined}
            aria-describedby={bottomText ? helperId : undefined}
            aria-invalid={hasError || undefined}
            aria-required={required || undefined}
            aria-busy={loading || undefined}
            disabled={disabled}
            readOnly={!searchable}
            value={inputValue}
            placeholder={inputPlaceholder}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(-1);
              setOpen(true);
            }}
            onKeyDown={onKeyDown}
            className={cn(
              "w-0 min-w-16 flex-1 bg-transparent text-foreground outline-none placeholder:text-muted-foreground",
              "disabled:cursor-not-allowed",
              showChips && "px-1",
              !searchable && "cursor-pointer",
              inputClassName,
            )}
          />

          <span className="ml-auto flex shrink-0 items-center gap-1 self-center">
            {loading && (
              <Spinner
                size={config.spinner}
                label={loadingMessage}
                colorClassName="text-muted-foreground"
              />
            )}
            {clearable && selectedValues.length > 0 && !disabled && (
              <button
                type="button"
                aria-label="Clear selection"
                onMouseDown={(event) => event.stopPropagation()}
                onClick={clearAll}
                className="rounded-md p-0.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X aria-hidden="true" className={config.icon} />
              </button>
            )}
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "text-muted-foreground transition-transform motion-reduce:transition-none",
                open && "rotate-180",
                config.icon,
              )}
            />
          </span>
        </div>

        {name &&
          selectedValues.map((entry) => (
            <input key={entry} type="hidden" name={name} value={entry} />
          ))}

        <AnimatePresence>
          {open && (
            <motion.div
              ref={panelRef}
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: coords?.side === "top" ? 4 : -4, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: coords?.side === "top" ? 4 : -4, scale: 0.98 }
              }
              transition={{ duration: 0.12 }}
              className={cn(
                "fixed z-50 overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-lg",
                !coords && "invisible",
                dropdownClassName,
              )}
              style={{
                top: coords?.top ?? 0,
                left: coords?.left ?? 0,
                width: coords?.width,
                ...dropdownStyle,
              }}
            >
              <div
                ref={listRef}
                id={listboxId}
                role="listbox"
                aria-multiselectable={multiple || undefined}
                aria-labelledby={label ? labelId : undefined}
                aria-label={label ? undefined : placeholder}
                className="overflow-y-auto overscroll-contain"
                style={{ maxHeight: listMaxHeight }}
              >
                {rows.length === 0 ? (
                  <p
                    className={cn(
                      "flex items-center justify-center gap-2 text-muted-foreground",
                      config.option,
                      emptyClassName,
                    )}
                  >
                    {loading && (
                      <Spinner
                        size={config.spinner}
                        label=""
                        aria-hidden="true"
                        colorClassName="text-muted-foreground"
                      />
                    )}
                    {loading ? loadingMessage : emptyMessage}
                  </p>
                ) : (
                  <>
                    {groups.map(([groupName, entries]) =>
                      entries.length === 0 ? null : groupName ? (
                        <div key={groupName} role="group" aria-label={groupName}>
                          <p
                            aria-hidden="true"
                            className={cn(
                              "px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground",
                              groupLabelClassName,
                            )}
                          >
                            {groupName}
                          </p>
                          {entries.map(renderOption)}
                        </div>
                      ) : (
                        <React.Fragment key="__ungrouped">
                          {entries.map(renderOption)}
                        </React.Fragment>
                      ),
                    )}
                    {canCreate &&
                      (() => {
                        rowIndex += 1;
                        const index = rowIndex;
                        return (
                          <div
                            id={`${id}-option-${index}`}
                            data-index={index}
                            role="option"
                            aria-selected={false}
                            onMouseDown={(event) => event.preventDefault()}
                            onMouseMove={() => setActiveIndex(index)}
                            onClick={() => commitRow(index)}
                            className={cn(
                              "flex w-full cursor-pointer items-center gap-2 rounded-md text-left text-primary transition-colors",
                              config.option,
                              activeIndex === index && "bg-accent",
                              optionClassName,
                            )}
                          >
                            <Plus aria-hidden="true" className={cn("shrink-0", config.icon)} />
                            <span className="truncate">
                              Create "{query.trim()}"
                            </span>
                          </div>
                        );
                      })()}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {bottomText && (
          <p
            id={helperId}
            className={cn(
              "text-xs",
              hasError
                ? "text-destructive"
                : success
                  ? "text-success"
                  : "text-muted-foreground",
              helperClassName,
            )}
          >
            {bottomText}
          </p>
        )}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
