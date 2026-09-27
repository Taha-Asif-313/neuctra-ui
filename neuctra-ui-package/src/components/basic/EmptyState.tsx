"use client";

import React, { forwardRef } from "react";
import { Inbox } from "lucide-react";
import { cn } from "../../lib/cn";

export interface EmptyStateProps
  // `title` here is a ReactNode slot, not the native tooltip attribute.
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icon shown in the muted circle; defaults to an Inbox icon. */
  icon?: React.ReactNode;
  /** Headline (required). */
  title: React.ReactNode;
  /** Supporting copy shown under the title. */
  description?: React.ReactNode;
  /** Call-to-action slot (usually a <Button />). */
  action?: React.ReactNode;
  /** Scales padding, icon, and text together. */
  size?: "sm" | "md" | "lg";

  /** Styles the icon wrapper circle. */
  iconClassName?: string;
  /** Styles the title heading. */
  titleClassName?: string;
  /** Styles the description text. */
  descriptionClassName?: string;
  /** Styles the wrapper around the action slot. */
  actionClassName?: string;
}

const SIZES = {
  sm: { root: "py-8 px-4", icon: "h-10 w-10 [&_svg]:h-5 [&_svg]:w-5", title: "text-sm", desc: "text-xs max-w-xs" },
  md: { root: "py-12 px-6", icon: "h-12 w-12 [&_svg]:h-6 [&_svg]:w-6", title: "text-base", desc: "text-sm max-w-sm" },
  lg: { root: "py-16 px-8", icon: "h-14 w-14 [&_svg]:h-7 [&_svg]:w-7", title: "text-lg", desc: "text-sm max-w-md" },
} as const;

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    {
      icon,
      title,
      description,
      action,
      size = "md",
      className,
      iconClassName,
      titleClassName,
      descriptionClassName,
      actionClassName,
      ...rest
    },
    ref,
  ) {
    const sizes = SIZES[size] ?? SIZES.md;

    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full flex-col items-center justify-center text-center",
          sizes.root,
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden="true"
          className={cn(
            "mb-4 inline-flex items-center justify-center rounded-full bg-muted text-muted-foreground",
            sizes.icon,
            iconClassName,
          )}
        >
          {icon ?? <Inbox />}
        </span>

        <h3 className={cn("font-semibold text-foreground", sizes.title, titleClassName)}>
          {title}
        </h3>

        {description && (
          <p className={cn("mt-1 text-muted-foreground", sizes.desc, descriptionClassName)}>
            {description}
          </p>
        )}

        {action && <div className={cn("mt-5", actionClassName)}>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
