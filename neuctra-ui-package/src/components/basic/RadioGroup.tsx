"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

interface Option {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface RadioGroupProps {
  name?: string;
  options: Option[];
  selectedValue?: string;
  onChange?: (value: string) => void;

  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  error?: string;

  /** 🎨 Root Container */
  className?: string;
  style?: React.CSSProperties;

  /** 🎨 Item Container */
  itemClassName?: string;
  itemStyle?: React.CSSProperties;

  /** 🎨 Label Text */
  labelClassName?: string;
  labelStyle?: React.CSSProperties;

  /** 🎨 Description Text */
  descriptionClassName?: string;
  descriptionStyle?: React.CSSProperties;

  /** 🎨 Icon Wrapper */
  iconWrapperClassName?: string;
  iconWrapperStyle?: React.CSSProperties;

  /** 🎨 Radio Indicator */
  indicatorClassName?: string;
  indicatorStyle?: React.CSSProperties;

  /** 🎨 Inner Dot */
  dotClassName?: string;
  dotStyle?: React.CSSProperties;

  /** 🎨 Error Message */
  errorClassName?: string;
  errorStyle?: React.CSSProperties;

  /** ⚙️ Configuration */
  size?: "sm" | "md" | "lg";
  orientation?: "vertical" | "horizontal";

  animationDuration?: number;
}

/* -------------------------------------------------------------------------- */
/* 🔘 RadioGroup                                                             */
/* -------------------------------------------------------------------------- */

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  selectedValue,
  onChange,

  disabled = false,
  readOnly = false,
  required = false,
  error,

  className,
  style,

  itemClassName,
  itemStyle,

  labelClassName,
  labelStyle,

  descriptionClassName,
  descriptionStyle,

  iconWrapperClassName,
  iconWrapperStyle,

  indicatorClassName,
  indicatorStyle,

  dotClassName,
  dotStyle,

  errorClassName,
  errorStyle,

  size = "md",
  orientation = "vertical",

  animationDuration = 0.2,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  /* 📏 Size configurations */
  const sizeConfig = {
    sm: {
      item: "px-3 py-2",
      indicator: "w-4 h-4",
      dot: "w-2 h-2",
      text: "text-xs",
      desc: "text-xs",
    },
    md: {
      item: "px-4 py-3",
      indicator: "w-5 h-5",
      dot: "w-2.5 h-2.5",
      text: "text-sm",
      desc: "text-xs",
    },
    lg: {
      item: "px-5 py-4",
      indicator: "w-6 h-6",
      dot: "w-3 h-3",
      text: "text-base",
      desc: "text-sm",
    },
  };

  const currentSize = sizeConfig[size];

  /* ⌨️ Enhanced Keyboard navigation */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled || readOnly) return;

      const current =
        focusedIndex ??
        options.findIndex((o) => o.value === selectedValue) ??
        0;

      let nextIndex = current;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
          e.preventDefault();
          nextIndex = (current + 1) % options.length;
          break;
        case "ArrowUp":
        case "ArrowLeft":
          e.preventDefault();
          nextIndex = (current - 1 + options.length) % options.length;
          break;
        case "Home":
          e.preventDefault();
          nextIndex = 0;
          break;
        case "End":
          e.preventDefault();
          nextIndex = options.length - 1;
          break;
        case " ":
        case "Enter":
          e.preventDefault();
          if (options[current] && !options[current].disabled) {
            onChange?.(options[current].value);
          }
          return;
        default:
          return;
      }

      // Skip disabled options
      while (options[nextIndex]?.disabled && nextIndex !== current) {
        nextIndex =
          e.key === "ArrowDown" || e.key === "ArrowRight"
            ? (nextIndex + 1) % options.length
            : (nextIndex - 1 + options.length) % options.length;
      }

      setFocusedIndex(nextIndex);
      if (options[nextIndex] && !options[nextIndex].disabled) {
        onChange?.(options[nextIndex].value);
      }
    },
    [focusedIndex, options, selectedValue, onChange, disabled, readOnly],
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("keydown", handleKeyDown);
    return () => el.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  /* Focus management */
  useEffect(() => {
    if (focusedIndex !== null && containerRef.current) {
      const focusedElement = containerRef.current.children[
        focusedIndex
      ] as HTMLElement;
      focusedElement?.focus();
    }
  }, [focusedIndex]);

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-required={required}
      aria-invalid={!!error}
      tabIndex={disabled ? -1 : 0}
      className={clsx(
        className,
        "outline-none",
        orientation === "vertical"
          ? "flex flex-col gap-2"
          : "flex flex-row gap-2 flex-wrap",
      )}
      style={style}
    >
      {options.map((option, i) => {
        const checked = selectedValue === option.value;
        const itemDisabled = disabled || option.disabled;

        const handleSelect = () => {
          if (itemDisabled || readOnly) return;
          onChange?.(option.value);
          setFocusedIndex(i);
        };

        return (
          <label
            key={option.value}
            onClick={handleSelect}
            tabIndex={itemDisabled ? -1 : 0}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
            className={clsx(
              itemClassName,
              "relative flex items-center justify-between gap-4 rounded-xl border cursor-pointer transition-all",
              currentSize.item,
              "bg-background border-border",
              !itemDisabled && "hover:bg-accent/60",
              checked && "border-primary bg-primary/5",
              itemDisabled && "opacity-50 cursor-not-allowed",
            )}
            style={itemStyle}
          >
            {/* Left Content */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {option.icon && (
                <div
                  className={clsx(
                    iconWrapperClassName,
                    "text-muted-foreground shrink-0",
                  )}
                  style={iconWrapperStyle}
                >
                  {option.icon}
                </div>
              )}

              <div className="min-w-0 flex-1">
                <p
                  className={clsx(
                    labelClassName,
                    "font-medium text-foreground truncate",
                    currentSize.text,
                  )}
                  style={labelStyle}
                >
                  {option.label}
                </p>

                {option.description && (
                  <p
                    className={clsx(
                      descriptionClassName,
                      "text-muted-foreground truncate",
                      currentSize.desc,
                    )}
                    style={descriptionStyle}
                  >
                    {option.description}
                  </p>
                )}
              </div>
            </div>

            {/* Hidden input for form compatibility */}
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={handleSelect}
              disabled={itemDisabled}
              required={required && i === 0} // Only first radio needs required
              className="hidden"
              aria-describedby={error ? `${name}-error` : undefined}
            />

            {/* Radio Indicator */}
            <div
              className={clsx(
                indicatorClassName,
                "relative flex items-center justify-center rounded-full border transition-all shrink-0",
                currentSize.indicator,
                checked
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/40",
              )}
              style={indicatorStyle}
            >
              <AnimatePresence>
                {checked && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ duration: animationDuration }}
                    className={clsx(
                      dotClassName,
                      "rounded-full bg-background",
                      currentSize.dot,
                    )}
                    style={dotStyle}
                  />
                )}
              </AnimatePresence>
            </div>
          </label>
        );
      })}

      {/* Error Message */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={clsx(
            errorClassName,
            "text-destructive mt-1",
            currentSize.desc,
          )}
          style={errorStyle}
          id={name ? `${name}-error` : undefined}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
