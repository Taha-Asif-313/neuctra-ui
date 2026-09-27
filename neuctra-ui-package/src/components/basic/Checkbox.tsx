"use client";

import React, { useState, useId, useRef } from "react";
import clsx from "clsx";
import { cn } from "../../lib/cn";

/* =========================
   Types
========================= */
export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxGroupProps {
  /** `"single"` renders one standalone checkbox; `"group"` renders an independent multi-select list from `options`. */
  mode?: "single" | "group";

  /** Name attribute applied to the underlying checkbox input(s). */
  name?: string;

  /* ---------- GROUP MODE ---------- */
  /** Options rendered in `mode="group"`. Each is toggled independently (not mutually exclusive). */
  options?: Option[];
  /** Currently checked values in `mode="group"`. */
  selectedValues?: string[];
  /** Called with the full updated array of checked values in `mode="group"`. */
  onChange?: (values: string[]) => void;

  /* ---------- SINGLE MODE ---------- */
  /** Label text shown next to the checkbox in `mode="single"`. */
  label?: string;
  /** Checked state in `mode="single"`. */
  checked?: boolean;
  /** Called with the next checked state in `mode="single"`. */
  onCheckedChange?: (checked: boolean) => void;

  /** Disables the checkbox(es) and prevents toggling. */
  disabled?: boolean;
  /** Prevents toggling while keeping the checkbox(es) visually active. */
  readOnly?: boolean;
  /** Marks the input(s) as required for native form validation. */
  required?: boolean;
  /** Error message rendered below the component. */
  error?: string;

  /* ---------- Styling ---------- */
  /** Additional classes for the outer wrapper. */
  className?: string;
  /** Additional classes for the group container (falls back to `className`). */
  containerClassName?: string;
  /** Additional classes for each checkbox's `<label>` row. */
  itemClassName?: string;
  /** Additional classes for each checkbox's `<label>` row (merged with `itemClassName`). */
  labelClassName?: string;
  /** Additional classes for the label text. */
  textClassName?: string;
  /** Additional classes for the checkbox box/icon. */
  iconClassName?: string;
  /** Additional classes for the checkmark SVG inside the checkbox. */
  checkClassName?: string;
  /** Additional classes for the error message. */
  errorClassName?: string;

  /** Inline styles for the outer wrapper. */
  style?: React.CSSProperties;
  /** Inline styles for the group container. */
  containerStyle?: React.CSSProperties;
  /** Inline styles for each checkbox's row. */
  itemStyle?: React.CSSProperties;
  /** Inline styles for each checkbox's row. */
  labelStyle?: React.CSSProperties;
  /** Inline styles for the label text. */
  textStyle?: React.CSSProperties;
  /** Inline styles for the checkbox box/icon. */
  iconStyle?: React.CSSProperties;
  /** Inline styles for the error message. */
  errorStyle?: React.CSSProperties;

  /* ---------- Icon ---------- */
  /** Renders a custom checkbox indicator in place of the default box/checkmark. */
  customIcon?: (checked: boolean, option?: Option) => React.ReactNode;
  /** Size (in pixels) of the default checkbox icon. */
  iconSize?: number;

  /* ---------- Advanced ---------- */
  /** Fully replaces the rendering of each checkbox (or the single checkbox) with custom markup. */
  renderItem?: (params: {
    option?: Option;
    checked: boolean;
    focused: boolean;
    toggle: () => void;
  }) => React.ReactNode;
}

/* =========================
   Component
========================= */
export const Checkbox: React.FC<CheckboxGroupProps> = ({
  mode = "single",

  name,

  options = [],
  selectedValues = [],
  onChange,

  label,
  checked = false,
  onCheckedChange,

  disabled = false,
  readOnly = false,
  required = false,
  error,

  className,
  containerClassName,
  itemClassName,
  labelClassName,
  textClassName,
  iconClassName,
  checkClassName,
  errorClassName,

  style,
  containerStyle,
  itemStyle,
  labelStyle,
  textStyle,
  iconStyle,
  errorStyle,

  customIcon,
  iconSize = 20,

  renderItem,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const generatedId = useId();
  const errorId = error ? `${generatedId}-error` : undefined;

  /* =========================
     Handlers
  ========================= */
  const handleGroupChange = (value: string) => {
    if (!onChange || disabled || readOnly) return;
    // The click path runs through the <label>, so a per-option `disabled` has
    // to be re-checked here — the input's own `disabled` attribute alone let
    // disabled options stay toggleable.
    if (options.find((o) => o.value === value)?.disabled) return;

    const updated = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(updated);
  };

  const handleSingleChange = () => {
    if (!onCheckedChange || disabled || readOnly) return;
    onCheckedChange(!checked);
  };

  /*
   * The old group keyboard handler lived here. It was unreachable: it bailed on
   * `focusedIndex === null`, and the only thing that set focusedIndex was
   * onFocus on a <label> whose input was display:none — so nothing was ever
   * focusable. Now that each input is `sr-only` rather than `hidden`, Tab and
   * Space work natively, which is the expected behavior for a checkbox group
   * (unlike radios, checkboxes are not arrow-navigable by spec).
   */

  /* =========================
     Default Icon
  ========================= */
  const DefaultIcon = (isChecked: boolean) => (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded border transition-colors shrink-0",
        isChecked
          ? "border-primary bg-primary"
          : "border-border bg-transparent",
        // The real input is sr-only, so the focus ring has to be rendered here.
        "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
        iconClassName,
      )}
      style={{
        width: iconSize,
        height: iconSize,
        ...iconStyle,
      }}
    >
      {isChecked && (
        <svg
          viewBox="0 0 24 24"
          // Pairs with bg-primary, so a light --primary keeps a readable tick.
          className={cn("text-primary-foreground", checkClassName)}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          style={{ width: iconSize * 0.6, height: iconSize * 0.6 }}
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </span>
  );

  /* =========================
     Render Single
  ========================= */
  if (mode === "single") {
    const toggle = handleSingleChange;

    if (renderItem) {
      return (
        <div className={className} style={style}>
          {renderItem({
            checked,
            focused: false,
            toggle,
          })}
        </div>
      );
    }

    return (
      <div className={className} style={style}>
        <label
          className={cn(
            "flex items-center justify-between",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
            itemClassName,
            labelClassName,
          )}
          style={{ ...itemStyle, ...labelStyle }}
        >
          <span
            className={cn("text-sm text-foreground", textClassName)}
            style={textStyle}
          >
            {label}
          </span>

          <input
            type="checkbox"
            // `hidden` (display:none) took this out of the tab order and the
            // a11y tree, and made `required` block form submission. `sr-only`
            // + `peer` keeps it invisible but focusable and announced.
            className="sr-only peer"
            name={name}
            checked={checked}
            disabled={disabled || readOnly}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={errorId}
            onChange={toggle}
          />

          {customIcon ? customIcon(checked) : DefaultIcon(checked)}
        </label>

        {error && (
          <p
            id={errorId}
            role="alert"
            className={cn("text-sm text-destructive mt-1", errorClassName)}
            style={errorStyle}
          >
            {error}
          </p>
        )}
      </div>
    );
  }

  /* =========================
     Render Group
  ========================= */
  return (
    <div
      ref={containerRef}
      role="group"
      aria-invalid={error ? true : undefined}
      aria-describedby={errorId}
      className={cn("flex flex-col gap-2", containerClassName || className)}
      style={containerStyle || style}
    >
      {options.map((option, index) => {
        const isChecked = selectedValues.includes(option.value);
        const focused = focusedIndex === index;

        const toggle = () => handleGroupChange(option.value);

        if (renderItem) {
          return (
            <React.Fragment key={option.value}>
              {renderItem({
                option,
                checked: isChecked,
                focused,
                toggle,
              })}
            </React.Fragment>
          );
        }

        const itemDisabled = disabled || option.disabled;

        return (
          <label
            key={option.value}
            onFocus={() => setFocusedIndex(index)}
            className={cn(
              "flex items-center justify-between",
              itemDisabled
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer",
              itemClassName,
              labelClassName,
            )}
            style={{ ...itemStyle, ...labelStyle }}
          >
            <span
              className={cn("text-sm text-foreground", textClassName)}
              style={textStyle}
            >
              {option.label}
            </span>

            <input
              type="checkbox"
              className="sr-only peer"
              name={name}
              value={option.value}
              checked={isChecked}
              disabled={itemDisabled || readOnly}
              onChange={toggle}
            />

            {customIcon
              ? customIcon(isChecked, option)
              : DefaultIcon(isChecked)}
          </label>
        );
      })}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn("text-sm text-destructive mt-1", errorClassName)}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};