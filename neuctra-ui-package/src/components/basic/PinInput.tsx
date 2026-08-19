"use client";

import React, { forwardRef, useId, useRef, useState } from "react";
import { cn } from "../../lib/cn";

export interface PinInputProps {
  /** Number of character boxes. */
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fired once every box is filled. */
  onComplete?: (value: string) => void;
  /** Restrict accepted characters. */
  type?: "numeric" | "alphanumeric";
  /** Render dots instead of the typed characters. */
  mask?: boolean;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  error?: boolean;
  autoFocus?: boolean;
  label?: string;
  id?: string;
  className?: string;
  /** Applied to each individual character box, in addition to the size/state styling. */
  boxClassName?: string;
}

const SIZES = {
  sm: "h-9 w-9 text-sm rounded-md",
  md: "h-11 w-11 text-base rounded-lg",
  // h-12 keeps lg on the same height scale as the other form controls
  // (and six lg boxes still fit a 360px viewport).
  lg: "h-12 w-12 text-lg rounded-lg",
} as const;

export const PinInput = forwardRef<HTMLDivElement, PinInputProps>(
  function PinInput(
    {
      length = 4,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      type = "numeric",
      mask = false,
      size = "md",
      disabled = false,
      error = false,
      autoFocus = false,
      label = "PIN input",
      id,
      className,
      boxClassName,
    },
    ref,
  ) {
    const generatedId = useId();
    const groupId = id ?? generatedId;
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const [internal, setInternal] = useState(defaultValue.slice(0, length));

    const current = (value !== undefined ? value : internal).slice(0, length);
    const chars = Array.from({ length }, (_, i) => current[i] ?? "");

    const allowed = type === "numeric" ? /^[0-9]$/ : /^[a-zA-Z0-9]$/;

    const commit = (next: string) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
      if (next.length === length) onComplete?.(next);
    };

    const setChar = (index: number, char: string) => {
      const next = chars.slice();
      next[index] = char;
      commit(next.join("").slice(0, length));
    };

    const focusBox = (index: number) => {
      inputsRef.current[Math.min(Math.max(index, 0), length - 1)]?.focus();
    };

    const handleChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      // Take the last typed character so overwriting a filled box works.
      const char = e.target.value.slice(-1);
      if (char === "") {
        setChar(index, "");
        return;
      }
      if (!allowed.test(char)) return;
      setChar(index, char);
      focusBox(index + 1);
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      if (e.key === "Backspace") {
        if (chars[index]) {
          setChar(index, "");
        } else {
          focusBox(index - 1);
          setChar(index - 1, "");
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusBox(index - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusBox(index + 1);
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const text = e.clipboardData
        .getData("text")
        .split("")
        .filter((c) => allowed.test(c))
        .slice(0, length)
        .join("");
      if (!text) return;
      commit(text);
      focusBox(text.length - 1);
    };

    return (
      <div
        ref={ref}
        role="group"
        aria-label={label}
        className={cn("inline-flex items-center gap-2", className)}
      >
        {chars.map((char, i) => (
          <input
            key={i}
            ref={(el) => {
              inputsRef.current[i] = el;
            }}
            id={i === 0 ? groupId : undefined}
            type={mask ? "password" : "text"}
            inputMode={type === "numeric" ? "numeric" : "text"}
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Character ${i + 1} of ${length}`}
            value={char}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={(e) => e.target.select()}
            disabled={disabled}
            autoFocus={autoFocus && i === 0}
            className={cn(
              "border bg-transparent text-center font-semibold text-foreground outline-none transition-colors",
              "dark:bg-input/30 caret-primary",
              SIZES[size] ?? SIZES.md,
              error ? "border-destructive" : "border-input",
              "focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:border-ring",
              disabled && "cursor-not-allowed opacity-50",
              boxClassName,
            )}
          />
        ))}
      </div>
    );
  },
);

PinInput.displayName = "PinInput";
