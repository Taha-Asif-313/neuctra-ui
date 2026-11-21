"use client";

import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown, Plus, RotateCcw, Save, X } from "lucide-react";
import { cn } from "../../lib/cn";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { Checkbox } from "./Checkbox";
import { Input } from "./Input";

/** A selectable choice for a select or multi-select filter field. */
export interface FilterOption {
  /** Value stored in the active filter. */
  value: string;
  /** Text shown to the user. */
  label: string;
}

/** Describes a field that can be added to the bar. */
export interface FilterDefinition {
  /** Unique key used to identify the field in active filters. */
  key: string;
  /** Human-readable field label. */
  label: string;
  /** Control used to edit the value. */
  type?: "text" | "select" | "multi-select" | "date";
  /** Choices for `select` and `multi-select` fields. */
  options?: FilterOption[];
  /** Placeholder for text and date fields. */
  placeholder?: string;
}

/** A currently applied filter value. */
export interface ActiveFilter {
  /** Key matching a {@link FilterDefinition}. */
  key: string;
  /** Single value, or multiple values for a multi-select field. */
  value: string | string[];
  /** Overrides the field label in the chip. */
  label?: string;
}

export interface FilterBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Fields offered by the "Add filter" menu. */
  fields: FilterDefinition[];
  /** Currently applied filters. */
  filters: ActiveFilter[];
  /** Fired with the complete filter list whenever it changes. */
  onChange: (filters: ActiveFilter[]) => void;
  /** Fired by the Clear button; `onChange([])` is used when omitted. */
  onClear?: () => void;
  /** Shows a Save view button; fired with the current filters. */
  onSaveView?: (filters: ActiveFilter[]) => void;
  /** Height and text size of the filter chips and buttons. */
  size?: "sm" | "md";
  /** `"card"` wraps the bar in a bordered card; `"plain"` renders only the chips and buttons. */
  variant?: "card" | "plain";
  /** Disables every control in the bar. */
  disabled?: boolean;
  /** Label of the add button. */
  addLabel?: React.ReactNode;
  /** Label of the clear button. */
  clearLabel?: React.ReactNode;
  /** Label of the save view button. */
  saveViewLabel?: React.ReactNode;
  /** Text shown when no filters are applied. Pass `null` to hide it. */
  emptyLabel?: React.ReactNode;
  /** Additional classes for each active filter chip. */
  filterClassName?: string;
  /** Additional classes for the add filter button. */
  addButtonClassName?: string;
  /** Additional classes for the floating editor and add menu panels. */
  panelClassName?: string;
}

const sizeConfig = {
  sm: { control: "h-7 text-xs", pad: "px-2", icon: "[&_svg]:h-3.5 [&_svg]:w-3.5", item: "px-2 py-1.5 text-xs", text: "text-xs", button: "xs" as const, input: "sm" as const, check: 14 },
  md: { control: "h-8 text-sm", pad: "px-2.5", icon: "[&_svg]:h-4 [&_svg]:w-4", item: "px-2.5 py-2 text-sm", text: "text-sm", button: "sm" as const, input: "md" as const, check: 16 },
} as const;

const ADD_KEY = "__add__";
const ITEM_SELECTOR =
  '[data-filter-item]:not(:disabled), input[type="checkbox"]:not(:disabled)';

const asArray = (value: string | string[]) =>
  Array.isArray(value) ? value : value ? [value] : [];

/** Human-readable value: option labels instead of raw values, truncated for long lists. */
const describeValue = (field: FilterDefinition | undefined, value: string | string[]) => {
  const values = asArray(value);
  if (!values.length) return "Any";
  const labels = values.map(
    (entry) => field?.options?.find((option) => option.value === entry)?.label ?? entry,
  );
  return labels.length > 2
    ? `${labels.slice(0, 2).join(", ")} +${labels.length - 2}`
    : labels.join(", ");
};

/** Arrow/Home/End roving focus across the items of an open panel. */
const handleListKeys = (event: React.KeyboardEvent<HTMLElement>) => {
  if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
  const items = Array.from(
    event.currentTarget.querySelectorAll<HTMLElement>(ITEM_SELECTOR),
  );
  if (!items.length) return;
  event.preventDefault();
  const current = items.indexOf(document.activeElement as HTMLElement);
  const next =
    event.key === "Home"
      ? 0
      : event.key === "End"
        ? items.length - 1
        : event.key === "ArrowDown"
          ? (current + 1) % items.length
          : (current - 1 + items.length) % items.length;
  items[next]?.focus();
};

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  function FilterBar(
    {
      fields,
      filters,
      onChange,
      onClear,
      onSaveView,
      size = "sm",
      variant = "card",
      disabled = false,
      addLabel = "Add filter",
      clearLabel = "Clear",
      saveViewLabel = "Save view",
      emptyLabel = "No active filters",
      className,
      style,
      filterClassName,
      addButtonClassName,
      panelClassName,
      ...rest
    },
    ref,
  ) {
    const s = sizeConfig[size] ?? sizeConfig.sm;
    const [openKey, setOpenKey] = useState<string | null>(null);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const triggerRefs = useRef<Record<string, HTMLSpanElement | null>>({});
    const editorId = useId();

    const available = fields.filter(
      (field) => !filters.some((filter) => filter.key === field.key),
    );

    // Move focus into a panel when it opens. Deferred one frame because
    // Popover keeps the panel invisible (unfocusable) until it is positioned.
    useEffect(() => {
      if (!openKey) return;
      const id = requestAnimationFrame(() => {
        const panel = panelRef.current;
        if (!panel) return;
        const target =
          panel.querySelector<HTMLElement>("input") ??
          panel.querySelector<HTMLElement>('[data-filter-item][aria-checked="true"]') ??
          panel.querySelector<HTMLElement>(ITEM_SELECTOR);
        target?.focus();
      });
      return () => cancelAnimationFrame(id);
    }, [openKey]);

    // Popover's trigger wrapper (role="button") is the parent of our span.
    const focusTrigger = (key: string) =>
      requestAnimationFrame(() => triggerRefs.current[key]?.parentElement?.focus());

    const closePanel = (returnFocus = true) => {
      const key = openKey;
      setOpenKey(null);
      if (returnFocus && key) focusTrigger(key);
    };

    const onPanelKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closePanel();
        return;
      }
      handleListKeys(event);
    };

    const update = (key: string, value: string | string[]) =>
      onChange(filters.map((filter) => (filter.key === key ? { ...filter, value } : filter)));

    const remove = (key: string) => {
      if (openKey === key) setOpenKey(null);
      onChange(filters.filter((filter) => filter.key !== key));
    };

    // New filters start empty ("Any") and open their editor right away, so
    // the user picks a value instead of inheriting an arbitrary first option.
    const add = (field: FilterDefinition) => {
      onChange([
        ...filters,
        { key: field.key, value: field.type === "multi-select" ? [] : "" },
      ]);
      setOpenKey(field.key);
    };

    const clear = () => {
      setOpenKey(null);
      if (onClear) onClear();
      else onChange([]);
    };

    const buttonBase = cn(
      "inline-flex shrink-0 items-center gap-1.5 rounded-lg font-medium transition-colors",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
      "disabled:cursor-not-allowed disabled:opacity-50",
      s.control,
      s.pad,
      s.icon,
    );

    const panelClasses = cn("w-64 max-w-[calc(100vw-2rem)] p-1.5", panelClassName);

    const itemClasses = cn(
      "flex w-full items-center gap-2 rounded-md text-left text-popover-foreground transition-colors",
      "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
      s.item,
    );

    const renderEditor = (field: FilterDefinition | undefined, filter: ActiveFilter, label: string) => {
      const values = asArray(filter.value);

      if (field?.type === "select") {
        const choices: FilterOption[] = [{ value: "", label: "Any" }, ...(field.options ?? [])];
        return (
          <div role="menu" aria-label={`${label} value`} className="max-h-64 space-y-0.5 overflow-y-auto">
            {choices.map((option) => {
              const selected = (values[0] ?? "") === option.value;
              return (
                <button
                  key={option.value || "__any__"}
                  type="button"
                  role="menuitemradio"
                  aria-checked={selected}
                  data-filter-item=""
                  onClick={() => {
                    update(filter.key, option.value);
                    closePanel();
                  }}
                  className={itemClasses}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {selected && <Check aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        );
      }

      if (field?.type === "multi-select") {
        return (
          <div className="max-h-64 overflow-y-auto">
            <Checkbox
              mode="group"
              aria-label={`${label} values`}
              options={field.options ?? []}
              selectedValues={values}
              onChange={(next) => update(filter.key, next)}
              iconSize={s.check}
              containerClassName="gap-0.5"
              itemClassName={cn(
                "w-full rounded-md text-popover-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
                "has-[:focus-visible]:bg-accent",
                s.item,
              )}
              textClassName={cn("min-w-0 flex-1 truncate text-current", s.text)}
            />
          </div>
        );
      }

      return (
        <form
          className="p-1"
          onSubmit={(event) => {
            event.preventDefault();
            closePanel();
          }}
        >
          {field?.type === "date" ? (
            // Input has no date type, so date fields keep a native input
            // styled to match it.
            <input
              id={`${editorId}-${filter.key}`}
              type="date"
              value={typeof filter.value === "string" ? filter.value : ""}
              onChange={(event) => update(filter.key, event.target.value)}
              className={cn(
                "w-full min-w-0 rounded-lg border border-border bg-input/30 px-3 py-1.5 text-foreground transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring",
                s.text,
              )}
            />
          ) : (
            <Input
              id={`${editorId}-${filter.key}`}
              size={s.input}
              placeholder={field?.placeholder ?? `Filter by ${label.toLowerCase()}`}
              value={typeof filter.value === "string" ? filter.value : ""}
              onChange={(event) => update(filter.key, event.target.value)}
            />
          )}
          <p className="mt-1.5 px-0.5 text-xs text-muted-foreground">Press Enter to apply.</p>
        </form>
      );
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Filters"
        className={cn(
          "flex flex-wrap items-center gap-2 text-foreground",
          variant === "card" && "rounded-xl border border-border bg-card p-3",
          className,
        )}
        style={style}
        {...rest}
      >
        {filters.length === 0 && emptyLabel !== null && (
          <span className={cn("px-1 text-muted-foreground", size === "md" ? "text-sm" : "text-xs")}>
            {emptyLabel}
          </span>
        )}

        {filters.map((filter) => {
          const field = fields.find((entry) => entry.key === filter.key);
          const label = filter.label ?? field?.label ?? filter.key;
          const display = describeValue(field, filter.value);
          const isOpen = openKey === filter.key;

          return (
            <div
              key={filter.key}
              className={cn(
                "inline-flex max-w-full items-stretch overflow-hidden rounded-lg border border-border bg-input/30",
                s.control,
                disabled && "opacity-50",
                filterClassName,
              )}
            >
              <Popover
                open={isOpen}
                onOpenChange={(next) => setOpenKey(next ? filter.key : null)}
                align="start"
                disabled={disabled}
                className="min-w-0"
                triggerClassName={cn(
                  "h-full min-w-0 items-center rounded-none transition-colors hover:bg-accent hover:text-accent-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                )}
                contentClassName={panelClasses}
                trigger={
                  <span
                    ref={(node) => {
                      triggerRefs.current[filter.key] = node;
                    }}
                    aria-label={`${label}: ${display}. Edit filter`}
                    className={cn("inline-flex min-w-0 items-center gap-1.5", s.pad, s.icon)}
                  >
                    <span className="shrink-0 text-muted-foreground">{label}</span>
                    <span className="min-w-0 max-w-48 truncate font-medium text-foreground">
                      {display}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none",
                        isOpen && "rotate-180",
                      )}
                    />
                  </span>
                }
              >
                <div ref={isOpen ? panelRef : undefined} onKeyDown={onPanelKeyDown}>
                  {field?.type === "select" || field?.type === "multi-select" ? (
                    <p className="px-2 pb-1.5 pt-1 text-xs font-medium text-muted-foreground">
                      {label}
                    </p>
                  ) : (
                    // Names the text/date editor below.
                    <label
                      htmlFor={`${editorId}-${filter.key}`}
                      className="block px-2 pb-1.5 pt-1 text-xs font-medium text-muted-foreground"
                    >
                      {label}
                    </label>
                  )}
                  {renderEditor(field, filter, label)}
                </div>
              </Popover>
              <button
                type="button"
                aria-label={`Remove ${label} filter`}
                disabled={disabled}
                onClick={() => remove(filter.key)}
                className={cn(
                  "flex shrink-0 items-center justify-center border-l border-border px-1.5 text-muted-foreground transition-colors",
                  "hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  "disabled:cursor-not-allowed",
                  s.icon,
                )}
              >
                <X aria-hidden="true" />
              </button>
            </div>
          );
        })}

        {available.length === 0 || disabled ? (
          <Button
            variant="outline"
            size={s.button}
            disabled
            iconBefore={<Plus />}
            className={cn("shrink-0 border-dashed text-muted-foreground", addButtonClassName)}
          >
            {addLabel}
          </Button>
        ) : (
          <Popover
            open={openKey === ADD_KEY}
            onOpenChange={(next) => setOpenKey(next ? ADD_KEY : null)}
            align="start"
            triggerClassName="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            contentClassName={cn("w-52 max-w-[calc(100vw-2rem)] p-1.5", panelClassName)}
            trigger={
              <span
                ref={(node) => {
                  triggerRefs.current[ADD_KEY] = node;
                }}
                className={cn(
                  buttonBase,
                  "border border-dashed border-border text-foreground hover:bg-accent hover:text-accent-foreground",
                  addButtonClassName,
                )}
              >
                <Plus aria-hidden="true" />
                {addLabel}
              </span>
            }
          >
            <div
              ref={openKey === ADD_KEY ? panelRef : undefined}
              role="menu"
              aria-label="Available filters"
              onKeyDown={onPanelKeyDown}
              className="max-h-64 space-y-0.5 overflow-y-auto"
            >
              {available.map((field) => (
                <button
                  key={field.key}
                  type="button"
                  role="menuitem"
                  data-filter-item=""
                  onClick={() => add(field)}
                  className={itemClasses}
                >
                  {field.label}
                </button>
              ))}
            </div>
          </Popover>
        )}

        {(filters.length > 0 || onSaveView) && <span className="flex-1" aria-hidden="true" />}

        {filters.length > 0 && (
          <Button
            variant="ghost"
            size={s.button}
            onClick={clear}
            disabled={disabled}
            iconBefore={<RotateCcw />}
            className="shrink-0 text-muted-foreground hover:text-accent-foreground"
          >
            {clearLabel}
          </Button>
        )}
        {onSaveView && (
          <Button
            size={s.button}
            onClick={() => onSaveView(filters)}
            disabled={disabled}
            iconBefore={<Save />}
            className="shrink-0"
          >
            {saveViewLabel}
          </Button>
        )}
      </div>
    );
  },
);

FilterBar.displayName = "FilterBar";
