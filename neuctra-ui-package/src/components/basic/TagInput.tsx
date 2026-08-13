"use client";

import React, { forwardRef, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/cn";

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  label?: string;
  placeholder?: string;
  /** Maximum number of tags; further entries are ignored. */
  maxTags?: number;
  /** Return false to reject a tag before it is added. */
  validate?: (tag: string) => boolean;
  /** Also commit the pending text when the field loses focus. */
  addOnBlur?: boolean;
  error?: string;
  helperText?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  id?: string;
  className?: string;
  wrapperClassName?: string;
}

const SIZES = {
  sm: { root: "min-h-8 px-2 py-1 gap-1", chip: "h-5 px-1.5 text-[11px]", input: "text-xs h-5" },
  md: { root: "min-h-10 px-2.5 py-1.5 gap-1.5", chip: "h-6 px-2 text-xs", input: "text-sm h-6" },
  lg: { root: "min-h-12 px-3 py-2 gap-2", chip: "h-7 px-2.5 text-sm", input: "text-base h-7" },
} as const;

export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(
  function TagInput(
    {
      value,
      defaultValue = [],
      onChange,
      label,
      placeholder = "Add a tag…",
      maxTags,
      validate,
      addOnBlur = true,
      error,
      helperText,
      size = "md",
      disabled = false,
      id,
      className,
      wrapperClassName,
    },
    ref,
  ) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const describedBy = helperText || error ? `${fieldId}-description` : undefined;
    const sizes = SIZES[size] ?? SIZES.md;

    const inputRef = useRef<HTMLInputElement | null>(null);
    const [internal, setInternal] = useState<string[]>(defaultValue);
    const [draft, setDraft] = useState("");

    const tags = value !== undefined ? value : internal;
    const atLimit = maxTags !== undefined && tags.length >= maxTags;

    const commit = (next: string[]) => {
      if (value === undefined) setInternal(next);
      onChange?.(next);
    };

    const addTag = (text: string) => {
      const tag = text.trim();
      if (!tag || disabled || atLimit) return;
      if (tags.includes(tag)) {
        setDraft("");
        return;
      }
      if (validate && !validate(tag)) return;
      commit([...tags, tag]);
      setDraft("");
    };

    const removeTag = (index: number) => {
      if (disabled) return;
      commit(tags.filter((_, i) => i !== index));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        addTag(draft);
      } else if (e.key === "Backspace" && draft === "" && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    return (
      <div className={cn("w-full", wrapperClassName)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="mb-1.5 block text-[13px] font-medium leading-none text-foreground"
          >
            {label}
          </label>
        )}

        <div
          onClick={() => inputRef.current?.focus()}
          className={cn(
            "flex w-full cursor-text flex-wrap items-center rounded-lg border bg-transparent transition-colors",
            "dark:bg-input/30",
            error ? "border-destructive" : "border-input",
            "focus-within:ring-2 focus-within:ring-ring/40 focus-within:border-ring",
            disabled && "cursor-not-allowed opacity-50",
            sizes.root,
            className,
          )}
        >
          {tags.map((tag, i) => (
            <span
              key={`${tag}-${i}`}
              className={cn(
                "inline-flex items-center gap-1 rounded-full bg-primary/10 font-medium text-primary",
                sizes.chip,
              )}
            >
              <span className="max-w-40 truncate">{tag}</span>
              <button
                type="button"
                aria-label={`Remove ${tag}`}
                disabled={disabled}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(i);
                }}
                className="rounded-full opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <X aria-hidden="true" className="h-3 w-3" />
              </button>
            </span>
          ))}

          <input
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref) ref.current = el;
            }}
            id={fieldId}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => addOnBlur && addTag(draft)}
            placeholder={atLimit ? "" : placeholder}
            disabled={disabled || atLimit}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            className={cn(
              "min-w-20 flex-1 bg-transparent text-foreground outline-none",
              "placeholder:text-muted-foreground disabled:cursor-not-allowed",
              sizes.input,
            )}
          />
        </div>

        {(helperText || error || maxTags !== undefined) && (
          <div className="mt-1.5 flex items-baseline justify-between gap-2">
            <p
              id={describedBy}
              role={error ? "alert" : undefined}
              className={cn(
                "text-xs font-medium",
                error ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {error || helperText}
            </p>
            {maxTags !== undefined && (
              <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                {tags.length}/{maxTags}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
