"use client";

import React, { forwardRef, useState } from "react";
import {
  Info,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  X,
} from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Static inline alert / banner. Unlike the toast system (ToastProvider),
 * a Callout lives in the page flow and stays until dismissed.
 */
export interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: "info" | "success" | "warning" | "error" | "neutral";
  variant?: "soft" | "outline";
  title?: React.ReactNode;
  children?: React.ReactNode;
  /** Override the default type icon; pass null to hide it. */
  icon?: React.ReactNode | null;
  /** Renders a close button; the callout removes itself unless controlled. */
  dismissible?: boolean;
  onDismiss?: () => void;

  /** 🔥 Full Customization */
  iconClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  closeButtonClassName?: string;
}

/* Every color is a theme status token, so callouts follow the user-defined
   palette in both modes — no raw palette values, no dark: overrides. */
const STYLES = {
  info: {
    soft: "border-info/30 bg-info/10 text-info",
    outline: "border-info/50 text-info",
    icon: Info,
  },
  success: {
    soft: "border-success/30 bg-success/10 text-success",
    outline: "border-success/50 text-success",
    icon: CheckCircle,
  },
  warning: {
    soft: "border-warning/30 bg-warning/10 text-warning",
    outline: "border-warning/50 text-warning",
    icon: AlertTriangle,
  },
  error: {
    soft: "border-destructive/30 bg-destructive/10 text-destructive",
    outline: "border-destructive/50 text-destructive",
    icon: AlertCircle,
  },
  neutral: {
    soft: "border-border bg-muted text-foreground",
    outline: "border-border text-foreground",
    icon: Info,
  },
} as const;

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  function Callout(
    {
      type = "info",
      variant = "soft",
      title,
      children,
      icon,
      dismissible = false,
      onDismiss,
      className,
      iconClassName,
      contentClassName,
      titleClassName,
      descriptionClassName,
      closeButtonClassName,
      ...rest
    },
    ref,
  ) {
    const [hidden, setHidden] = useState(false);
    if (hidden) return null;

    const config = STYLES[type] ?? STYLES.info;
    const DefaultIcon = config.icon;

    return (
      <div
        ref={ref}
        // Errors interrupt; the rest is informational.
        role={type === "error" ? "alert" : "status"}
        className={cn(
          "flex w-full items-start gap-3 rounded-xl border p-4",
          config[variant] ?? config.soft,
          className,
        )}
        {...rest}
      >
        {icon !== null && (
          <span
            aria-hidden="true"
            // h-5 matches the title's text-sm line-height, so the icon centers
            // on the first line instead of hanging low from an mt nudge.
            className={cn(
              "flex h-5 shrink-0 items-center [&_svg]:h-5 [&_svg]:w-5",
              iconClassName,
            )}
          >
            {icon ?? <DefaultIcon />}
          </span>
        )}

        <div className={cn("min-w-0 flex-1", contentClassName)}>
          {title && (
            <p className={cn("text-sm font-semibold", titleClassName)}>
              {title}
            </p>
          )}
          {children && (
            <div
              className={cn(
                "text-sm text-foreground/80",
                title && "mt-1",
                descriptionClassName,
              )}
            >
              {children}
            </div>
          )}
        </div>

        {dismissible && (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              onDismiss?.();
              setHidden(true);
            }}
            className={cn(
              "shrink-0 rounded-md p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              closeButtonClassName,
            )}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

Callout.displayName = "Callout";
