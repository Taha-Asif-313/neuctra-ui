"use client";

import React, { forwardRef, useId } from "react";

import { cn } from "../../lib/cn";

export interface FormSectionProps
  extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, "title"> {
  /** Section title rendered as the fieldset legend. */
  title: React.ReactNode;
  /** Optional supporting text shown beneath the title. Linked to the fieldset with `aria-describedby`. */
  description?: React.ReactNode;
  /** Optional slot rendered at the right of the header, e.g. a "Reset" button. */
  actions?: React.ReactNode;
  /** Disables every interactive control inside the section. */
  disabled?: boolean;
  /** `"card"` renders a bordered card surface; `"plain"` renders no surface, for stacking sections inside one card. */
  variant?: "card" | "plain";
  /** Padding, title size and the gap between controls. */
  size?: "sm" | "md" | "lg";
  /** Form controls and related content. */
  children: React.ReactNode;
  /** Additional classes for the fieldset root. */
  className?: string;
  /** Inline styles for the fieldset root. */
  style?: React.CSSProperties;
  /** Additional classes for the legend (header row). */
  headerClassName?: string;
  /** Additional classes for the title text. */
  titleClassName?: string;
  /** Additional classes for the description text. */
  descriptionClassName?: string;
  /** Additional classes for the actions slot wrapper. */
  actionsClassName?: string;
  /** Additional classes for the wrapper around `children`. */
  contentClassName?: string;
}

const sizeConfig = {
  sm: { root: "p-4", title: "text-sm", desc: "text-xs", header: "mb-3", gap: "space-y-3" },
  md: { root: "p-5", title: "text-base", desc: "text-sm", header: "mb-4", gap: "space-y-4" },
  lg: { root: "p-6", title: "text-lg", desc: "text-sm", header: "mb-5", gap: "space-y-5" },
} as const;

export const FormSection = forwardRef<HTMLFieldSetElement, FormSectionProps>(
  function FormSection(
    {
      title,
      description,
      actions,
      disabled = false,
      variant = "card",
      size = "md",
      children,
      className,
      style,
      headerClassName,
      titleClassName,
      descriptionClassName,
      actionsClassName,
      contentClassName,
      ...rest
    },
    ref,
  ) {
    const descriptionId = useId();
    const s = sizeConfig[size] ?? sizeConfig.md;

    return (
      <fieldset
        ref={ref}
        disabled={disabled}
        aria-describedby={description ? descriptionId : undefined}
        className={cn(
          "m-0 min-w-0 text-foreground",
          variant === "card"
            ? cn("rounded-xl border border-border bg-card text-card-foreground", s.root)
            : "border-0 p-0",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
        style={style}
        {...rest}
      >
        {/* A floated, full-width legend renders in normal flow instead of
            notching the fieldset's top border, so the card keeps a clean
            rounded edge in every browser. */}
        <legend
          className={cn(
            // flex-wrap: when the text column would drop under 14rem (phones),
            // the actions move below the description instead of squeezing it.
            "float-left flex w-full flex-wrap items-start justify-between gap-x-4 gap-y-3 p-0",
            s.header,
            headerClassName,
          )}
        >
          <span className="min-w-0 flex-1 basis-56 space-y-1">
            <span
              className={cn(
                "block font-semibold text-foreground",
                s.title,
                titleClassName,
              )}
            >
              {title}
            </span>
            {description && (
              <span
                id={descriptionId}
                className={cn(
                  "block leading-relaxed text-muted-foreground",
                  s.desc,
                  descriptionClassName,
                )}
              >
                {description}
              </span>
            )}
          </span>
          {actions && (
            <span className={cn("flex shrink-0 items-center gap-2", actionsClassName)}>
              {actions}
            </span>
          )}
        </legend>
        <div className={cn("clear-both", s.gap, contentClassName)}>{children}</div>
      </fieldset>
    );
  },
);
FormSection.displayName = "FormSection";
