"use client";
import React, { useState, useId, useRef } from "react";
import clsx from "clsx";
import { cn } from "../../lib/cn";

export interface Option {
  label: string;
  value: string;
}

export interface SwitchGroupProps {
  mode?: "single" | "group";
  name?: string;
  // For group mode
  options?: Option[];
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  // For single mode
  label?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /** 🎨 Customization */
  className?: string;
  itemClassName?: string;
  labelClassName?: string;
  textClassName?: string;
  switchClassName?: string;
  thumbClassName?: string;
  errorClassName?: string;

  style?: React.CSSProperties;
  itemStyle?: React.CSSProperties;
  labelStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
  switchStyle?: React.CSSProperties;
  thumbStyle?: React.CSSProperties;
  errorStyle?: React.CSSProperties;

  /** ⚙️ Config */
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
