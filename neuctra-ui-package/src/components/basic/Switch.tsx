"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

interface Option {
  label: string;
  value: string;
}

interface SwitchGroupProps {
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

  /* =========================
     Keyboard Navigation (Group only)
  ========================= */
  useEffect(() => {
    if (mode !== "group" || !options) return;

    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (disabled || focusedIndex === null) return;

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev! + 1) % options.length);
      }

      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setFocusedIndex(
          (prev) => (prev! - 1 + options.length) % options.length,
        );
      }

      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleGroupChange(options[focusedIndex].value);
      }
    };

    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [focusedIndex, options, selectedValues, disabled, mode]);

  const renderSwitch = (
    isChecked: boolean,
    onToggle: () => void,
    inputValue?: string,
  ) => (
    <>
      <input
        type="checkbox"
        hidden
        name={name}
        value={inputValue}
        checked={isChecked}
        disabled={disabled || readOnly}
        required={required}
        onChange={onToggle}
      />

      {/* SWITCH */}
      <span
        className={clsx(
          "relative inline-flex rounded-full transition-colors",
          isChecked ? "bg-primary" : "bg-muted",
          switchClassName,
        )}
        style={{
          width: iconSize * 2,
          height: iconSize * 1.1,
          ...switchStyle,
        }}
      >
        {/* THUMB */}
        <span
          className={clsx(
            "absolute top-1/2 -translate-y-1/2 rounded-full shadow",
            "bg-white",
            thumbClassName,
          )}
          style={{
            left: isChecked ? `calc(100% - ${iconSize - 4}px - 2px)` : "2px",
            width: iconSize - 4,
            height: iconSize - 4,
            transition: "left 0.25s ease",
            ...thumbStyle,
          }}
        />
      </span>
    </>
  );

  return (
    <div
      ref={containerRef}
      role={mode === "group" ? "group" : "switch"}
      tabIndex={mode === "group" ? 0 : undefined}
      aria-disabled={disabled}
      aria-invalid={!!error}
      className={clsx("flex flex-col gap-2 text-foreground", className)}
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

          {renderSwitch(checked, handleSingleChange)}
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
          role="alert"
          className={clsx("text-sm text-destructive", errorClassName)}
          style={errorStyle}
        >
          {error}
        </p>
      )}
    </div>
  );
};
