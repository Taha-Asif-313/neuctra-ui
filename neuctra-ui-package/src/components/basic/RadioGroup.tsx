"use client";

import React, { useState, useId, useRef } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/cn";

/* -------------------------------------------------------------------------- */
/* 🧩 Types                                                                  */
/* -------------------------------------------------------------------------- */

export interface Option {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared `name` for the native radio inputs; auto-generated when omitted. */
  name?: string;
  /** Mutually-exclusive options to render — selecting one always deselects the rest. */
  options: Option[];
  /** Currently selected option value (controlled). */
  selectedValue?: string;
  /** Called with the newly selected option's value. */
  onChange?: (value: string) => void;

  /** Disables every option and prevents selection. */
  disabled?: boolean;
  /** Prevents selection changes while keeping the group visually active. */
  readOnly?: boolean;
  /** Marks the group as required for native form validation. */
  required?: boolean;
  /** Error message rendered below the group. */
  error?: string;

  // 🎨 Root Container
  /** Additional classes for the root container. */
  className?: string;
  /** Inline styles for the root container. */
  style?: React.CSSProperties;

  // 🎨 Item Container
  /** Additional classes for each option's row. */
  itemClassName?: string;
  /** Inline styles for each option's row. */
  itemStyle?: React.CSSProperties;

  // 🎨 Label Text
  /** Additional classes for an option's label text. */
  labelClassName?: string;
  /** Inline styles for an option's label text. */
  labelStyle?: React.CSSProperties;

  // 🎨 Description Text
  /** Additional classes for an option's description text. */
  descriptionClassName?: string;
  /** Inline styles for an option's description text. */
  descriptionStyle?: React.CSSProperties;

  // 🎨 Icon Wrapper
  /** Additional classes for an option's icon wrapper. */
  iconWrapperClassName?: string;
  /** Inline styles for an option's icon wrapper. */
  iconWrapperStyle?: React.CSSProperties;

  // 🎨 Radio Indicator
  /** Additional classes for the outer radio circle. */
  indicatorClassName?: string;
  /** Inline styles for the outer radio circle. */
  indicatorStyle?: React.CSSProperties;

  // 🎨 Inner Dot
  /** Additional classes for the inner selected dot. */
  dotClassName?: string;
  /** Inline styles for the inner selected dot. */
  dotStyle?: React.CSSProperties;

  // 🎨 Error Message
  /** Additional classes for the error message. */
  errorClassName?: string;
  /** Inline styles for the error message. */
  errorStyle?: React.CSSProperties;

  // ⚙️ Configuration
  /** Size variant controlling item padding, indicator and dot sizing. */
  size?: "sm" | "md" | "lg";
  /** Stacks options vertically or lays them out horizontally. */
  orientation?: "vertical" | "horizontal";

  /** Duration (in seconds) of the selected-dot scale animation. */
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
      icon: "w-3.5 h-3.5",
      outerGap: "gap-3",
      innerGap: "gap-2",
    },
    md: {
      item: "px-4 py-3",
      indicator: "w-5 h-5",
      dot: "w-2.5 h-2.5",
      text: "text-sm",
      desc: "text-xs",
      icon: "w-4 h-4",
      outerGap: "gap-4",
      innerGap: "gap-3",
    },
    lg: {
      item: "px-5 py-4",
      indicator: "w-6 h-6",
      dot: "w-3 h-3",
      text: "text-base",
      desc: "text-sm",
      icon: "w-5 h-5",
      outerGap: "gap-4",
      innerGap: "gap-3",
    },
  } as const;

  const currentSize = sizeConfig[size];

  const generatedId = useId();
  const groupName = name ?? generatedId;
  const errorId = error ? `${generatedId}-error` : undefined;

  /*
   * Keyboard navigation is intentionally NOT hand-rolled. Now that the radios
   * are real focusable inputs sharing a `name`, the browser gives us arrow-key
   * roving, disabled-option skipping and a single tab stop for free. The old
   * hand-rolled handler ran off a `focusedIndex` that could never change (its
   * only setter was onFocus on a non-focusable <label>), and would now
   * double-fire against the native behavior.
   */

  return (
    <div
      ref={containerRef}
      role="radiogroup"
      aria-required={required}
      aria-invalid={!!error}
      aria-describedby={errorId}
      className={cn(
        "outline-none",
        orientation === "vertical"
          ? "flex flex-col gap-2"
          : "flex flex-row gap-2 flex-wrap",
        className,
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
            className={cn(
              "relative flex items-center justify-between rounded-xl border transition-all",
              currentSize.outerGap,
              currentSize.item,
              "bg-background border-border",
              // Checked comes after hover so the selected tint isn't lost while
              // the pointer is over the item.
              !itemDisabled && "hover:bg-accent/60 cursor-pointer",
              checked && "border-primary bg-primary/5",
              itemDisabled && "opacity-50 cursor-not-allowed",
              "has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
              itemClassName,
            )}
            style={itemStyle}
          >
            {/* Left Content */}
            <div
              className={cn(
                "flex items-center min-w-0 flex-1",
                currentSize.innerGap,
              )}
            >
              {option.icon && (
                <div
                  className={cn(
                    "text-muted-foreground shrink-0 [&_svg]:w-full [&_svg]:h-full",
                    currentSize.icon,
                    iconWrapperClassName,
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
              name={groupName}
              value={option.value}
              checked={checked}
              onChange={handleSelect}
              disabled={itemDisabled}
              readOnly={readOnly}
              required={required && i === 0} // Only first radio needs required
              // `hidden`/`display:none` removed the control from the tab order
              // AND the accessibility tree, and made `required` block form
              // submission ("invalid form control is not focusable").
              // sr-only keeps it invisible but real.
              className="sr-only"
              aria-describedby={errorId}
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
          id={errorId}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};
