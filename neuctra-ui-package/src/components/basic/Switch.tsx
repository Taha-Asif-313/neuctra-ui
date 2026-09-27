"use client";
import React, { useState, useId, useRef } from "react";
import clsx from "clsx";
import { cn } from "../../lib/cn";

export interface Option {
  /** Text shown next to the switch. */
  label: string;
  /** Value reported in `selectedValues`/`onChange` for this switch. */
  value: string;
}

export interface SwitchGroupProps {
  /** `"single"` renders one on/off switch; `"group"` renders an independently-toggleable list of switches from `options` (not mutually exclusive, unlike RadioGroup). */
  mode?: "single" | "group";
  /** `name` attribute shared by the underlying checkbox input(s). */
  name?: string;
  // For group mode
  /** Switches to render in `"group"` mode. */
  options?: Option[];
  /** Values of the currently-checked switches in `"group"` mode. */
  selectedValues?: string[];
  /** Called with the full updated array of checked values in `"group"` mode. */
  onChange?: (values: string[]) => void;
  // For single mode
  /** Text shown next to the switch in `"single"` mode. */
  label?: string;
  /** Checked state of the switch in `"single"` mode. */
  checked?: boolean;
  /** Called with the new checked state in `"single"` mode. */
  onCheckedChange?: (checked: boolean) => void;

  /** Disables all switches and dims them. */
  disabled?: boolean;
  /** Prevents toggling while still allowing focus (no visual dimming). */
  readOnly?: boolean;
  /** Marks the (single-mode) input as required for form submission. */
  required?: boolean;
  /** Error message shown below the switch(es); also sets `aria-invalid`. */
  error?: string;

  // 🎨 Customization
  /** Additional classes for the root wrapper. */
  className?: string;
  /** Additional classes for each switch's row (label + control). */
  itemClassName?: string;
  /** Additional classes for each switch's `<label>` element. */
  labelClassName?: string;
  /** Additional classes for the label text. */
  textClassName?: string;
  /** Additional classes for the track (the pill-shaped switch body). */
  switchClassName?: string;
  /** Additional classes for the sliding thumb/knob. */
  thumbClassName?: string;
  /** Additional classes for the error message. */
  errorClassName?: string;

  /** Inline styles for the root wrapper. */
  style?: React.CSSProperties;
  /** Inline styles for each switch's row. */
  itemStyle?: React.CSSProperties;
  /** Inline styles for each switch's `<label>` element. */
  labelStyle?: React.CSSProperties;
  /** Inline styles for the label text. */
  textStyle?: React.CSSProperties;
  /** Inline styles for the track. */
  switchStyle?: React.CSSProperties;
  /** Inline styles for the sliding thumb/knob. */
  thumbStyle?: React.CSSProperties;
  /** Inline styles for the error message. */
  errorStyle?: React.CSSProperties;

  // ⚙️ Config
  /** Icon-scale size in px; track/thumb dimensions are derived from it (default 20). */
  iconSize?: number;
}

export const Switch: React.FC<SwitchGroupProps> = ({
  mode = "single",
  name,
  options,
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
  itemClassName,
  labelClassName,
  textClassName,
  switchClassName,
  thumbClassName,
  errorClassName,

  style,
  itemStyle,
  labelStyle,
  textStyle,
  switchStyle,
  thumbStyle,
  errorStyle,

  iconSize = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const generatedId = useId();
  const errorId = error ? `${generatedId}-error` : undefined;

  // Track/thumb geometry, derived once so the thumb stays centered and its
  // travel always matches the track width.
  const trackWidth = iconSize * 2;
  const trackHeight = Math.round(iconSize * 1.1);
  const thumbInset = 2;
  const thumbSize = trackHeight - thumbInset * 2;

  const handleGroupChange = (value: string) => {
    if (!onChange || disabled || readOnly || !options) return;

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
   * The group keyboard handler that lived here was unreachable — it bailed on
   * `focusedIndex === null`, and focusedIndex was only ever set by onFocus on a
   * <label> whose input was display:none, so nothing could focus. With the
   * inputs now `sr-only`, Tab + Space work natively, which is the correct
   * interaction model for a list of switches.
   */

  const renderSwitch = (
    isChecked: boolean,
    onToggle: () => void,
    inputValue?: string,
    isRequired = false,
  ) => (
    <>
      <input
        type="checkbox"
        // `hidden` removed this from the tab order and the a11y tree, so the
        // switch was unreachable by keyboard and `required` blocked submits.
        className="sr-only peer"
        role="switch"
        aria-checked={isChecked}
        name={name}
        value={inputValue}
        checked={isChecked}
        disabled={disabled || readOnly}
        required={isRequired}
        aria-describedby={errorId}
        onChange={onToggle}
      />

      {/* SWITCH */}
      <span
        className={cn(
          "relative inline-flex shrink-0 rounded-full transition-colors",
          isChecked ? "bg-primary" : "bg-muted",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          switchClassName,
        )}
        style={{
          width: trackWidth,
          height: trackHeight,
          ...switchStyle,
        }}
      >
        {/* THUMB */}
        <span
          className={cn(
            "absolute top-1/2 rounded-full shadow bg-background",
            thumbClassName,
          )}
          style={{
            // Animate transform, not `left`, and keep the offsets symmetric so
            // the thumb is actually centered in the track.
            left: 0,
            width: thumbSize,
            height: thumbSize,
            transform: `translate(${
              isChecked ? trackWidth - thumbSize - thumbInset : thumbInset
            }px, -50%)`,
            transition: "transform 0.25s ease",
            ...thumbStyle,
          }}
        />
      </span>
    </>
  );

  return (
    <div
      ref={containerRef}
      // role="switch" used to sit here, on a <div> wrapping the label, the
      // control and the error text — and without aria-checked. The role now
      // lives on the real input, where it belongs.
      role={mode === "group" ? "group" : undefined}
      aria-invalid={!!error}
      aria-describedby={errorId}
      className={cn("flex flex-col gap-2 text-foreground", className)}
      style={style}
    >
      {mode === "single" ? (
        <label
          className={clsx(
            "flex items-center justify-between cursor-pointer transition-colors",
            "text-foreground",
            disabled && "opacity-50 cursor-not-allowed",
            itemClassName,
            labelClassName,
          )}
          style={{ ...itemStyle, ...labelStyle }}
        >
          {/* TEXT */}
          <span
            className={clsx("text-sm text-foreground", textClassName)}
            style={textStyle}
          >
            {label}
          </span>

          {renderSwitch(checked, handleSingleChange, undefined, required)}
        </label>
      ) : (
        options?.map((option, index) => {
          const isChecked = selectedValues.includes(option.value);

          return (
            <label
              key={option.value}
              onFocus={() => setFocusedIndex(index)}
              className={clsx(
                "flex items-center justify-between cursor-pointer transition-colors",
                "text-foreground",
                disabled && "opacity-50 cursor-not-allowed",
                itemClassName,
                labelClassName,
              )}
              style={{ ...itemStyle, ...labelStyle }}
            >
              {/* TEXT */}
              <span
                className={clsx("text-sm text-foreground", textClassName)}
                style={textStyle}
              >
                {option.label}
              </span>

              {renderSwitch(
                isChecked,
                () => handleGroupChange(option.value),
                option.value,
              )}
            </label>
          );
        })
      )}

      {error && (
        <p
          id={errorId}
          role="alert"
          className={cn("text-sm text-destructive", errorClassName)}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};
